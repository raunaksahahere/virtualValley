"use client";

import { motion } from "framer-motion";
import { 
  BookOpen, Trophy, Globe, FileText, 
  Award, TrendingUp, Clock, ArrowUpRight 
} from "lucide-react";

export default function WhyJoinSection() {
  const benefits = [
    { span: "lg:col-span-8", icon: BookOpen, title: "Earn While Learning", desc: "Gain real-world business experience while earning commissions on every successful deal you bring in." },
    { span: "lg:col-span-4", icon: Trophy, title: "Industry Experience", desc: "Work with real clients and solve actual business problems." },
    { span: "lg:col-span-4", icon: Globe, title: "Work Remotely", desc: "100% remote. Work from your dorm, home, or anywhere in the world." },
    { span: "lg:col-span-4", icon: FileText, title: "Build Your Resume", desc: "Add verifiable enterprise experience to your CV that employers love." },
    { span: "lg:col-span-4", icon: Award, title: "Internship Certificate", desc: "Get an official certificate upon successful completion." },
    { span: "lg:col-span-6", icon: TrendingUp, title: "Performance Rewards", desc: "The more deals you close, the higher your incentives grow. No earning caps." },
    { span: "lg:col-span-6", icon: Clock, title: "Flexible Hours", desc: "No 9-to-5. Work whenever it fits your class or freelance schedule." },
    { span: "lg:col-span-12", icon: ArrowUpRight, title: "Full-Time Potential", desc: "Top performers get fast-tracked for full-time job offers at Virtual Valley." },
  ];

  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      {/* Background Graphic */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#081F5C 1px, transparent 1px)", backgroundSize: "40px 40px" }}
      />
      <div className="absolute -left-40 top-40 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(51, 78, 172,0.1)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-[1008px] mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="mb-4 font-display text-4xl font-bold tracking-tight text-heading md:text-5xl">Why Join Us?</h2>
          <p className="mx-auto max-w-2xl text-lg text-text">Everything you need to launch your career, learn from experts, and earn independently.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className={`group relative p-8 rounded-[2rem] bg-white border border-[rgba(8,31,92,0.08)] shadow-[0_10px_30px_rgba(8,31,92,0.04)] hover:shadow-[0_20px_50px_rgba(8,31,92,0.1)] transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col ${benefit.span}`}
            >
              {/* Gradient Border Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2rem] ring-1 ring-inset ring-[#334EAC]/20" />
              
              <div className="w-14 h-14 rounded-2xl bg-[#081F5C]/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#334EAC]/10 transition-transform duration-300">
                <benefit.icon className="text-[#334EAC]" size={28} />
              </div>
              
              <h3 className="mb-3 text-xl font-bold text-heading">{benefit.title}</h3>
              <p className="flex-grow text-base leading-relaxed text-text">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
