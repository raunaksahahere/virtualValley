import growthData from "@/data/growth-partner.json";

export default function CommissionStructure() {
  return (
    <section className="py-16 md:py-24">
      <div className="section-shell">
        <p className="text-sm uppercase tracking-[0.35em] text-gray-500">Commission structure</p>
        <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">
          Earn more as your referrals convert consistently.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {growthData.commissionTiers.map((tier) => (
            <article
              key={tier.label}
              className="rounded-[1.75rem] border border-white/10 bg-neutral-950 p-6"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">{tier.label}</p>
              <div className="mt-5 font-display text-5xl font-semibold text-white">
                {tier.rate}
              </div>
              <p className="mt-4 text-sm leading-7 text-gray-400">{tier.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
