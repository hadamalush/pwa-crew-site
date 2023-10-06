import { NextResponse, NextRequest } from "next/server";
import { generalConfig } from "@/config/gerenalConfig";

import nodemailer from "nodemailer";
import BrevoTransport from "nodemailer-brevo-transport";

export const POST = async request => {
	const { email, subject, message } = await request.json();

	const ourEmail = generalConfig.receiveEmailAddresContact;
	const defaultFeedback = generalConfig.defaultReplyMessage;

	if (
		!email ||
		!subject ||
		subject.length < 10 ||
		subject > 30 ||
		!message ||
		message.length < 50 ||
		message > 800 ||
		!ourEmail ||
		!defaultFeedback
	) {
		return NextResponse.json(
			{ error: "Nie udało się wysłać wiadomości, spróbuj ponownie." },
			{ status: 500 }
		);
	}

	const transporter = nodemailer.createTransport(
		new BrevoTransport({
			apiKey: process.env.BREVO_API,
		})
	);

	const messageToCompany = {
		from: email,
		to: ourEmail,
		subject: subject,
		text: message,
	};

	const feedbackToUser = {
		from: ourEmail,
		to: email,
		subject: `Automatyczna odpowiedź na zgłoszenie [ ${subject} ]`,
		text: defaultFeedback,
	};

	const sendMailPromises = [
		transporter.sendMail(messageToCompany),
		transporter.sendMail(feedbackToUser),
	];

	try {
		const result = await Promise.all(sendMailPromises);
	} catch (error) {
		return NextResponse.json(
			{ error: "Nie udało się wysłać wiadomości, spróbuj ponownie." },
			{ status: 500 }
		);
	}

	return NextResponse.json(
		{ message: "Super, wysłano wiadomość pomyślnie" },
		{ status: 200 }
	);
};
