"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoLockup } from "@/components/Logo";
import { navItems, services, whatsappNumber } from "@/lib/content";

export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-[#10100f] px-6 py-16 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr_0.7fr]">
        <div>
          <LogoLockup />
          <p className="mt-6 max-w-md text-sm leading-7 text-white/62">
            Premium African travel design from Nairobi: safaris, transfers, beach holidays, hiking, corporate travel, group tours, car hire, hotel booking, and private guiding.
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            className="mt-7 inline-flex rounded-full bg-[#f7f1e8] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#10100f]"
          >
            WhatsApp Travel Desk
          </a>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c6922f]">Explore</h3>
            <div className="mt-5 grid gap-3 text-sm text-white/68">
              {navItems.slice(0, 6).map((item) => (
                <Link key={item.href} href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c6922f]">Services</h3>
            <div className="mt-5 grid gap-3 text-sm text-white/68">
              {services.slice(0, 6).map((item) => (
                <Link key={item.title} href={item.href} className="transition hover:text-white">
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c6922f]">Nairobi, Kenya</h3>
          <p className="mt-5 text-sm leading-7 text-white/62">
            Built for international tourists, diaspora travelers, honeymooners, companies, local tourists, students, groups, and adventure seekers.
          </p>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.18em] text-white/42 md:flex-row">
        <p>© {new Date().getFullYear()} Pride of Africa Journeys</p>
        <p>Where Africa Becomes an Experience</p>
      </div>
    </footer>
  );
}
