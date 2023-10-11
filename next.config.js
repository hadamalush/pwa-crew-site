/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["9gncloqefz8xwgjl.public.blob.vercel-storage.com", "mega.nz"],
	},

	async rewrites() {
		return {
			beforeFiles: [
				{
					source: "/:lang(en|pl)/wydarzenia",
					destination: "/:lang(en)/events",
				},
				{
					source: "/:lang(en|pl)/wydarzenia/nowe-wydarzenie",
					destination: "/:lang(en)/events/new-event",
				},
				{
					source: "/:lang(en|pl)/wydarzenia/:path*",
					destination: "/:lang(en)/events/:path*",
				},
				{
					source: "/:lang(en|pl)/kontakt",
					destination: "/:lang(en)/contact",
				},
				{
					source: "/:lang(en|pl)/logowanie",
					destination: "/:lang(en)/login",
				},
				{
					source: "/:lang(en|pl)/rejestracja",
					destination: "/:lang(en)/registration",
				},
				{
					source: "/:lang(en|pl)/zapomniane-haslo",
					destination: "/:lang(en)/forgot-password",
				},
			],
		};
	},
};

module.exports = nextConfig;
