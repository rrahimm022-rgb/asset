import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ ok: true, app: "AssetForge", mode: "local-mapping-and-export" });
}
