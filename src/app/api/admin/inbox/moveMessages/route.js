import cors from "@/lib/admin/core";
import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req) {
  const { mode, messages } = await req.json();
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
    for (let messageId of messages) {
      await gmail.users.messages.modify({
        userId: "me",
        id: messageId,
        resource: {
          addLabelIds: [mode.toUpperCase()],
          ...(mode === "inbox" && { removeLabelIds: ["TRASH", "SPAM"] }),
          ...(mode === "trash" && { removeLabelIds: ["SPAM"] }),
          ...(mode === "spam" && { removeLabelIds: ["TRASH"] }),
        },
      });
    }
  } catch (err) {
    return cors(
      req,
      NextResponse.json(
        { error: "Failed to move messages." },
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
      { message: `Messages moved to ${mode}` },
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
