"use client";

import Link from "next/link";

export default function GrowWithVirtualValley() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-x-0 top-10 h-52 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1),transparent_72%)]" />
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.14),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.12),transparent_18%),#0b0b0b] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl md:p-12">
          <div className="absolute right-6 top-6 h-20 w-20 rounded-full border border-gold/20 bg-gold/10 blur-2xl" />
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white-secondary">
            Growth partner program
          </p>
          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold text-white md:text-5xl">
                Grow with Virtual Valley and earn on every meaningful referral.
              </h2>
              <p className="section-copy mt-5">
                If you know founders, creators, or local businesses that need a sharper digital presence, our partner network turns that trust into a commission channel.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="trust-pill">Commission-led rewards</div>
                <div className="trust-pill">Premium support</div>
                <div className="trust-pill">Business-ready offer</div>
              </div>
            </div>
            <Link href="/seller-partner" className="btn-secondary hover:shadow-glow-gold-hover">
              Explore the Program
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
