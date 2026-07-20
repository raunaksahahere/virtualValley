"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Rocket, Network } from "lucide-react";
import Link from "next/link";

export default function SellerPartnerHeader() {
  return (
    <section className="relative overflow-hidden bg-background px-4 pb-24 pt-32 md:py-32 lg:pt-48">
      {/* Premium Blueprint Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(#081F5C 1px, transparent 1px), linear-gradient(90deg, #081F5C 1px, transparent 1px)", backgroundSize: "40px 40px" }}
      />
      <div className="absolute top-0 right-0 w-[576px] h-[576px] bg-[radial-gradient(circle_at_center,rgba(51, 78, 172,0.08)_0%,transparent_60%)] pointer-events-none blur-3xl" />

      {/* Animated Edge Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full bg-accent-cyan"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            opacity: Math.random() * 0.15,
          }}
          animate={{
            y: [0, -100],
            x: [0, (Math.random() - 0.5) * 50],
            opacity: [0, 0.15, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * -20,
          }}
        />
      ))}

      <div className="max-w-[1008px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

        {/* Left Content */}
        <motion.div
          className="flex flex-col items-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-heading shadow-sm">
            <span className="h-2 w-2 rounded-full bg-accent-cyan animate-pulse" />
            Hiring Now
          </div>
          <h1 className="mb-6 font-display text-5xl font-bold leading-tight tracking-tight text-heading lg:text-7xl">
            Become a <br />
            <span className="text-accent-cyan-gradient">Virtual Valley</span><br />
            Sales Intern
          </h1>
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-text lg:text-xl">
            Earn commissions, gain real-world experience, receive verified certificates, and access internship and job opportunities while helping businesses grow online.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="#apply">
              <button className="group relative overflow-hidden rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-[0_10px_30px_rgb(var(--primary)_/_0.2)] transition-all hover:-translate-y-1 hover:bg-accent-cyan hover:shadow-[0_15px_40px_rgb(var(--primary)_/_0.3)]">
                <span className="relative z-10 flex items-center gap-2">Apply Now <Rocket className="w-4 h-4" /></span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#334EAC] to-[#081F5C] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Right Illustration / Floating Cards */}
        <div className="relative h-[360px] lg:h-[432px] w-full hidden md:block perspective-1000">
          {/* Central Orbit SVG Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 500 500">
            <motion.circle cx="250" cy="250" r="180" fill="none" stroke="#334EAC" strokeWidth="1" strokeDasharray="4 8"
              animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} style={{ originX: "50%", originY: "50%" }} />
            <motion.circle cx="250" cy="250" r="120" fill="none" stroke="#081F5C" strokeWidth="1" strokeDasharray="4 8"
              animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} style={{ originX: "50%", originY: "50%" }} />
          </svg>

          {/* Card 1 */}
          <motion.div
            className="absolute right-[15%] top-[10%] w-64 rounded-[2rem] border border-border bg-surface p-6 shadow-[0_20px_50px_rgb(var(--primary)_/_0.08)]"
            animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-12 h-12 rounded-full bg-[#081F5C]/10 flex items-center justify-center mb-4">
              <Network className="w-6 h-6 text-[#081F5C]" />
            </div>
            <h3 className="mb-2 font-bold text-heading">High Commissions</h3>
            <p className="text-sm text-text">Earn up to 25% on every successful referral you make.</p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="absolute bottom-[25%] left-[5%] w-64 rounded-[2rem] border border-border bg-surface p-6 shadow-[0_20px_50px_rgb(var(--primary)_/_0.08)]"
            animate={{ y: [0, 15, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <div className="w-12 h-12 rounded-full bg-[#334EAC]/10 flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6 text-[#334EAC]" />
            </div>
            <h3 className="mb-2 font-bold text-heading">Verified Certificate</h3>
            <p className="text-sm text-text">Receive a verifiable digital certificate upon completing goals.</p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="absolute bottom-[5%] right-[20%] w-64 rounded-[2rem] border border-border bg-surface p-6 shadow-[0_20px_50px_rgb(var(--primary)_/_0.08)]"
            animate={{ y: [0, -10, 0], rotate: [0, 1, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <div className="w-12 h-12 rounded-full bg-[#081F5C]/10 flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6 text-[#081F5C]" />
            </div>
            <h3 className="mb-2 font-bold text-heading">Career Growth</h3>
            <p className="text-sm text-text">Gain real-world client interaction experience.</p>
          </motion.div>
        </div>
        <div className="mt-8 flex items-center justify-between rounded-2xl border border-border bg-surface px-5 py-4 text-sm text-text md:hidden">
          <span>Up to 25% commission</span>
          <span className="font-semibold text-accent-cyan">Verified certificate</span>
        </div>
      </div>
    </section>
  );
}
