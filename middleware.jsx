export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";

export async function middleware(request) {
	const session = request.cookies.has(
		"next-auth.session-token" || "__Secure-next-auth.session-token"
	);
	console.log("middleware root: ", session);

	if (session) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return;
}

export const config = { matcher: ["/rejestracja/:path*", "/logowanie/:path*"] };
