export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

let defaultLocale = "pl";
let locales = ["pl", "en", "dk"];

function getLocale(request) {
	const acceptedLanguage = request.headers.get("accept-language") ?? undefined;

	let headers = { "accept-language": acceptedLanguage };
	let languages = new Negotiator({ headers }).languages();

	return match(languages, locales, defaultLocale);
}

export async function middleware(request) {
	const { pathname } = request.nextUrl;
	const pathnameHasLocale = locales.some(
		locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
	);

	if (pathnameHasLocale) return;

	const locale = getLocale(request);

	request.nextUrl.pathname = `/${locale}${pathname}`;

	const headers = new Headers(request.headers);
	const ip = request.ip;

	headers.set("x-forwarded-for", ip);

	const registerUrl = pathname.startsWith("/rejestracja");
	const loginUrl = pathname.startsWith("/logowanie");
	const forgotPasswordUrl = pathname.startsWith("/forgot-password");
	const newEventUrl = pathname.startsWith("/wydarzenia/nowe-wydarzenie");

	const session =
		request.cookies.has("next-auth.session-token") ||
		request.cookies.has("__Secure-next-auth.session-token");

	if (session && (registerUrl || loginUrl || forgotPasswordUrl)) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	if (!session && newEventUrl) {
		return NextResponse.redirect(new URL("/logowanie", request.url));
	}

	return Response.redirect(request.nextUrl);

	return NextResponse.next({
		request: {
			headers: headers,
		},
	});
}

export const config = {
	matcher: [
		// Skip all internal paths (_next, assets, api)
		"/((?!api|assets|.*\\..*|_next).*)",
		// Optional: only run on root (/) URL
		// '/'
	],
};

// export const config = {
// 	matcher: ["/rejestracja/:path*", "/logowanie/:path*"],
// };
