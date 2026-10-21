import { NextRequest, NextResponse } from "next/server";
import { llmsTxt } from "@/content/markdown";

// alias keeping compatibility with tools that probe /llm.txt (dossier §9)
export const dynamic = "force-static";

export function GET(req: NextRequest) {
  const baseUrl = req.nextUrl.origin;
  return new NextResponse(llmsTxt(baseUrl), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
