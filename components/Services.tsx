"use client";

import { useState, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { 
  ArrowRight, Globe2, Search, MapPin, Sparkles, MessageCircle, 
  BarChart3, TrendingUp, MonitorSmartphone, Smartphone, Layout, 
  User, Crown, Activity, Layers, Crosshair, Star, CheckCircle2, 
  Navigation, Zap, Phone, Database, Cloud, Store, UtensilsCrossed, Target, Calendar, Download
} from "lucide-react";
import BookingModal from "./BookingModal";

// ============================================================================
// ILLUSTRATION COMPONENTS (Continuous Premium Loops)
// ============================================================================

const WebsiteIllustration = () => (
  <div className="relative w-full h-80 lg:h-[302.4px] rounded-xl border border-[#D8D2BC] bg-white/50 overflow-hidden flex items-center justify-center p-4">
     <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,#334EAC_1px,transparent_1px)]" style={{ backgroundSize: '24px 24px' }} />
     
     {/* Browser Window */}
     <motion.div 
        className="relative w-full max-w-2xl h-full max-h-[244.8px] bg-white rounded-xl border border-[#D8D2BC] shadow-[0_20px_50px_rgba(8,31,92,0.1)] overflow-hidden flex flex-col"
     >
        {/* Chrome */}
        <div className="h-10 border-b border-[#EEF1F5] bg-[#F4F5F7] flex items-center px-4 gap-2">
           <div className="flex gap-1.5">
             <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
             <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
             <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
           </div>
           <div className="mx-auto flex h-6 w-1/2 items-center justify-center rounded bg-white border border-[#EEF1F5] text-[7.2px] text-[#475569] font-mono">
              <Globe2 size={10} className="mr-2 opacity-50" />
              <motion.span
                animate={{ opacity: [1, 1, 0, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                virtualvalley.com
              </motion.span>
           </div>
        </div>

        {/* Content Body (Scrolling Simulation) */}
        <div className="relative flex-1 overflow-hidden p-6 flex gap-6">
           <motion.div 
             className="flex-1 flex flex-col gap-4"
             animate={{ y: [0, 0, -120, -120, 0] }}
             transition={{ duration: 10, repeat: Infinity, times: [0, 0.2, 0.4, 0.8, 1], ease: "easeInOut" }}
           >
              {/* Hero */}
              <div className="h-32 rounded-xl bg-gradient-to-br from-[#081F5C] to-[#334EAC] p-6 flex flex-col justify-center relative overflow-hidden">
                 <motion.div 
                   className="absolute inset-0 bg-white/10" 
                   animate={{ x: ["-100%", "100%"] }} 
                   transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} 
                 />
                 <div className="h-4 w-3/4 bg-white/20 rounded mb-2" />
                 <div className="h-3 w-1/2 bg-white/10 rounded mb-6" />
                 <div className="h-8 w-24 bg-white rounded-full flex items-center justify-center">
                    <span className="h-2 w-12 bg-[#081F5C]/20 rounded-full" />
                 </div>
              </div>
              
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                 {[1,2,3,4].map(i => (
                   <motion.div 
                     key={i} 
                     className="h-24 rounded-xl border border-[#EEF1F5] bg-[#F8F9FC] p-4 flex flex-col justify-end"
                     initial={{ opacity: 0.5 }}
                     animate={{ opacity: [0.5, 1, 0.5] }}
                     transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                   >
                     <div className="h-2 w-1/2 bg-[#D8D2BC] rounded mb-2" />
                     <div className="h-1.5 w-full bg-[#EEF1F5] rounded" />
                     <div className="h-1.5 w-3/4 bg-[#EEF1F5] rounded mt-1" />
                   </motion.div>
                 ))}
              </div>
           </motion.div>

           {/* Lighthouse Score Panel */}
           <div className="w-40 border-l border-[#EEF1F5] pl-6 flex flex-col items-center justify-center bg-white z-10 relative shadow-[-10px_0_20px_rgba(255,255,255,0.9)]">
              <h4 className="text-[6.5px] font-bold uppercase tracking-widest text-[#081F5C] mb-4 text-center">Performance</h4>
              <div className="relative h-24 w-24 rounded-full border-[4.3px] border-[#EEF1F5] flex items-center justify-center mb-6">
                 <motion.div 
                   className="absolute inset-[-4.3px] rounded-full border-[4.3px] border-emerald-500 border-l-transparent border-b-transparent" 
                   animate={{ rotate: [-45, 135, 135, -45] }}
                   transition={{ duration: 10, repeat: Infinity, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }}
                 />
                 <span className="font-display text-2xl font-bold text-accent-cyan">100</span>
              </div>
              <div className="w-full space-y-3">
                 {['SEO', 'Accessibility', 'Best Practices'].map((lbl, i) => (
                   <div key={lbl} className="flex flex-col gap-1">
                      <div className="flex justify-between text-[5.8px] font-bold text-[#475569] uppercase">
                         <span>{lbl}</span><span className="text-accent-cyan">100</span>
                      </div>
                      <div className="h-1 w-full bg-[#EEF1F5] rounded-full overflow-hidden">
                         <motion.div 
                           className="h-full bg-emerald-500" 
                           animate={{ width: ["0%", "100%", "100%", "0%"] }}
                           transition={{ duration: 10, repeat: Infinity, times: [0, 0.3 + (i*0.1), 0.8, 1], ease: "easeInOut" }}
                         />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Animated Cursor */}
        <motion.div 
           className="absolute z-50 text-[#081F5C]"
           animate={{ 
             x: [50, 200, 150, 300, 50], 
             y: [100, 120, 200, 180, 100],
             scale: [1, 0.9, 1, 0.9, 1]
           }}
           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg fill-white">
             <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
             <path d="M13 13l6 6" />
           </svg>
        </motion.div>
     </motion.div>
  </div>
);

const BrandingIllustration = () => (
  <div className="relative w-full h-56 rounded-xl border border-[#D8D2BC] bg-white/50 overflow-hidden flex items-center justify-center perspective-[720px]">
     <div className="absolute inset-0 bg-[#F4F5F7] opacity-50" />
     
     <motion.div 
       className="relative w-32 h-40 bg-white border border-[#D8D2BC] rounded-lg shadow-xl p-4 flex flex-col items-center justify-center z-10"
       animate={{ rotateY: [0, 10, -10, 0], y: [0, -5, 5, 0] }}
       transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
     >
        {/* Logo Construction */}
        <div className="relative w-16 h-16 mb-4">
           <motion.div 
             className="absolute inset-0 border-2 border-[#334EAC] rounded-lg"
             animate={{ rotate: [0, 90, 90, 0], borderRadius: ["8px", "32px", "8px", "8px"] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           />
           <motion.div 
             className="absolute inset-2 bg-[#081F5C] rounded"
             animate={{ scale: [1, 0.5, 1.2, 1] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           />
        </div>
        <motion.div className="h-2 w-16 bg-[#EEF1F5] rounded mb-2" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity }} />
        <motion.div className="h-1.5 w-10 bg-[#EEF1F5] rounded" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 0.2 }} />
     </motion.div>
     
     {/* Color Swatches floating */}
     {[
       { bg: "bg-[#081F5C]", top: "20%", left: "15%", delay: 0 },
       { bg: "bg-[#334EAC]", top: "60%", left: "25%", delay: 1 },
       { bg: "bg-[#F0EDD3]", top: "40%", right: "15%", delay: 2 }
     ].map((swatch, i) => (
       <motion.div 
         key={i}
         className={`absolute w-8 h-8 rounded-full border border-white shadow-lg ${swatch.bg}`}
         style={{ top: swatch.top, left: swatch.left }}
         animate={{ scale: [1, 1.2, 1], y: [0, -10, 0] }}
         transition={{ duration: 4, repeat: Infinity, delay: swatch.delay, ease: "easeInOut" }}
       />
     ))}
  </div>
);

const PresenceIllustration = () => (
  <div className="relative w-full h-56 rounded-xl border border-[#D8D2BC] bg-accent-green/20 overflow-hidden flex items-center justify-center">
     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#081F5C_1px,transparent_1px)] opacity-[0.05]" style={{ backgroundSize: '20px 20px' }} />
     
     {/* Connection Routes */}
     <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 200">
        <motion.path 
          d="M 200 100 Q 150 40 100 80 T 50 150" 
          fill="none" stroke="#081F5C" strokeWidth="2" strokeDasharray="5 5"
          animate={{ strokeDashoffset: [0, -100] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        <motion.path 
          d="M 200 100 Q 250 160 300 120 T 350 50" 
          fill="none" stroke="#081F5C" strokeWidth="2" strokeDasharray="5 5"
          animate={{ strokeDashoffset: [0, 100] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
     </svg>
     
     {/* Central Business Node */}
     <div className="absolute w-20 h-20 rounded-full bg-white border-2 border-emerald-500 shadow-[0_0_30px_rgba(8, 31, 92,0.2)] flex items-center justify-center z-10">
        <Store className="text-accent-cyan" size={32} />
        <motion.div 
          className="absolute -top-3 -right-3 bg-[#081F5C] text-white text-[7.2px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
          animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}
        >
          5.0 <Star size={8} className="fill-yellow-400 text-yellow-400" />
        </motion.div>
     </div>
     
     {/* Orbiting Platforms */}
     {[
       { icon: Search, x: -100, y: -40, delay: 0 },
       { icon: MapPin, x: 100, y: 40, delay: 1 },
       { icon: UtensilsCrossed, x: -80, y: 50, delay: 2 },
       { icon: Globe2, x: 80, y: -50, delay: 3 }
     ].map((node, i) => (
       <motion.div
         key={i}
         className="absolute w-10 h-10 rounded-full bg-white border border-[#D8D2BC] shadow-md flex items-center justify-center text-accent-cyan"
         animate={{ 
           x: [node.x, node.x, node.x],
           y: [node.y, node.y - 10, node.y],
           scale: [1, 1.1, 1]
         }}
         transition={{ duration: 3, repeat: Infinity, delay: node.delay, ease: "easeInOut" }}
         style={{ left: "50%", top: "50%", marginLeft: "-20px", marginTop: "-20px" }}
       >
          <node.icon size={16} />
       </motion.div>
     ))}
  </div>
);

const AdsIllustration = () => (
  <div className="relative w-full h-56 rounded-xl border border-[#D8D2BC] bg-[#081F5C] overflow-hidden flex items-end p-6 justify-center">
    {/* Grid Background */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" style={{ backgroundSize: '20px 20px' }} />
    
    <div className="relative w-full h-full flex flex-col justify-end">
       <div className="flex justify-between items-center mb-auto pt-2">
          <div className="flex items-center gap-2 text-white/80">
            <Target size={16} className="text-accent-cyan" />
            <span className="text-[7.2px] uppercase tracking-widest font-bold">Live ROI</span>
          </div>
          <motion.div 
            className="rounded border border-accent-cyan/30 bg-accent-cyan/20 px-2 py-1 text-[7.2px] font-bold text-accent-cyan"
            animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
          >
            +482%
          </motion.div>
       </div>
       
       <div className="flex items-end gap-2 h-32 w-full mt-4">
          {[30, 45, 40, 60, 55, 80, 75, 100].map((h, i) => (
             <div key={i} className="flex-1 bg-gradient-to-t from-[#334EAC]/30 to-[#334EAC] rounded-t-sm relative flex flex-col justify-end">
                <motion.div 
                  className="w-full bg-emerald-500 rounded-t-sm opacity-50"
                  animate={{ height: ["0%", `${h}%`, "0%"] }}
                  transition={{ duration: 6, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                />
             </div>
          ))}
       </div>
       
       {/* Climbing Line Chart */}
       <svg className="absolute bottom-0 left-0 w-full h-32 overflow-visible drop-shadow-[0_0_10px_rgba(8, 31, 92,0.8)]" preserveAspectRatio="none" viewBox="0 0 100 100">
          <motion.path 
            d="M 0 80 Q 20 70 30 60 T 60 40 T 100 20" 
            fill="none" stroke="#081F5C" strokeWidth="3"
            animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
       </svg>
    </div>
  </div>
);



const AppIllustration = () => (
  <div className="relative w-full h-56 rounded-xl border border-[#D8D2BC] bg-[#F4F5F7] overflow-hidden flex items-center justify-center perspective-[864px]">
     <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_center,#081F5C_1px,transparent_1px)]" style={{ backgroundSize: '20px 20px' }} />
     
     <motion.div 
       className="relative w-full max-w-[201.6px] h-[115.2px] flex items-center justify-center"
       animate={{ rotateY: [0, -15, 15, 0] }}
       transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
       style={{ transformStyle: "preserve-3d" }}
     >
        {/* Desktop */}
        <div className="absolute w-[158.4px] h-[100.8px] bg-white border border-[#D8D2BC] rounded-lg shadow-xl flex flex-col p-1" style={{ transform: "translateZ(-20px)" }}>
           <div className="w-full h-full bg-[#EEF1F5] rounded border border-[#D8D2BC]/50 flex items-center justify-center">
             <Layout size={24} className="text-[#334EAC]/30" />
           </div>
        </div>
        
        {/* Tablet */}
        <div className="absolute right-0 bottom-4 w-[72px] h-[93.6px] bg-white border border-[#D8D2BC] rounded-md shadow-2xl flex flex-col p-1" style={{ transform: "translateZ(20px)" }}>
           <div className="w-full h-full bg-[#081F5C] rounded border border-[#D8D2BC]/50 flex items-center justify-center">
             <Layout size={20} className="text-white/30" />
           </div>
        </div>

        {/* Phone */}
        <div className="absolute left-8 bottom-0 w-[43.2px] h-[86.4px] bg-white border-2 border-[#334EAC] rounded-xl shadow-2xl flex flex-col p-1" style={{ transform: "translateZ(50px)" }}>
           <div className="w-full h-2 bg-[#EEF1F5] rounded-full mb-1" />
           <div className="w-full flex-1 bg-gradient-to-b from-[#334EAC]/10 to-transparent rounded flex items-center justify-center">
             <Smartphone size={16} className="text-[#334EAC]" />
           </div>
        </div>

        {/* API Sync Ring */}
        <motion.svg className="absolute w-[216px] h-[216px] pointer-events-none" style={{ transform: "rotateX(70deg) translateZ(30px)" }}>
           <circle cx="150" cy="150" r="100" fill="none" stroke="#334EAC" strokeWidth="2" strokeDasharray="10 10" className="opacity-30" />
           <motion.circle 
             cx="150" cy="150" r="100" fill="none" stroke="#081F5C" strokeWidth="4" strokeDasharray="100 600"
             animate={{ strokeDashoffset: [0, -700] }}
             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
           />
        </motion.svg>
     </motion.div>
  </div>
);

// ============================================================================
// SERVICES DATA (Expanded for Conversion)
// ============================================================================

const SERVICES = [
  {
    title: "Website Development",
    valueProp: "High-converting websites designed to build trust and generate more enquiries.",
    illustration: WebsiteIllustration,
    perfectFor: ["Startups", "Local Businesses", "E-commerce", "Personal Brands"],
    whatYouGet: ["Premium UI Design", "Mobile Responsive", "Lightning Fast", "SEO Ready", "Admin Dashboard"],
    businessImpact: "🚀 Increase customer enquiries",
    gridClass: "lg:col-span-4 lg:row-span-1 md:col-span-2",
  },
  {
    title: "Digital Branding",
    valueProp: "Build a memorable identity customers instantly recognize.",
    illustration: BrandingIllustration,
    perfectFor: ["New Brands", "Rebranding", "Agencies", "Creators"],
    whatYouGet: ["Logo Design", "Brand Identity", "Color Palette", "Typography", "Brand Guidelines"],
    businessImpact: "⭐ Build instant trust",
    gridClass: "lg:col-span-1 lg:row-span-1 md:col-span-1"
  },
  {
    title: "Online Presence",
    valueProp: "Rank higher locally and get discovered where customers search.",
    illustration: PresenceIllustration,
    perfectFor: ["Restaurants", "Clinics", "Salons", "Retail Stores"],
    whatYouGet: ["Google Business", "Map Listings", "Local SEO", "Review Management", "Directory Listings"],
    businessImpact: "📈 Generate more qualified leads",
    gridClass: "lg:col-span-2 lg:row-span-1 md:col-span-1"
  },
  {
    title: "Ads Management",
    valueProp: "Turn advertising into predictable business growth.",
    illustration: AdsIllustration,
    perfectFor: ["E-commerce", "B2B Tech", "Real Estate", "Service Providers"],
    whatYouGet: ["Meta Ads", "Google Ads", "Retargeting", "Lead Tracking", "ROI Reports"],
    businessImpact: "💰 Improve conversion rates",
    gridClass: "lg:col-span-1 lg:row-span-1 md:col-span-1"
  },
  {
    title: "App Development",
    valueProp: "Launch powerful mobile experiences for your customers.",
    illustration: AppIllustration,
    perfectFor: ["SaaS Founders", "Retail", "Fitness", "Education"],
    whatYouGet: ["Android", "iOS", "Push Notifications", "Custom Backend", "API Integration"],
    businessImpact: "🚀 Scale user engagement",
    gridClass: "lg:col-span-4 lg:row-span-1 md:col-span-2"
  }
];

// ============================================================================
// SERVICE CARD COMPONENT
// ============================================================================

const ServiceCard = ({ service, onClick }: { service: typeof SERVICES[0], onClick: () => void }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      className={`group relative flex w-full min-w-0 flex-col overflow-hidden rounded-3xl border border-border bg-surface/90 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-accent-cyan/50 hover:shadow-[0_20px_60px_rgb(var(--accent-cyan)_/_0.15)] ${service.gridClass}`}
    >
      {/* Background Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      
      {/* Dynamic Cursor Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(51, 78, 172, 0.1), transparent 80%)`,
        }}
      />

      <div className="relative z-10 p-6 md:p-8 flex flex-col flex-1 pointer-events-none">
        
        {/* Top Illustration */}
        <div className="mb-6">
          <service.illustration />
        </div>
        
        <div className="flex flex-col flex-1">
          {/* Header & Value Prop */}
          <h3 className="mb-2 font-display text-2xl font-bold text-heading transition-colors duration-300 group-hover:text-accent-cyan">{service.title}</h3>
          <p className="mb-6 text-base font-semibold leading-relaxed text-text">{service.valueProp}</p>
          
          {/* Perfect For section */}
          <div className="mb-6 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-300 lg:group-hover:max-h-40 lg:group-hover:opacity-100 lg:group-focus:max-h-40 lg:group-focus:opacity-100">
            <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-heading/70">Perfect For</h4>
            <div className="flex flex-wrap gap-2">
              {service.perfectFor.map((tag) => (
                <span 
                  key={tag}
                  className="rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-bold text-heading"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* What You'll Get section */}
          <div className="mb-8 flex-1 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-300 lg:group-hover:max-h-56 lg:group-hover:opacity-100 lg:group-focus:max-h-56 lg:group-focus:opacity-100">
            <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-heading/70">What You&apos;ll Get</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {service.whatYouGet.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm font-semibold text-text">
                  <CheckCircle2 size={14} className="shrink-0 text-accent-cyan" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Persistent Bottom Elements Wrapper */}
        <div className="mt-auto flex flex-col gap-5 border-t border-border/60 pt-5">
          
          {/* Business Impact Highlight */}
          <div className="flex items-center justify-center rounded-lg border border-border bg-surface/40 px-4 py-3 transition-all duration-300 group-hover:bg-surface/80">
            <span className="text-center text-base font-bold text-heading">{service.businessImpact}</span>
          </div>

          {/* New Book Strategy Call CTA */}
          <div className="transition-all duration-500 ease-out z-20 pointer-events-auto">
             <div className="rounded-xl bg-primary p-px shadow-[0_5px_15px_rgb(var(--accent-cyan)_/_0.15)] transition-colors hover:bg-accent-cyan group/btn">
               <div className="relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-primary px-5 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors duration-300 group-hover/btn:bg-accent-cyan">
                 <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                 <Calendar className="w-4 h-4 relative z-10" />
                 <span className="relative z-10">Book Strategy Call</span> 
                 <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
               </div>
             </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default function Services() {
  const [selectedService, setSelectedService] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBook = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsModalOpen(true);
  };

  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32" id="services">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary to-background" />
      {/* Background Layers */}
      <div className="absolute inset-0 opacity-[0.03] animated-grid" />
      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,rgba(51,78,172,0.1),transparent_50%)] blur-[72px] pointer-events-none opacity-50" />
      <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(51,78,172,0.05),transparent_50%)] blur-[72px] pointer-events-none opacity-50" />

      <div className="section-shell relative z-10 max-w-[1400px] pt-10">
        <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
            }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-tight"
          >
            {("Choose Your Service".split(" ")).map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em]"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
                }}
              >
                {word === "Service" ? <span className="text-accent-cyan-gradient">{word}</span> : word}
              </motion.span>
            ))}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-muted max-w-2xl mx-auto"
          >
            Every solution is designed to solve a real business problem. Explore our services and schedule a strategy session with our experts.
          </motion.p>

          <motion.a
            href="/Brochure.pdf"
            download
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: [0, -6, 0] }}
            viewport={{ once: true }}
            transition={{ opacity: { duration: 0.45, delay: 0.55 }, y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
            className="mx-auto mt-8 inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-accent-cyan/50 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_12px_35px_rgb(var(--accent-cyan)_/_0.2)] transition-colors hover:bg-accent-cyan"
          >
            <Download size={17} />
            Download our brochure to know more about our prices
          </motion.a>
        </div>

        {/* Premium 4-Column Grid */}
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-7 px-4 md:px-0">
          {SERVICES.map((service) => (
            <ServiceCard 
              key={service.title} 
              service={service} 
              onClick={() => handleBook(service.title)} 
            />
          ))}
        </div>
      </div>
      
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedService={selectedService} 
      />
    </section>
  );
}
