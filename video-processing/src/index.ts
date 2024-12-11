import AWS from "aws-sdk";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// AWS Configuration
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
const sqs = new AWS.SQS();

// Local directories
const RAW_VIDEO_DIR = "./localRawVideo";
const PROCESSED_VIDEO_DIR = "./localProcessedVideo";

// Ensure directories exist
if (!fs.existsSync(RAW_VIDEO_DIR)) fs.mkdirSync(RAW_VIDEO_DIR);
if (!fs.existsSync(PROCESSED_VIDEO_DIR)) fs.mkdirSync(PROCESSED_VIDEO_DIR);

/**
 * Downloads a file from S3 to the local directory
 */
const downloadFromS3 = async (
  bucket: string,
  key: string,
  downloadPath: string
): Promise<void> => {
  const params = { Bucket: bucket, Key: key };
  const fileStream = fs.createWriteStream(downloadPath);

  return new Promise((resolve, reject) => {
    s3.getObject(params)
      .createReadStream()
      .pipe(fileStream)
      .on("finish", resolve)
      .on("error", reject);
  });
};

/**
 * Uploads a file to S3
 */
const uploadToS3 = async (
  bucket: string,
  key: string,
  filePath: string
): Promise<void> => {
  const fileContent = fs.readFileSync(filePath);
  const params = { Bucket: bucket, Key: key, Body: fileContent };

  await s3.upload(params).promise();
};

/**
 * Processes a video file to 360p using FFmpeg
 */
const processVideo = async (
  inputPath: string,
  outputPath: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .output(outputPath)
      .videoCodec("libx264")
      .size("?x360")
      .on("end", () => resolve())
      .on("error", reject)
      .run();
  });
};

/**
 * @param bucket - The name of the S3 bucket
 * @param key - The key of the file to delete
 * Delete the raw video file from S3
 */
const deleteFromS3 = async (bucket: string, key: string): Promise<void> => {
  const params = { Bucket: bucket, Key: key };

  await s3.deleteObject(params).promise();
};

/**
 * Handles an SQS message by downloading, processing, and re-uploading a video
 */
const processQueueMessage = async (message: AWS.SQS.Message): Promise<void> => {
  if (!message.Body) return;

  const { Records } = JSON.parse(message.Body);
  if (!Records) return;
  const record = Records[0];

  const bucketName = record.s3.bucket.name;
  const key = record.s3.object.key;

  const rawVideoPath = path.join(RAW_VIDEO_DIR, key);
  const processedVideoPath = path.join(PROCESSED_VIDEO_DIR, `processed-${key}`);
  const processedKey = `${path.basename(key)}`;

  try {
    console.log(`Downloading ${key} from ${bucketName}...`);
    await downloadFromS3(bucketName, key, rawVideoPath);

    console.log(`Processing video ${key} to 360p...`);
    await processVideo(rawVideoPath, processedVideoPath);

    console.log(
      `Uploading processed video ${processedKey} to processedVideo bucket...`
    );
    await uploadToS3(
      process.env.PROCESSED_VIDEO_BUCKET_NAME as string,
      processedKey,
      processedVideoPath
    );

    // Clean up local files
    fs.unlinkSync(rawVideoPath);
    fs.unlinkSync(processedVideoPath);
    deleteFromS3(process.env.RAW_VIDEO_BUCKET_NAME as string, key);

    console.log(
      `Processed video ${processedKey} uploaded and local files cleaned.`
    );
  } catch (error) {
    console.error(`Error processing video ${key}:`, error);
  }
};

/**
 * Polls the SQS queue for new messages
 */
const pollSQS = async (): Promise<void> => {
  const params: AWS.SQS.ReceiveMessageRequest = {
    QueueUrl: process.env.QUEUE_URL as string,
    MaxNumberOfMessages: 10,
    WaitTimeSeconds: 20, // Long polling
  };

  try {
    const data = await sqs.receiveMessage(params).promise();
    if (data.Messages) {
      for (const message of data.Messages) {
        console.log("Processing new message:", message.Body);

        await processQueueMessage(message);

        // Delete the message from the queue
        await sqs
          .deleteMessage({
            QueueUrl: process.env.QUEUE_URL as string,
            ReceiptHandle: message.ReceiptHandle as string,
          })
          .promise();

        console.log("Message processed and deleted.");
      }
    } else {
      console.log("No new messages in the queue.");
    }
  } catch (error) {
    console.error("Error polling SQS:", error);
  }
};

/**
 * Start polling at intervals
 */
setInterval(() => {
  pollSQS().catch((err) => console.error(err));
}, 5000); // Check every 5 seconds
