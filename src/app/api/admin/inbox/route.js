import cors from "@/lib/admin/core";
import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req) {
  const data = await req.json();

  const label = data.label;
  const pageToken = data.pageToken;

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_ID_CLIENT_GMAIL,
    process.env.GOOGLE_SECRET_CLIENT_GMAIL,
    process.env.GOOGLE_CALLBACK_URI_GMAIL
  );
  let allMessages = [];
  let messageData, res;
  let newPageToken;

  try {
    oAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_TOKEN_GMAIL,
    });

    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    res = await gmail.users.messages.list({
      userId: "me",
      labelIds: label,
      maxResults: 15,
      pageToken: pageToken || null,
    });

    for (let message of res.data.messages) {
      let newMsg = {};

      messageData = await gmail.users.messages.get({ userId: "me", id: message.id });
      newMsg.id = message.id;
      newMsg.description = messageData.data.snippet;
      newMsg.date = new Date(Number(messageData.data.internalDate)).toString();

      // Set email
      const email = messageData.data.payload.headers
        .find((header) => header.name === "From")
        .value.match(/<(.*)>/)[1];

      newMsg.owner = email;
      newMsg.email = email;

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

    if (res.data?.nextPageToken) {
      newPageToken = res.data.nextPageToken;
    }
  } catch (err) {
    NextResponse.json({ message: "Something went wrong" }, { status: 502 });
  }

  return cors(
    req,
    NextResponse.json(
      { allMessages, label, newPageToken },
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
