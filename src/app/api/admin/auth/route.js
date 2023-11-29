import jwt from "jsonwebtoken";
import cors from "@/lib/admin/core";
import { verifyPassword } from "@/lib/crypt";
import { connectDbAdmin } from "@/lib/mongoose";
import ms from "ms";
import Auth from "@/lib/models/user";
import Token from "@/lib/models/token";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();
  console.log("run");

  if (!email.trim() || !password.trim()) return;

  try {
    await connectDbAdmin();
  } catch (err) {
    return cors(req, NextResponse.json({ message: "Something went wrong" }, { status: 500 }));
  }

  const foundUser = await Auth.findOne({ email: email });

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

  const newToken = new Token({ token: refreshToken });

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
