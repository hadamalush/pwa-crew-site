import cors from "@/lib/admin/core";
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/mongoose";
import { infoModelFn } from "@/lib/models/info";
import { revalidatePath } from "next/cache";
import { emailSchema } from "@/components/Schemas/FormSchem";
import { feedbackModelFn } from "@/lib/models/feedback";

export async function POST(req) {
  const { email, text } = await req.json();
  let modelFeedback;

  try {
    await emailSchema.validate({ email: email });
  } catch (err) {
    // console.log(err);
    return cors(
      req,
      NextResponse.json("Incorrect email", {
        status: 422,
        headers: { "Content-Type": "application/json" },
      })
    );
  }

  try {
    modelFeedback = await feedbackModelFn({ db: connectDb("AdminB"), collection: "Feedback" });
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
  let feedback;

  try {
    feedback = await modelFeedback.findOneAndUpdate(
      { mode: "feedback" },
      {
        mode: "feedback",
        textHTML: text,
        email,
      },
      { new: true, overwrite: true }
    );

    if (!feedback) {
      feedback = await new modelFeedback({ mode: "feedback", textHTML: text, email });
    }

    await feedback.save();
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
    NextResponse.json("New feedback message set", {
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
