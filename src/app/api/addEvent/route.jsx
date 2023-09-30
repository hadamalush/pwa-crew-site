import { NextResponse } from "next/server";

export const POST = async request => {
	const data = await request.json();

	console.log(data.fileImg);

	return NextResponse.json({ message: "Udalo sie" }, { status: 200 });
};
