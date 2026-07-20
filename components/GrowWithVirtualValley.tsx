"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { 
  TrendingUp, 
  Award, 
  Headset, 
  Clock, 
  Wallet, 
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Star,
  Activity,
  Users
} from "lucide-react";
import { useRef } from "react";

// ============================================================================
// ILLUSTRATION COMPONENTS (Continuous Premium Loops)
// ============================================================================

const PartnerDashboardIllustration = () => (
  <div className="relative flex h-80 w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-background/50 p-4 lg:h-[324px]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(var(--accent-cyan))_1px,transparent_1px)] opacity-10" style={{ backgroundSize: '24px 24px' }} />
     
    {/* Main Dashboard Window */}
    <motion.div 
      className="relative flex h-full w-full max-h-[273.6px] max-w-lg flex-col overflow-hidden rounded-xl border border-border bg-background shadow-[0_20px_50px_rgb(var(--primary)_/_0.1)]"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <div className="flex h-12 items-center justify-between border-b border-border bg-surface-secondary px-6">
        <div className="flex gap-2 items-center">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
            <Users className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-heading">Partner Portal</span>
        </div>
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-accent-cyan" />
          <div className="h-2.5 w-2.5 rounded-full bg-surface" />
          <div className="h-2.5 w-2.5 rounded-full bg-accent-green" />
        </div>
      </div>

      {/* Content Body */}
      <div className="relative flex flex-1 flex-col gap-4 overflow-hidden bg-surface-secondary p-6">
        
        {/* Top Cards Row */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Commission Counter Widget */}
          <div className="flex flex-col justify-center rounded-lg border border-border bg-background p-4 shadow-sm">
            <span className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">Total Commission</span>
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-bold text-heading">₹</span>
              <motion.div className="flex font-display text-2xl font-bold text-accent-cyan">
                <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 4, repeat: Infinity }}>4</motion.span>
                <motion.span animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>5</motion.span>
                <span>,</span>
                <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}>0</motion.span>
                <motion.span animate={{ y: [0, 2, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>0</motion.span>
                <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>0</motion.span>
              </motion.div>
            </div>
            {/* Tiny progress bar */}
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-surface-secondary">
              <motion.div 
                className="h-full bg-accent-cyan" 
                animate={{ width: ["0%", "100%", "0%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Partner Badge Widget */}
          <div className="relative flex items-center justify-center overflow-hidden rounded-lg border border-accent-cyan/40 bg-primary p-4 shadow-md">
            <motion.div 
              className="absolute inset-0 bg-[linear-gradient(45deg,transparent,rgba(255,255,255,0.1),transparent)]" 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
            />
            <div className="flex flex-col items-center gap-2 relative z-10">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/40 bg-primary-foreground/20">
                <Star className="h-5 w-5 fill-primary-foreground text-primary-foreground" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary-foreground">Verified Partner</span>
            </div>
          </div>

        </div>

        {/* Animated Graph Widget */}
        <div className="relative flex flex-1 flex-col overflow-hidden rounded-lg border border-border bg-surface-secondary p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">Growth Performance</span>
            <motion.div 
              className="rounded border border-accent-green/50 bg-accent-green/20 px-2 py-0.5 text-xs font-bold text-primary"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              +24%
            </motion.div>
          </div>
          
          <div className="flex-1 relative flex items-end justify-between px-2">
            {/* Animated Bars */}
            {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
              <motion.div 
                key={i}
                className="w-4 rounded-t-sm border-x border-t border-border bg-surface"
                initial={{ height: "0%" }}
                animate={{ height: [`0%`, `${h}%`, `${h}%`, `0%`] }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  times: [0, 0.2, 0.8, 1],
                  delay: i * 0.1 
                }}
              />
            ))}
            
            {/* Drawing Line Graph overlay */}
            <svg className="absolute inset-0 w-full h-full preserve-3d" preserveAspectRatio="none">
              <motion.path 
                d="M 10 80 Q 50 60 90 90 T 170 30 T 250 60 T 330 20"
                fill="none"
                stroke="rgb(var(--accent-cyan))"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 1, 0] }}
                transition={{ duration: 8, repeat: Infinity, times: [0, 0.3, 0.8, 1], ease: "easeInOut" }}
              />
            </svg>
          </div>
        </div>

        {/* Notification Toast floating up */}
        <motion.div 
          className="absolute bottom-6 right-6 flex items-center gap-3 rounded-lg border border-border bg-surface-secondary p-3 shadow-[0_10px_20px_rgb(var(--primary)_/_0.1)]"
          animate={{ y: [40, 0, 0, 40], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, times: [0, 0.1, 0.9, 1] }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-green/30">
            <CheckCircle2 className="h-4 w-4 text-accent-green" />
          </div>
          <div>
            <p className="text-xs font-bold text-heading">Referral Accepted</p>
            <p className="text-xs text-muted">Payment verified • Just now</p>
          </div>
        </motion.div>

      </div>
    </motion.div>
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function GrowWithVirtualValley() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const features = [
    { icon: TrendingUp, text: "High Commission" },
    { icon: Award, text: "Verified Certificates" },
    { icon: Headset, text: "Premium Support" },
    { icon: Clock, text: "Flexible Timing" },
    { icon: Wallet, text: "Weekly Payouts" },
    { icon: GraduationCap, text: "Internship Track" },
  ];

  return (
    <section className="dark-section relative overflow-hidden py-24 md:py-32" ref={containerRef}>
      
      {/* ------------------------------------------------------------- */}
      {/* BACKGROUND (SERVICES AESTHETIC) */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Blueprint Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`, 
            backgroundSize: '60px 60px' 
          }} 
        />
        
        {/* Soft Cream Light Ray */}
        <motion.div 
          className="absolute -top-[50%] -left-[20%] w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(240,237,211,0.06),transparent_60%)] rotate-12 blur-[28.8px]"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="section-shell relative z-10 max-w-[1008px]">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 items-center">
          
          {/* ------------------------------------------------------------- */}
          {/* LEFT SIDE (Content & Cream Capsule Buttons) */}
          {/* ------------------------------------------------------------- */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground">Growth Partner Program</span>
              </div>
              
              <h2 className="mb-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-heading md:text-5xl lg:text-[37.4px]">
                Grow alongside <br/>
                <span className="text-primary-foreground">Virtual Valley</span>
              </h2>
              
              <p className="mb-10 max-w-xl text-lg leading-relaxed text-text">
                Join our exclusive partner ecosystem. Earn recurring commissions by connecting businesses with premium digital solutions. No investment. No targets. Just real growth.
              </p>
            </motion.div>

            {/* Cream Capsule Buttons (Services Style) */}
            <div className="flex flex-wrap gap-3 mb-12">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: 0.2 + (idx * 0.05) }}
                  className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-foreground/30 hover:bg-primary-foreground/10 hover:shadow-[0_4px_15px_rgb(var(--primary-foreground)_/_0.1)]"
                >
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                  <feature.icon className="relative z-10 h-3.5 w-3.5 text-primary-foreground" />
                  <span className="relative z-10 text-xs font-semibold text-primary-foreground/90">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link href="/seller-partner" className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-primary-foreground px-8 py-4 text-sm font-bold text-primary shadow-[0_10px_20px_rgb(var(--primary-foreground)_/_0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface">
                Become a Partner
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/seller-partner#benefits" className="group inline-flex items-center justify-center gap-2 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-8 py-4 text-sm font-bold text-primary-foreground transition-all duration-300 hover:border-primary-foreground/30 hover:bg-primary-foreground/10">
                View Benefits
              </Link>
            </motion.div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* RIGHT SIDE (Premium Dashboard Illustration) */}
          {/* ------------------------------------------------------------- */}
          <div className="hidden w-full lg:block lg:w-1/2">
            <PartnerDashboardIllustration />
          </div>
          <div className="flex w-full items-center justify-between rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 px-5 py-4 text-primary-foreground lg:hidden">
            <span className="text-sm font-semibold">Partner portal</span>
            <span className="text-sm font-bold">₹45,000 earned</span>
          </div>

        </div>
      </div>
    </section>
  );
}
