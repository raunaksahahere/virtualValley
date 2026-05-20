import growthData from "@/data/growth-partner.json";

export default function RulesPolicy() {
  return (
    <section className="py-16 md:py-24">
      <div className="section-shell">
        <p className="text-sm uppercase tracking-[0.35em] text-gray-500">Rules and policy</p>
        <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">
          A clear program keeps commissions and communication clean.
        </h2>
        <div className="mt-10 grid gap-4">
          {growthData.rules.map((rule) => (
            <div
              key={rule}
              className="rounded-[1.5rem] border border-white/10 bg-neutral-950 p-5 text-sm leading-7 text-gray-300"
            >
              {rule}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
