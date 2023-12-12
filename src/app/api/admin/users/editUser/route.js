import cors from "@/lib/admin/core";
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/mongoose";
import { editUserSchema } from "@/components/Schemas/FormSchem";
import { cryptPassword } from "@/lib/crypt";
import { userMainModelFn } from "@/lib/models/mainUser";

export async function POST(req) {
  const { newUsername, newEmail, newPass, id } = await req.json();
  let modelUser, newUser;

  try {
    await editUserSchema.validate({ username: newUsername, email: newEmail, password: newPass });
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

    const user = await modelUser.find({ email: newEmail });
    const foundId = user[0]?._id.toString();

    if (user.length > 0 && foundId !== id) {
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
    let hashedPass;
    if (newPass) {
      hashedPass = await cryptPassword(newPass);
    }
    newUser = await modelUser.findOneAndUpdate(
      { _id: id },
      {
        email: newEmail,
        username: newUsername,
        ...(hashedPass && { password: hashedPass }),
      }
    );
    await newUser.save();
  } catch (err) {
    return cors(
      req,
      NextResponse.json("Something went wrong", {
        status: 503,
        headers: { "Content-Type": "application/json" },
      })
    );
  }

  const { email, username } = newUser;

  return cors(
    req,
    NextResponse.json(
      { email, username },
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
