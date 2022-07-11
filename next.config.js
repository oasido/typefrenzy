/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputStandalone: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'platform-lookaside.fbsbx.com'],
  },
};

module.exports = nextConfig;
