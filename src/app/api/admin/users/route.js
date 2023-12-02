import cors from "@/lib/admin/core";
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/mongoose";
import User from "@/lib/models/user";

export async function GET(req) {
  let users;

  try {
    await connectDb("Auth");
    users = await User.find({});

    console.log(users);
  } catch (err) {
    NextResponse.json("Something went wrong ", {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  return cors(
    req,
    NextResponse.json("users", {
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
