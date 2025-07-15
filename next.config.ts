import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "odp.tridatafiber.com",
                pathname: "/**",
            }
        ]
    },
};

export default nextConfig;
