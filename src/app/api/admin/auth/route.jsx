import jwt from "jsonwebtoken";
import cors from "@/lib/admin/core";
import { cryptPassword, verifyPassword } from "@/lib/crypt";
import { connectDbAdmin } from "@/lib/mongoose";
import ms from "ms";

import Auth from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email.trim() || !password.trim()) return;

  await connectDbAdmin();

  const foundUser = await Auth.findOne({ email: email });

  if (!foundUser) {
    return cors(req, NextResponse.json({ message: "User not found" }, { status: 422 }));
  }

  const isValidPass = await verifyPassword(password, foundUser?.password);

  if (!isValidPass) {
    return cors(req, NextResponse.json({ message: "Invalid user password" }, { status: 401 }));
  }

  const payload = { email: foundUser.email };
  const expiresIn = "15s";
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: Number(ms(expiresIn) / 1000),
  });

  console.log(token);

  return cors(
    req,
    new Response(token, {
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
