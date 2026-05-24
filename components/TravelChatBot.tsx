"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, ChevronDown, MessageCircle, Send, Sparkles, UserRound, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo, useRef, useState } from "react";

type ChatItem = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  confidence?: number;
  whatsappUrl?: string;
};

const starterQuestions = [
  "How much is a Masai Mara safari?",
  "Can you arrange JKIA airport pickup?",
  "Plan safari plus Diani beach",
  "Do you handle corporate retreats?"
];

export function TravelChatBot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatItem[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello, I’m the Pride of Africa travel assistant. Ask me about safaris, airport transfers, beach holidays, hiking, corporate travel, group tours, pricing, booking, or the best route for your dates."
    }
  ]);
  const formRef = useRef<HTMLFormElement>(null);

  const hidden = pathname?.startsWith("/admin");
  const lastAssistant = useMemo(() => [...messages].reverse().find((message) => message.role === "assistant"), [messages]);

  if (hidden) {
    return null;
  }

  async function sendMessage(value = input) {
    const content = value.trim();
    if (!content || loading) return;

    const userMessage: ChatItem = {
      id: `user-${Date.now()}`,
      role: "user",
      content
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          history: messages.map((message) => ({ role: message.role, content: message.content }))
        })
      });
      const data = await response.json();

      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: data.answer || "I can help, but I need a little more detail.",
          sources: data.sources || [],
          confidence: data.confidence,
          whatsappUrl: data.whatsappUrl
        }
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: "I could not reach the travel knowledge base just now. Please try again or continue on WhatsApp."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-24 left-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#10100f] text-[#f4d68a] shadow-[0_18px_50px_rgba(0,0,0,0.35)] ring-1 ring-[#c6922f]/40 transition hover:-translate-y-1 hover:bg-[#c6922f] hover:text-[#10100f]"
        aria-label="Open intelligent travel assistant"
      >
        <Bot size={24} />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.aside
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-4 left-3 right-3 top-20 z-[75] flex flex-col overflow-hidden rounded-[1.5rem] border border-[#c6922f]/25 bg-[#f7f1e8] text-[#10100f] shadow-[0_24px_90px_rgba(0,0,0,0.35)] sm:bottom-40 sm:left-5 sm:right-auto sm:top-auto sm:max-h-[calc(100vh-12rem)] sm:w-[430px]"
            role="dialog"
            aria-label="Pride of Africa intelligent travel assistant"
          >
            <div className="relative overflow-hidden bg-[#10100f] p-5 text-white">
              <div className="absolute inset-0 bg-[url('/brand/topography.svg')] opacity-20" aria-hidden="true" />
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-[#c6922f] text-[#10100f]">
                    <Sparkles size={22} />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f4d68a]">Real-time assistant</p>
                    <h2 className="font-display mt-1 text-2xl">Ask Pride AI</h2>
                    <p className="mt-1 text-xs leading-5 text-white/60">Connected to services, pages, offers, reviews, and booking knowledge.</p>
                  </div>
                </div>
                <button type="button" onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white hover:bg-white hover:text-[#10100f]" aria-label="Close assistant">
                  <X size={17} />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
              <div className="grid gap-3">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    {message.role === "assistant" ? (
                      <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#1f4d3a] text-white">
                        <Bot size={16} />
                      </span>
                    ) : null}
                    <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "bg-[#10100f] text-white" : "bg-white text-[#1b1b1b] shadow-sm"}`}>
                      <p className="whitespace-pre-line">{message.content}</p>
                      {message.sources?.length ? (
                        <p className="mt-3 border-t border-[#e7dccd] pt-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#6b4a2e]">
                          Sources: {message.sources.join(", ")}
                        </p>
                      ) : null}
                      {typeof message.confidence === "number" ? (
                        <p className="mt-1 text-[0.68rem] font-semibold text-[#71685c]">Knowledge confidence: {message.confidence}%</p>
                      ) : null}
                      {message.whatsappUrl ? (
                        <a href={message.whatsappUrl} className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#1f4d3a] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white">
                          <MessageCircle size={14} />
                          Continue on WhatsApp
                        </a>
                      ) : null}
                    </div>
                    {message.role === "user" ? (
                      <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#c6922f] text-[#10100f]">
                        <UserRound size={16} />
                      </span>
                    ) : null}
                  </div>
                ))}
                {loading ? (
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#71685c]">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[#1f4d3a] text-white">
                      <Bot size={16} />
                    </span>
                    Searching the travel knowledge base...
                  </div>
                ) : null}
              </div>
            </div>

            <div className="border-t border-[#e7dccd] bg-white p-4">
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                {starterQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => sendMessage(question)}
                    className="shrink-0 rounded-full bg-[#f7f1e8] px-3 py-2 text-[0.72rem] font-bold text-[#6b4a2e] transition hover:bg-[#c6922f] hover:text-[#10100f]"
                  >
                    {question}
                  </button>
                ))}
              </div>
              <form
                ref={formRef}
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage();
                }}
                className="flex items-end gap-2"
              >
                <label className="sr-only" htmlFor="travel-chat-message">Ask a travel question</label>
                <textarea
                  id="travel-chat-message"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  rows={2}
                  className="min-h-12 flex-1 resize-none rounded-2xl border border-[#e7dccd] bg-[#f7f1e8] px-4 py-3 text-sm outline-none focus:border-[#c6922f]"
                  placeholder="Ask about safari prices, transfers, beach trips, group tours..."
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <button type="submit" disabled={loading || !input.trim()} className="grid h-12 w-12 place-items-center rounded-full bg-[#10100f] text-white disabled:opacity-40" aria-label="Send message">
                  {loading ? <ChevronDown className="animate-bounce" size={18} /> : <Send size={18} />}
                </button>
              </form>
              {lastAssistant?.whatsappUrl ? (
                <p className="mt-3 text-xs leading-5 text-[#71685c]">For exact availability, lodge rates, and urgent travel changes, the assistant will hand you to WhatsApp.</p>
              ) : null}
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
