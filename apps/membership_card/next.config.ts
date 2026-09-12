import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile shared @sakinah/ui package
  transpilePackages: ["@sakinah/ui"],
};

export default nextConfig;
