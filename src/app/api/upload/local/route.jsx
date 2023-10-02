import fs from "fs";
import path from "path";

import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import megajs from "megajs";
import { Storage } from "megajs";
import { Readable } from "stream";
import { on } from "stream";

// const processStream = async stream => {
// 	const reader = stream.getReader();

// 	try {
// 		while (true) {
// 			const { done, value } = await reader.read();

// 			if (done) {
// 				// Zakończono odczyt strumienia
// 				break;
// 			}
// 			return value;
// 			// return value;
// 			// Przekazuj dane do innej funkcji lub wykonuj inne operacje
// 			// np. zapisz dane do pliku, przetwórz je itp.
// 		}
// 	} catch (error) {
// 		console.error("Błąd odczytu strumienia:", error);
// 	} finally {
// 		reader.releaseLock();
// 	}
// };

export const POST = async request => {
	const { searchParams } = new URL(request.url);
	const filename = searchParams.get("filename");

	const reader = await request.body;

	const buffer = await processStream(reader);

	console.log(buffer);

	const buffers = [];

	for await (const data of buffer) {
		buffers.push(data);
	}

	const finalBuffer = Buffer.concat(buffers);

	console.log("final: ", finalBuffer);

	const megaStorage = await new Storage({
		email: "xxx",
		password: "xxxx",
		allowUploadBuffering: true,
	}).ready;

	const file = await megaStorage.upload(
		"obrazek15.jpg",
		Buffer.from(buffer, "hex")
	).complete;

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
	await fs.promises.writeFile(filePath, request.body);

	return NextResponse.json(
		{ message: `/uploads/events/${fileNameWithId}` },
		{ status: 200 }
	);
};
