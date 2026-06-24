"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, MapPin, MessageCircle, Zap } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Hero() {
  const [hasVideoError, setHasVideoError] = useState(false);
  const trustItems = [
    { label: "7–14 Day Delivery", icon: Zap },
    { label: "WhatsApp Support", icon: MessageCircle },
    { label: "Kolkata-Based Team", icon: MapPin },
    { label: "100% Satisfaction", icon: BadgeCheck },
  ];

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
    <section className="relative min-h-screen overflow-hidden pt-28">
      <Image
        src="/TGS.png"
        alt=""
        width={1400}
        height={900}
        priority
        aria-hidden="true"
        className="absolute left-1/2 top-0 -translate-x-1/2 w-[180%] sm:w-[130%] max-w-none pointer-events-none select-none"
        style={{ opacity: 0.10 }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(139,92,246,0.24),transparent_24%),radial-gradient(circle_at_78%_14%,rgba(212,175,55,0.1),transparent_14%),radial-gradient(circle_at_50%_55%,rgba(255,255,255,0.04),transparent_28%)]" />
      <div className="absolute inset-x-0 top-24 h-56 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.22),transparent_58%)] blur-3xl" />
      <div className="absolute inset-x-0 top-[34%] h-40 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08),transparent_62%)] blur-3xl" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="section-shell relative z-10 flex min-h-[calc(100vh-7rem)] flex-col items-center justify-center py-16 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-white-secondary backdrop-blur-md"
        >
          <span className="h-2 w-2 rounded-full bg-purple" />
          Digital Agency · Kolkata, India
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 font-display text-sm font-semibold uppercase tracking-[0.55em] text-white-secondary md:text-base"
        >
          we build
        </motion.p>

        <motion.div
          variants={titleContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-5 lg:flex-row lg:gap-8"
        >
          <motion.span
            variants={titleWordVariants}
            className="group cursor-default font-display text-5xl font-extrabold tracking-[-0.08em] text-white transition-all duration-300 md:text-7xl lg:text-[8rem]"
          >
            <span className="inline-block transition-all duration-300 group-hover:bg-luxury-gradient group-hover:bg-clip-text group-hover:text-transparent">
              VIRTUAL
            </span>
          </motion.span>

          <motion.div variants={titleWordVariants} className="relative shrink-0">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.26),transparent_58%)] blur-2xl" />
            <div className="absolute inset-2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.14),transparent_62%)] blur-2xl" />
            {hasVideoError ? (
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-gold/30 bg-white/5 font-display text-xl font-bold tracking-[0.3em] text-white shadow-glow-gold md:h-32 md:w-32 lg:h-40 lg:w-40">
                VV
              </div>
            ) : (
              <video
                autoPlay
                loop
                muted
                playsInline
                poster="/logo-poster.webp"
                preload="metadata"
                onError={() => setHasVideoError(true)}
                className="relative h-16 w-auto object-contain md:h-32 lg:h-40"
                style={{
                  mixBlendMode: "screen",
                  background: "transparent",
                }}
              >
                <source src="/logovid.webm" type="video/webm" />
              </video>
            )}
          </motion.div>

          <motion.span
            variants={titleWordVariants}
            className="font-display text-5xl font-extrabold tracking-[-0.08em] text-white md:text-7xl lg:text-[8rem]"
          >
            VALLEY
          </motion.span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-5 font-display text-sm font-semibold uppercase tracking-[0.55em] text-white-secondary md:text-base"
        >
          you dominate
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white-secondary md:text-lg"
        >
          We build websites, manage social media, and drive real growth for businesses across Kolkata and West Bengal — straightforward work, honest timelines, results you can measure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a href="#pricing" className="btn-primary shadow-glow-purple-hover">
            View Packages
            <ArrowRight size={16} />
          </a>
          <a href="#portfolio" className="btn-secondary hover:shadow-glow-white-hover">
            Recent Projects
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {trustItems.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="trust-pill">
                <Icon size={14} className="text-purple" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </motion.div>


      </motion.div>
    </section>
  );
}
