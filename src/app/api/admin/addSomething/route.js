import jwt from "jsonwebtoken";
import cors from "@/lib/admin/core";
import { NextResponse } from "next/server";

export async function POST(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return cors(req, NextResponse.json({ message: "You don't have access" }, { status: 401 }));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      return cors(req, NextResponse.json({ message: "You don't have access1" }, { status: 403 }));
    }

    req.user = data;
  });

  if (!req.user) {
    return cors(req, NextResponse.json({ message: "You don't have access" }, { status: 403 }));
  }

  //   console.log(decoded);

  //   console.log(decoded);

  //
  //   const secret = process.env.JWT_SECRET;
  //   const secret = "blablabla";

  //   console.log("token: ", token);
  //   console.log("secret: ", secret);
  //   const decoded = jwt.verify(token, secret);

  return cors(
    req,
    new Response("dsad", {
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
