
/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const nextConfig = {
  // Your Next.js configuration options here.
};

export default withPWA({
  ...nextConfig,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    fallbacks: {
      document: '/offline', // Fallback for when the user is offline and the page is not cached.
    },
  },
});
