import { NextResponse } from "next/server";
import { generalConfig } from "@/config/gerenalConfig";
import { headers } from "next/headers";

import nodemailer from "nodemailer";
import BrevoTransport from "nodemailer-brevo-transport";
import { insertLimitByIp } from "@/lib/protection/protection";
import { getDictionaryNotifi } from "@/app/dictionaries/notifications/dictionaries";

export const POST = async (request) => {
  const ip = headers().get("x-forwarded-for");
  const { email, subject, message, lang } = await request.json();
  const dict = await getDictionaryNotifi(lang);
  let dataFeedback;

  const notification = {
    trl_err_422: dict.notifications.err_422,
    trl_err_429: dict.notifications.err_429,
    trl_generalError: dict.notifications.generalError,
    trl_success: dict.notifications.sendMessage.success,
  };

  try {
    const resFeedback = await fetch(
      "http://localhost:3000/api/admin/settings/getAutomaticMessage",
      {
        next: { revalidate: 3600 },
      }
    );

    if (resFeedback.ok) {
      dataFeedback = await resFeedback.json();
    } else {
      console.log("TUAJ NULL");
      dataFeedback = null;
    }
  } catch (err) {
    console.log(err);
    dataFeedback = null;
  }

  const ourEmail = dataFeedback ? dataFeedback?.email : generalConfig.receiveEmailAddresContact;
  const defaultFeedback = dataFeedback ? dataFeedback?.textHTML : generalConfig.defaultReplyMessage;

  console.log(ourEmail, defaultFeedback);

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
    return NextResponse.json({ error: notification.trl_err_422 }, { status: 422 });
  }

  const result = await insertLimitByIp("ContactPage", ip, 5, 1800);

  if (result.limit) {
    return NextResponse.json(
      {
        error: notification.trl_err_429,
      },
      { status: 429 }
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
    return NextResponse.json({ error: notification.trl_generalError }, { status: 500 });
  }

  return NextResponse.json({ message: notification.trl_success }, { status: 200 });
};
