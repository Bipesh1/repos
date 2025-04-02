/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https', // Allow only HTTPS (recommended for security)
        hostname: '**', // Wildcard for all domains
      },
      {
        protocol: 'http', // Allow HTTP (if needed, but not recommended for production)
        hostname: '**', // Wildcard for all domains
      },
    ],
  },
  
  // This is to ignore the build errors in the typescript
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;