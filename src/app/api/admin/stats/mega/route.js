import cors from "@/lib/admin/core";
import { NextResponse } from "next/server";
import { Storage } from "megajs";

export async function GET(req) {
  //   console.log(req.headers.get(authorization));

  let megaStorage, info, space;

  try {
    megaStorage = await new Storage({
      email: process.env.MEGA_EMAIL,
      password: process.env.MEGA_PASSWORD,
      allowUploadBuffering: true,
    }).ready;

    info = await megaStorage.getAccountInfo();
  } catch (error) {
    return cors(
      req,
      NextResponse.json("Unauthorized", {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    );
  }

  if (info) {
    const { spaceUsed, spaceTotal } = info;

    space = {
      usage: (spaceUsed / (1024 * 1024)).toFixed(2),
      limit: (spaceTotal / (1024 * 1024)).toFixed(2),
    };

    const used_percent = ((space.usage / space.limit) * 100).toFixed(2);

    space.used_percent = used_percent;
  }

  return cors(
    req,
    NextResponse.json(space, {
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
