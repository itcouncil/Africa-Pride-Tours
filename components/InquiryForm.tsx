"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

const journeyOptions = [
  "Safari Package",
  "Airport Transfer",
  "Beach Holiday",
  "Hiking Adventure",
  "Corporate Travel",
  "Group Tour",
  "Hotel / Car Hire",
  "Custom Journey"
];

export function InquiryForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    setStatus(response.ok ? "success" : "error");
    setMessage(data.message);
    setWhatsappUrl(data.whatsappUrl || "");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-[1.5rem] bg-white p-5 text-[#10100f] shadow-2xl md:p-7">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#6b4a2e]">
          Name
          <input name="name" required className="rounded-2xl border border-[#e7dccd] px-4 py-3 text-sm font-medium outline-none focus:border-[#c6922f]" placeholder="Your full name" />
        </label>
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#6b4a2e]">
          Email
          <input name="email" type="email" required className="rounded-2xl border border-[#e7dccd] px-4 py-3 text-sm font-medium outline-none focus:border-[#c6922f]" placeholder="you@email.com" />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#6b4a2e]">
          Phone
          <input name="phone" className="rounded-2xl border border-[#e7dccd] px-4 py-3 text-sm font-medium outline-none focus:border-[#c6922f]" placeholder="+254..." />
        </label>
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#6b4a2e]">
          Travel Date
          <input name="date" type="date" className="rounded-2xl border border-[#e7dccd] px-4 py-3 text-sm font-medium outline-none focus:border-[#c6922f]" />
        </label>
      </div>
      <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#6b4a2e]">
        Journey Type
        <select name="journey" required className="rounded-2xl border border-[#e7dccd] bg-white px-4 py-3 text-sm font-medium outline-none focus:border-[#c6922f]">
          <option value="">Choose an experience</option>
          {journeyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#6b4a2e]">
        Travel Brief
        <textarea
          name="message"
          required
          rows={4}
          className="resize-none rounded-2xl border border-[#e7dccd] px-4 py-3 text-sm font-medium outline-none focus:border-[#c6922f]"
          placeholder="Tell us destinations, group size, budget range, style, and must-have moments."
        />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="gold-gradient inline-flex items-center justify-center gap-3 rounded-full px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#10100f] disabled:opacity-70"
      >
        {status === "loading" ? <Loader2 className="animate-spin" size={18} /> : <ArrowRight size={18} />}
        Send Inquiry
      </button>
      {message ? (
        <div className={`rounded-2xl px-4 py-3 text-sm ${status === "success" ? "bg-[#1f4d3a] text-white" : "bg-[#c96a3d] text-white"}`}>
          {message}
          {whatsappUrl ? (
            <a href={whatsappUrl} className="ml-2 font-bold underline">
              Open WhatsApp
            </a>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
