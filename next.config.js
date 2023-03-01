/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/AGNmyxbT7xBkkcvZ1S5zjDzm63p1uh6eTnG8mQAAaUFe=s96-c',
      },
    ],
  },
}

module.exports = nextConfig
