import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const POST = async request => {
	// const data = await request.json();

	const { searchParams } = new URL(request.url);

	console.log(searchParams);
	const filename = searchParams.get("filename");

	const blob = await put(filename, request.body, {
		access: "public",
	});

	// console.log(data.fileImg);

	// return NextResponse.json({ message: "Udalo sie" }, { status: 200 });
	return NextResponse.json(blob);
};
