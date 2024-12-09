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
    SERVER_URL: "http://localhost:3002",
  },
};

export default nextConfig;
