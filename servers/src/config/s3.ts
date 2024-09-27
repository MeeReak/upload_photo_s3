import { S3Client } from "@aws-sdk/client-s3";

// Configure the AWS SDK
const s3 = new S3Client({
  region: process.env.AWS_REGION || "us-east-1", // Ensure region is set
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
  // endpoint: process.env.AWS_S3_ENDPOINT || "http://127.0.0.1:4566", // LocalStack endpoint
  // forcePathStyle: true, // Required for LocalStack
});

export default s3;
