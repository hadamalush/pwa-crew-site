import { infoModelFn } from "@/lib/models/info";
import { connectDb } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET(request) {
  let info;
  try {
    const modelUser = await infoModelFn({ db: connectDb("AdminB"), collection: "Info" });

    info = await modelUser.find({ mode: "infobox" });

    if (!info || info.length < 1)
      return NextResponse.json({ error: "Something went wrong" }, { status: 503 });
  } catch (err) {
    console.log(err);
  }
  const { title, id, textHTML } = info[0];

  const response = NextResponse.json({ title, id, textHTML }, { status: 200 });

  return response;
}
