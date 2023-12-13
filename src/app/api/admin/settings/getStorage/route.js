import { feedbackModelFn } from "@/lib/models/feedback";
import { storageModelFn } from "@/lib/models/storage";
import { connectDb } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET(request) {
  let storageData;

  try {
    const modelStorage = await storageModelFn({ db: connectDb("AdminB"), collection: "Storage" });

    storageData = await modelStorage.find({ mode: "storage" });

    if (!storageData || storageData.length < 1)
      return NextResponse.json({ error: "Something went wrong" }, { status: 503 });
  } catch (err) {
    console.log(err);
  }

  const { uploadStorage, downloadStorages } = storageData[0];

  const response = NextResponse.json({ uploadStorage, downloadStorages }, { status: 200 });

  return response;
}
