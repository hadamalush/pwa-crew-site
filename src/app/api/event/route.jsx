import { getDictionaryNotifi } from "@/app/dictionaries/notifications/dictionaries";
import { generalConfig } from "@/config/gerenalConfig";
import { connectDatabaseEvents, findDocument } from "@/lib/mongodb";
import { oneConvertFromBuffersToBase64, oneDownloadBuffersMegaNz } from "@/lib/storage/storage";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const url = new URL(request.url);
  const eventId = url.searchParams.get("eventId");
  const lang = url.searchParams.get("lang");

  const dict = await getDictionaryNotifi(lang);

  const notification = {
    trl_err_404: dict.notifications.err_404,
    trl_err_eventTitle: dict.notifications.eventPage.err_404_title,
    trl_generalErr: dict.notifications.eventPage.generalError,
  };

  if (eventId.length !== 24) {
    return NextResponse.json({ error: notification.trl_err_404 }, { status: 500 });
  }

  let modifiedEventId;

  try {
    modifiedEventId = new ObjectId(eventId);
  } catch (error) {
    return NextResponse.json({ error: notification.trl_err_404 }, { status: 500 });
  }

  let client, result;
  try {
    client = await connectDatabaseEvents();
  } catch (error) {
    console.log(error);
  }

  try {
    result = await findDocument(client, "AllEvents", { _id: modifiedEventId });

    if (!result)
      return NextResponse.json(
        {
          error: notification.trl_err_eventTitle,
        },
        { status: 404 }
      );
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 404 });
  }

  let dataStorage;

  try {
    const resFeedback = await fetch(
      "https://pwa-crew-site-demo.vercel.app/api/admin/settings/getStorage",
      {
        next: { revalidate: 3600 },
      }
    );

    if (resFeedback.ok) {
      dataStorage = await resFeedback.json();
    } else {
      dataStorage = null;
    }
  } catch (err) {
    dataStorage = null;
  }

  const downloadDynamicStorage = dataStorage?.downloadStorages;

  const storage = downloadDynamicStorage
    ? downloadDynamicStorage
    : generalConfig.downloadImageStorageEvent;

  let uploadStorage = storage[0];

  if (!result[`image_src_${storage[0]}`] && result[`image_src_${storage[1]}`]) {
    uploadStorage = storage[1];
  } else if (!result[`image_src_${storage[0]}`] && !result[`image_src_${storage[1]}`]) {
    uploadStorage = storage[2];
  }

  try {
    if (uploadStorage === "mega") {
      const buffer = await oneDownloadBuffersMegaNz(result.image_src_mega);
      result.image_src_mega = oneConvertFromBuffersToBase64(buffer);
    }
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 404 });
  }

  const targetSrc = result[`image_src_${uploadStorage}`];

  return NextResponse.json({ message: { targetSrc, uploadStorage, ...result } }, { status: 200 });
}
