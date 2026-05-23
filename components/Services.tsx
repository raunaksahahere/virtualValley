"use client";

import { motion } from "framer-motion";
import { Code, Instagram, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    title: "Website Development",
    icon: Code,
    features: [
      "Modern Frameworks",
      "SEO Optimized",
      "Secure & Reliable",
      "Fast Loading",
      "Mobile First",
    ],
  },
  {
    title: "Website Repair & Maintenance",
    icon: Zap,
    features: [
      "Bug Fixes",
      "Performance Optimization",
      "Security Updates",
      "Content Updates",
      "24/7 Support",
    ],
  },
  {
    title: "Social Media Management",
    icon: Instagram,
    features: [
      "Content Strategy",
      "Community Management",
      "Analytics & Reporting",
      "Brand Consistency",
      "Growth Hacking",
    ],
  },
];

const achievementTargets = [
  { label: "Bad Feedback", value: 0, suffix: "" },
  { label: "Satisfaction", value: 100, suffix: "%" },
  { label: "Projects", value: 50, suffix: "+" },
  { label: "Support", value: 24, suffix: "/7" },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) {
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 1200;

    const animate = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      setCounts(
        achievementTargets.map((item) => Math.round(item.value * progress)),
      );

      if (progress < 1) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [started]);

  return (
    <section id="services" className="py-20 md:py-28 overflow-hidden">
      <div className="section-shell" ref={sectionRef}>
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-gray-500">
            Capability stack
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-white md:text-5xl">
            Our <span className="text-gold-gradient">Services</span>
          </h2>
          <p className="section-copy mt-5">
            Virtual Valley blends fast execution, refined design, and growth-aware strategy across websites and social channels.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                className="group rounded-[2rem] glass-card-premium shadow-glow-white-hover p-6 md:p-8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:ring-1 group-hover:ring-gold/30">
                  <Icon size={24} />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                  {service.title}
                </h3>
                <ul className="mt-6 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                      <span className="h-2 w-2 rounded-full bg-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 rounded-[2rem] glass-card-premium shadow-glow-gold-hover border-gold/15 p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {achievementTargets.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 120, delay: index * 0.08 }}
                className="rounded-2xl border border-white/5 bg-black/30 p-5"
              >
                <div className="font-display text-3xl font-semibold text-white">
                  {counts[index]}
                  {item.suffix}
                </div>
                <div className="mt-2 text-sm text-gray-400">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
