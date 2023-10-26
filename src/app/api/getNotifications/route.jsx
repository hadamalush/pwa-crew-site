// import { getDictionaryNotifi } from "@/app/dictionaries/notifications/dictionaries";
// import { generalConfig } from "@/config/gerenalConfig";
// import { connectDatabaseEvents, findDocument } from "@/lib/mongodb";
// import {
// 	oneConvertFromBuffersToBase64,
// 	oneDownloadBuffersMegaNz,
// } from "@/lib/storage/storage";
// import { ObjectId } from "mongodb";
import { connectDbMongo, findDocument } from "@/lib/mongodb";
import { NextResponse } from "next/server";
// import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(request) {
	const url = new URL(request.url);
	const email = url.searchParams.get("email");
	let client, notifications;

	if (!email) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		client = await connectDbMongo("Users");
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
	}

	try {
		notifications = await findDocument(client, "Notifications", {
			email: email,
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 400 }
		);
	}

	return NextResponse.json(
		{ notifications: notifications?.notifications },
		{ status: 200 }
	);
}
