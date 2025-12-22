import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // ⬅️ IMPORTANT

export async function GET(req: NextRequest) {
  const src = req.nextUrl.searchParams.get("src");

  if (!src) {
    return new NextResponse("Missing src", { status: 400 });
  }

  const upstream = await fetch(src);

  if (!upstream.ok || !upstream.body) {
    return new NextResponse("Failed to fetch audio", { status: 500 });
  }

  const contentType =
    upstream.headers.get("content-type") || "audio/mpeg";

  return new NextResponse(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cross-Origin-Resource-Policy": "cross-origin",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
