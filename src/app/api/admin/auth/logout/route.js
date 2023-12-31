import cors from "@/lib/admin/core";
import { NextResponse } from "next/server";
import { tokenSchemaFn } from "@/lib/models/token";
import { connectDb } from "@/lib/mongoose";

export async function DELETE(req) {
  const { token } = await req.json();
  let modelToken, foundToken;

  try {
    modelToken = await tokenSchemaFn(connectDb("AdminB"));
    foundToken = await modelToken.findOne({ token: token });
  } catch (err) {
    return cors(
      req,
      NextResponse.json("Database connection failure", {
        status: 502,
        headers: { "Content-Type": "application/json" },
      })
    );
  }

  if (!foundToken) {
    return cors(
      req,
      NextResponse.json(`You don't have access`, {
        status: 403,
        headers: { "Content-Type": "application/json" },
      })
    );
  }

  const result = await modelToken.deleteOne({ token: token });

  if (!result.acknowledged) {
    return cors(
      req,
      NextResponse.json("Something went wrong", {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    );
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
