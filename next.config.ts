import type { NextConfig } from "next";

// Only GitHub Pages needs the /AllGatcha basePath.
// Netlify (and local dev) serves from root.
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPages ? "/AllGatcha" : undefined,
  assetPrefix: isGitHubPages ? "/AllGatcha" : undefined,
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
