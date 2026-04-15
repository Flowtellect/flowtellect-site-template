/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // unoptimized=true: no server-side image processing (Netlify doesn't run sharp).
    // Remote patterns whitelist applies when next/image is used; harmless with
    // unoptimized but future-proofs switch to optimized.
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

export default nextConfig;
