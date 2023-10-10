import { cryptPassword } from "@/lib/crypt";
import {
	connectDatabase,
	connectDbMongo,
	findDocument,
	insertDocument,
	insertDocumentWithTTL,
} from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { generationIdLink, sendActivationLink } from "@/lib/message/message";
import { getDictionaryNotifi } from "@/app/dictionaries/notifications/dictionaries";

export async function POST(request) {
	const data = await request.json();
	const ip = headers().get("x-forwarded-for");
	const userAgent = headers().get("user-agent");

	const { email, password, confirmPassword, terms, lang } = data;
	const dict = await getDictionaryNotifi(lang);

	const notification = {
		trl_err_409: dict.notifications.registration.err_409,
		trl_err_422: dict.notifications.err_422,
		trl_err_500: dict.notifications.err_500,
		trl_errSendLink: dict.notifications.registration.err_sendLink,
		trl_generalError: dict.notifications.registration.generalError,
		trl_success: dict.notifications.registration.success,
	};

	if (
		!email ||
		!email.includes("@") ||
		!password ||
		password.trim().length < 7 ||
		password !== confirmPassword ||
		!terms
	) {
		return NextResponse.json(
			{ message: notification.trl_err_409 },
			{ status: 422 }
		);
	}

	let client;

	try {
		client = await connectDatabase();
	} catch (error) {
		return NextResponse.json(
			{ message: notification.trl_err_500 },
			{ status: 500 }
		);
	}

	let existingUser;

	try {
		existingUser = await findDocument(client, "Users", { email: email });
	} catch (error) {
		client.close();
		return NextResponse.json(
			{ message: notification.trl_generalError },
			{ status: 422 }
		);
	}

	if (existingUser) {
		client.close();
		return NextResponse.json(
			{
				message: notification.trl_err_409,
			},
			{ status: 409 }
		);
	}

	const hashedPassword = await cryptPassword(password);

	try {
		await insertDocument(client, "Users", {
			email: email,
			password: hashedPassword,
			isActivated: false,
		});
	} catch (error) {
		client.close();
		return NextResponse.json(
			{
				message: notification.trl_generalError,
			},
			{ status: 305 }
		);
	}

	const message = {
		subject: "Link aktywacyjny na stronie PwaCrew.",
		text: "Dziękujemy za zarejestrowanie się, poniżej znajduję się link aktywacyjny.",
	};
	let clientActivationLinks;

	try {
		clientActivationLinks = await connectDbMongo("ActivationLinks");
		const generatedIdLink = await generationIdLink(ip, userAgent);
		const linkPrefix = "activation";

		const resultOfCreatedActivationLink = await insertDocumentWithTTL(
			clientActivationLinks,
			"Registration",
			{
				email: email,
				generatedIdLink: generatedIdLink,
				createdAt: new Date(),
			},
			86400
		);

		if (resultOfCreatedActivationLink.acknowledged);
		{
			await sendActivationLink(
				email,
				generatedIdLink,
				message.subject,
				message.text,
				linkPrefix
			);
		}
	} catch (error) {
		return NextResponse.json(
			{
				error: notification.trl_errSendLink,
			},
			{ status: 400 }
		);
	}

	client.close();
	clientActivationLinks.close();
	return NextResponse.json({
		message: notification.trl_success,
	});
}
