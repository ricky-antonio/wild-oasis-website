/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https', // or 'http'
            hostname: 'ycnvjsqdwpljiftmmehb.supabase.co', // Replace with your image's hostname
            port: '', // Optional: Specify a port if needed
            pathname: '/storage/v1/object/public/cabin-images/**', // Optional: Limit the path
          },
          // Add more patterns as needed
        ],
      },
};

export default nextConfig;
