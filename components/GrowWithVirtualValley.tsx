"use client";

import Link from "next/link";

export default function GrowWithVirtualValley() {
  return (
    <section className="py-20 md:py-28">
      <div className="section-shell">
        <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(201,168,76,0.08),transparent_18%),#0b0b0b] p-8 md:p-12">
          <p className="text-sm uppercase tracking-[0.35em] text-gray-500">
            Growth partner program
          </p>
          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold md:text-5xl">
                Grow with Virtual Valley and earn on every meaningful referral.
              </h2>
              <p className="section-copy mt-5">
                If you know founders, creators, or local businesses that need a sharper digital presence, our partner network turns that trust into a commission channel.
              </p>
            </div>
            <Link href="/growth-partner" className="btn-secondary">
              Explore the Program
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
