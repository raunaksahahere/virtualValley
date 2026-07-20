"use client";

import { motion, MotionConfig, useScroll, useTransform, useSpring, useMotionTemplate, MotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { 
  Store, TrendingDown, Users, CheckCircle2, 
  MapPin, Search, Globe2, Layout, Smartphone, Share2, 
  MessageCircle, BarChart3, Target, Crosshair, Crown, Zap, UtensilsCrossed,
  BrainCircuit, Sparkles, MonitorSmartphone, Layers, Code, Bot, Calendar, Phone, Activity, Star, FastForward
} from "lucide-react";

// ============================================================================
// BACKGROUND SYSTEM
// ============================================================================
function ImmersiveBackground({ progress }: { progress: any }) {
  // Parallax shifts
  const yBg = useTransform(progress, [0, 1], ["0%", "-20%"]);
  const rotateGrid = useTransform(progress, [0, 1], [0, 45]);
  const scaleGrid = useTransform(progress, [0, 0.5, 1], [1, 1.2, 1.5]);

  return (
    <div className="absolute inset-0 z-[-10] overflow-hidden bg-[#F4F5F7]">
      {/* Noise Texture */}
      <div className="absolute inset-0 z-10 opacity-30 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        {/* Animated Grid */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{ 
            backgroundImage: `linear-gradient(rgba(51,78,172,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(51,78,172,0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
            scale: scaleGrid,
            rotate: rotateGrid,
            filter: "blur(2px)"
          }} 
        />

        {/* Floating Glass Reflections */}
        <motion.div 
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#334EAC] mix-blend-multiply filter blur-[86.4px] opacity-20"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#081F5C] mix-blend-multiply filter blur-[108px] opacity-10"
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Light Beams */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{ background: "linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%)", backgroundSize: "300% 300%" }}
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // High-resolution scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Extremely smooth spring physics for the cinematic feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.0001
  });

  // --- CAMERA & DEPTH SCALING ---
  // The scene scales out at the very end to reveal the solar system
  const sceneScale = useTransform(smoothProgress, [0, 0.75, 0.85, 1], [1, 1, 0.4, 0.15]);
  const sceneY = useTransform(smoothProgress, [0, 0.85, 1], ["0%", "0%", "-20%"]);

  // --- CENTRAL CARD MORPHING ---
  // The central card gracefully transforms its shape to fit the content of each frame
  const cardWidth = useTransform(
    smoothProgress,
    [0, 0.08, 0.16, 0.24, 0.32, 0.40, 0.48, 0.56, 0.64, 0.72, 0.80, 1],
    ["360px", "600px", "400px", "800px", "900px", "900px", "1000px", "1000px", "900px", "300px", "300px", "300px"]
  );
  
  const cardHeight = useTransform(
    smoothProgress,
    [0, 0.08, 0.16, 0.24, 0.32, 0.40, 0.48, 0.56, 0.64, 0.72, 0.80, 1],
    ["500px", "400px", "600px", "500px", "600px", "600px", "650px", "650px", "600px", "300px", "300px", "300px"]
  );

  const cardBorderRadius = useTransform(smoothProgress, [0, 0.7, 0.75], ["24px", "24px", "150px"]);
  const cardOpacity = useTransform(smoothProgress, [0, 0.8, 0.85], [1, 1, 0]);

  // --- FRAME OPACITIES (12 Stages) ---
  // Crossfade between frames smoothly
  const f1Opacity = useTransform(smoothProgress, [0, 0.06, 0.08], [1, 1, 0]);
  const f2Opacity = useTransform(smoothProgress, [0.07, 0.1, 0.14, 0.16], [0, 1, 1, 0]);
  const f3Opacity = useTransform(smoothProgress, [0.15, 0.18, 0.22, 0.24], [0, 1, 1, 0]);
  const f4Opacity = useTransform(smoothProgress, [0.23, 0.26, 0.30, 0.32], [0, 1, 1, 0]);
  const f5Opacity = useTransform(smoothProgress, [0.31, 0.34, 0.38, 0.40], [0, 1, 1, 0]);
  const f6Opacity = useTransform(smoothProgress, [0.39, 0.42, 0.46, 0.48], [0, 1, 1, 0]);
  const f7Opacity = useTransform(smoothProgress, [0.47, 0.50, 0.54, 0.56], [0, 1, 1, 0]);
  const f8Opacity = useTransform(smoothProgress, [0.55, 0.58, 0.62, 0.64], [0, 1, 1, 0]);
  const f9Opacity = useTransform(smoothProgress, [0.63, 0.66, 0.70, 0.72], [0, 1, 1, 0]);
  
  // Ecosystem expansion frames
  const f10NodesScale = useTransform(smoothProgress, [0.72, 0.76], [0, 1]);
  const f10Opacity = useTransform(smoothProgress, [0.72, 0.76, 1, 1], [0, 1, 1, 1]);
  const f11KpisOpacity = useTransform(smoothProgress, [0.80, 0.84], [0, 1]);
  const f12FinalOpacity = useTransform(smoothProgress, [0.90, 0.95], [0, 1]);
  
  // Global backdrop darkening at the end
  const globalDarken = useTransform(smoothProgress, [0.85, 0.95], ["rgba(244,245,247,0)", "rgba(8,31,92,0.95)"]);

  // --- MICRO-ANIMATION VALUES ---
  // F1
  const f1PhoneShake = useTransform(smoothProgress, [0, 0.05], [0, 10]);
  // F3
  const f3Signature = useTransform(smoothProgress, [0.16, 0.2], [0, 1]);
  const f3Stamp = useTransform(smoothProgress, [0.2, 0.22], [3, 1]);
  const f3StampOpacity = useTransform(smoothProgress, [0.2, 0.22], [0, 1]);
  // F5
  const f5Progress = useTransform(smoothProgress, [0.34, 0.38], [0, 100]);
  // F8
  const f8ChartHeight = useTransform(smoothProgress, [0.57, 0.6], ["0%", "100%"]);

  return (
    <MotionConfig reducedMotion="user">
      <section ref={containerRef} id="story" className="relative min-h-0 bg-background text-foreground lg:min-h-[1600vh]">
      <div className="section-shell py-20 lg:hidden">
        <div className="rounded-[2rem] border border-border bg-surface-secondary p-6 shadow-[0_16px_36px_rgb(var(--primary)_/_0.1)]">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-cyan">How we grow a business</p>
          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-border/40"><div className="h-full w-3/5 bg-accent-cyan" /></div>
          <p className="mt-3 text-sm font-semibold text-muted">Stage 3 of 5</p>
          <div className="mt-6 space-y-4">
            {[
              ["01", "Audit the opportunity", "We map the gaps that keep customers from finding and trusting your business."],
              ["02", "Build the foundation", "We connect brand, website, local presence, and a conversion-ready experience."],
              ["03", "Improve and scale", "We measure what works and keep the growth system moving."],
            ].map(([step, title, copy]) => (
              <div key={step} className="rounded-2xl border border-border bg-background p-4">
                <p className="text-sm font-bold text-accent-cyan">{step}</p>
                <h3 className="mt-1 text-xl font-bold text-heading">{title}</h3>
                <p className="mt-2 text-base leading-7 text-text">{copy}</p>
              </div>
            ))}
          </div>
          <a href="#services" className="btn-primary mt-6">Explore services <FastForward size={16} /></a>
        </div>
      </div>
      <div className="sticky top-0 hidden h-screen w-full items-center justify-center overflow-hidden lg:flex">
        
        {/* Skip Story Button */}
        <motion.a 
          href="#services" 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
            className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-6 z-[100] flex items-center gap-3 rounded-full border border-accent-cyan/50 bg-primary px-6 py-3 text-base font-bold uppercase tracking-wider text-primary-foreground shadow-[0_10px_30px_rgb(var(--primary)_/_0.4)] transition-colors hover:bg-accent-cyan group"
        >
          Skip Story
          <motion.div
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <FastForward size={20} className="text-accent-cyan group-hover:text-primary-foreground" />
          </motion.div>
        </motion.a>
        
        <ImmersiveBackground progress={smoothProgress} />
        
        {/* Darkening layer for the finale */}
        <motion.div className="absolute inset-0 z-[-5]" style={{ backgroundColor: globalDarken }} />

        {/* CINEMATIC CAMERA SYSTEM */}
        <motion.div
          className="relative flex items-center justify-center z-10 w-full h-full perspective-[1440px]"
          style={{ scale: sceneScale, y: sceneY }}
        >
          {/* ========================================================= */}
          {/* THE MORPHING CARD */}
          {/* ========================================================= */}
          <motion.div
            className="relative flex flex-col items-center justify-center overflow-hidden bg-white/70 backdrop-blur-3xl shadow-[0_40px_100px_rgba(8,31,92,0.1)] border border-[#081F5C]/10 will-change-transform"
            style={{
              width: cardWidth,
              height: cardHeight,
              borderRadius: cardBorderRadius,
              opacity: cardOpacity,
            }}
          >
            {/* FRAME 1: The Problem */}
            <motion.div className="absolute inset-0 p-8 flex flex-col pointer-events-none" style={{ opacity: f1Opacity }}>
              <div className="flex items-center gap-4 mb-8 pb-4 border-b border-border">
                <div className="p-3 bg-red-500/10 rounded-xl text-red-500"><Store size={24} /></div>
                <div>
                  <h3 className="font-display font-bold text-xl text-[#081F5C]">Legacy Storefront</h3>
                  <p className="text-xs text-[#475569] uppercase tracking-widest">Status: Critical</p>
                </div>
              </div>
              
              <div className="flex-1 grid grid-cols-2 gap-4">
                 <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 flex flex-col justify-center">
                    <TrendingDown className="text-red-500 mb-2" />
                    <p className="text-[7.2px] uppercase text-red-500/70 font-bold mb-1">Visibility</p>
                    <p className="text-2xl font-display font-bold text-red-600">Dropping</p>
                 </div>
                 <div className="rounded-xl border border-[#081F5C]/10 bg-white p-4 flex flex-col justify-center shadow-sm relative overflow-hidden">
                    <motion.div className="absolute right-4 top-4 text-red-500" animate={{ rotate: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 0.5 }}>
                       <Phone size={16} />
                    </motion.div>
                    <Users className="text-[#081F5C] mb-2" />
                    <p className="text-[7.2px] uppercase text-[#475569] font-bold mb-1">Customer Complaints</p>
                    <p className="text-2xl font-display font-bold text-[#081F5C]">Overwhelming</p>
                 </div>
                 <div className="col-span-2 rounded-xl border border-border bg-white p-4 shadow-sm flex items-center gap-4">
                    <div className="flex -space-x-2">
                       {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-red-100 border-2 border-white flex items-center justify-center text-[7.2px]">1★</div>)}
                    </div>
                    <div className="flex-1">
                       <div className="h-2 w-full bg-[#EEF1F5] rounded-full mb-2"><div className="h-full w-1/4 bg-red-500 rounded-full" /></div>
                       <p className="text-[7.2px] text-[#475569]">Negative sentiment rising</p>
                    </div>
                 </div>
              </div>
            </motion.div>

            {/* FRAME 2: Discovery */}
            <motion.div className="absolute inset-0 p-8 flex flex-col pointer-events-none bg-[#F8F9FC]" style={{ opacity: f2Opacity }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-[#334EAC]/10 rounded-xl text-[#334EAC]"><Target size={24} /></div>
                <h3 className="font-display font-bold text-2xl text-[#081F5C]">Strategy & Audit</h3>
              </div>
              <div className="flex-1 border-2 border-dashed border-[#334EAC]/20 rounded-2xl p-6 relative overflow-hidden bg-white">
                 <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(#334EAC 1px, transparent 1px), linear-gradient(90deg, #334EAC 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                 {/* Animated Wireframes drawing */}
                 <div className="space-y-4 relative z-10">
                    <div className="flex gap-4">
                       <motion.div className="h-16 flex-1 rounded-lg border-2 border-[#334EAC] bg-[#334EAC]/5" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} style={{ originX: 0 }} transition={{ duration: 1 }} />
                       <motion.div className="h-16 flex-1 rounded-lg border-2 border-[#334EAC] bg-[#334EAC]/5" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} style={{ originX: 0 }} transition={{ duration: 1, delay: 0.2 }} />
                    </div>
                    <motion.div className="h-32 w-full rounded-lg border-2 border-[#081F5C] bg-[#081F5C]/5" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} style={{ originY: 0 }} transition={{ duration: 1, delay: 0.4 }} />
                 </div>
              </div>
            </motion.div>

            {/* FRAME 3: Partnership */}
            <motion.div className="absolute inset-0 p-8 flex flex-col pointer-events-none bg-gradient-to-br from-primary to-accent-cyan text-primary-foreground" style={{ opacity: f3Opacity }}>
              <div className="flex-1 border border-white/20 rounded-2xl bg-white/5 backdrop-blur-md p-8 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-inner">
                <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20 mb-6">
                  <Image src="/logo.png" alt="Logo" width={29} height={29} className="object-contain filter brightness-0 invert" />
                </div>
                <h3 className="font-display text-3xl font-bold tracking-wide mb-2">Master Service Agreement</h3>
                <p className="text-[7.2px] uppercase tracking-[0.3em] text-[#334EAC] mb-12">Digital Transformation Protocol</p>
                
                <div className="w-full flex justify-between items-end border-t border-white/20 pt-6">
                  <div className="text-left">
                    <p className="text-[7.2px] text-white/40 uppercase tracking-widest mb-2">Authorized Signature</p>
                    <svg viewBox="0 0 200 40" className="w-40 h-10">
                      <motion.path d="M 10 20 Q 30 5 40 25 T 70 15 T 100 25 T 130 10 T 160 20" fill="transparent" stroke="#FFF" strokeWidth="2" strokeLinecap="round" style={{ pathLength: f3Signature }} />
                    </svg>
                  </div>
                  <motion.div className="relative" style={{ scale: f3Stamp, opacity: f3StampOpacity }}>
                    <div className="absolute inset-0 rounded-full bg-emerald-500 blur-md opacity-50" />
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border-2 border-emerald-200 shadow-xl text-white">
                      <CheckCircle2 size={32} strokeWidth={3} />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* FRAME 4: Digital Foundation */}
            <motion.div className="absolute inset-0 p-8 flex flex-col items-center justify-center pointer-events-none" style={{ opacity: f4Opacity }}>
              <h3 className="font-display font-bold text-4xl text-[#081F5C] mb-12 text-center">Assembling the Foundation</h3>
              <div className="relative w-full max-w-lg h-64">
                 {/* Center Node */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 bg-[#081F5C] rounded-2xl shadow-2xl flex items-center justify-center z-20">
                    <Layers className="text-white" size={32} />
                 </div>
                 {/* Orbiting Foundations */}
                 {[
                   { icon: Globe2, label: "Domain", angle: 0 },
                   { icon: Search, label: "SEO Base", angle: 72 },
                   { icon: MapPin, label: "Listings", angle: 144 },
                   { icon: Crown, label: "Brand Kit", angle: 216 },
                   { icon: Share2, label: "Socials", angle: 288 },
                 ].map((item, i) => {
                   const x = Math.cos(item.angle * Math.PI / 180) * 150;
                   const y = Math.sin(item.angle * Math.PI / 180) * 150;
                   return (
                     <motion.div 
                       key={i} 
                       className="absolute top-1/2 left-1/2 flex flex-col items-center gap-2"
                       initial={{ x: 0, y: 0, opacity: 0 }}
                       whileInView={{ x: x - 30, y: y - 30, opacity: 1 }}
                       transition={{ type: "spring", stiffness: 50, delay: i * 0.1 }}
                     >
                       <div className="h-14 w-14 rounded-full bg-white border border-border shadow-lg flex items-center justify-center text-[#334EAC]">
                         <item.icon size={20} />
                       </div>
                       <span className="text-[7.2px] font-bold text-[#081F5C] uppercase">{item.label}</span>
                     </motion.div>
                   )
                 })}
              </div>
            </motion.div>

            {/* FRAME 5: Website Development */}
            <motion.div className="absolute inset-0 flex flex-col pointer-events-none overflow-hidden bg-white" style={{ opacity: f5Opacity }}>
               {/* Browser Chrome */}
               <div className="h-12 bg-[#F4F5F7] border-b border-border flex items-center px-4 gap-2 w-full">
                 <div className="flex gap-1.5"><div className="h-3 w-3 rounded-full bg-accent-green"/><div className="h-3 w-3 rounded-full bg-surface"/><div className="h-3 w-3 rounded-full bg-accent-cyan"/></div>
                 <div className="mx-auto flex h-6 w-1/2 items-center justify-center rounded bg-white border border-border text-[7.2px] text-muted font-mono"><Globe2 size={12} className="mr-2"/> virtualvalley-site.com</div>
               </div>
               <div className="flex-1 flex p-6 gap-6">
                 <div className="flex-1 flex flex-col gap-4">
                    {/* Hero Section */}
                    <div className="h-48 rounded-xl bg-gradient-to-br from-[#081F5C] to-[#334EAC] p-8 flex flex-col justify-center text-white shadow-xl">
                       <div className="h-6 w-3/4 bg-white/20 rounded mb-2" />
                       <div className="h-4 w-1/2 bg-white/10 rounded mb-6" />
                       <div className="h-10 w-32 bg-white rounded-full" />
                    </div>
                    {/* Bento Grid */}
                    <div className="flex-1 grid grid-cols-3 gap-4">
                       {[1,2,3].map(i => (
                         <div key={i} className="rounded-xl border border-border bg-[#F4F5F7] p-4 flex flex-col justify-end">
                            <div className="h-3 w-1/2 bg-border rounded mb-2" />
                            <div className="h-2 w-full bg-border/50 rounded" />
                         </div>
                       ))}
                    </div>
                 </div>
                 {/* Performance Sidebar */}
                 <div className="w-64 border-l border-border pl-6 flex flex-col gap-6 justify-center">
                    <div className="text-center">
                       <h4 className="text-xs font-bold uppercase tracking-widest text-[#081F5C] mb-4">Lighthouse Score</h4>
                       <div className="relative h-32 w-32 mx-auto rounded-full border-[5.8px] border-[#EEF1F5] flex items-center justify-center">
                          <motion.div 
                            className="absolute inset-[-5.8px] rounded-full border-[5.8px] border-emerald-500 border-l-transparent border-b-transparent" 
                            style={{ rotate: useTransform(f5Progress, [0, 100], [-45, 135]) }}
                          />
                          <span className="font-display text-4xl font-bold text-emerald-600">
                             <motion.span>{useTransform(f5Progress, v => Math.round(v))}</motion.span>
                          </span>
                       </div>
                    </div>
                    <div className="space-y-3">
                       {['Performance', 'Accessibility', 'Best Practices', 'SEO'].map(lbl => (
                         <div key={lbl} className="flex justify-between text-[7.2px] font-bold text-[#475569] uppercase">
                            <span>{lbl}</span><span className="text-emerald-500">100</span>
                         </div>
                       ))}
                    </div>
                 </div>
               </div>
            </motion.div>

            {/* FRAME 6: AI Automation */}
            <motion.div className="absolute inset-0 p-8 flex flex-col pointer-events-none bg-[#081F5C] text-white" style={{ opacity: f6Opacity }}>
               <div className="flex items-center gap-4 mb-8">
                 <div className="p-3 bg-white/10 rounded-xl"><BrainCircuit size={28} /></div>
                 <div>
                   <h3 className="font-display font-bold text-3xl">AI Control Center</h3>
                   <p className="text-xs text-white/50 uppercase tracking-widest">Automated Workflows Active</p>
                 </div>
               </div>
               
               <div className="flex-1 relative border border-white/10 rounded-2xl bg-white/5 p-6 overflow-hidden">
                  {/* Flow Lines */}
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                  
                  <div className="flex justify-between items-center h-full relative z-10 px-12">
                     <div className="space-y-6">
                        <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg backdrop-blur-md border border-white/20"><MessageCircle size={20}/> Incoming Chat</div>
                        <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg backdrop-blur-md border border-white/20"><Phone size={20}/> Missed Call</div>
                     </div>
                     
                     {/* AI Brain */}
                     <div className="relative">
                        <div className="absolute inset-0 bg-[#334EAC] blur-[28.8px] opacity-50 rounded-full animate-pulse" />
                        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#334EAC] to-indigo-600 border-2 border-indigo-400 flex items-center justify-center shadow-2xl relative z-10">
                           <Bot size={40} className="text-white" />
                        </div>
                        {/* Data packets flowing */}
                        <div className="absolute top-1/2 -left-32 w-32 h-[1.4px] bg-indigo-500/30 -translate-y-1/2 overflow-hidden">
                           <motion.div className="w-8 h-full bg-white shadow-[0_0_10px_#FFF]" animate={{ x: [-32, 128] }} transition={{ duration: 1, repeat: Infinity }} />
                        </div>
                        <div className="absolute top-1/2 -right-32 w-32 h-[1.4px] bg-indigo-500/30 -translate-y-1/2 overflow-hidden">
                           <motion.div className="w-8 h-full bg-white shadow-[0_0_10px_#FFF]" animate={{ x: [-32, 128] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />
                        </div>
                     </div>
                     
                     <div className="space-y-6">
                        <div className="flex items-center gap-3 p-3 bg-emerald-500/20 rounded-lg backdrop-blur-md border border-emerald-500/40 text-emerald-400"><Calendar size={20}/> Meeting Booked</div>
                        <div className="flex items-center gap-3 p-3 bg-emerald-500/20 rounded-lg backdrop-blur-md border border-emerald-500/40 text-emerald-400"><Users size={20}/> Lead Saved</div>
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* FRAME 7: Digital Branding */}
            <motion.div className="absolute inset-0 flex pointer-events-none bg-[#F4F5F7]" style={{ opacity: f7Opacity }}>
               <div className="w-1/3 bg-white border-r border-border p-8 flex flex-col gap-6">
                  <div className="flex items-center gap-2 text-[#081F5C] mb-4"><Sparkles size={24} /><h3 className="font-display font-bold text-2xl">Creative Studio</h3></div>
                  <div className="space-y-4">
                     <div className="p-4 rounded-xl border border-border bg-[#F4F5F7]">
                        <p className="text-[7.2px] font-bold uppercase tracking-widest text-[#475569] mb-3">Color Palette</p>
                        <div className="flex gap-2"><div className="w-8 h-8 rounded-full bg-[#081F5C] shadow-sm"/><div className="w-8 h-8 rounded-full bg-[#334EAC] shadow-sm"/><div className="w-8 h-8 rounded-full bg-[#F0EDD3] border border-border shadow-sm"/></div>
                     </div>
                     <div className="p-4 rounded-xl border border-border bg-[#F4F5F7]">
                        <p className="text-[7.2px] font-bold uppercase tracking-widest text-[#475569] mb-3">Typography</p>
                        <p className="font-display text-2xl font-bold text-[#081F5C]">Outfit</p>
                        <p className="font-body text-sm text-[#475569]">Inter</p>
                     </div>
                  </div>
               </div>
               <div className="flex-1 p-8 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,#081F5C_1px,transparent_1px)]" style={{ backgroundSize: '20px 20px' }} />
                  {/* Logo Canvas */}
                  <div className="w-[288px] h-[288px] bg-white rounded-3xl shadow-2xl border border-border flex flex-col items-center justify-center relative z-10">
                     <motion.div 
                       className="absolute inset-0 bg-gradient-to-br from-[#081F5C]/5 to-[#334EAC]/10 opacity-0"
                       whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
                     />
                     <Image src="/logo.png" alt="Brand Logo" width={86} height={86} className="object-contain" />
                     <motion.div className="mt-8 text-center" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }}>
                        <h2 className="font-display text-4xl font-bold text-[#081F5C]">VIRTUAL VALLEY</h2>
                        <p className="text-sm tracking-[0.3em] text-[#475569] mt-2 uppercase">Digital Growth</p>
                     </motion.div>
                     
                     {/* Frame lines overlaying canvas */}
                     <div className="absolute inset-x-8 top-1/2 border-t border-dashed border-[#081F5C]/20" />
                     <div className="absolute inset-y-8 left-1/2 border-l border-dashed border-[#081F5C]/20" />
                  </div>
               </div>
            </motion.div>

            {/* FRAME 8: Online Presence & Ads */}
            <motion.div className="absolute inset-0 p-8 flex flex-col pointer-events-none bg-white" style={{ opacity: f8Opacity }}>
               <div className="flex justify-between items-end mb-6">
                 <div>
                   <h3 className="font-display font-bold text-3xl text-[#081F5C]">Growth Dashboard</h3>
                   <p className="text-xs text-[#475569] uppercase tracking-widest">Multi-Channel Campaigns Live</p>
                 </div>
                 <div className="flex gap-2">
                   <div className="px-3 py-1 bg-blue-50 text-blue-600 text-[7.2px] font-bold rounded-full uppercase border border-blue-100 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"/> Google Ads</div>
                   <div className="px-3 py-1 bg-pink-50 text-pink-600 text-[7.2px] font-bold rounded-full uppercase border border-pink-100 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse"/> Meta Ads</div>
                 </div>
               </div>
               
               <div className="flex-1 grid grid-cols-3 gap-6">
                 {/* Main Chart */}
                 <div className="col-span-2 rounded-2xl border border-border bg-[#F4F5F7] p-6 flex flex-col shadow-inner relative overflow-hidden">
                    <p className="text-[7.2px] font-bold uppercase tracking-widest text-[#475569] mb-4">Traffic & Conversions</p>
                    <div className="flex-1 flex items-end gap-2 pt-10">
                       {[30, 45, 40, 60, 55, 80, 75, 100].map((h, i) => (
                         <div key={i} className="flex-1 bg-gradient-to-t from-[#334EAC]/20 to-[#334EAC] rounded-t-sm relative flex justify-end flex-col">
                            <motion.div className="w-full bg-[#081F5C] rounded-t-sm" style={{ height: f8ChartHeight }} />
                         </div>
                       ))}
                    </div>
                    {/* SVG Line Overlay */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_8px_rgba(51,78,172,0.5)]" preserveAspectRatio="none" viewBox="0 0 100 100">
                       <motion.path d="M 0 80 Q 20 70 30 60 T 60 40 T 100 20" fill="none" stroke="#334EAC" strokeWidth="2" style={{ pathLength: f8ChartHeight }} />
                    </svg>
                 </div>
                 
                 {/* Map & Social */}
                 <div className="flex flex-col gap-6">
                    <div className="flex-1 rounded-2xl border border-border bg-emerald-50 p-6 flex items-center justify-center relative overflow-hidden">
                       <MapPin className="absolute text-emerald-500/20" size={120} />
                       <div className="relative z-10 text-center">
                          <p className="text-[7.2px] font-bold uppercase tracking-widest text-emerald-700 mb-2">Local SEO Rank</p>
                          <p className="font-display text-6xl font-bold text-emerald-600">#1</p>
                       </div>
                    </div>
                    <div className="flex-1 rounded-2xl border border-border bg-purple-50 p-6 flex items-center justify-center relative overflow-hidden">
                       <Share2 className="absolute text-purple-500/20" size={100} />
                       <div className="relative z-10 text-center">
                          <p className="text-[7.2px] font-bold uppercase tracking-widest text-purple-700 mb-2">Social Reach</p>
                          <p className="font-display text-4xl font-bold text-purple-600">2.4M+</p>
                       </div>
                    </div>
                 </div>
               </div>
            </motion.div>

            {/* FRAME 9: App Development */}
            <motion.div className="absolute inset-0 p-8 flex flex-col items-center justify-center pointer-events-none bg-gradient-to-br from-[#EEF1F5] to-[#F4F5F7]" style={{ opacity: f9Opacity }}>
               <h3 className="font-display font-bold text-4xl text-[#081F5C] mb-2 text-center">Omnichannel Architecture</h3>
               <p className="text-sm text-[#475569] uppercase tracking-widest mb-12">Synced Across Every Device</p>
               
               <div className="relative w-full max-w-3xl h-[288px] flex items-center justify-center perspective-[1080px]">
                  {/* Central Database/Cloud */}
                  <div className="absolute h-32 w-32 rounded-full bg-white border border-[#334EAC]/20 shadow-[0_0_50px_rgba(51,78,172,0.15)] flex items-center justify-center z-10">
                     <Activity size={32} className="text-[#334EAC]" />
                  </div>
                  
                  {/* API Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ transform: "rotateX(60deg)" }}>
                     <circle cx="50%" cy="50%" r="200" fill="none" stroke="rgba(51,78,172,0.2)" strokeWidth="2" strokeDasharray="10 10" className="animate-spin-slow" />
                  </svg>
                  
                  {/* Devices */}
                  <motion.div className="absolute top-[10%] left-[20%] w-48 h-32 bg-white rounded-xl border border-border shadow-xl flex items-center justify-center" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                     <MonitorSmartphone size={40} className="text-[#081F5C]/40" />
                  </motion.div>
                  <motion.div className="absolute bottom-[10%] right-[20%] w-24 h-48 bg-white rounded-2xl border-4 border-[#081F5C] shadow-2xl flex items-center justify-center" animate={{ y: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}>
                     <Smartphone size={32} className="text-[#081F5C]/40" />
                  </motion.div>
                  <motion.div className="absolute top-[20%] right-[10%] w-32 h-40 bg-white rounded-xl border-2 border-border shadow-lg flex items-center justify-center" animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}>
                     <Layout size={32} className="text-[#081F5C]/40" />
                  </motion.div>
               </div>
            </motion.div>
          </motion.div>

          {/* ========================================================= */}
          {/* EXTERNAL SOLAR SYSTEM ELEMENTS (F10 - F12) */}
          {/* ========================================================= */}
          <motion.div 
            className="absolute inset-0 pointer-events-none flex items-center justify-center z-0"
            style={{ opacity: f10Opacity, scale: f10NodesScale }}
          >
            {/* The Central Node representing the completely transformed business */}
            <motion.div className="absolute z-20 w-32 h-32 rounded-full bg-white border border-[#D8D2BC] shadow-[0_0_80px_rgba(51,78,172,0.3)] flex items-center justify-center">
               <Image src="/logo.png" alt="Virtual Valley" width={43} height={43} className="object-contain" />
            </motion.div>

            {/* Orbiting Rings */}
            <div className="absolute w-[576px] h-[576px] rounded-full border border-[#081F5C]/10 border-dashed" />
            <div className="absolute w-[864px] h-[864px] rounded-full border border-[#334EAC]/10 border-dashed" />
            
            {/* Orbiting Services */}
            {[
              { label: "Website", icon: Globe2, radius: 400, angle: 0 },
              { label: "AI Automation", icon: BrainCircuit, radius: 400, angle: 72 },
              { label: "Digital Branding", icon: Crown, radius: 400, angle: 144 },
              { label: "Ads Management", icon: Target, radius: 400, angle: 216 },
              { label: "App Dev", icon: Smartphone, radius: 400, angle: 288 },
              { label: "Local SEO", icon: MapPin, radius: 600, angle: 36 },
              { label: "Social", icon: Share2, radius: 600, angle: 108 },
              { label: "CRM", icon: Users, radius: 600, angle: 180 },
              { label: "Content", icon: Layout, radius: 600, angle: 252 },
              { label: "Analytics", icon: BarChart3, radius: 600, angle: 324 },
            ].map((node, i) => {
               const x = Math.cos(node.angle * Math.PI / 180) * node.radius;
               const y = Math.sin(node.angle * Math.PI / 180) * node.radius;
               return (
                 <motion.div
                   key={i}
                   className="absolute flex items-center gap-3 bg-white/90 backdrop-blur-md border border-border px-4 py-2 rounded-full shadow-lg"
                   style={{
                     left: `calc(50% + ${x}px)`,
                     top: `calc(50% + ${y}px)`,
                     transform: "translate(-50%, -50%)"
                   }}
                 >
                   <div className="w-8 h-8 rounded-full bg-[#F4F5F7] flex items-center justify-center text-[#334EAC]">
                     <node.icon size={14} />
                   </div>
                   <span className="text-[7.2px] font-bold text-[#081F5C] uppercase tracking-wider">{node.label}</span>
                 </motion.div>
               )
            })}

            {/* F11: Live KPI Popups */}
            <motion.div className="absolute inset-0" style={{ opacity: f11KpisOpacity }}>
               {[
                 { val: "300%", label: "Revenue Growth", top: "20%", left: "30%", delay: 0 },
                 { val: "10k+", label: "Active Users", top: "70%", left: "25%", delay: 0.2 },
                 { val: "4.8x", label: "ROAS", top: "25%", right: "25%", delay: 0.4 },
                 { val: "24/7", label: "Automation", top: "75%", right: "30%", delay: 0.6 },
               ].map((kpi, i) => (
                 <motion.div 
                   key={i}
                   className="absolute bg-emerald-500 text-white rounded-xl p-4 shadow-[0_20px_40px_rgba(8, 31, 92,0.3)] backdrop-blur-md"
                   style={{ top: kpi.top, left: kpi.left, right: kpi.right }}
                   initial={{ scale: 0, y: 20 }}
                   whileInView={{ scale: 1, y: 0 }}
                   transition={{ type: "spring", delay: kpi.delay }}
                 >
                   <p className="font-display text-4xl font-black">{kpi.val}</p>
                   <p className="text-[7.2px] font-bold uppercase tracking-widest opacity-80">{kpi.label}</p>
                 </motion.div>
               ))}
            </motion.div>
            
            {/* F12: Final Assemble (Everything glows brilliantly) */}
            <motion.div className="absolute inset-0 flex flex-col items-center justify-center z-50 text-white" style={{ opacity: f12FinalOpacity }}>
               <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }} 
                  whileInView={{ scale: 1, opacity: 1 }} 
                  transition={{ duration: 1 }}
                  className="text-center"
               >
                  <h1 className="text-6xl md:text-8xl font-display font-black tracking-tight mb-4 drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                    WE BUILD.<br/>YOU DOMINATE.
                  </h1>
                  <div className="h-[0.7px] w-32 bg-white/30 mx-auto mb-6" />
                  <p className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase text-emerald-400">
                    Your Digital Growth Partner.
                  </p>
               </motion.div>
            </motion.div>
          </motion.div>

        </motion.div>

        {/* ========================================================= */}
        {/* CINEMATIC TEXT OVERLAYS (Bottom Sticky) */}
        {/* ========================================================= */}
        <div className="pointer-events-none absolute bottom-16 left-0 w-full text-center px-4 z-50">
          {[
            { text: "Working Hard. Growing Slowly.", color: "text-[#081F5C]", opRange: [0, 0.05, 0.06, 0.08] },
            { text: "Every Transformation Starts With A Strategy.", color: "text-[#334EAC]", opRange: [0.08, 0.12, 0.14, 0.16] },
            { text: "A Partnership For Growth.", color: "text-white", opRange: [0.16, 0.20, 0.22, 0.24] },
            { text: "Build The Foundation.", color: "text-[#081F5C]", opRange: [0.24, 0.28, 0.30, 0.32] },
            { text: "Experiences That Convert.", color: "text-[#081F5C]", opRange: [0.32, 0.36, 0.38, 0.40] },
            { text: "Business That Never Sleeps.", color: "text-white", opRange: [0.40, 0.44, 0.46, 0.48] },
            { text: "Brands Are Built. Not Designed.", color: "text-[#081F5C]", opRange: [0.48, 0.52, 0.54, 0.56] },
            { text: "Reach Every Customer.", color: "text-[#081F5C]", opRange: [0.56, 0.60, 0.62, 0.64] },
            { text: "One Platform. Every Device.", color: "text-[#081F5C]", opRange: [0.64, 0.68, 0.70, 0.72] },
            { text: "The Complete Ecosystem.", color: "text-[#081F5C]", opRange: [0.72, 0.76, 0.78, 0.80] },
            { text: "Growth. At Every Level.", color: "text-emerald-600", opRange: [0.80, 0.84, 0.86, 0.88] },
          ].map((caption, i) => (
            <CaptionItem key={i} caption={caption} smoothProgress={smoothProgress} />
          ))}
        </div>

      </div>
      </section>
    </MotionConfig>
  );
}

function CaptionItem({ caption, smoothProgress }: { caption: { text: string; color: string; opRange: number[] }; smoothProgress: MotionValue<number> }) {
  const opacity = useTransform(smoothProgress, caption.opRange, [0, 1, 1, 0]);
  const y = useTransform(smoothProgress, [caption.opRange[0], caption.opRange[1]], [20, 0]);

  return (
    <motion.div 
      className="absolute inset-x-0 bottom-0" 
      style={{ opacity, y }}
    >
      <p className={`text-3xl md:text-5xl font-display font-bold drop-shadow-xl ${caption.color}`}>
        {caption.text}
      </p>
    </motion.div>
  );
}
