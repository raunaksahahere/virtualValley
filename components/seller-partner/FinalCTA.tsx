"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="dark-section relative overflow-hidden bg-background py-24 md:py-32">
      {/* Animated Floating Shapes */}
      <motion.div 
        className="pointer-events-none absolute left-[-10%] top-[-10%] h-[50vw] max-h-[432px] w-[50vw] max-w-[432px] rounded-full bg-accent-cyan opacity-20 blur-[86.4px]"
        animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[40vw] max-h-[360px] w-[40vw] max-w-[360px] rounded-full bg-accent-cyan opacity-20 blur-[72px]"
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Premium Grid overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
      />
      
      <div className="max-w-[1008px] mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-6 font-display text-5xl font-bold leading-tight tracking-tight text-heading md:text-7xl">
            Start Your Journey as a Sales Executive<br />
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl font-medium text-text">
            Internships, jobs, commissions, certificates, and real growth opportunities — all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link href="#apply" className="w-full sm:w-auto">
              <button className="group flex w-full items-center justify-center gap-2 rounded-full bg-primary-foreground px-12 py-5 font-bold text-primary shadow-[0_0_30px_rgb(var(--primary-foreground)_/_0.15)] transition-all hover:-translate-y-1 hover:shadow-[0_0_50px_rgb(var(--primary-foreground)_/_0.3)] sm:w-auto">
                Apply Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-12 py-5 font-semibold text-primary-foreground backdrop-blur-md transition-all hover:-translate-y-1 hover:border-primary-foreground/30 hover:bg-primary-foreground/10 sm:w-auto">
                Contact Us
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
