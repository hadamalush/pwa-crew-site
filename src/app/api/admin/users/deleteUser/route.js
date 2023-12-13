import cors from "@/lib/admin/core";
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/mongoose";
import { userMainModelFn } from "@/lib/models/mainUser";

export async function POST(req) {
  const { id } = await req.json();

  try {
    const modelUser = await userMainModelFn({ db: connectDb("Auth"), collection: "Users" });

    await modelUser.findOneAndDelete({ _id: id });
  } catch (err) {
    return cors(
      req,
      NextResponse.json("Something went wrong", {
        status: 403,
        headers: { "Content-Type": "application/json" },
      })
    );
  }

  return cors(
    req,
    NextResponse.json("User deleted", {
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
