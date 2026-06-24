"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function PartnerEarnings() {
  const cards = [
    {
      title: "Internship Benefits",
      subtitle: "For Students & Freshers",
      color: "from-blue-500/20 to-blue-900/20",
      border: "border-blue-500/30",
      textColor: "text-blue-400",
      features: ["Verified Certificate of Internship", "Letter of Recommendation (Top Performers)", "Real-world Project Experience", "Flexible working hours"]
    },
    {
      title: "Referral Commission",
      subtitle: "For Connectors",
      color: "from-green-500/20 to-green-900/20",
      border: "border-green-500/30",
      textColor: "text-green-400",
      features: ["Flat Commission on Successful Leads", "No deal closing required", "Passive income stream", "Dashboard tracking"]
    },
    {
      title: "Seller Incentives",
      subtitle: "For Sales Partners",
      color: "from-purple-500/20 to-purple-900/20",
      border: "border-purple-500/30",
      textColor: "text-purple-400",
      features: ["High-ticket Commission per Deal", "Monthly Performance Bonuses", "Dedicated Support Manager", "Marketing & Sales Collaterals Provided"]
    }
  ];

  return (
    <section className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Partner Earnings</h2>
          <p className="text-white/50 text-lg">Clear, transparent rewards for your effort.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-3xl border ${card.border} bg-gradient-to-b ${card.color} p-8 flex flex-col relative overflow-hidden backdrop-blur-sm`}
            >
              <h3 className={`font-display text-2xl font-bold ${card.textColor} mb-1`}>{card.title}</h3>
              <p className="text-sm text-white/50 uppercase tracking-widest mb-8">{card.subtitle}</p>
              
              <ul className="space-y-4 flex-1">
                {card.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check size={18} className={`${card.textColor} mt-0.5 flex-shrink-0`} />
                    <span className="text-white/80">{feat}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
