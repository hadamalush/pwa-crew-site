import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import megajs from "megajs";
import { Storage } from "megajs";
import { File } from "megajs";
import { verify } from "megajs";

export const POST = async request => {
	const { searchParams } = new URL(request.url);
	const filename = searchParams.get("filename");
	const readAbleStream = await request.body;
	const buffers = [];

	//covert to buffer
	for await (const chunk of readAbleStream) {
		buffers.push(chunk);
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
	const megaStorage = await new Storage({
		email: process.env.MEGA_EMAIL,
		password: process.env.MEGA_PASSWORD,
		allowUploadBuffering: true,
	}).ready;

	//upload
	const file = await megaStorage.upload(
		fileNameWithId,
		Buffer.from(finalBuffer, "hex")
	).complete;

	const link = await file.link();

	console.log(link);

	return NextResponse.json({ message: link }, { status: 200 });
};
