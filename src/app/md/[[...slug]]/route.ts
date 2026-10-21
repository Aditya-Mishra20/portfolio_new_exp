import { NextRequest, NextResponse } from "next/server";
import { mdDocs } from "@/content/markdown";

/**
 * /md/<path> markdown endpoints (dossier §9). Any GET (or a request with
 * Accept: text/markdown to a normal page) can be served from these docs.
 */
export const dynamic = "force-static";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { slug } = await params;
  const key = (slug ?? []).join("/");
  const doc = mdDocs[key];
  if (!doc) {
    return NextResponse.json(
      { error: "not_found", available: Object.keys(mdDocs) },
      { status: 404 }
    );
  }
  return new NextResponse(doc, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
