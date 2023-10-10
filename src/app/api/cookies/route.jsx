import { middleware } from "@/middleware";
import { NextResponse } from "next/server";

export const POST = async request => {
	const data = await request.json();

	const timeCookies = 365 * 60 * 60 * 24;

	return new NextResponse("Lang", {
		status: 200,
		headers: {
			"Set-Cookie": `lang=${data}; Max-Age=${timeCookies}; Secure; SameSite=None; Path=/`,
		},
	});
};
