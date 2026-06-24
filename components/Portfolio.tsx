"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import portfolioData from "@/data/portfolio.json";

export default function Portfolio() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 85,
        damping: 14,
      },
    },
  };

  return (
    <section id="portfolio" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-x-0 top-8 h-52 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1),transparent_68%)]" />
      <div id="demos" className="relative -top-28" />
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-gray-500 font-semibold">
            Recent work
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">
            Selected projects shaped for performance and brand trust.
          </h2>
          <p className="section-copy mt-5">
            A snapshot of recent websites and social media projects built for ambitious businesses.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {portfolioData.slice(0, 6).map((project) => (
            <motion.article
              key={project.id}
              variants={cardVariants}
              className="overflow-hidden rounded-[2rem] glass-card-premium shadow-glow-white-hover group"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.name} project screenshot`}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-white">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm text-white-secondary font-medium">{project.type}</p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white-secondary font-medium">
                    {project.serviceType}
                  </span>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-white-secondary">Industry</p>
                    <p className="mt-2 text-sm font-medium text-white">{project.type}</p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-white-secondary">Focus</p>
                    <p className="mt-2 text-sm font-medium capitalize text-white">{project.serviceType}</p>
                  </div>
                </div>
                {typeof project.projectLink === "string" && project.projectLink ? (
                  <Link href={project.projectLink} className="btn-secondary mt-6 hover:shadow-glow-purple-hover">
                    View Project
                  </Link>
                ) : (
                  <span className="mt-6 inline-flex rounded-full border border-white/10 px-5 py-3 text-sm text-white-secondary">
                    Project available on request
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
