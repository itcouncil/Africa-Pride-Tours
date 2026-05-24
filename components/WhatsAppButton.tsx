"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { whatsappNumber } from "@/lib/content";

export function WhatsAppButton() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Pride of Africa Journeys, I would like to plan a trip.")}`}
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#1f4d3a] text-white shadow-[0_18px_50px_rgba(31,77,58,0.45)] ring-1 ring-white/20 transition hover:-translate-y-1 hover:bg-[#c6922f] hover:text-[#10100f]"
      aria-label="Book via WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
}
