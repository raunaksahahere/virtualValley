import growthData from "@/data/growth-partner.json";

export default function HighlightStrip() {
  return (
    <section className="overflow-hidden border-y border-white/10 bg-white/5 py-4">
      <div className="marquee-track flex gap-12 px-4">
        {[...growthData.highlightMessages, ...growthData.highlightMessages].map(
          (item, index) => (
            <div
              key={`${item}-${index}`}
              className="font-display text-lg font-medium uppercase tracking-[0.35em] text-white/85"
            >
              {item}
            </div>
          ),
        )}
      </div>
    </section>
  );
}
