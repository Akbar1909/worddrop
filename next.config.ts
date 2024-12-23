import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "media.istockphoto.com",
      },
      {
        hostname: "localhost",
      },
      {
        hostname: "dev-api.recallwords.com",
      },
      {
        hostname: "api.recallwords.com",
      },
      {
        hostname:"letter-so.s3.amazonaws.com"
      }
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
};

export default nextConfig;
