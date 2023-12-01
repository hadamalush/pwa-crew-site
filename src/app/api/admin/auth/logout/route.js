import cors from "@/lib/admin/core";
import { NextResponse } from "next/server";
import Token from "@/lib/models/token";
import { connectDb } from "@/lib/mongoose";

export async function DELETE(req) {
  const { token } = await req.json();

  await connectDb("AdminB");

  const foundToken = await Token.findOne({ token: token });

  if (!foundToken) {
    return cors(req, NextResponse.json({ message: "You don't have access" }, { status: 403 }));
  }

  const result = await Token.deleteOne({ token: token });

  if (!result.acknowledged) {
    return cors(req, NextResponse.json({ message: "Something went wrong" }, { status: 404 }));
  }

  return cors(
    req,
    NextResponse.json(
      { logout: true },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    ),
    { credentials: true }
  );
}

export async function OPTIONS(request) {
  return cors(
    request,
    new Response(null, {
      status: 204,
    }),
    { credentials: true }
  );
}
