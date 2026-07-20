"use client";

import { motion } from "framer-motion";
import { Check, Award, Wallet, TrendingUp } from "lucide-react";

export default function PartnerEarnings() {
  const cards = [
    {
      title: "Internship Benefits",
      subtitle: "For Students & Freshers",
      icon: Award,
      features: ["Verified Certificate of Internship", "Letter of Recommendation (Top Performers)", "Real-world Project Experience", "Flexible working hours"]
    },
    {
      title: "Sales Intern Incentives",
      subtitle: "For Sales Interns",
      icon: TrendingUp,
      features: ["High-ticket Commission per Deal", "Monthly Performance Bonuses", "Fast-tracked full-time offers", "Marketing & Sales Collaterals Provided"],
      highlight: true
    }
  ];

  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      {/* Background Graphic */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(#081F5C 1px, transparent 1px), linear-gradient(90deg, #081F5C 1px, transparent 1px)", backgroundSize: "80px 80px" }}
      />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[360px] bg-[radial-gradient(ellipse_at_bottom,rgba(51, 78, 172,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-[1008px] mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="mb-4 font-display text-4xl font-bold tracking-tight text-heading md:text-5xl">Clear & Transparent Rewards</h2>
          <p className="mx-auto max-w-2xl text-lg text-text">Choose your path and understand exactly what you earn for your effort.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="relative rounded-3xl bg-white border border-[rgba(8,31,92,0.08)] shadow-[0_10px_40px_rgba(8,31,92,0.03)] flex flex-col overflow-hidden group hover:shadow-[0_20px_60px_rgba(8,31,92,0.1)] hover:-translate-y-2 transition-all duration-300"
            >
              {/* Gradient Accent Strip */}
              <div className={`h-1.5 w-full ${card.highlight ? 'bg-gradient-to-r from-[#081F5C] to-[#334EAC]' : 'bg-[rgba(8,31,92,0.1)] group-hover:bg-[#334EAC] transition-colors duration-500'}`} />
              
              <div className="p-8 flex flex-col flex-1 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#081F5C]/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#334EAC]/10 transition-transform duration-300">
                  <card.icon className="text-[#081F5C]" size={28} />
                </div>
                
                <h3 className="mb-1 font-display text-2xl font-bold text-heading">{card.title}</h3>
                <p className="text-xs text-[#334EAC] font-bold uppercase tracking-widest mb-8">{card.subtitle}</p>
                
                <div className="w-full h-px bg-[rgba(8,31,92,0.08)] mb-8" />
                
                <ul className="space-y-4 flex-1">
                  {card.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-[#081F5C]/10 flex items-center justify-center shrink-0">
                        <Check size={12} className="text-[#081F5C]" strokeWidth={3} />
                      </div>
                      <span className="text-sm font-medium text-heading">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Very soft glowing orb inside card on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#334EAC]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#334EAC]/10 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
