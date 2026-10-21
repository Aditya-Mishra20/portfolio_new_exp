import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

/**
 * Self-contained view counter (dossier §3 — same API shape as the external
 * one observed on the reference site, but local JSON so it works anywhere
 * Next runs. Swap the read/write helpers for a KV in production.)
 */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const dataFile = () => path.join(process.cwd(), "data", "views.json");

async function readAll(): Promise<Record<string, number>> {
  try {
    return JSON.parse(await fs.readFile(dataFile(), "utf8"));
  } catch {
    return {};
  }
}

async function writeAll(v: Record<string, number>) {
  await fs.mkdir(path.dirname(dataFile()), { recursive: true });
  await fs.writeFile(dataFile(), JSON.stringify(v, null, 2), "utf8");
}

export async function GET(req: NextRequest) {
  const path_ = req.nextUrl.searchParams.get("path") ?? "/";
  const all = await readAll();
  // every view request counts as a view, matching the reference behavior
  const views = (all[path_] ?? 0) + 1;
  all[path_] = views;
  await writeAll(all);
  return NextResponse.json({ views, site: "portfolio", path: path_ });
}
