import { NextResponse } from "next/server";
import { answerTravelQuestion, type ChatMessage } from "@/lib/chat-engine";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const message = String(body?.message || "").trim();
  const history = (body?.history || []) as ChatMessage[];

  if (!message) {
    return NextResponse.json({ ok: false, message: "Ask a travel question first." }, { status: 400 });
  }

  const result = await answerTravelQuestion(message, history);

  return NextResponse.json({
    ok: true,
    ...result
  });
}
