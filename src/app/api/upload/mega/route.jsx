import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { Storage } from "megajs";

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

	//createId
	const lastDotIndex = filename.lastIndexOf(".");
	const format = filename.substring(lastDotIndex + 1);

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
			Buffer.from(finalBuffer, "hex")
		).complete;
	} catch (error) {
		return NextResponse.json({ error: "Failure upload." }, { status: 422 });
	}

	const link = await file.link();

	console.log(link);

	return NextResponse.json({ message: link }, { status: 200 });
};
