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

export async function POST(request) {
	const data = await request.json();
	const ip = headers().get("x-forwarded-for");
	const userAgent = headers().get("user-agent");

	const { email, password, confirmPassword, terms } = data;

	// poprawic walidacje
	if (
		!email ||
		!email.includes("@") ||
		!password ||
		password.trim().length < 7 ||
		password !== confirmPassword ||
		!terms
	) {
		return NextResponse.json({ message: "Spróbuj ponownie!" }, { status: 422 });
	}

	let client;

	try {
		client = await connectDatabase();
	} catch (error) {
		return NextResponse.json(
			{ message: "Nie udalo sie polaczyc z baza danych!" },
			{ status: 500 }
		);
	}

	let existingUser;

	try {
		existingUser = await findDocument(client, "Users", { email: email });
	} catch (error) {
		client.close();
		return NextResponse.json(
			{ message: "Skontakuj sie z administratorem, cos poszlo nie tak!" },
			{ status: 422 }
		);
	}

	if (existingUser) {
		client.close();
		return NextResponse.json(
			{
				message: "Użytkownik z takim adresem email już istnieje!",
			},
			{ status: 410 }
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
				message: "Nie udało się dodać użytkownika",
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
				message.text
			);
		}
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{
				error:
					"Zarejestrowany pomyślnie ,jednak nie udało się utworzyć linku aktywacyjnego. Wyślemy go do Ciebie ,jak najszybciej!",
			},
			{ status: 400 }
		);
	}

	client.close();
	clientActivationLinks.close();
	return NextResponse.json({
		message: "Zarejestrowano pomyślnie ,witamy na pokładzie!",
	});
}
