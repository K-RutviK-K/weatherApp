/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["flagcdn.com"]
  },
  api: {
    externalResolver: true,
  }
}

module.exports = nextConfig
