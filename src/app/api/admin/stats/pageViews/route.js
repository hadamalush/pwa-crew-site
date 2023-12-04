import cors from "@/lib/admin/core";
import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET(req) {
  const client = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/analytics.readonly"]
  );

  google.options({ auth: client });
  let response;

  try {
    const analyticsData = google.analyticsdata("v1beta");
    response = await analyticsData.properties.runReport({
      property: "properties/396912457",
      requestBody: {
        dateRanges: [
          {
            startDate: "2023-12-01",
            endDate: "today",
          },
        ],
        dimensions: [
          {
            name: "country",
          },
        ],
        metrics: [
          {
            name: "screenPageViews",
          },
        ],
      },
    });
  } catch (err) {
    console.log(err);
    return cors(
      req,
      NextResponse.json("Failed to download data from Google.", {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    );
  }

  if (response.status !== 200) {
    return cors(
      req,
      NextResponse.json("Failed to download data from Google.", {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    );
  }

  const numberOfPageViews = response.data.rows[0].metricValues[0].value;

  return cors(
    req,
    NextResponse.json(numberOfPageViews, {
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
