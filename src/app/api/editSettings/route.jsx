import { NextResponse } from "next/server";
import {
	connectDbMongo,
	findDocument,
	updateAllDocuments,
	updateDocument,
} from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { getDictionaryNotifi } from "@/app/dictionaries/notifications/dictionaries";
import { authOptions } from "../auth/[...nextauth]/route";
import { cryptPassword } from "@/lib/crypt";

export const POST = async request => {
	const session = await getServerSession(authOptions);
	const currentEmail = session?.user?.email;
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

	const { email, password, imgLink } = data;

	if (!email && !password && !imgLink) {
		return NextResponse.json(
			{ error: notification.trl_err_422 },
			{ status: 422 }
		);
	}

	let client, user;
	const filters = {
		user: { email: currentEmail },
		events: { user_email: currentEmail },
	};

	try {
		client = await connectDbMongo("Auth");
	} catch (error) {
		return NextResponse.json(
			{ error: notification.trl_err_500 },
			{ status: 500 }
		);
	}

	try {
		user = await findDocument(client, "Users", filters.user);
	} catch (error) {
		console.log(error);
		client.close();
		return NextResponse.json(
			{ error: notification.trl_generalError + " - 404" },
			{ status: 401 }
		);
	}

	if (!user) {
		client.close();
		return NextResponse.json(
			{ error: notification.trl_err_401_unAuth },
			{ status: 401 }
		);
	}
	let hashedPassword;

	if (password) {
		hashedPassword = await cryptPassword(password);
	}

	const update = {
		$set: {
			...(email && { email: email }),
			...(password && { password: hashedPassword }),
			...(imgLink && { avatarImg: imgLink }),
		},
	};

	try {
		await updateDocument(client, "Users", filters.user, update);
	} catch (err) {
		client.close();
		return NextResponse.json(
			{
				error: notification.trl_generalError + " - 428",
			},
			{ status: 428 }
		);
	}

	let clientEvent, clientNotifi;
	if (email) {
		try {
			clientEvent = await connectDbMongo("Events");
		} catch (error) {
			return NextResponse.json(
				{ error: notification.trl_err_500 },
				{ status: 500 }
			);
		}

		try {
			await updateAllDocuments(clientEvent, "AllEvents", filters.events, {
				$set: { user_email: email },
			});
		} catch (err) {
			clientEvent.close();
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
			return NextResponse.json(
				{ error: notification.trl_err_500 },
				{ status: 500 }
			);
		}

		try {
			await updateDocument(clientNotifi, "Notifications", filters.user, {
				$set: {
					email: email,
				},
			});
		} catch (err) {
			clientNotifi.close();
			return NextResponse.json(
				{
					error: notification.trl_generalError + " - 428",
				},
				{ status: 428 }
			);
		}
	}

	clientEvent && clientEvent.close();
	clientNotifi && clientNotifi.close();
	client && client.close();
	return NextResponse.json(
		{ message: notification.trl_success },
		{ status: 200 }
	);
};
