import cors from "@/lib/admin/core";
import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

export async function GET(req) {
  let storageSpace;
  const { blobs } = await list();
  //   console.log(req.headers.get(authorization));

  //   const bla = ListCommandOptions;

  const totalSize = blobs.reduce((total, item) => total + item.size, 0);

  const convertedTotalSizeToMB = totalSize / (1024 * 1024);

  console.log(convertedTotalSizeToMB);

  return cors(
    req,
    NextResponse.json("storageSpace", {
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
