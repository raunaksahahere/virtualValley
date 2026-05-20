"use client";

const values = [
  {
    title: "Results-Driven",
    body: "Every website, campaign, and content system is built to move enquiries, conversions, and long-term brand trust.",
  },
  {
    title: "Client-Centric",
    body: "We stay close to context so every deliverable feels aligned with your stage, team, and business reality.",
  },
  {
    title: "Innovation First",
    body: "Modern tooling, cleaner workflows, and faster execution help us deliver work that feels current without becoming generic.",
  },
  {
    title: "Quality Excellence",
    body: "We care about polish, performance, responsiveness, and the details users notice even when they cannot name them.",
  },
];

const stats = [
  { label: "Projects", value: "50+" },
  { label: "Satisfaction", value: "100%" },
  { label: "Team Members", value: "20+" },
  { label: "Years Experience", value: "3+" },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-gray-500">
            About us
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">
            About <span className="text-gold-gradient">Virtual Valley</span>
          </h2>
          <p className="section-copy mt-5">
            Virtual Valley is a premium digital agency built around speed, clarity, and outcomes that help businesses look more credible online and grow with confidence.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-[1.75rem] border border-white/10 bg-neutral-950 p-6"
              >
                <h3 className="font-display text-2xl font-semibold text-white">
                  {value.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-gray-400">{value.body}</p>
              </article>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
              >
                <div className="font-display text-3xl font-semibold text-white">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
