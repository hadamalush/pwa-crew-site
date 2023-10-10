import { NextResponse } from "next/server";
import { generationIdLink, sendActivationLink } from "@/lib/message/message";
import {
	connectDbMongo,
	deleteDocument,
	findDocument,
	insertDocumentWithTTL,
	updateDocument,
} from "@/lib/mongodb";
import { headers } from "next/headers";
import { cryptPassword } from "@/lib/crypt";
import { insertLimitByIp } from "@/lib/protection/protection";
import { getDictionaryNotifi } from "@/app/dictionaries/notifications/dictionaries";

export const POST = async request => {
	const { email, status, confirmPassword, password, code, lang } =
		await request.json();
	const ip = headers().get("x-forwarded-for");
	const userAgent = headers().get("user-agent");
	const dict = await getDictionaryNotifi(lang);

	const notification = {
		err_422: dict.notifications.err_422,
		err_429: dict.notifications.forgotPass.err_429,
		generalError: dict.notifications.generalError,
		successChanged: dict.notifications.forgotPass.successChanged,
		successSent: dict.notifications.forgotPass.successSent,
	};

	let clientActivationLinks, generatedIdLink, resultOfCreatedActivationLink;

	const result = await insertLimitByIp("ForgotPasswordPage", ip, 5, 86400);

	if (result.limit) {
		return NextResponse.json(
			{
				error: notification.err_429,
			},
			{ status: 429 }
		);
	}

	try {
		clientActivationLinks = await connectDbMongo("ActivationLinks");
	} catch (error) {
		return NextResponse.json(
			{
				error: notification.generalError,
			},
			{ status: 503 }
		);
	}

	//sending activation link
	if (!status && email) {
		const message = {
			subject: "Link resetujący hasło na stronie PwaCrew.",
			text: "Otrzymaliśmy zgłoszenie odnośnie zresetowania hasła. Jeżeli to nie byłeś Ty, zignoruj tą wiadomość. \n Link ważny 24h. Poniżej znajduje się link.",
		};
		const linkPrefix = "forgot-password";

		try {
			generatedIdLink = await generationIdLink(ip, userAgent);
		} catch (error) {
			return NextResponse.json(
				{
					error: notification.generalError,
				},
				{ status: 400 }
			);
		}

		try {
			resultOfCreatedActivationLink = await insertDocumentWithTTL(
				clientActivationLinks,
				"ForgotPassword",
				{
					email: email,
					generatedIdLink: generatedIdLink,
					createdAt: new Date(),
				},
				86400
			);
		} catch (error) {
			return NextResponse.json(
				{
					error: notification.generalError,
				},
				{ status: 400 }
			);
		}

		if (resultOfCreatedActivationLink.acknowledged);
		{
			try {
				await sendActivationLink(
					email,
					generatedIdLink,
					message.subject,
					message.text,
					linkPrefix
				);
			} catch (error) {
				return NextResponse.json(
					{
						error: notification.generalError,
					},
					{ status: 503 }
				);
			}
		}
		return NextResponse.json(
			{ message: notification.successSent },
			{ status: 200 }
		);
	} else {
		//reset password with code
		let foundDocument;

		if (
			!password ||
			!confirmPassword ||
			password !== confirmPassword ||
			!code
		) {
			return NextResponse.json(
				{
					error: notification.err_422,
				},
				{ status: 422 }
			);
		}

		const hashedPassword = await cryptPassword(password);

		try {
			foundDocument = await findDocument(
				clientActivationLinks,
				"ForgotPassword",
				{
					generatedIdLink: code,
				}
			);

			if (!foundDocument) {
				return NextResponse.json(
					{
						error: notification.err_422,
					},
					{ status: 422 }
				);
			}
		} catch (error) {
			return NextResponse.json(
				{
					error: notification.generalError,
				},
				{ status: 503 }
			);
		}

		if (foundDocument) {
			const { email } = foundDocument;

			let clientAuth;

			try {
				clientAuth = await connectDbMongo("Auth");
			} catch (error) {
				return NextResponse.json(
					{
						error: notification.generalError,
					},
					{ status: 503 }
				);
			}
			try {
				const updatedDocument = await updateDocument(
					clientAuth,
					"Users",
					{ email: email },
					{ $set: { password: hashedPassword } }
				);

				if (updatedDocument.acknowledged) {
					await deleteDocument(clientActivationLinks, "ForgotPassword", {
						email: email,
					});
				}
			} catch (error) {
				return NextResponse.json(
					{
						error: notification.generalError,
					},
					{ status: 503 }
				);
			}
		}
		return NextResponse.json(
			{
				message: notification.successChanged,
			},
			{ status: 200 }
		);
	}
};
