import { cryptPassword } from "@/lib/crypt";
import { connectDatabase, findDocument, insertDocument } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
	const data = await request.json();

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
		return NextResponse.json({ message: "Niepowodzenie!" }, { status: 422 });
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
				message:
					"Użytkownik z takim adresem email już istnieje!",
			},
			{ status: 410 }
		);
	}

	const hashedPassword = await cryptPassword(password);

	try {
		await insertDocument(client, "Users", {
			email: email,
			password: hashedPassword,
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

	client.close();
	return NextResponse.json({
		message: "Zarejestrowano pomyślnie ,witamy na pokładzie!",
	});
}
