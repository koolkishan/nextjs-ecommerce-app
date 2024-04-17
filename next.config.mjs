/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ecommerce.oneentry.cloud',
                port: '',
            },
        ],
    },
};
// images: {
//     domains: [
//       'ecommerce.oneentry.cloud',
//       // Add other domains you may want to allow here
//     ],
//   },
export default nextConfig;
