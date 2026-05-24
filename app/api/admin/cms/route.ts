import { NextResponse } from "next/server";
import type { AdminCmsState } from "@/lib/admin-schema";
import { readCmsState, writeCmsState } from "@/lib/admin-store";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(await readCmsState());
}

export async function PUT(request: Request) {
  const body = (await request.json().catch(() => null)) as AdminCmsState | null;

  if (!body) {
    return NextResponse.json({ ok: false, message: "Invalid CMS payload." }, { status: 400 });
  }

  const saved = await writeCmsState(body);
  return NextResponse.json({ ok: true, cms: saved });
}
