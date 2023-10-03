import fs from "fs";
import path from "path";

import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import megajs from "megajs";
import { Storage } from "megajs";
import { File } from "megajs";
import { verify } from "megajs";

export const POST = async request => {
	const { searchParams } = new URL(request.url);
	const filename = searchParams.get("filename");

	const reader = await request.body;

	const buffers = [];

	for await (const data of reader) {
		buffers.push(data);
	}

	const finalBuffer = Buffer.concat(buffers);

	const megaStorage = await new Storage({
		email: "poncyman@gmail.com",
		password: "!Wolf722",
		allowUploadBuffering: true,
	}).ready;

	const file = await megaStorage.upload(
		"beach.jpg",
		Buffer.from(finalBuffer, "hex")
	).complete;

	const link = await file.link();

	console.log(link);

	// const file = File.fromURL(
	// 	"https://mega.nz/file/HUECHIJY#kXkbq3eb72f_jYmimt6Tu1vWrEThz0bt3NKj7SQQXSQ"
	// );

	// Get the folder object from the URL
	const file1 = File.fromURL(link);

	// Load the file from the folder specified by /file/example in the URL
	await file1.loadAttributes();

	// And download it

	const data = await file.downloadBuffer();

	console.log(data);

	// const data = await file.downloadBuffer(); // buffered file contents
	// console.log(data); // file contents

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
	const folderPath = path.join(process.cwd(), "public", "uploads", "events");

	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath, { recursive: true });
		console.log("Folder created successfully.");
	} else {
		console.log("Folder already exists.");
	}

	const lastDotIndex = filename.lastIndexOf(".");
	const format = filename.substring(lastDotIndex + 1);

	let fileNameWithId =
		filename.substring(lastDotIndex, -1) +
		"-" +
		nanoid() +
		new Date().getTime() +
		`.${format}`;

	const filePath = `${folderPath}/${fileNameWithId}`;
	await fs.promises.writeFile(filePath, reader);

	return NextResponse.json(
		{ message: `/uploads/events/${fileNameWithId}` },
		{ status: 200 }
	);
};
