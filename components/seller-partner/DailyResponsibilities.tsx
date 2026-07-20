"use client";

import { motion } from "framer-motion";
import { 
  PhoneCall, 
  Megaphone, 
  Target, 
  CalendarClock, 
  ClipboardCheck,
  CheckCircle2
} from "lucide-react";
import { useEffect, useState } from "react";

export default function DailyResponsibilities() {
  const [activeNode, setActiveNode] = useState(0);

  // Animate the active node dot looping through 1 to 5
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 5);
    }, 2000); // changes every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const responsibilities = [
    {
      title: "Cold Calling",
      icon: PhoneCall,
      desc: "Reach out to local businesses using the provided calling script and introduce yourself professionally.",
      iconAnimation: {
        animate: { rotate: [0, -15, 15, -15, 15, 0], scale: [1, 1.1, 1] },
        transition: { duration: 2, repeat: Infinity, repeatDelay: 2 }
      }
    },
    {
      title: "Introduce Our Services",
      icon: Megaphone,
      desc: "Briefly explain how Virtual Valley helps businesses through Website Development, Branding, Online Presence, AI Automation, Ads Management, and App Development.",
      iconAnimation: {
        animate: { scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] },
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
      }
    },
    {
      title: "Find Interested Clients",
      icon: Target,
      desc: "Understand the business owner's requirements and identify whether they are genuinely interested in learning more.",
      iconAnimation: {
        animate: { scale: [1, 1.2, 1], rotate: [0, 90, 0] },
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
      }
    },
    {
      title: "Schedule Meetings",
      icon: CalendarClock,
      desc: "Book a meeting between the interested business owner and the Virtual Valley sales team so we can explain the solution, answer questions, and close the deal.",
      iconAnimation: {
        animate: { y: [0, -5, 0] },
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
      }
    },
    {
      title: "Submit Daily Report",
      icon: ClipboardCheck,
      desc: "Submit your Daily Activity Report to the Sales Manager every day, even if you couldn't connect with anyone or complete any work that day. Consistent reporting is a mandatory part of the internship.",
      iconAnimation: {
        animate: { rotate: [0, 5, -5, 0] },
        transition: { duration: 1.5, repeat: Infinity, repeatDelay: 1 }
      }
    }
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Your Daily Responsibilities
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground/60 text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Every Sales Intern follows a simple daily workflow to help businesses discover Virtual Valley while gaining real-world sales experience.
          </motion.p>
        </div>

        {/* Workflow Container */}
        <div className="relative">
          
          {/* Animated Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-0.5 bg-[#081F5C]/10 z-0">
            {/* Glowing Dot overlay moving across */}
            <motion.div 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#334EAC] shadow-[0_0_15px_#334EAC] z-10"
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            {/* Pulsing Trail */}
            <motion.div 
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-transparent via-[#334EAC]/40 to-transparent"
              animate={{ width: ["0%", "100%", "0%"], left: ["0%", "0%", "100%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Cards Grid/Flex */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-4 justify-between relative z-10">
            
            {/* Animated Connecting Line (Mobile/Tablet) */}
            <div className="lg:hidden absolute top-[50px] bottom-[50px] left-[40px] w-0.5 bg-[#081F5C]/10 z-0">
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#334EAC] shadow-[0_0_15px_#334EAC] z-10"
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {responsibilities.map((res, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="group relative flex-1"
              >
                {/* Floating animation for the card itself */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                  className="h-full"
                >
                  <div className="relative z-10 ml-16 flex h-full flex-col items-center rounded-[22px] border border-border bg-surface p-6 text-center transition-all duration-500 hover:-translate-y-2.5 hover:border-accent-cyan hover:shadow-[0_15px_40px_rgb(var(--primary)_/_0.1)] lg:ml-0 lg:items-start lg:p-5 lg:text-left">
                    
                    {/* Node Circle for Mobile inside the ml-16 margin space */}
                    <div className="lg:hidden absolute -left-16 top-6 w-12 flex justify-center">
                      <div className={`h-4 w-4 rounded-full border-2 border-background transition-colors duration-500 ${activeNode === i ? 'scale-125 bg-accent-cyan' : 'bg-border'}`} />
                    </div>

                    <div className="mb-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-background shadow-sm mx-auto lg:mx-0">
                      <motion.div {...res.iconAnimation}>
                        <res.icon className="text-[#081F5C]" size={26} strokeWidth={1.5} />
                      </motion.div>
                    </div>
                    
                    <h3 className="mb-3 text-[17px] font-bold leading-snug text-heading">
                      {res.title}
                    </h3>
                    
                    <p className="flex-1 text-sm leading-relaxed text-text">
                      {res.desc}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Highlight Capsule */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="group relative mx-auto mt-20 max-w-4xl overflow-hidden rounded-3xl border border-border bg-surface p-8 text-center shadow-[0_10px_30px_rgb(var(--primary)_/_0.03)] md:p-10"
        >
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
          
          <p className="mx-auto mb-8 max-w-2xl text-lg font-medium leading-relaxed text-heading md:text-xl">
            A successful Sales Intern doesn&apos;t just make calls—they build connections, identify opportunities, schedule meaningful meetings, and report their progress consistently every day.
          </p>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {[
              "📞 Cold Calling", 
              "🤝 Meeting Booking", 
              "🎯 Lead Qualification", 
              "📋 Daily Reporting"
            ].map((badge, idx) => (
              <motion.div
                key={badge}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2, ease: "easeInOut" }}
                className="cursor-default rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-heading shadow-sm transition-all hover:border-accent-cyan hover:text-accent-cyan hover:shadow-md"
              >
                {badge}
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
