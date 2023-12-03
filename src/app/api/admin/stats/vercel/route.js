import cors from "@/lib/admin/core";
import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

export async function GET(req) {
  const { blobs } = await list();

  let space = { limit: 0, convertedTotalSizeToMB: 0, used_percent: 0 };

  if (blobs) {
    const totalSize = blobs.reduce((total, item) => total + item.size, 0);
    const convertedTotalSizeToMB = parseFloat((totalSize / (1024 * 1024)).toFixed(2));
    const limit = 250; // place in vercel blob entered statically , because unfortunately vercel does not yet share disk data
    const used_percent = (convertedTotalSizeToMB / limit) * 100;

    space = {
      limit,
      usage: convertedTotalSizeToMB,
      used_percent,
    };
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
