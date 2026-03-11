import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const isNetlify = process.env.NETLIFY === "true";

const nextConfig: NextConfig = {
  output: "export",
  // Netlify: serve at root. GitHub Pages: serve at /AllGatcha
  basePath: isNetlify ? "" : isProd ? "/AllGatcha" : undefined,
  assetPrefix: isNetlify ? "" : isProd ? "/AllGatcha" : undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
