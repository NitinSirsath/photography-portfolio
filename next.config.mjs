/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@prisma/client', 'pg', '@prisma/adapter-pg'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fvpwvyzcbzwsykifbbzk.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
