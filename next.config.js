/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' — static export breaks API routes (/api/mcp/stripe etc.)
  // Vercel handles SSR natively, no config needed
  trailingSlash: false,
  images: {
    domains: ['api.placeholder.com', 'via.placeholder.com'],
    unoptimized: true,
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY || 'default-value',
  },
}

module.exports = nextConfig