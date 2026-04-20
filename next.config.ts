import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "@payload-config": "./src/payload.config.ts",
    },
  },
};

export default withPayload(nextConfig);
