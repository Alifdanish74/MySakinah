import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/kopetro",
  skipTrailingSlashRedirect: true,
  // Required: transpile the shared @sakinah/ui package (ships TS source, not compiled JS)
  transpilePackages: ["@sakinah/ui"],
};

export default nextConfig;
