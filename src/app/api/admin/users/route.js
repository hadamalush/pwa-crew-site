import cors from "@/lib/admin/core";
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/mongoose";
import { userMainModelFn } from "@/lib/models/mainUser";

export async function GET(req) {
  let users;

  try {
    const modelUser = await userMainModelFn({ db: connectDb("Auth"), collection: "Users" });

    users = await modelUser.find({});

    if (users) {
      users = users.map((user) => {
        const newUser = {
          ...user._doc,
          id: user._id.toString(),
        };
        delete newUser._id;
        delete newUser.password;
        return newUser;
      });
    }
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
    NextResponse.json(users, {
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
