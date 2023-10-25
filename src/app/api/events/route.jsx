import { NextResponse } from "next/server";
import { generalConfig } from "@/config/gerenalConfig";
const { connectDb } = require("@/lib/mongodb");
const {
	oneDownloadBuffersMegaNz,
	oneConvertFromBuffersToBase64,
} = require("@/lib/storage/storage");

export const revalidate = 1200;

export async function GET(request) {
	// setting which storage should be using
	const storage = generalConfig.downloadImageStorageEvent;

	console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW");

	let result;
	try {
		const db = await connectDb();

		result = await db.collection("AllEvents").find().toArray();
	} catch (error) {
		console.log(error);
	}

	const convertedEvenets = await Promise.all(
		result.map(async event => {
			let uploadStorage = storage[0];

			//If is empty using second storage
			if (
				!event[`image_src_${storage[0]}`] &&
				event[`image_src_${storage[1]}`]
			) {
				uploadStorage = storage[1];
			} else if (
				!event[`image_src_${storage[0]}`] &&
				!event[`image_src_${storage[1]}`]
			) {
				uploadStorage = storage[2];
			}

			//Mega links need to download buffer and then convert to base64

			try {
				if (uploadStorage === "mega") {
					const buffer = await oneDownloadBuffersMegaNz(event.image_src_mega);
					event.image_src_mega = oneConvertFromBuffersToBase64(buffer);
				}
			} catch (err) {
				//set default picture - info
				console.log(err);
			}

			const targetSrc = event[`image_src_${uploadStorage}`];

			const { _id, image_src_mega, image_src_vercelBlob, ...rest } = event;

			return {
				id: new Object(_id).toString(),
				targetSrc: targetSrc,
				upload: uploadStorage,
				...rest,
			};
		})
	);

	const response = NextResponse.json(
		{ message: convertedEvenets },
		{ status: 200 }
	);

	return response;
}
