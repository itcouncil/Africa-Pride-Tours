"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoLockup } from "@/components/Logo";
import { navItems, whatsappNumber } from "@/lib/content";

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-7">
        <div className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 transition-all duration-500 ${scrolled ? "glass" : "bg-transparent"}`}>
          <LogoLockup />
          <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary navigation">
            {navItems.slice(0, 9).map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition ${
                    active ? "bg-white text-[#10100f]" : "text-white/76 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              className="hidden rounded-full border border-[#c6922f]/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f7d892] transition hover:bg-[#c6922f] hover:text-[#10100f] md:inline-flex"
            >
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#10100f] transition hover:scale-105"
              aria-label="Open navigation menu"
            >
              <Menu size={19} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-[#10100f]"
          >
            <div className="absolute inset-0 image-fallback opacity-30" aria-hidden="true" />
            <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-7">
              <div className="flex items-center justify-between">
                <LogoLockup />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-12 w-12 place-items-center rounded-full bg-[#f7f1e8] text-[#10100f]"
                  aria-label="Close navigation menu"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1fr_0.75fr]">
                <nav className="grid gap-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ y: 22, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.035 }}
                    >
                      <Link
                        href={item.href}
                        className="font-display group flex items-center justify-between border-b border-white/10 py-3 text-3xl text-white transition hover:text-[#c6922f] sm:text-5xl"
                      >
                        {item.label}
                        <span className="text-sm text-white/34 transition group-hover:text-[#c6922f]">0{index + 1}</span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                <div className="glass rounded-[2rem] p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c6922f]">Fast planning</p>
                  <h2 className="font-display mt-4 text-4xl text-white">Send dates. Get a crafted path.</h2>
                  <p className="mt-5 text-sm leading-7 text-white/68">
                    Safaris, transfers, beaches, hikes, corporate movement, and groups can all begin with one clear WhatsApp brief.
                  </p>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Pride of Africa Journeys, I would like help planning a trip.")}`}
                    className="gold-gradient mt-7 inline-flex rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#10100f]"
                  >
                    Start on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
