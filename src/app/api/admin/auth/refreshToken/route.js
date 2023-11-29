import jwt from "jsonwebtoken";
import cors from "@/lib/admin/core";
import { NextResponse } from "next/server";
import Token from "@/lib/models/token";
import ms from "ms";
import { connectDbAdmin } from "@/lib/mongoose";

export async function POST(req) {
  const { token } = await req.json();
  let accessToken;

  await connectDbAdmin();

  const foundToken = await Token.findOne({ token: token });

  if (!foundToken) {
    return cors(req, NextResponse.json({ message: "You don't have access" }, { status: 403 }));
  }
  let payload;

  jwt.verify(token, process.env.JWT_REFRESH, (err, data) => {
    if (err) {
      return cors(req, NextResponse.json({ message: "You don't have access" }, { status: 403 }));
    }

    const { email, avatar, username } = data;

    payload = { email, avatar, username };
    const expiresIn = "15m";
    accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: Number(ms(expiresIn) / 1000),
    });
  });

  return cors(
    req,
    NextResponse.json(
      { accessToken: accessToken, ...payload },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )
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
