"use client";

import { motion } from "framer-motion";
import { 
  BookOpen, Trophy, Globe, FileText, 
  Award, TrendingUp, Clock, ArrowUpRight 
} from "lucide-react";

export default function WhyJoinSection() {
  const benefits = [
    { icon: BookOpen, title: "Earn While Learning", desc: "Gain real-world business experience while earning commissions." },
    { icon: Trophy, title: "Industry Experience", desc: "Work with real clients and solve actual business problems." },
    { icon: Globe, title: "Work Remotely", desc: "100% remote. Work from your dorm, home, or anywhere." },
    { icon: FileText, title: "Build Your Resume", desc: "Add verifiable experience to your CV that employers love." },
    { icon: Award, title: "Internship Certificate", desc: "Get an official certificate upon successful completion." },
    { icon: TrendingUp, title: "Performance Rewards", desc: "The more deals you close, the higher your incentives grow." },
    { icon: Clock, title: "Flexible Hours", desc: "No 9-to-5. Work whenever it fits your class or freelance schedule." },
    { icon: ArrowUpRight, title: "Full-Time Potential", desc: "Top performers get fast-tracked for full-time job offers." },
  ];

  return (
    <section className="py-24 bg-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Why Join Us?</h2>
          <p className="text-white/50 text-lg">Everything you need to launch your career and earn independently.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
            >
              <benefit.icon className="text-purple-400 mb-4" size={28} />
              <h3 className="text-white font-bold mb-2">{benefit.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
