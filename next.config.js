/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'platform-lookaside.fbsbx.com'],
  },
};

module.exports = nextConfig;
