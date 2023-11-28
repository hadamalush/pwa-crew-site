/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "9gncloqefz8xwgjl.public.blob.vercel-storage.com",
      "mega.nz",
      "res.cloudinary.com",
      "cdn.pixabay.com",
    ],
  },
};

module.exports = nextConfig;
