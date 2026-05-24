import { NextResponse } from "next/server";
import { saveInquiry } from "@/lib/admin-store";

const required = ["name", "email", "journey", "message"];

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || required.some((field) => !String(body[field] ?? "").trim())) {
    return NextResponse.json(
      { ok: false, message: "Please share your name, email, journey type, and travel brief." },
      { status: 400 }
    );
  }

  const summary = [
    `Pride of Africa inquiry`,
    `Name: ${body.name}`,
    `Email: ${body.email}`,
    `Journey: ${body.journey}`,
    body.phone ? `Phone: ${body.phone}` : "",
    body.date ? `Travel date: ${body.date}` : "",
    `Brief: ${body.message}`
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappUrl = `https://wa.me/254700000000?text=${encodeURIComponent(summary)}`;
  const inquiry = await saveInquiry({
    name: String(body.name).trim(),
    email: String(body.email).trim(),
    phone: body.phone ? String(body.phone).trim() : undefined,
    journey: String(body.journey).trim(),
    date: body.date ? String(body.date).trim() : undefined,
    message: String(body.message).trim()
  });

  return NextResponse.json({
    ok: true,
    inquiryId: inquiry.id,
    message: "Inquiry received. Continue on WhatsApp for the fastest response.",
    whatsappUrl
  });
}
