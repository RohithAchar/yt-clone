import { NextRequest, NextResponse } from "next/server";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const PROCESSED_VIDEO_BUCKET = process.env
  .PROCESSED_VIDEO_BUCKET_NAME as string;

export const GET = async (
  req: NextRequest,
  { params }: { params: { key: string } }
): Promise<NextResponse> => {
  if (!params.key) {
    return NextResponse.json(
      { message: "Video key is required" },
      { status: 400 }
    );
  }

  if (!PROCESSED_VIDEO_BUCKET) {
    return NextResponse.json(
      { message: "Processed video bucket name is not defined" },
      { status: 500 }
    );
  }

  const s3params = {
    Bucket: PROCESSED_VIDEO_BUCKET,
    Key: params.key,
    Expires: 3600,
  };

  try {
    const signedUrl = s3.getSignedUrl("getObject", s3params);

    return NextResponse.json({ url: signedUrl });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json(
      { message: "Error generating signed URL" },
      { status: 500 }
    );
  }
};
