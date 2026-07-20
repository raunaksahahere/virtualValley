"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BadgeCheck, Sparkles, Zap, ChevronLeft, ChevronRight, Play, CheckCircle2 } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import HeroBackground from "./HeroBackground";

export default function Hero() {
  const [hasVideoError, setHasVideoError] = useState(false);

  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const titleWordVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
      },
    },
  };

  return (
    <motion.section 
      className="relative min-h-screen overflow-hidden pt-28"
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration: 35, ease: "easeInOut", repeat: Infinity }}
      style={{ 
        backgroundImage: "linear-gradient(135deg, rgb(var(--surface-secondary)) 0%, rgb(var(--background)) 48%, rgb(var(--surface)) 100%)",
        backgroundSize: "400% 400%"
      }}
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35)_0%,transparent_60%)] blur-3xl" />
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <HeroBackground />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="section-shell relative flex min-h-[calc(100vh-7rem)] flex-col items-center justify-center py-16 text-center"
      >



        <motion.div
          variants={titleContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-4 xl:flex-row xl:gap-5"
        >
          <motion.span
            variants={titleWordVariants}
            className="group cursor-default font-display text-5xl font-extrabold tracking-[-0.06em] text-heading transition-all duration-300 md:text-7xl xl:text-[8rem]"
          >
            <span className="inline-block transition-all duration-300 group-hover:text-accent-cyan">
              VIRTUAL
            </span>
          </motion.span>

          <motion.div variants={titleWordVariants} className="relative shrink-0 flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="Virtual Valley Logo" 
              className="object-contain"
              style={{ 
                width: "clamp(70px, 9vw, 120px)",
                height: "clamp(70px, 9vw, 120px)",
                filter: "drop-shadow(1.5px 1.5px 0 rgb(var(--accent-cyan))) drop-shadow(-1.5px -1.5px 0 rgb(var(--accent-cyan)))"
              }}
            />
          </motion.div>

          <motion.span
            variants={titleWordVariants}
            className="font-display text-5xl font-extrabold tracking-[-0.06em] text-heading md:text-7xl xl:text-[8rem]"
          >
            VALLEY
          </motion.span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-5 font-display text-sm font-bold uppercase tracking-[0.55em] text-muted md:text-base"
        >
          we build you dominate
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ 
            opacity: 1, 
            y: 0,
          }}
          transition={{ 
            opacity: { duration: 0.7, delay: 0.35 },
            y: { duration: 0.7, delay: 0.35, ease: "easeOut" },
          }}
          className="mt-10 flex w-full max-w-2xl flex-col items-center gap-4 rounded-[2rem] border border-border bg-background/80 px-5 py-4 text-center shadow-[0_12px_30px_rgb(var(--primary)_/_0.08)] backdrop-blur-xl sm:flex-row sm:justify-between sm:text-left"
        >
          <div>
            <div className="flex items-center justify-center gap-2 text-base font-bold text-heading sm:justify-start">
              <CheckCircle2 size={18} className="text-accent-cyan" />
              <span>Trusted by 100+ businesses</span>
            </div>
            <p className="mt-1 text-sm text-muted">Complete digital presence, built around growth.</p>
          </div>
          <a href="#testimonials" className="inline-flex items-center justify-center rounded-full border border-accent-cyan px-4 py-2 text-sm font-semibold text-accent-cyan hover:bg-accent-cyan hover:text-primary-foreground">
            Read client reviews
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-8 max-w-3xl text-base leading-8 text-muted md:text-lg"
        >
          Virtual Valley helps startups, local businesses, and growing brands launch a stronger digital presence with enterprise-grade execution, premium design standards, and growth-focused strategy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a href="#services" className="btn-primary shadow-[0_0_24px_rgba(8,31,92,0.25)]">
            View Services
            <ArrowRight size={16} />
          </a>
        </motion.div>



      </motion.div>
    </motion.section>
  );
}
