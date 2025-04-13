/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  // Enable trailing slashes for better URL handling
  trailingSlash: true,
  // Ensure proper routing in production
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-vercel-deployment',
          },
        ],
        destination: '/:path*',
        permanent: false,
      },
    ];
  },
  // Enable static exports if needed
  // output: 'export',
  // Disable server-side features if deploying as static
  // experimental: {
  //   appDir: true,
  // },
};

export default nextConfig;
