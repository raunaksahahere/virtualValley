"use client";

import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-32 bg-black relative border-t border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.1)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">Start Your Journey With Virtual Valley</h2>
        <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
          Internships, jobs, commissions, certificates, and real growth opportunities — all in one place.
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-4">
          <Link href="#apply">
            <button className="bg-gold text-black font-bold px-10 py-4 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all transform hover:scale-105">
              Apply Now
            </button>
          </Link>
          <Link href="/contact">
            <button className="border border-white/20 bg-white/5 text-white font-semibold px-10 py-4 rounded-full hover:bg-white/10 transition-all">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
