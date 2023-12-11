import cors from "@/lib/admin/core";
import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

export async function GET(req) {
  let storageSpace;
  //   console.log(req.headers.get(authorization));

  try {
    cloudinary.config({
      cloud_name: process.env.CLD_NAME,
      api_key: process.env.CLD_API,
      api_secret: process.env.CLD_SECRET,
      secure: true,
    });
  } catch (err) {
    return cors(
      req,
      NextResponse.json("Failure cloudinary", {
        status: 304,
        headers: { "Content-Type": "application/json" },
      })
    );
  }

  try {
    await cloudinary.api.usage(function (usage) {
      if (usage) {
        storageSpace = usage.credits;
      }
    });
  } catch (err) {
    return cors(
      req,
      NextResponse.json("Something went wrong", {
        status: 503,
        headers: { "Content-Type": "application/json" },
      })
    );
  }

  return cors(
    req,
    NextResponse.json(storageSpace, {
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
