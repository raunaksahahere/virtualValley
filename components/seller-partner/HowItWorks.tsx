"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    { num: "01", title: "Apply Online", desc: "Fill out the simple form below in 60 seconds. No resume required." },
    { num: "02", title: "Instant Verification", desc: "No interviews. Instant profile verification to get you onboarded immediately." },
    { num: "03", title: "Training Material", desc: "Access premium sales decks, guides, and marketing assets." },
    { num: "04", title: "Start Pitching", desc: "Begin reaching out to businesses and generating high-quality leads." },
    { num: "05", title: "Earn & Certify", desc: "Get paid for successful closures and earn your verified certificate." },
  ];

  return (
    <section className="relative overflow-hidden border-y border-border bg-surface py-24 md:py-32">
      {/* Subtle Matrix Background */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(90deg, #081F5C 1px, transparent 1px)", backgroundSize: "60px 60px" }}
      />
      <div className="absolute top-0 right-0 w-[360px] h-[360px] bg-[radial-gradient(circle_at_center,rgba(51, 78, 172,0.06)_0%,transparent_60%)] pointer-events-none blur-3xl" />

      <div className="max-w-[1008px] mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <h2 className="mb-4 font-display text-4xl font-bold tracking-tight text-heading md:text-5xl">
            The Intern Journey
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text">
            A streamlined, interview-free process designed to get you earning and learning immediately.
          </p>
        </div>

        <div className="relative">
          {/* Animated Connecting Progress Line (Desktop) */}
          <div className="hidden lg:block absolute top-[28.8px] left-[10%] right-[10%] h-[2.2px] bg-[rgba(8,31,92,0.1)] rounded-full z-0 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#334EAC] to-[#081F5C]"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.2 + (i * 0.2), duration: 0.6 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Milestone Node */}
                <div className="w-20 h-20 rounded-2xl bg-white border border-[rgba(8,31,92,0.1)] flex items-center justify-center text-2xl font-black text-[#081F5C] mb-8 relative z-10 shadow-[0_10px_20px_rgba(8,31,92,0.05)] group-hover:-translate-y-2 transition-transform duration-300">
                  <span className="opacity-40 text-sm absolute top-1 left-2 font-bold">#</span>
                  {step.num}

                  {/* Glowing success checkmark that appears after delay */}
                  <motion.div
                    className="absolute -right-3 -top-3 bg-white rounded-full p-0.5 shadow-sm"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.6 + (i * 0.2), type: "spring" }}
                  >
                    <CheckCircle2 className="w-6 h-6 text-[#334EAC] fill-blue-50" />
                  </motion.div>
                </div>

                {/* Connecting Line (Mobile Vertical) */}
                {i !== steps.length - 1 && (
                  <div className="lg:hidden absolute top-20 bottom-[-2rem] left-1/2 w-[1.4px] bg-[rgba(8,31,92,0.1)] -translate-x-1/2 -z-10">
                    <motion.div
                      className="w-full bg-[#334EAC]"
                      initial={{ height: "0%" }}
                      whileInView={{ height: "100%" }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, delay: 0.4 + (i * 0.2) }}
                    />
                  </div>
                )}

                <h3 className="mb-3 text-lg font-bold text-heading">{step.title}</h3>
                <p className="max-w-[180px] text-sm leading-relaxed text-text">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
