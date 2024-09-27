/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "my-image-storage-bucket-1234.s3.us-east-1.amazonaws.com", // Replace with your S3 bucket hostname
        pathname: "**", // Allow any path under the hostname
      },
    ],
  },
};

export default nextConfig;
