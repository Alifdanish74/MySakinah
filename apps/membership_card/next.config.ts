import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "/membership_card",
  skipTrailingSlashRedirect: true,
  // Transpile shared @sakinah/ui package
  transpilePackages: ["@sakinah/ui"],
};

export default nextConfig;
