import { NextResponse } from "next/server";
import {
	connectDatabaseEvents,
	connectDbMongo,
	findDocument,
	updateDocument,
} from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { getDictionaryNotifi } from "@/app/dictionaries/notifications/dictionaries";
import { ObjectId } from "mongodb";
import { addNotification } from "@/lib/crud";

export const POST = async request => {
	const session = await getServerSession();

	console.log(session);
	const email = session?.user?.email;
	const data = await request.json();
	const { lang } = data;
	const dict = await getDictionaryNotifi(lang);

	const notification = {
		trl_err_401: dict.notifications.err_401,
		trl_err_401_unAuth: dict.notifications.err_401_unAuth,
		trl_err_422: dict.notifications.err_422,
		trl_err_500: dict.notifications.err_500,
		trl_generalError: dict.notifications.generalError,
		trl_success: dict.notifications.settings.success,
	};

	if (!session) {
		return NextResponse.json(
			{ error: notification.trl_err_401 },
			{ status: 401 }
		);
	}

	const { title, password, imgLink } = data;

	if (!title && !password && !imgLink) {
		return NextResponse.json(
			{ error: notification.trl_err_422 },
			{ status: 422 }
		);
	}

	let client;

	try {
		client = await connectDbMongo("Auth");
	} catch (error) {
		return NextResponse.json(
			{ error: notification.trl_err_500 },
			{ status: 500 }
		);
	}

	const filter = { email: email };

	let user;

	try {
		eventItem = await findDocument(client, "User", filter);
	} catch (error) {
		client.close();
		return NextResponse.json(
			{ error: notification.trl_generalError + " - 404" },
			{ status: 401 }
		);
	}

	console.log(user);

	return;

	// if (eventItem.user_email !== email) {
	// 	client.close();
	// 	return NextResponse.json(
	// 		{ error: notification.trl_err_401_unAuth },
	// 		{ status: 401 }
	// 	);
	// }

	// const update = {
	// 	$set: {
	// 		user_email: email,
	// 		title,
	// 		town,
	// 		code_post: codePost,
	// 		street,
	// 		date,
	// 		time,
	// 		description: description,
	// 		...(imageSrcVercelBlob && {
	// 			image_src_vercelBlob: imageSrcVercelBlob,
	// 		}),
	// 		...(imageSrcMega && { image_src_mega: imageSrcMega }),
	// 		...(imageSrcCld && { image_src_cloudinary: imageSrcCld }),
	// 	},
	// };

	// try {
	// 	await updateDocument(client, "AllEvents", filter, update);
	// } catch (err) {
	// 	client.close();
	// 	return NextResponse.json(
	// 		{
	// 			error: notification.trl_generalError + " - 428",
	// 		},
	// 		{ status: 428 }
	// 	);
	// }

	// try {
	// 	clientNotifi = await connectDbMongo("Users");
	// } catch (error) {
	// 	console.log(error);
	// 	console.log("Failed connection to users databse.");
	// }

	// const dataNotifi = {
	// 	email: email,
	// 	actionTextPL: "Edytowano wydarzenie.",
	// 	actionTextEN: "Edited the event",
	// 	href: eventLink + "#section_detail-item",
	// 	title: title,
	// 	action: "edit",
	// 	status: "new",
	// };

	// try {
	// 	await addNotification(clientNotifi, "Notifications", dataNotifi, true);
	// } catch (err) {
	// 	console.log("Failed to add notification");
	// }

	client.close();
	return NextResponse.json(
		{ message: notification.trl_success },
		{ status: 200 }
	);
};
