import { connectDbMongo, findDocument, updateDocument } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function PATCH(request) {
	const email = await request.json();

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
	const allNotices = notifications?.notifications;

	for (const eventId in allNotices) {
		allNotices[eventId].status = "old";
	}

	try {
		await updateDocument(
			client,
			"Notifications",
			{ email: email },
			{ $set: { notifications: allNotices } }
		);
	} catch (err) {
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 400 }
		);
	}

	return NextResponse.json({
		status: 200,
	});
}
