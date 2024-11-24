import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		optimizePackageImports: ["@chakra-ui/react"],
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "minio.myodan.me",
			},
		],
	},
};

export default nextConfig;
