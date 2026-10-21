import { NextRequest, NextResponse } from "next/server";
import { llmsTxt } from "@/content/markdown";

export const dynamic = "force-static";

export function GET(req: NextRequest) {
  const baseUrl = req.nextUrl.origin;
  return new NextResponse(llmsTxt(baseUrl), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
