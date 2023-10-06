import { NextResponse, NextRequest } from "next/server";
import { generalConfig } from "@/config/gerenalConfig";

import nodemailer from "nodemailer";
import BrevoTransport from "nodemailer-brevo-transport";

export const POST = async request => {
	const { email, subject, message } = await request.json();

	const ourEmail = generalConfig.receiveEmailAddresContact;
	const defaultFeedback = generalConfig.defaultReplyMessage;

	// walidacja;

	console.log(email, subject, message, ourEmail, defaultFeedback);

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

		console.log(result);
	} catch (error) {
		console.log(error);
	}

	return NextResponse.json(
		{ message: "Super, wysłano wiadomość pomyślnie" },
		{ status: 200 }
	);
};
