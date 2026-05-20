import growthData from "@/data/growth-partner.json";

export default function GrowthPrograms() {
  return (
    <section className="pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="section-shell">
        <p className="text-sm uppercase tracking-[0.35em] text-gray-500">Growth programs</p>
        <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">
          Different partner styles. Same outcome focus.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {growthData.programs.map((program) => (
            <article
              key={program.name}
              className="rounded-[1.75rem] border border-white/10 bg-neutral-950 p-6"
            >
              <h3 className="font-display text-2xl font-semibold text-white">
                {program.name}
              </h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">{program.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
