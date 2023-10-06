export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";

export async function middleware(request) {
	const headers = new Headers(request.headers);
	const ip = request.ip || "";

	headers.set("x-forwarded-for", ip);

	const registerUrl = request.nextUrl.pathname.startsWith("/rejestracja");
	const loginUrl = request.nextUrl.pathname.startsWith("/logowanie");
	const newEventUrl = request.nextUrl.pathname.startsWith(
		"/wydarzenia/nowe-wydarzenie"
	);

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
			headers: headers,
		},
	});
}

// export const config = {
// 	matcher: ["/rejestracja/:path*", "/logowanie/:path*"],
// };
