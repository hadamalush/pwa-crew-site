import cors from "@/lib/admin/core";
import { NextResponse } from "next/server";
import { connectDbAdmin } from "@/lib/mongoose";

export async function GET(req) {
  let serverStatus;
  //   console.log(req.headers.get(authorization));
  try {
    const client = await connectDbAdmin();
    const db = client.connection.db;
    serverStatus = await db.command({ serverStatus: 1 });
  } catch (err) {
    NextResponse.json("Something went wrong ", {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const connections = serverStatus.connections;

  return cors(
    req,
    NextResponse.json(connections, {
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
