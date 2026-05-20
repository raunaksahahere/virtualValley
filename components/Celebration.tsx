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
    <section className="overflow-hidden border-y border-white/10 bg-white/5 py-4">
      <div className="marquee-track flex gap-12 px-4">
        {[...items, ...items].map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="font-display text-lg font-medium uppercase tracking-[0.35em] text-white/85"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
