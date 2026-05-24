export function RouteMap() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-[#c6922f]/20 bg-[#10100f] p-6 text-white">
      <div className="absolute inset-0 bg-[url('/brand/topography.svg')] opacity-20" aria-hidden="true" />
      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#c6922f]">Route Intelligence</p>
        <h3 className="font-display mt-3 text-3xl">From Nairobi to the wild, coast, and highlands</h3>
        <svg viewBox="0 0 640 320" className="mt-8 w-full" role="img" aria-label="Animated route map from Nairobi across travel destinations">
          <defs>
            <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C6922F" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#C6922F" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d="M96 210 C168 120 230 250 315 150 C390 65 455 160 548 82" fill="none" stroke="#C6922F" strokeWidth="3" className="route-line" />
          <path d="M96 210 C145 258 244 270 324 224 C407 176 463 230 560 186" fill="none" stroke="#F7F1E8" strokeOpacity="0.32" strokeWidth="2" className="route-line" />
          {[
            [96, 210, "Nairobi"],
            [315, 150, "Mara"],
            [548, 82, "Amboseli"],
            [560, 186, "Coast"],
            [324, 224, "Mt Kenya"]
          ].map(([x, y, label]) => (
            <g key={label as string}>
              <circle cx={x as number} cy={y as number} r="30" fill="url(#mapGlow)" />
              <circle cx={x as number} cy={y as number} r="6" fill="#F7F1E8" />
              <text x={(x as number) + 13} y={(y as number) + 5} fill="#F7F1E8" fontSize="18" fontFamily="Arial">
                {label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
