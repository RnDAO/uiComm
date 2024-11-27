/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  trailingSlash: true,
  images: {
    loader:'custom',
    unoptimized: true,
  },
};

module.exports = nextConfig;
