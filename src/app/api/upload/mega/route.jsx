import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { Storage } from "megajs";
import sharp from "sharp";

const convertImage = buffer => {
	return new Promise((resolve, reject) => {
		sharp(buffer)
			.resize(450, 300)
			.toFormat("webp")
			.toBuffer((error, convertedBuffer) => {
				if (error) {
					return reject(error);
				}

				resolve(convertedBuffer);
			});
	});
};

export const POST = async request => {
	const { searchParams } = new URL(request.url);
	const filename = searchParams.get("filename");
	const readAbleStream = await request.body;

	const buffers = [];

	//covert to buffer
	try {
		for await (const chunk of readAbleStream) {
			buffers.push(chunk);
		}
	} catch (error) {
		return NextResponse.json(
			{ error: "Failure convert buffer." },
			{ status: 304 }
		);
	}

	const finalBuffer = Buffer.concat(buffers);

	const convertedBuffer = await convertImage(finalBuffer);

	//createId
	const lastDotIndex = filename.lastIndexOf(".");
	// const format = filename.substring(lastDotIndex + 1);
	const format = "webp";

	let fileNameWithId =
		filename.substring(lastDotIndex, -1) +
		"-" +
		nanoid() +
		new Date().getTime() +
		`.${format}`;

	//connect
	let megaStorage;

	try {
		megaStorage = await new Storage({
			email: process.env.MEGA_EMAIL,
			password: process.env.MEGA_PASSWORD,
			allowUploadBuffering: true,
		}).ready;
	} catch (error) {
		return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
	}

	//upload
	let file;

	try {
		file = await megaStorage.upload(
			fileNameWithId,
			Buffer.from(convertedBuffer, "hex")
		).complete;
	} catch (error) {
		return NextResponse.json({ error: "Failure upload." }, { status: 422 });
	}

	const link = await file.link();

	return NextResponse.json({ message: link }, { status: 200 });
};
