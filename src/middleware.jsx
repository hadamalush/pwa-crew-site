export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";

export async function middleware(request) {
	const allCookies = request.cookies.getAll();

	const session = request.cookies.has("next-auth.session-token");

	if (session) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return;
}

export const config = { matcher: ["/rejestracja/:path*", "/logowanie/:path*"] };
