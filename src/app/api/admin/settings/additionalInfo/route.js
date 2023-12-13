import cors from "@/lib/admin/core";
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/mongoose";
import { infoModelFn } from "@/lib/models/info";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  const { text, title } = await req.json();
  let modelInfo;

  if (!title || title.length < 4) {
    return cors(
      req,
      NextResponse.json("Incorrect data", {
        status: 422,
        headers: { "Content-Type": "application/json" },
      })
    );
  }

  try {
    modelInfo = await infoModelFn({ db: connectDb("AdminB"), collection: "Info" });

    console.log(modelInfo);
  } catch (err) {
    console.log(err);
    return cors(
      req,
      NextResponse.json("Something went wrong", {
        status: 503,
        headers: { "Content-Type": "application/json" },
      })
    );
  }
  let info;

  try {
    info = await modelInfo.findOneAndUpdate(
      { mode: "infobox" },
      {
        mode: "infobox",
        textHTML: text,
        title: title,
        id: nanoid(),
      },
      { new: true, overwrite: true }
    );

    if (!info) {
      info = await new modelInfo({ mode: "infobox", textHTML: text, title: title, id: nanoid() });
    }

    await info.save();
  } catch (err) {
    console.log(err);
    return cors(
      req,
      NextResponse.json("Something went wrong", {
        status: 403,
        headers: { "Content-Type": "application/json" },
      })
    );
  }

  revalidatePath("/");

  return cors(
    req,
    NextResponse.json("Added a message on the home page", {
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
