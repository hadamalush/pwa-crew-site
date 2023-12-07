import cors from "@/lib/admin/core";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import BrevoTransport from "nodemailer-brevo-transport";

export const POST = async (req) => {
  const data = await req.json();
  const { emails, text } = data;

  console.log(emails, text);

  const transporter = nodemailer.createTransport(
    new BrevoTransport({
      apiKey: process.env.BREVO_API,
    })
  );

  const messageToCompany = {
    from: "pwacrewcompany@gmail.com",
    to: "poncyman@gmail.com",
    subject: "siemanko",
    text: text,
  };

  const result = await new Promise(transporter.sendMail(messageToCompany));

  console.log(result);

  return cors(
    req,
    NextResponse.json("czesc", {
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
