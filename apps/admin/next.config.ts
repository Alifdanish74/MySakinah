import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/admin",
  skipTrailingSlashRedirect: true,
  transpilePackages: ["@sakinah/ui"],
};

export default nextConfig;
