import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const POST = async request => {
	const { searchParams } = new URL(request.url);
	const filename = searchParams.get("filename");

	try {
		const blob = await put(filename, request.body, {
			access: "public",
		});
	} catch (error) {
		return NextResponse.json({ message: error });
	}

	return NextResponse.json(blob);
};
