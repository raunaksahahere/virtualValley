"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Users, Rocket, CheckCircle2 } from "lucide-react";

export default function OpportunitiesSection() {
  const opps = [
    {
      title: "Internship Program",
      icon: <GraduationCap size={24} className="text-accent-cyan" />,
      color: "from-accent-cyan/20 to-transparent",
      borderColor: "border-accent-cyan/30",
      features: ["No Interview", "Flexible Timing", "Work From Anywhere", "Certificate Included", "Real Projects"]
    },
    {
      title: "Job Opportunities",
      icon: <Briefcase size={24} className="text-accent-cyan" />,
      color: "from-primary/20 to-transparent",
      borderColor: "border-primary/30",
      features: ["Sales Executive", "Business Development", "Client Acquisition", "Performance Based Growth"]
    },
    {
      title: "Referral Partner",
      icon: <Users size={24} className="text-accent-cyan" />,
      color: "from-primary/20 to-transparent",
      borderColor: "border-primary/30",
      features: ["Refer Businesses", "Earn Commission", "No Fixed Hours", "Unlimited Referrals"]
    },
    {
      title: "Sales Intern",
      icon: <Rocket size={24} className="text-accent-cyan" />,
      color: "from-accent-cyan/20 to-transparent",
      borderColor: "border-accent-cyan/30",
      features: ["Generate Leads", "Close Deals", "Monthly Incentives", "Commission Structure"]
    }
  ];

  return (
    <section id="opportunities" className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Opportunities Available</h2>
          <p className="text-foreground/50 text-lg max-w-2xl mx-auto">Choose the path that fits your current goals and start growing with Virtual Valley today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {opps.map((opp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border ${opp.borderColor} bg-gradient-to-b ${opp.color} p-6 flex flex-col relative overflow-hidden backdrop-blur-md hover:-translate-y-2 transition-transform duration-300`}
            >
              <div className="h-12 w-12 rounded-xl bg-background/50 border border-border flex items-center justify-center mb-6">
                {opp.icon}
              </div>
              <h3 className="font-bold text-xl text-foreground mb-6">{opp.title}</h3>
              
              <ul className="space-y-4 flex-1">
                {opp.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-foreground/40 mt-1 flex-shrink-0" />
                    <span className="text-sm text-foreground/70 leading-tight">{feat}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-4 border-t border-border">
                <button className="text-foreground text-sm font-semibold uppercase tracking-widest hover:text-accent-cyan transition-colors flex items-center gap-2">
                  Apply for this <span className="text-accent-cyan">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
