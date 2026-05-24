import Link from "next/link";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Pride of Africa Journeys mark">
      <defs>
        <linearGradient id="brandGold" x1="18" y1="12" x2="98" y2="110" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F4D68A" />
          <stop offset="0.48" stopColor="#C6922F" />
          <stop offset="1" stopColor="#7E551E" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeOpacity="0.28" strokeWidth="2" />
      <path d="M25 75c19-4 27-17 35-38 8 21 16 34 35 38" fill="none" stroke="url(#brandGold)" strokeWidth="7" strokeLinecap="round" />
      <path d="M31 84h58" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M43 69c7 2 12 2 17-1 5 3 10 3 17 1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
      <path d="M41 50h38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.36" />
      <path d="M60 23v15" stroke="url(#brandGold)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function LogoLockup({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/home" className="group flex items-center gap-3" aria-label="Pride of Africa Journeys home">
      <BrandMark className="h-11 w-11 shrink-0 text-[#c6922f] transition-transform duration-500 group-hover:scale-105" />
      {!compact ? (
        <span className="leading-none">
          <span className="font-display block text-[0.92rem] font-semibold tracking-[0.24em] text-white">PRIDE OF AFRICA</span>
          <span className="mt-1 block text-[0.62rem] font-medium uppercase tracking-[0.32em] text-[#c6922f]">Journeys</span>
        </span>
      ) : null}
    </Link>
  );
}
