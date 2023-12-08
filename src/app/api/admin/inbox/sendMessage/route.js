import cors from "@/lib/admin/core";
import { google } from "googleapis";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import BrevoTransport from "nodemailer-brevo-transport";
import * as yup from "yup";

const emailSchema = yup.string().email().required();
const subjectSchema = yup.string().min(4);

export const POST = async (req) => {
  const data = await req.json();
  const { emails, text, subject } = data;

  for (let email of emails) {
    try {
      await emailSchema.validate(email);
    } catch (err) {
      return cors(
        req,
        NextResponse.json("Incorrect email address.", {
          status: 422,
          headers: { "Content-Type": "application/json" },
        })
      );
    }
  }

  try {
    await subjectSchema.validate(subject);
  } catch (err) {
    return cors(
      req,
      NextResponse.json("Incorrect subject.", {
        status: 422,
        headers: { "Content-Type": "application/json" },
      })
    );
  }

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_ID_CLIENT_GMAIL,
    process.env.GOOGLE_SECRET_CLIENT_GMAIL,
    process.env.GOOGLE_CALLBACK_URI_GMAIL
  );

  oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_TOKEN_GMAIL,
  });

  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  const to = emails.join(", ");

  const raw = Buffer.from(
    "From: " +
      process.env.OWN_EMAIL +
      "\r\n" +
      "To: " +
      to +
      "\r\n" +
      "Subject: " +
      subject +
      "\r\n" +
      "Content-Type: text/html; charset=UTF-8\r\n" +
      "Content-Transfer-Encoding: base64\r\n\r\n" +
      "<text><body>" +
      text +
      "</body></html>"
  )
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  try {
    const res = await gmail.users.messages.send({
      userId: "me",
      resource: {
        // data: raw
        raw: raw,
      },
    });

    console.log(res);
  } catch (err) {
    return cors(
      req,
      NextResponse.json("An error occurred while sending a message", {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );
  }

  return cors(
    req,
    NextResponse.json("Message sent", {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  );
};

export async function OPTIONS(request) {
  return cors(
    request,
    new Response(null, {
      status: 204,
    })
  );
}
