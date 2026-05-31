"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [count, setCount] = useState(0);
  const [hasVideoError, setHasVideoError] = useState(false);

  useEffect(() => {
    let animationFrame = 0;
    const start = performance.now();
    const duration = 2000;
    const target = 50;

    const tick = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.round(progress * target));
      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    animationFrame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

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
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-neutral-950 to-black pt-28">
      <div className="animated-grid absolute inset-0 opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(201,168,76,0.08),transparent_18%)]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="section-shell relative flex min-h-[calc(100vh-7rem)] flex-col items-center justify-center py-16 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 font-display text-lg font-semibold uppercase tracking-[0.45em] text-gray-300 md:text-2xl"
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
            className="group cursor-default font-display text-4xl font-extrabold tracking-[-0.06em] text-white transition-all duration-300 md:text-6xl lg:text-8xl"
          >
            <span className="inline-block transition-all duration-300 group-hover:text-gold-gradient">
              VIRTUAL
            </span>
          </motion.span>

          <motion.div
            variants={titleWordVariants}
            className="shrink-0"
          >
            {hasVideoError ? (
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-gold/30 bg-white/5 font-display text-xl font-bold tracking-[0.3em] text-white shadow-glow-gold md:h-32 md:w-32 lg:h-40 lg:w-40">
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
                className="h-16 w-auto object-contain md:h-32 lg:h-40"
                style={{ mixBlendMode: "screen" }}
              >
                <source src="/logovid.webm" type="video/webm" />
              </video>
            )}
          </motion.div>

          <motion.span
            variants={titleWordVariants}
            className="font-display text-4xl font-extrabold tracking-[-0.06em] text-white md:text-6xl lg:text-8xl"
          >
            VALLEY
          </motion.span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-6 font-display text-lg font-semibold uppercase tracking-[0.45em] text-gray-300 md:text-2xl"
        >
          you dominate
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.65 }}
          className="pulse-card mt-12 w-full max-w-md rounded-[2rem] glass-card-premium shadow-glow-white-hover p-8"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-gray-400">
            Client momentum
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold md:text-3xl">
            Celebrating <span className="text-white">{count}+</span> Customers
          </h2>
          <p className="mt-3 text-sm leading-7 text-gray-300">
            Trusted by founders, local businesses, and growth-minded teams who want a stronger digital presence across India.
          </p>
          <Link href="/growth-partner" className="btn-secondary mt-6 gap-2 hover:shadow-glow-white-hover">
            Become a Growth Partner
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a href="#pricing" className="btn-primary shadow-glow-white-hover">
            View Packages
          </a>
          <a href="#portfolio" className="btn-secondary hover:shadow-glow-white-hover">
            Recent Projects
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
