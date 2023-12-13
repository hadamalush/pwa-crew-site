import cors from "@/lib/admin/core";
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/mongoose";
import { newUserSchema } from "@/components/Schemas/FormSchem";
import { cryptPassword } from "@/lib/crypt";
import { userMainModelFn } from "@/lib/models/mainUser";

export async function POST(req) {
  const { username, email, pass } = await req.json();
  let modelUser, newUser;

  try {
    await newUserSchema.validate({ username: username, email: email, password: pass });
  } catch (err) {
    return cors(
      req,
      NextResponse.json("Incorrect data", {
        status: 422,
        headers: { "Content-Type": "application/json" },
      })
    );
  }

  try {
    modelUser = await userMainModelFn({ db: connectDb("Auth"), collection: "Users" });
    const user = await modelUser.find({ email: email });

    if (user.length > 0) {
      return cors(
        req,
        NextResponse.json("Such an email already exists", {
          status: 403,
          headers: { "Content-Type": "application/json" },
        })
      );
    }
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

  try {
    const hashedPass = await cryptPassword(pass);

    newUser = await new modelUser({
      username: username,
      email: email,
      password: hashedPass,
      isActivated: false,
      newsletter: false,
      createAt: new Date(),
    });

    await newUser.save();
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

  const { _id, createAt } = newUser;
  const userId = _id.toString();

  return cors(
    req,
    NextResponse.json(
      { userId, createAt },
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
