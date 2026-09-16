import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/membership_card",
  // Transpile shared @sakinah/ui package
  transpilePackages: ["@sakinah/ui"],
};

export default nextConfig;
