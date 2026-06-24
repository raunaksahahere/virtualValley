"use client";

import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    { num: "01", title: "Apply Online", desc: "Fill out the simple form below in 60 seconds." },
    { num: "02", title: "Quick Verification", desc: "No interviews. Just quick profile verification." },
    { num: "03", title: "Training Material", desc: "Receive sales decks, guides, and marketing assets." },
    { num: "04", title: "Start Working", desc: "Begin reaching out to businesses and generating leads." },
    { num: "05", title: "Earn & Grow", desc: "Get paid for successful closures and earn your certificate." },
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-white/50 text-lg">Start your journey in 5 simple steps.</p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -translate-y-1/2" />
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-black border-2 border-purple-500/50 flex items-center justify-center text-xl font-bold text-white mb-6 relative z-10 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                  {step.num}
                </div>
                <h3 className="font-bold text-white mb-2 text-lg">{step.title}</h3>
                <p className="text-sm text-white/50">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
