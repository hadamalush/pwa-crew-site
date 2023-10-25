import cloudinary from "cloudinary";
import { NextResponse } from "next/server";
import { convertImageWithSharp, uploadStream } from "@/lib/storage/storage";

export const dynamic = "force-dynamic";

export const POST = async request => {
	let readAbleStream;

	// NextResponse.headers.append("Access-Control-Allow-Origin", "*"); // Zastąp '*' swoim rzeczywistym pochodzeniem
	// NextResponse.headers.append(
	// 	"Access-Control-Allow-Methods",
	// 	"GET,DELETE,PATCH,POST,PUT"
	// );
	// NextResponse.headers.append(
	// 	"Access-Control-Allow-Headers",
	// 	"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
	// );

	try {
		readAbleStream = await request.body;

		console.log(readAbleStream);
	} catch (err) {
		return NextResponse.json(
			{ error: "Failure readAbleStream." },
			{ status: 304 }
		);
	}

	try {
		cloudinary.config({
			cloud_name: process.env.CLD_NAME,
			api_key: process.env.CLD_API,
			api_secret: process.env.CLD_SECRET,
			secure: true,
		});
	} catch (err) {
		return NextResponse.json({ error: "Failure cloudinary." }, { status: 304 });
	}

	const buffers = [];

	// covert to buffer
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
	let convertedImage;

	try {
		convertedImage = await convertImageWithSharp(finalBuffer, 450, 300);
	} catch (err) {
		return NextResponse.json({ error: "Convert failed." }, { status: 304 });
	}

	let image;

	const options = {
		tags: "pwa-crew",
		resource_type: "image",
		folder: "events",
	};

	try {
		image = await uploadStream(convertedImage, options, cloudinary);
	} catch {
		return NextResponse.json({ error: "Failure upload." }, { status: 422 });
	}

	const { secure_url } = image;

	return NextResponse.json({ message: secure_url });
};
