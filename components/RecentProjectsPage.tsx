"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import portfolioData from "@/data/portfolio.json";

export default function RecentProjectsPage() {
  const [filter, setFilter] = useState<"all" | "website" | "social">("all");

  const filteredProjects =
    filter === "all"
      ? portfolioData
      : portfolioData.filter((project) => project.serviceType === filter);

  return (
    <main className="min-h-screen bg-black px-4 py-24 text-white md:px-6">
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-gray-500">
            Portfolio archive
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
            Recent Projects
          </h1>
          <p className="section-copy mt-5">
            Browse selected website development and social media management work from the Virtual Valley portfolio.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {(["all", "website", "social"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-full border px-4 py-2 text-sm font-medium capitalize ${
                filter === value
                  ? "border-white bg-white text-black"
                  : "border-white/15 bg-white/5 text-gray-300"
              }`}
            >
              {value === "all" ? "All" : value === "website" ? "Website" : "Social Media"}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-neutral-950"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={project.image}
                  alt={`${project.name} project screenshot`}
                  fill
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="font-display text-2xl font-semibold">{project.name}</h2>
                    <p className="mt-2 text-sm text-gray-400">{project.type}</p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-gray-300">
                    {project.serviceType}
                  </span>
                </div>
                {typeof project.projectLink === "string" && project.projectLink ? (
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
    </main>
  );
}
