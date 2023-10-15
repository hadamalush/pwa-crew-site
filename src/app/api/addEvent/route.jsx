import { NextResponse } from "next/server";
import { connectDatabaseEvents } from "@/lib/mongodb";
import { insertDocument } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { getDictionaryNotifi } from "@/app/dictionaries/notifications/dictionaries";

export const POST = async request => {
	const session = await getServerSession();
	const data = await request.json();
	const { lang } = data;
	const dict = await getDictionaryNotifi(lang);

	const notification = {
		trl_err_401: dict.notifications.err_401,
		trl_err_422: dict.notifications.err_422,
		trl_err_500: dict.notifications.err_500,
		trl_generalError: dict.notifications.newEvent.generalError,
		trl_success: dict.notifications.newEvent.success,
	};

	if (!session) {
		return NextResponse.json(
			{ error: notification.trl_err_401 },
			{ status: 401 }
		);
	}

	const email = session.user.email;

	const {
		title,
		town,
		codePost,
		street,
		date,
		time,
		description,
		imageSrcVercelBlob,
		imageSrcMega,
		imageSrcCld,
		// imageSrcLocal,
	} = data;
	const currentDate = new Date();
	const inputDate = new Date(date);

	if (
		!title ||
		title.length < 5 ||
		title.length > 30 ||
		!town ||
		town.length < 2 ||
		town.length > 30 ||
		!codePost ||
		(codePost.length !== 5 && codePost.length !== 6) ||
		!street ||
		street.length < 2 ||
		street.length > 57 ||
		!date ||
		!time ||
		!description ||
		description.length < 50 ||
		description.length > 300 ||
		(!imageSrcVercelBlob && !imageSrcMega && !imageSrcCld) ||
		inputDate < currentDate
	) {
		return NextResponse.json(
			{ error: notification.trl_err_422 },
			{ status: 422 }
		);
	}

	let client;

	try {
		client = await connectDatabaseEvents();
	} catch (error) {
		return NextResponse.json(
			{ error: notification.trl_err_500 },
			{ status: 500 }
		);
	}

	try {
		await insertDocument(client, "AllEvents", {
			user_email: email,
			title,
			town,
			code_post: codePost,
			street,
			date,
			time,
			description: description,
			image_src_vercelBlob: imageSrcVercelBlob,
			image_src_mega: imageSrcMega,
			image_src_cloudinary: imageSrcCld,
			// image_src_local: imageSrcLocal,
		});
	} catch (error) {
		client.close();
		return NextResponse.json(
			{
				error: notification.trl_generalError,
			},
			{ status: 305 }
		);
	}

	client.close();
	return NextResponse.json(
		{ message: notification.trl_success },
		{ status: 200 }
	);
};
