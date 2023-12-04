import jwt from "jsonwebtoken";
import cors from "@/lib/admin/core";
import { verifyPassword } from "@/lib/crypt";
import { connectDb } from "@/lib/mongoose";
import ms from "ms";
import { userModelFn } from "@/lib/models/user";
import { tokenSchemaFn } from "@/lib/models/token";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email.trim() || !password.trim()) return;
  let modelUser, modelToken;

  try {
    const client = await connectDb("AdminB");
    modelUser = await userModelFn({ db: client, collection: "Auth" });

    modelToken = await tokenSchemaFn(client);
  } catch (err) {
    NextResponse.json({ message: "Database connection failure" }, { status: 502 });
  }

  const foundUser = await modelUser.findOne({ email: email });

  if (!foundUser) {
    return cors(req, NextResponse.json({ message: "User not found" }, { status: 422 }));
  }

  const isValidPass = await verifyPassword(password, foundUser?.password);

  if (!isValidPass) {
    return cors(req, NextResponse.json({ message: "Invalid user password" }, { status: 401 }));
  }

  const payload = {
    email: foundUser.email,
    avatar: foundUser.avatar,
    username: foundUser.name,
  };
  const expiresIn = "15m";
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: Number(ms(expiresIn) / 1000),
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH);

  const newToken = new modelToken({ token: refreshToken });

  await newToken.save();

  return cors(
    req,
    NextResponse.json(
      {
        accessToken: token,
        refreshToken: refreshToken,
        username: foundUser.name,
        email: foundUser.email,
        avatar: foundUser.avatar,
      },
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
