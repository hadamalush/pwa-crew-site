import cors from "@/lib/admin/core";
import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req) {
  const msgIds = await req.json();

  if (
    msgIds.length < 1 ||
    !Array.isArray(msgIds) ||
    !msgIds.every((item) => typeof item === "string")
  ) {
    return cors(
      req,
      NextResponse.json(
        { message: `Data is incorrect` },
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      )
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

  try {
    for (let messageId of msgIds) {
      await gmail.users.messages.modify({
        userId: "me",
        id: messageId,
        resource: {
          removeLabelIds: ["UNREAD"],
        },
      });
    }
  } catch (err) {
    return cors(
      req,
      NextResponse.json(
        { error: "Failed to mark as read." },
        {
          status: 504,
          headers: { "Content-Type": "application/json" },
        }
      )
    );
  }

  return cors(
    req,
    NextResponse.json(
      { message: `Marked as read` },
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
