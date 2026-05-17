import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/step-3-roof", destination: "/step-3-roof-age", permanent: true },
      { source: "/step-4-insurance", destination: "/step-5-insurance", permanent: true },
      { source: "/step-5-budget", destination: "/step-6-budget", permanent: true },
      { source: "/step-6-photos", destination: "/step-7-photos", permanent: true },
      { source: "/step-7-contact", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
