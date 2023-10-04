import { NextResponse } from "next/server";
import { connectDatabaseEvents } from "@/lib/mongodb";
import { insertDocument } from "@/lib/mongodb";
import { getServerSession } from "next-auth";

export const POST = async request => {
	const session = await getServerSession();

	if (!session) {
		return NextResponse.json(
			{ error: "Tylko zalogowani mogą dodawać wydarzenia!" },
			{ status: 401 }
		);
	}

	const email = session.user.email;
	const data = await request.json();
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
		(!imageSrcVercelBlob && !imageSrcMega) ||
		inputDate < currentDate
	) {
		return NextResponse.json(
			{ error: "Wprowadzone dane są nie poprawne." },
			{ status: 422 }
		);
	}

	let client;

	try {
		client = await connectDatabaseEvents();
	} catch (error) {
		return NextResponse.json(
			{ error: "Nie udalo sie polaczyc z baza danych!" },
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
			// image_src_local: imageSrcLocal,
		});
	} catch (error) {
		client.close();
		return NextResponse.json(
			{
				error: "Nie udało się utworzyć wydarzenia.",
			},
			{ status: 305 }
		);
	}

	client.close();
	return NextResponse.json({ message: "Dodano wydarzenie!" }, { status: 200 });
};
