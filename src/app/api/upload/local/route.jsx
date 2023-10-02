import fs from "fs";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

export const POST = async request => {
	const { searchParams } = new URL(request.url);
	const filename = searchParams.get("filename");

	// let fileSize = 0;

	// for await (const piece of request.body) {
	// 	console.log("raz");
	// 	fileSize += piece.length;
	// }

	// if (fileSize > 4000000) {
	// 	return NextResponse.json(
	// 		{ message: "Plik jest zbyt duży" },
	// 		{ status: 422 }
	// 	);
	// }

	const lastDotIndex = filename.lastIndexOf(".");
	const format = filename.substring(lastDotIndex + 1);

	let fileNameWithId =
		filename.substring(lastDotIndex, -1) +
		"-" +
		nanoid() +
		new Date().getTime() +
		`.${format}`;

	console.log(request.body);

	const filePath = `public/uploads/events/${fileNameWithId}`;
	await fs.promises.writeFile(filePath, request.body);

	return NextResponse.json(
		{ message: `/uploads/events/${fileNameWithId}` },
		{ status: 200 }
	);
};
