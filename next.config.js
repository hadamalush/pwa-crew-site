/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["9gncloqefz8xwgjl.public.blob.vercel-storage.com", "mega.nz"],
	},

	async rewrites() {
		return [
			{
				source: "/:lang(en|pl)/wydarzenia",
				destination: "/:lang(en|pl)/events",
			},
			{
				source: "/:lang(en|pl)/wydarzenia/nowe-wydarzenie",
				destination: "/:lang(en|pl)/events/new-event",
			},
			{
				source: "/:lang(en|pl)/wydarzenia/:path*",
				destination: "/:lang(en|pl)/events/:path*",
			},
			{
				source: "/:lang(en|pl)/kontakt",
				destination: "/:lang(en|pl)/contact",
			},
			{
				source: "/:lang(en|pl)/logowanie",
				destination: "/:lang(en|pl)/login",
			},
			{
				source: "/:lang(en|pl)/rejestracja",
				destination: "/:lang(en|pl)/registration",
			},
			{
				source: "/:lang(en|pl)/zapomniane-haslo",
				destination: "/:lang(en|pl)/forgot-password",
			},
		];
	},
};

module.exports = nextConfig;
