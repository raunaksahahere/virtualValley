import Link from "next/link";

import growthData from "@/data/growth-partner.json";

export default function GrowthPartnerHeader() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-neutral-950 to-black pb-16 pt-32">
      <div className="animated-grid absolute inset-0 opacity-60" />
      <div className="section-shell relative">
        <p className="text-sm uppercase tracking-[0.35em] text-gray-500">
          {growthData.hero.eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold md:text-6xl">
          {growthData.hero.title}
        </h1>
        <p className="section-copy mt-6 max-w-2xl">{growthData.hero.description}</p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a href="#registration" className="btn-primary">
            Register Now
          </a>
          <Link href="/#pricing" className="btn-secondary">
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
}
