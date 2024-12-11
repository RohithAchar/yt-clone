import { NextRequest, NextResponse } from "next/server";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const PROCESSED_VIDEO_BUCKET = process.env.PROCESSED_VIDEO_BUCKET_NAME;
const RAW_VIDEO_BUCKET = process.env.RAW_VIDEO_BUCKET_NAME;

/**
 * Returns a list of processed videos from the processed video S3 bucket.
 * @returns A JSON response with a list of videos. Each video object contains the key, last modified date, and size of the video.
 * @throws A 500 response if an error occurs when fetching the videos.
 */
export async function GET() {
  try {
    const params = {
      Bucket: PROCESSED_VIDEO_BUCKET as string,
    };

    const data = await s3.listObjectsV2(params).promise();

    const videos = data.Contents?.map((item) => ({
      key: item.Key,
      lastModified: item.LastModified,
      size: item.Size,
    }));

    return NextResponse.json({ videos });
  } catch (error) {
    console.error("Error fetching processed videos:", error);
    return NextResponse.json(
      { message: "Error fetching videos" },
      { status: 500 }
    );
  }
}

/**
 * Uploads a video file to the raw video S3 bucket and returns a 200 response with a JSON payload containing a success message.
 * If the bucket name is not defined, returns a 500 response with a JSON payload containing an error message.
 * If the file is missing in the request, returns a 400 response with a JSON payload containing an error message.
 * If an error occurs when uploading the video, returns a 500 response with a JSON payload containing an error message.
 * @param req - The NextRequest object containing the file to be uploaded.
 * @returns A NextResponse object containing the response.
 */
export async function POST(req: NextRequest) {
  try {
    if (!RAW_VIDEO_BUCKET) {
      return NextResponse.json(
        { message: "Bucket name is not defined in the environment variables" },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "File is missing in the request" },
        { status: 400 }
      );
    }

    // Convert the Blob/File to a Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const params = {
      Bucket: RAW_VIDEO_BUCKET as string,
      Key: file.name,
      Body: buffer,
      ContentType: file.type,
      ACL: "bucket-owner-full-control",
    };

    await s3.upload(params).promise();

    return NextResponse.json({ message: "Video uploaded successfully" });
  } catch (error) {
    console.error("Error uploading video:", error);
    return NextResponse.json(
      { message: "Error uploading video" },
      { status: 500 }
    );
  }
}
