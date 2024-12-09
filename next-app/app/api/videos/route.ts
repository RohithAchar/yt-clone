import { NextResponse } from "next/server";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const PROCESSED_VIDEO_BUCKET = process.env.PROCESSED_VIDEO_BUCKET_NAME;

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
