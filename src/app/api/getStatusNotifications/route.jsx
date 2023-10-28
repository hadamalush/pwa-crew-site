import { connectDbMongo, findDocument } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const revalidate = 600;

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

	const quantityNotices = Object.values(notifications?.notifications).filter(
		item => item.status === "new"
	).length;

	return NextResponse.json(
		{ message: quantityNotices },
		{
			status: 200,
		}
	);
}
