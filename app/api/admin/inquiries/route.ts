import { NextResponse } from "next/server";
import { readInquiries } from "@/lib/admin-store";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ inquiries: await readInquiries() });
}
