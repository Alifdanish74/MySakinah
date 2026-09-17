import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/membership-card",
  skipTrailingSlashRedirect: true,
  // Transpile shared @sakinah/ui package
  transpilePackages: ["@sakinah/ui"],
};

export default nextConfig;
