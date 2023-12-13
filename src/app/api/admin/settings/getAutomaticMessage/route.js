import { feedbackModelFn } from "@/lib/models/feedback";
import { connectDb } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET(request) {
  let info;

  try {
    const modelUser = await feedbackModelFn({ db: connectDb("AdminB"), collection: "Feedback" });

    info = await modelUser.find({ mode: "feedback" });

    if (!info || info.length < 1)
      return NextResponse.json({ error: "Something went wrong" }, { status: 503 });
  } catch (err) {
    console.log(err);
  }
  const { email, textHTML } = info[0];

  const response = NextResponse.json({ email, textHTML }, { status: 200 });

  return response;
}
