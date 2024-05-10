/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    removeConsole: false,
    styledComponents: {
      minify: true,
      displayName: false
    }
  },
  output: 'export',
  experimental: {
    appDir: true
  },
  sassOptions: {
    // eslint-disable-next-line quotes
    prependData: `@use 'src/styles/mixins' as *;`
  },
  reactStrictMode: false,
  trailingSlash: true,
  images: {
    domains: [''],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com'
      }
    ],
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;
