/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["9gncloqefz8xwgjl.public.blob.vercel-storage.com", "mega.nz"],
	},

	async rewrites() {
		return [
			{
				source: "/pl/wydarzenia",
				destination: "/en/events",
			},
			{
				source: "/pl/wydarzenia/nowe-wydarzenie",
				destination: "/en/events/new-event",
			},
			{
				source: "/pl/wydarzenia/:path*",
				destination: "/en/events/:path*",
			},
			{
				source: "/pl/kontakt",
				destination: "/en/contact",
			},
			{
				source: "/pl/logowanie",
				destination: "/en/login",
			},
			{
				source: "/pl/rejestracja",
				destination: "/en/registration",
			},
			{
				source: "/:lang(en|pl)/zapomniane-haslo",
				destination: "/:lang(en)/forgot-password",
			},
		];
	},
};

module.exports = nextConfig;
