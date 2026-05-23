"use client";

import { motion } from "framer-motion";

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
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 14,
      },
    },
  };

  return (
    <section id="about" className="py-20 md:py-28 overflow-hidden">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-gray-500 font-semibold">
            About us
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">
            About <span className="text-gold-gradient">Virtual Valley</span>
          </h2>
          <p className="section-copy mt-5">
            Virtual Valley is a premium digital agency built around speed, clarity, and outcomes that help businesses look more credible online and grow with confidence.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-6 md:grid-cols-2"
          >
            {values.map((value) => (
              <motion.article
                key={value.title}
                variants={cardVariants}
                className="rounded-[2rem] p-6 glass-card-premium shadow-glow-white-hover"
              >
                <h3 className="font-display text-2xl font-semibold text-white">
                  {value.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-gray-300">{value.body}</p>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                className="rounded-[2rem] p-6 glass-card-premium shadow-glow-gold-hover border-gold/15"
              >
                <div className="font-display text-3xl font-semibold text-white">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

