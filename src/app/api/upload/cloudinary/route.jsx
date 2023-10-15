import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { convertImageWithSharp, uploadStream } from "@/lib/storage/storage";

export const POST = async request => {
	const readAbleStream = await request.body;

	cloudinary.config({
		cloud_name: process.env.CLD_NAME,
		api_key: process.env.CLD_API,
		api_secret: process.env.CLD_SECRET,
		secure: true,
	});

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

	const convertedImage = await convertImageWithSharp(finalBuffer, 450, 300);

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
