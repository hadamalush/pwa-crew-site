import { connectDbMongo, findDocument } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
	const session = await getServerSession();
	const email = session?.user?.email;
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
