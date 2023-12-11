import jwt from "jsonwebtoken";
import cors from "@/lib/admin/core";
import { NextResponse } from "next/server";
import ms from "ms";
import { tokenSchemaFn } from "@/lib/models/token";
import { connectDb } from "@/lib/mongoose";

export async function POST(req) {
  const { token } = await req.json();
  let accessToken, modelToken, foundToken;

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
  let payload;

  jwt.verify(token, process.env.JWT_REFRESH, (err, data) => {
    if (err) {
      return cors(
        req,
        NextResponse.json(`You don't have access`, {
          status: 403,
          headers: { "Content-Type": "application/json" },
        })
      );
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
