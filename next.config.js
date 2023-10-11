/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["9gncloqefz8xwgjl.public.blob.vercel-storage.com", "mega.nz"],
	},
	async redirects() {
		return [
			{
				source: "/:lang(en|pl)/wydarzenia",
				destination: "/:lang(en|pl)/events",
				permanent: true,
			},
			{
				source: "/:lang(en|pl)/wydarzenia/nowe-wydarzenie",
				destination: "/:lang(en|pl)/events/new-event",
				permanent: true,
			},
			{
				source: "/:lang(en|pl)/wydarzenia/:path*",
				destination: "/:lang(en|pl)/events/:path*",
				permanent: true,
			},
			{
				source: "/:lang(en|pl)/kontakt",
				destination: "/:lang(en|pl)/contact",
				permanent: true,
			},
			{
				source: "/:lang(en|pl)/logowanie",
				destination: "/:lang(en|pl)/login",
				permanent: true,
			},
			{
				source: "/:lang(en|pl)/rejestracja",
				destination: "/:lang(en|pl)/registration",
				permanent: true,
			},
			{
				source: "/:lang(en|pl)/zapomniane-haslo",
				destination: "/:lang(en|pl)/forgot-password",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
