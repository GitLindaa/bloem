/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [],
  },
  trailingSlash: true,
};

module.exports = nextConfig;
