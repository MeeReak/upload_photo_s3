import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "./s3";
import { Request } from "express";

interface MulterFile extends Express.Multer.File {
  originalname: string;
  key: string;
}

const upload = multer({
  storage: multerS3({
    s3: s3, // Using the new S3Client instance
    bucket: process.env.AWS_S3_BUCKET_NAME || "archive-local-bucket", // Ensure bucket name is provided
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (
      req: Request,
      file: MulterFile,
      cb: (error: Error | null, key?: string) => void
    ): void {
      const uniqueFileName = Date.now().toString() + "-" + file.originalname;
      cb(null, uniqueFileName); // File name in S3
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

export default upload;
