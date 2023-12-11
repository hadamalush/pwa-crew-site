import cors from "@/lib/admin/core";
import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req) {
  const data = await req.json();
  const { mode, messageId } = data;

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_ID_CLIENT_GMAIL,
    process.env.GOOGLE_SECRET_CLIENT_GMAIL,
    process.env.GOOGLE_CALLBACK_URI_GMAIL
  );

  oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_TOKEN_GMAIL,
  });

  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  try {
    await gmail.users.messages.modify({
      userId: "me",
      id: messageId,
      resource: {
        ...(mode === "add" ? { addLabelIds: ["STARRED"] } : { removeLabelIds: ["STARRED"] }),
      },
    });
  } catch (err) {
    return cors(
      req,
      NextResponse.json(
        { error: "Error occurred can't mark as highlighted" },
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      )
    );
  }

  const mess = mode === "add" ? "Marked as featured" : "Marked as unfeatured";

  return cors(
    req,
    NextResponse.json(
      { message: mess },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )
  );
}

export async function OPTIONS(request) {
  return cors(
    request,
    new Response(null, {
      status: 204,
    })
  );
}
