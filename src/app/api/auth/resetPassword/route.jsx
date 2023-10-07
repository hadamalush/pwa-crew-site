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

export const POST = async request => {
	const { email, status, confirmPassword, password, code } =
		await request.json();
	const ip = headers().get("x-forwarded-for");
	const userAgent = headers().get("user-agent");
	let clientActivationLinks, generatedIdLink, resultOfCreatedActivationLink;

	const result = await insertLimitByIp("ForgotPasswordPage", ip, 5, 86400);

	if (result.limit) {
		return NextResponse.json(
			{
				error: "Zbyt wiele prób. Spróbuj ponownie za 24h.",
			},
			{ status: 429 }
		);
	}

	try {
		clientActivationLinks = await connectDbMongo("ActivationLinks");
	} catch (error) {
		return NextResponse.json(
			{
				error: "Niestety nie udało się wysłać linku, spróbuj ponownie później.",
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
					error:
						"Niestety nie udało się wysłać linku, spróbuj ponownie później.",
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
					error:
						"Niestety nie udało się wysłać linku, spróbuj ponownie później. Status: 400",
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
						error:
							"Niestety nie udało się wysłać linku, spróbuj ponownie później.",
					},
					{ status: 503 }
				);
			}
		}
		return NextResponse.json(
			{ message: "Wysłaliśmy do Ciebie link resetujący hasło." },
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
					error: "Nieprawidłowe dane.",
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
						error: "Nieprawidłowe dane.",
					},
					{ status: 422 }
				);
			}
		} catch (error) {
			return NextResponse.json(
				{
					error: "Niepowodzenie, spróbuj ponownie później.",
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
						error: "Niepowodzenie, spróbuj ponownie później.",
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
						error: "Niepowodzenie, spróbuj ponownie później.",
					},
					{ status: 503 }
				);
			}
		}
		return NextResponse.json(
			{
				message: "Hasło zostało zmienione.",
			},
			{ status: 200 }
		);
	}
};
