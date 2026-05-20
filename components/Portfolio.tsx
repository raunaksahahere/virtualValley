"use client";

import Image from "next/image";
import Link from "next/link";

import portfolioData from "@/data/portfolio.json";

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 md:py-28">
      <div id="demos" className="relative -top-28" />
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-gray-500">
            Recent work
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">
            Selected projects shaped for performance and brand trust.
          </h2>
          <p className="section-copy mt-5">
            A snapshot of recent websites and social media projects built for ambitious businesses.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {portfolioData.slice(0, 6).map((project) => (
            <article
              key={project.id}
              className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-neutral-950"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-white">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-400">{project.type}</p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-gray-300">
                    {project.serviceType}
                  </span>
                </div>
                {project.projectLink ? (
                  <Link href={project.projectLink} className="btn-secondary mt-6">
                    View Project
                  </Link>
                ) : (
                  <span className="mt-6 inline-flex rounded-full border border-white/10 px-5 py-3 text-sm text-gray-500">
                    Project available on request
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
