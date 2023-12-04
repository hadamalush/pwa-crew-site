import cors from "@/lib/admin/core";
import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET(req) {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_ID_CLIENT_GMAIL,
    process.env.GOOGLE_SECRET_CLIENT_GMAIL,
    process.env.GOOGLE_CALLBACK_URI_GMAIL
  );
  let allMessages = [];

  try {
    oAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_TOKEN_GMAIL,
    });

    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    const labels = ["INBOX", "SPAM", "TRASH"];

    for (let label of labels) {
      const res = await gmail.users.messages.list({ userId: "me", labelIds: [label] });

      for (let message of res.data.messages) {
        let newMsg = {};

        const messageData = await gmail.users.messages.get({ userId: "me", id: message.id });
        newMsg.id = message.id;
        newMsg.description = messageData.data.snippet;

        // Set owner
        newMsg.owner = messageData.data.payload.headers
          .find((header) => header.name === "From")
          .value.match(/<(.*)>/)[1];

        // Set subject
        newMsg.subject = messageData.data.payload.headers.find(
          (header) => header.name === "Subject"
        ).value;

        if (messageData.data.labelIds.includes("STARRED")) {
          newMsg.isFeatured = true;
        } else {
          newMsg.isFeatured = false;
        }
        if (messageData.data.labelIds.includes("UNREAD")) {
          newMsg.unRead = true;
        } else {
          newMsg.unRead = false;
        }
        if (messageData.data.labelIds.includes("SPAM")) {
          newMsg.isInSpam = true;
        } else {
          newMsg.isInSpam = false;
        }
        if (messageData.data.labelIds.includes("TRASH")) {
          newMsg.isInTrash = true;
        } else {
          newMsg.isInTrash = false;
        }

        allMessages.push(newMsg);
      }
    }
  } catch (err) {
    NextResponse.json({ message: "Something went wrong" }, { status: 502 });
  }

  return cors(
    req,
    NextResponse.json(allMessages, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
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
