import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const POST = async request => {
	const { searchParams } = new URL(request.url);
	const filename = searchParams.get("filename");

	const blob = await put(filename, request.body, {
		access: "public",
	});

	return NextResponse.json(blob);
};
