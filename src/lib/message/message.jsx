import { nanoid } from "nanoid";
import { cryptPassword } from "../crypt";
import { generalConfig } from "@/config/gerenalConfig";
import nodemailer from "nodemailer";
import BrevoTransport from "nodemailer-brevo-transport";

export const generationIdLink = async (ip, userAgent) => {
	const currentDate = new Date();

	const createdIdLink = await cryptPassword(
		ip + userAgent + currentDate + nanoid()
	);

	const replacedLink = createdIdLink.replaceAll("$", "0").replaceAll("/", "-");

	return replacedLink;
};

/**
 * @description This function will send message to user with activation link. After text message is link with activation and emailSignature. To set email signature you can change in generalConfig. Don't forgot inform user how long activation link is available.
 * @param {String} email Pass the email address to which you want send link. (String)
 * @param {String} generatedIdLink Pass id link. You can use generationLink function to generate id. (String)
 * @param {String} subject Pass subject of message. (String)
 * @param {String} message Pass message. (String)
 */

export const sendActivationLink = async (
	email,
	generatedIdLink,
	subject,
	message
) => {
	const domain = generalConfig.domain;
	const ourEmail = generalConfig.receiveEmailAddresContact;
	const emailSignature = generalConfig.emailSignature;

	const transporter = nodemailer.createTransport(
		new BrevoTransport({
			apiKey: process.env.BREVO_API,
		})
	);

	const optionMessage = {
		from: ourEmail,
		to: email,
		subject: subject,
		text:
			" " +
			message +
			"  \n <a href='" +
			domain +
			"/activation" +
			"/" +
			generatedIdLink +
			"'> Kliknij w ten link.</a> " +
			emailSignature +
			"",
	};

	const result = await transporter.sendMail(optionMessage);

	return result;
};
