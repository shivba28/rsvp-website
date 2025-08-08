/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: '/rsvp-website',
  assetPrefix: '/rsvp-website/',
}

export default nextConfig