/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "4w11jf1advvxokik.public.blob.vercel-storage.com",
      "mega.nz",
      "res.cloudinary.com",
      "cdn.pixabay.com",
    ],
  },
};

module.exports = nextConfig;
