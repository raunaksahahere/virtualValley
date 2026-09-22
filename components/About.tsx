"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import CountUp from "react-countup";
import { 
  Globe, 
  Sparkles, 
  TrendingUp, 
  Palette, 
  Zap, 
  Shield, 
  Rocket, 
  ArrowRight,
  BarChart3,
  Users
} from "lucide-react";

const stats = [
  { label: "Clients Served", value: 100, suffix: "+", icon: TrendingUp, color: "text-accent-cyan", bg: "bg-accent-cyan/10", featured: true },
  { label: "Projects Completed", value: 50, suffix: "+", icon: Globe, color: "text-heading", bg: "bg-primary/10" },
  { label: "Average Satisfaction", value: 100, suffix: "%", icon: Sparkles, color: "text-accent-cyan", bg: "bg-accent-cyan/10" },
  { label: "Years Experience", value: 3, suffix: "+", icon: Palette, color: "text-heading", bg: "bg-primary/10" },
];

const journeySteps = [
  {
    step: "01",
    title: "Audit the opportunity",
    copy: "We map the gaps that keep customers from finding and trusting your business.",
  },
  {
    step: "02",
    title: "Build the foundation",
    copy: "We connect brand, website, local presence, and a conversion-ready experience.",
  },
  {
    step: "03",
    title: "Improve and scale",
    copy: "We measure what works and keep the growth system moving.",
  },
];

const ecosystem = [
  "Website",
  "AI Automation",
  "Digital Branding",
  "Ads Management",
  "App Development",
  "Local SEO",
  "Social",
  "CRM",
  "Content",
  "Analytics",
];

const partners = [
  {
    initials: "AS",
    name: "Abhirup Sarkar",
    role: "Chief Executive Officer",
    tag: "CEO & Founder",
    icon: Rocket,
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
    border: "border-accent-cyan/30",
    description:
      "Abhirup founded Virtual Valley with a single conviction — that every business, regardless of size, deserves a world-class digital presence. He leads the company's vision, client strategy, and product direction, ensuring every engagement delivers measurable growth.",
    expertise: ["Business Strategy", "Product Vision", "Client Relations", "Growth Architecture"],
  },
  {
    initials: "RS",
    name: "Raunak Saha",
    role: "Chief Operating Officer",
    tag: "COO & Co-Founder",
    icon: Users,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    description:
      "Raunak is the operational backbone of Virtual Valley. He designs and refines the internal workflows that allow the team to deliver premium results at speed. From project pipelines to partner onboarding, Raunak ensures every moving part runs in perfect sync.",
    expertise: ["Operations", "Team Leadership", "Process Design", "Quality Assurance"],
  },
  {
    initials: "SR",
    name: "Shayan Roy",
    role: "Chief Marketing Officer",
    tag: "CMO & Co-Founder",
    icon: BarChart3,
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
    border: "border-accent-cyan/30",
    description:
      "Shayan drives the marketing engine that keeps Virtual Valley top-of-mind with the right audiences. He crafts brand narratives, leads demand generation, and builds the systems that turn attention into revenue — for both Virtual Valley and the clients it serves.",
    expertise: ["Brand Strategy", "Digital Advertising", "Content", "Demand Generation"],
  },
];

const timelineSteps = [
  "Website Development",
  "Online Presence",
  "Digital Branding",
  "AI Automation",
  "Ads & Growth",
  "Business Success"
];

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 553);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      {/* ------------------------------------------------------------- */}
      {/* BACKGROUND: Blueprint Grid & Gradient & Particles */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Slow moving radial gradient */}
        <motion.div 
          className="absolute inset-0 opacity-[0.03]"
          animate={{
            background: [
              "radial-gradient(circle at 0% 0%, #081F5C 0%, transparent 50%)",
              "radial-gradient(circle at 100% 100%, #081F5C 0%, transparent 50%)",
              "radial-gradient(circle at 0% 100%, #081F5C 0%, transparent 50%)",
              "radial-gradient(circle at 0% 0%, #081F5C 0%, transparent 50%)",
            ]
          }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        />
        
        {/* Blueprint Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(#081F5C 1px, transparent 1px), linear-gradient(90deg, #081F5C 1px, transparent 1px)`, 
            backgroundSize: '40px 40px' 
          }} 
        />

        {/* Floating Particles */}
        {[
          { w: 21, h: 22, l: 34, t: 44, y: -80, x: 10, d: 18 },
          { w: 15, h: 16, l: 15, t: 24, y: -60, x: -15, d: 22 },
          { w: 16, h: 26, l: 74, t: 28, y: -120, x: 5, d: 16 },
          { w: 21, h: 23, l: 35, t: 21, y: -90, x: 20, d: 19 },
          { w: 14, h: 18, l: 9, t: 42, y: -50, x: -10, d: 24 },
          { w: 24, h: 22, l: 43, t: 22, y: -70, x: 15, d: 20 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-accent-cyan opacity-10 blur-sm"
            style={{
              width: p.w,
              height: p.h,
              left: `${p.l}%`,
              top: `${p.t}%`,
            }}
            animate={{
              y: [0, p.y, 0],
              x: [0, p.x, 0],
            }}
            transition={{
              duration: p.d,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="section-shell relative z-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] items-center">
          
          {/* ------------------------------------------------------------- */}
          {/* LEFT SIDE (45%) */}
          {/* ------------------------------------------------------------- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col space-y-8"
          >
            <div>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-muted">
                ABOUT VIRTUAL VALLEY
              </p>
              <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-heading md:text-5xl lg:text-6xl">
                Building Businesses<br />
                That{" "}
                <span className="text-accent-cyan-gradient">
                  People Remember.
                </span>
              </h2>
            </div>

            <p className="max-w-lg text-lg leading-relaxed text-text">
              Virtual Valley helps startups, local businesses and growing brands build a stronger digital presence through premium websites, AI automation, branding, online presence management, app development and digital advertising.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="#contact" 
                className="btn-primary px-7 py-3.5 shadow-[0_10px_30px_rgb(var(--primary)_/_0.2)]"
              >
                Book a Call
              </a>
              <a 
                href="#services" 
                className="inline-flex items-center justify-center rounded-full border border-border bg-background px-7 py-3.5 text-sm font-semibold text-heading shadow-sm transition-all hover:-translate-y-1 hover:border-accent-cyan hover:bg-surface/30"
              >
                View Services
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 gap-4 border-t border-primary/5 pt-6 sm:grid-cols-3">
              {[
                { icon: Zap, text: "Fast Execution" },
                { icon: Shield, text: "Long-Term Support" },
                { icon: Rocket, text: "Growth Focused" },
              ].map((highlight, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="group flex cursor-default items-center gap-3 text-text transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-cyan/5 transition-colors group-hover:bg-accent-cyan/10">
                    <highlight.icon className="h-4 w-4 text-accent-cyan" />
                  </div>
                  <span className="text-sm font-semibold">{highlight.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ------------------------------------------------------------- */}
          {/* RIGHT SIDE (Dashboard) */}
          {/* ------------------------------------------------------------- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
            style={{ y: typeof window !== 'undefined' && window.innerWidth > 737 ? y : 0 }}
            className="relative w-full overflow-hidden rounded-[2.5rem] border border-accent-cyan/15 bg-surface p-8 shadow-[0_30px_80px_rgb(var(--primary)_/_0.08)] md:p-10"
          >
            {/* Dashboard Inner Glow / Reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />

            <div className="relative z-10 flex flex-col h-full space-y-10">
              
              {/* Statistics Grid */}
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {stats.map((stat, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`flex flex-col rounded-2xl border border-background/60 bg-background/70 p-6 shadow-[0_8px_30px_rgb(var(--primary)_/_0.04)] backdrop-blur-md ${stat.featured ? "col-span-2" : ""}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: idx }}
                        >
                          <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </motion.div>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-4xl font-bold text-heading md:text-5xl">
                        <CountUp end={stat.value} duration={2.5} enableScrollSpy scrollSpyOnce />
                      </span>
                      <span className="text-2xl font-bold text-accent-cyan">{stat.suffix}</span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-muted">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Timeline Bottom */}
              <div className="rounded-2xl bg-white/60 backdrop-blur-md border border-white/50 p-6 shadow-[0_8px_30px_rgba(8,31,92,0.04)]">
                <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-heading">The Valley Pipeline</h3>
                
                <div className="relative flex flex-col md:flex-row justify-between gap-6 md:gap-2">
                  {/* Connecting Line */}
                  <div className="absolute top-[10.1px] left-[10.1px] md:top-[10.1px] md:left-6 md:right-6 bottom-6 md:bottom-auto w-[1.4px] md:w-auto md:h-[1.4px] bg-[#081F5C]/10 rounded-full" />
                  
                  {/* Animated Glow on Line */}
                  <motion.div 
                    className="absolute top-[10.1px] left-[10.1px] rounded-full shadow-[0_0_10px_rgb(var(--accent-cyan))] md:top-[10.1px] md:left-6"
                    animate={{ 
                      height: isMobile ? ["0%", "100%", "100%", "0%"] : "2px",
                      width: isMobile ? "2px" : ["0%", "100%", "100%", "0%"],
                      backgroundColor: "rgb(var(--accent-cyan))"
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {timelineSteps.map((step, idx) => (
                    <div key={idx} className="relative z-10 flex flex-row md:flex-col items-center gap-4 md:gap-3 group">
                      <motion.div 
                        className="w-[21.6px] h-[21.6px] rounded-full bg-white border-[2.2px] border-[#F0EDD3] shadow-sm flex items-center justify-center relative shrink-0"
                        animate={{ scale: [1, 1.15, 1], borderColor: ["rgb(var(--surface))", "rgb(var(--accent-cyan))", "rgb(var(--surface))"] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
                      >
                        <div className="h-2 w-2 rounded-full bg-primary transition-colors group-hover:bg-accent-cyan" />
                      </motion.div>
                      <span className="max-w-[72px] text-xs font-bold leading-tight text-muted md:text-center">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>

        </div>

        {/* ------------------------------------------------------------- */}
        {/* HOW WE GROW A BUSINESS */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mt-24 rounded-[2.5rem] border border-border bg-surface-secondary p-8 shadow-[0_16px_36px_rgb(var(--primary)_/_0.08)] md:p-12"
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-cyan">
            How we grow a business
          </p>
          <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-heading md:text-4xl">
            We build. You dominate.
          </h3>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text">
            Most businesses work hard and still grow slowly, because customers cannot find them or
            cannot trust what they find. We turn that around with a strategy first, then a complete
            digital foundation, and then continuous improvement.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {journeySteps.map((item) => (
              <motion.div
                key={item.step}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-border bg-background p-6"
              >
                <p className="text-sm font-bold text-accent-cyan">{item.step}</p>
                <h4 className="mt-1 text-xl font-bold text-heading">{item.title}</h4>
                <p className="mt-2 text-base leading-7 text-text">{item.copy}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 border-t border-primary/5 pt-8">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-muted">
              The complete ecosystem
            </p>
            <div className="flex flex-wrap gap-3">
              {ecosystem.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-heading"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* PARTNERS / LEADERSHIP */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          id="partners"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="mt-24"
        >
          {/* Section Header */}
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-accent-cyan">
              Leadership
            </p>
            <h3 className="font-display text-3xl font-bold tracking-tight text-heading md:text-4xl">
              Meet the{" "}
              <span className="text-accent-cyan-gradient">Partners</span>
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text">
              Three founders. One shared obsession — building brands that grow and businesses that last.
            </p>
          </div>

          {/* Partner Tiles */}
          <div className="grid gap-6 md:grid-cols-3">
            {partners.map((partner, idx) => (
              <motion.div
                key={partner.initials}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -8, scale: 1.015 }}
                className="group relative overflow-hidden rounded-[2rem] border border-border bg-surface p-8 shadow-[0_12px_40px_rgb(var(--primary)/_0.06)] transition-shadow duration-500 hover:border-accent-cyan/40 hover:shadow-[0_20px_60px_rgb(var(--primary)/_0.12)]"
              >
                {/* Corner Glow on Hover */}
                <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-accent-cyan opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-[0.07]" />

                {/* Top Row: Initials Badge + Icon */}
                <div className="flex items-start justify-between mb-6">
                  {/* Animated Initials Badge */}
                  <motion.div
                    animate={{ boxShadow: [
                      "0 0 0px rgba(51,78,172,0)",
                      "0 0 20px rgba(51,78,172,0.2)",
                      "0 0 0px rgba(51,78,172,0)"
                    ] }}
                    transition={{ duration: 3, repeat: Infinity, delay: idx * 0.8 }}
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border-2 ${partner.border} ${partner.bg} font-display text-lg font-extrabold tracking-tight ${partner.color}`}
                  >
                    {partner.initials}
                  </motion.div>

                  {/* Role Icon */}
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${partner.bg}`}>
                    <partner.icon className={`h-5 w-5 ${partner.color}`} />
                  </div>
                </div>

                {/* Name + Role */}
                <div className="mb-1">
                  <span className={`inline-block rounded-full border px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] ${partner.border} ${partner.color} bg-background/60 mb-3`}>
                    {partner.tag}
                  </span>
                  <h4 className="font-display text-xl font-bold text-heading">{partner.name}</h4>
                  <p className="mt-0.5 text-sm font-semibold text-muted">{partner.role}</p>
                </div>

                {/* Divider */}
                <div className="my-5 h-px bg-gradient-to-r from-border via-accent-cyan/20 to-transparent" />

                {/* Description */}
                <p className="text-sm leading-relaxed text-text">{partner.description}</p>

                {/* Expertise Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {partner.expertise.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-background px-3 py-1 text-[11px] font-semibold text-heading"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
