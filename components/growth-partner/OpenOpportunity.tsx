import growthData from "@/data/growth-partner.json";

export default function OpenOpportunity() {
  return (
    <section className="py-16 md:py-24">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-gray-500">Open opportunity</p>
            <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">
              Built for connectors, creators, and community-led growth.
            </h2>
          </div>
          <div className="grid gap-4">
            {growthData.opportunityPoints.map((point) => (
              <div
                key={point}
                className="rounded-[1.5rem] border border-white/10 bg-neutral-950 p-5 text-sm leading-7 text-gray-300"
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
