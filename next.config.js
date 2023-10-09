/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["9gncloqefz8xwgjl.public.blob.vercel-storage.com", "mega.nz"],
	},
	async rewrites() {
		return [
			{
				source: "/en/events",
				destination: "/en/wydarzenia", // Rewritten URL with language subpath
			},
		];
	},
};

module.exports = nextConfig;
