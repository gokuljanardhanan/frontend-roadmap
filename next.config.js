/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["reactflow"],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        pathname: "/7.x/**",
      },
    ],
  },
};

module.exports = nextConfig;
