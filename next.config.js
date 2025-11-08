/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['sharp'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    emotion: true,
  },
}

module.exports = nextConfig