"use client";

const items = [
  "Premium delivery",
  "Kolkata based",
  "Fast support",
  "Website + social",
  "SEO ready builds",
  "Growth-minded execution",
];

export default function Celebration() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-white/5 py-5">
      {/* Soft gradient masks for fading edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />

      <div className="marquee-track flex gap-16 px-4">
        {[...items, ...items].map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="font-display text-base md:text-lg font-semibold uppercase tracking-[0.35em] text-white/80 shrink-0"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
