import { NextResponse } from "next/server";
import { addMediaAsset, readCmsState } from "@/lib/admin-store";

export const runtime = "nodejs";

export async function GET() {
  const cms = await readCmsState();
  return NextResponse.json({ media: cms.media || [] });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, message: "Upload a valid media file." }, { status: 400 });
  }

  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ ok: false, message: "Media must be 8MB or smaller." }, { status: 413 });
  }

  const media = await addMediaAsset(file);
  return NextResponse.json({ ok: true, media });
}
