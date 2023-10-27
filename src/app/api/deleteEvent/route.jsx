import { NextResponse } from "next/server";
import {
	connectDatabaseEvents,
	connectDbMongo,
	deleteDocument,
	findDocument,
} from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { getDictionaryNotifi } from "@/app/dictionaries/notifications/dictionaries";
import { ObjectId } from "mongodb";
import { addNotification } from "@/lib/crud";

export const DELETE = async request => {
	const session = await getServerSession();
	const data = await request.json();
	const { lang, id } = data;
	const dict = await getDictionaryNotifi(lang);

	const url = new URL(request.url);
	const eventTitle = url.searchParams.get("title");

	const notification = {
		trl_err_401: dict.notifications.err_401,
		trl_err_401_unAuth: dict.notifications.err_401_unAuth,
		trl_err_422: dict.notifications.err_422,
		trl_err_500: dict.notifications.err_500,
		trl_generalError: dict.notifications.deleteEvent.generalError,
		trl_success: dict.notifications.deleteEvent.success,
	};

	if (!session) {
		return NextResponse.json(
			{ error: notification.trl_err_401 },
			{ status: 401 }
		);
	}

	const email = session.user.email;

	if (!id) {
		return NextResponse.json(
			{ error: notification.trl_err_422 },
			{ status: 422 }
		);
	}

	let client, clientNotifi;

	try {
		client = await connectDatabaseEvents();
	} catch (error) {
		return NextResponse.json(
			{ error: notification.trl_err_500 },
			{ status: 500 }
		);
	}

	const filter = { _id: new ObjectId(id) };
	let eventItem;

	try {
		eventItem = await findDocument(client, "AllEvents", filter);
	} catch (error) {
		client.close();
		return NextResponse.json(
			{ error: notification.trl_generalError + " - 404" },
			{ status: 404 }
		);
	}

	if (eventItem?.user_email !== email) {
		client.close();
		return NextResponse.json(
			{ error: notification.trl_err_401_unAuth },
			{ status: 401 }
		);
	}

	try {
		await deleteDocument(client, "AllEvents", filter);
	} catch (err) {
		client.close();
		return NextResponse.json(
			{
				error: notification.trl_generalError + " - 428",
			},
			{ status: 428 }
		);
	}

	try {
		clientNotifi = await connectDbMongo("Users");
	} catch (error) {
		console.log(error);
		console.log("Failed connection to users databse.");
	}

	const dataNotifi = {
		email: email,
		actionTextPL: "Usunięto wydarzenie.",
		actionTextEN: "Deleted event",
		title: eventTitle || null,
		action: "delete",
		owner: email,
		status: "new",
	};

	try {
		await addNotification(clientNotifi, "Notifications", dataNotifi, true);
	} catch (err) {
		console.log("Failed to add notification");
	}

	client.close();
	return NextResponse.json(
		{ message: notification.trl_success },
		{ status: 200 }
	);
};
