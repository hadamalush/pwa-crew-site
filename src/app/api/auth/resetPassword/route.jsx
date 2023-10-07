import { NextResponse } from "next/server";
import { generationIdLink, sendActivationLink } from "@/lib/message/message";
import { connectDbMongo, insertDocumentWithTTL } from "@/lib/mongodb";
import { headers } from "next/headers";

export const POST = async request => {
	const { email, status, confirmPassword, password, code } =
		await request.json();
	const ip = headers().get("x-forwarded-for");
	const userAgent = headers().get("user-agent");
	let clientActivationLinks, generatedIdLink, resultOfCreatedActivationLink;

	//sending activation link if false status
	if (!status && email) {
		const message = {
			subject: "Link resetujący hasło na stronie PwaCrew.",
			text: "Otrzymaliśmy zgłoszenie odnośnie zresetowania hasła. Jeżeli to nie byłeś Ty, zignoruj tą wiadomość. \n Link ważny 24h. Poniżej znajduje się link.",
		};
		const linkPrefix = "forgot-password";

		try {
			clientActivationLinks = await connectDbMongo("ActivationLinks");
			generatedIdLink = await generationIdLink(ip, userAgent);
		} catch (error) {
			return NextResponse.json(
				{
					error:
						"Niestety nie udało się wysłać linku, spróbuj ponownie później.",
				},
				{ status: 503 }
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
							"Niestety nie udało się wysłać linku, spróbuj ponownie później. Status: 503",
					},
					{ status: 503 }
				);
			}
		}
		return NextResponse.json(
			{ message: "Wysłaliśmy do Ciebie link resetujący hasło." },
			{ status: 200 }
		);
	}
};
