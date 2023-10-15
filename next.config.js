/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"9gncloqefz8xwgjl.public.blob.vercel-storage.com",
			"mega.nz",
			"res.cloudinary.com",
			"cdn.pixabay.com",
		],
	},
	// async rewrites() {
	// 	return [
	// 		{
	// 			source: "/:lang(en|pl)/wydarzenia",
	// 			destination: "/:lang(en|pl)/events",
	// 		},
	// 		{
	// 			source: "/:lang(en|pl)/wydarzenia/nowe-wydarzenie",
	// 			destination: "/:lang(en|pl)/events/new-event",
	// 		},
	// 		{
	// 			source: "/:lang(en|pl)/wydarzenia/:path*",
	// 			destination: "/:lang(en|pl)/events/:path*",
	// 		},
	// 		{
	// 			source: "/:lang(en|pl)/kontakt",
	// 			destination: "/:lang(en|pl)/contact",
	// 		},
	// 		{
	// 			source: "/:lang(en|pl)/logowanie",
	// 			destination: "/:lang(en|pl)/login",  git
	// 		},
	// 		{
	// 			source: "/:lang(en|pl)/rejestracja",
	// 			destination: "/:lang(en|pl)/registration",  git
	// 		},
	// 		{
	// 			source: "/:lang(en|pl)/zapomniane-haslo",
	// 			destination: "/:lang(en|pl)/forgot-password",
	// 		},
	// 	];
	// },
};

module.exports = nextConfig;
