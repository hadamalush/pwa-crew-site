import { getDictionaryElements } from "@/app/dictionaries/rest/dictionaries";
import { generalConfig } from "@/config/gerenalConfig";
import { connectDatabaseEvents, findDocument } from "@/lib/mongodb";
import {
	oneConvertFromBuffersToBase64,
	oneDownloadBuffersMegaNz,
} from "@/lib/storage/storage";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
	const url = new URL(request.url);

	const eventId = url.searchParams.get("eventId");

	if (eventId.length !== 24) {
		return NextResponse.json(
			{ error: "Nie znaleziono takiego eventu" },
			{ status: 404 }
		);
	}

	let modifiedEventId;

	try {
		modifiedEventId = new ObjectId(eventId);
	} catch (error) {
		return NextResponse.json(
			{ error: "Nie znaleziono takiego eventu" },
			{ status: 404 }
		);
	}

	let client, result;
	try {
		client = await connectDatabaseEvents();
	} catch (error) {
		console.log(error);
	}

	try {
		result = await findDocument(client, "AllEvents", { _id: modifiedEventId });

		if (!result)
			return NextResponse.json(
				{ error: "Something went wrong" },
				{ status: 404 }
			);
	} catch (error) {
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 404 }
		);
	}

	const storage = generalConfig.downloadImageStorageEvent;
	let uploadStorage = storage[0];

	if (!result[`image_src_${storage[0]}`]) {
		uploadStorage = storage[1];
	}

	try {
		if (uploadStorage === "mega") {
			const buffer = await oneDownloadBuffersMegaNz(result.image_src_mega);
			result.image_src_mega = oneConvertFromBuffersToBase64(buffer);
		}
	} catch (err) {
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 404 }
		);
	}

	const targetSrc = result[`image_src_${uploadStorage}`];

	return NextResponse.json(
		{ message: { targetSrc, uploadStorage, ...result } },
		{ status: 200 }
	);
}
