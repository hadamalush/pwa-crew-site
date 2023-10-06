export { default } from "next-auth/middleware";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request) {
	const registerUrl = request.nextUrl.pathname.startsWith("/rejestracja");
	const loginUrl = request.nextUrl.pathname.startsWith("/logowanie");
	const newEventUrl = request.nextUrl.pathname.startsWith(
		"/wydarzenia/nowe-wydarzenie"
	);

	const requestHeaders = new Headers(request.headers);

	const ip = request.ip;

	requestHeaders.set("x-forwarded-for", ip);

	const session =
		request.cookies.has("next-auth.session-token") ||
		request.cookies.has("__Secure-next-auth.session-token");

	if (session && (registerUrl || loginUrl)) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	if (!session && newEventUrl) {
		return NextResponse.redirect(new URL("/logowanie", request.url));
	}

	return NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});
}

// export const config = {
// 	matcher: ["/rejestracja/:path*", "/logowanie/:path*"],
// };
