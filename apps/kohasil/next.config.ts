import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/kohasil",
  // Required: transpile the shared @sakinah/ui package (ships TS source, not compiled JS)
  transpilePackages: ["@sakinah/ui"],
};

export default nextConfig;
