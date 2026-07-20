"use client";

import { motion } from "framer-motion";
import { 
  BarChart, 
  MessageCircle, 
  Bell, 
  CheckCircle2, 
  ArrowRight,
  User,
  Zap,
  Globe,
  Layout,
  Lock,
  Search,
  ShoppingCart
} from "lucide-react";

export default function WebsiteShowcase() {
  return (
    <div className="group relative mt-8 flex h-[324px] w-full flex-col overflow-hidden border-t border-border pt-8 pointer-events-auto">
      
      {/* Title */}
      <div className="flex items-center gap-2 mb-6 relative z-30">
        <div className="h-1.5 w-1.5 rounded-full bg-[#334EAC]" />
        <h4 className="text-sm font-bold uppercase tracking-widest text-[#081F5C]">Recent Website Showcase</h4>
      </div>

      <div className="relative flex-1 w-full flex items-center justify-center">
        
        {/* ========================================================= */}
        {/* MOCKUPS */}
        {/* ========================================================= */}
        
        {/* Desktop Mockup (Back/Center) */}
        <motion.div 
          className="absolute left-1/2 top-4 z-10 h-48 w-[min(100%,19rem)] -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-background shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.02] md:h-[158.4px] md:w-[244.8px]"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Browser Chrome */}
          <div className="h-4 bg-[#EEF1F5] border-b border-border flex items-center px-2 gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-[#D8D2BC]" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#D8D2BC]" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#D8D2BC]" />
          </div>
          {/* Content */}
          <div className="p-2 space-y-2">
            <div className="w-full h-20 rounded bg-gradient-to-r from-[#081F5C]/10 to-[#334EAC]/10 border border-[#334EAC]/20 relative overflow-hidden">
                <div className="absolute top-2 left-2 w-16 h-2 bg-[#081F5C]/20 rounded-full" />
                <div className="absolute top-2 right-2 flex gap-1">
                  <div className="w-4 h-2 bg-[#081F5C]/20 rounded-full" />
                  <div className="w-4 h-2 bg-[#081F5C]/20 rounded-full" />
                </div>
                <div className="absolute bottom-4 left-4 w-32 h-4 bg-[#081F5C]/40 rounded" />
                <div className="absolute bottom-4 right-4 w-12 h-6 bg-[#334EAC] rounded-full" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-12 bg-[#EEF1F5] rounded border border-border" />
              <div className="h-12 bg-[#EEF1F5] rounded border border-border" />
              <div className="h-12 bg-[#EEF1F5] rounded border border-border" />
            </div>
          </div>
        </motion.div>

        {/* Tablet Mockup (Middle/Left) */}
        <motion.div 
          className="absolute left-[5%] top-16 z-20 hidden h-[172.8px] w-[115.2px] overflow-hidden rounded-xl border border-accent-cyan/30 bg-background shadow-[0_20px_40px_rgb(var(--primary)_/_0.1)] transition-transform duration-700 ease-out group-hover:-translate-x-4 group-hover:-rotate-2 md:block"
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#EEF1F5] rounded-full" />
          <div className="mt-4 p-2 space-y-2">
             <div className="flex justify-between items-center mb-4">
               <div className="w-12 h-3 bg-[#081F5C]/20 rounded" />
               <div className="w-6 h-6 rounded-full bg-[#334EAC]/10 flex items-center justify-center">
                 <User size={10} className="text-[#334EAC]" />
               </div>
             </div>
             <div className="w-full h-16 bg-gradient-to-t from-[#334EAC]/10 to-transparent border border-[#334EAC]/20 rounded flex items-end p-1">
                <div className="w-full flex justify-between items-end gap-1 px-1 h-full">
                  {[40, 70, 45, 90, 60, 100].map((h, i) => (
                    <motion.div 
                      key={i} 
                      className="w-full bg-[#334EAC] rounded-t-sm" 
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  ))}
                </div>
             </div>
             <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="h-10 bg-[#F4F5F7] rounded border border-border" />
                <div className="h-10 bg-[#F4F5F7] rounded border border-border" />
             </div>
          </div>
        </motion.div>

        {/* Mobile Mockup (Front/Right) */}
        <motion.div 
          className="absolute right-[10%] top-20 z-30 hidden h-[187.2px] w-[93.6px] overflow-hidden rounded-2xl border-4 border-primary bg-background shadow-[0_30px_60px_rgb(var(--primary)_/_0.15)] transition-transform duration-700 ease-out group-hover:translate-x-4 group-hover:rotate-2 md:block"
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Dynamic Island */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-3 bg-[#081F5C] rounded-full z-10" />
          
          <div className="pt-6 px-3 space-y-3">
             <div className="w-full h-24 bg-[#EEF1F5] rounded-xl flex items-center justify-center border border-border">
                <Layout size={16} className="text-[#081F5C]/40" />
             </div>
             <div className="w-3/4 h-2 bg-[#081F5C]/20 rounded-full" />
             <div className="w-1/2 h-2 bg-[#081F5C]/20 rounded-full" />
             
             {/* Chat Bubble Simulation */}
             <div className="mt-4 flex flex-col gap-2">
               <div className="self-end w-3/4 h-6 bg-[#334EAC] rounded-l-lg rounded-tr-lg border border-[#334EAC]" />
               <div className="self-start w-3/4 h-8 bg-[#F4F5F7] rounded-r-lg rounded-tl-lg border border-border" />
             </div>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* FLOATING UI ELEMENTS */}
        {/* ========================================================= */}
        
        {/* 1. Analytics Widget */}
        <motion.div 
          className="absolute top-0 right-1/4 z-40 bg-white/90 backdrop-blur-md rounded-lg shadow-[0_10px_30px_rgba(8,31,92,0.08)] border border-border p-2 flex items-center gap-2"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
            <BarChart size={12} className="text-primary" />
          </div>
          <div>
            <div className="text-[5.8px] text-[#475569] uppercase font-bold">Conversion</div>
            <div className="text-xs font-bold text-[#081F5C]">+12.4%</div>
          </div>
        </motion.div>

        {/* 2. Notification Bubble */}
        <motion.div 
          className="absolute top-1/3 left-4 z-40 bg-white/90 backdrop-blur-md rounded-full shadow-[0_10px_30px_rgba(8,31,92,0.08)] border border-border px-3 py-1.5 flex items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Bell size={12} className="text-[#334EAC]" />
          <span className="text-[7.2px] font-bold text-[#081F5C]">New Lead</span>
        </motion.div>

        {/* 3. Floating CTA */}
        <motion.div 
          className="absolute bottom-16 left-1/4 z-40 bg-[#081F5C] rounded-full shadow-[0_10px_30px_rgba(8,31,92,0.2)] px-4 py-2 flex items-center gap-2"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <span className="text-xs font-bold text-white">Buy Now</span>
          <ArrowRight size={12} className="text-white group-hover:translate-x-1 transition-transform" />
        </motion.div>

        {/* 4. Secure Lock */}
        <motion.div 
          className="absolute top-12 left-1/4 z-40 bg-white/90 backdrop-blur-md rounded-full shadow-[0_10px_30px_rgba(8,31,92,0.08)] border border-border p-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <Lock size={12} className="text-accent-cyan" />
        </motion.div>

      </div>

      {/* ========================================================= */}
      {/* QUALITY BADGES & PERFORMANCE PANEL */}
      {/* ========================================================= */}
      <div className="relative z-40 mt-auto flex flex-col md:flex-row justify-between items-end gap-4 pointer-events-none">
        
        {/* Quality Badges */}
        <div className="hidden max-w-[60%] flex-wrap gap-2 md:flex">
          {[
            { label: "Responsive", icon: Layout },
            { label: "SEO Ready", icon: Search },
            { label: "Lightning Fast", icon: Zap },
            { label: "E-commerce", icon: ShoppingCart },
            { label: "Global Reach", icon: Globe },
          ].map((badge, i) => (
            <motion.div 
              key={i}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F7F4E5] border border-[#D8D2BC] text-[#081F5C] shadow-sm backdrop-blur-md"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + (i * 0.1) }}
            >
              <badge.icon size={10} className="text-[#334EAC]" />
              <span className="text-[7.2px] font-bold uppercase tracking-wider">{badge.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Performance Widget */}
        <motion.div 
          className="bg-white/90 backdrop-blur-xl border border-border rounded-xl p-3 shadow-[0_15px_40px_rgba(8,31,92,0.1)] w-[129.6px] pointer-events-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[6.5px] font-bold text-[#475569] uppercase tracking-widest">Lighthouse</span>
            <span className="text-[7.2px] font-bold text-[#081F5C] bg-[#EEF1F5] px-1.5 rounded">0.8s</span>
          </div>
          
          <div className="space-y-1.5">
            {[
              { label: "Performance", val: 99, w: "99%" },
              { label: "SEO", val: 100, w: "100%" },
              { label: "Accessibility", val: 98, w: "98%" }
            ].map((stat, i) => (
              <div key={i} className="w-full">
                <div className="flex justify-between mb-0.5">
                  <span className="text-[5.8px] text-[#475569] font-medium">{stat.label}</span>
                  <span className="text-[5.8px] font-bold text-accent-cyan">{stat.val}</span>
                </div>
                <div className="w-full h-1 bg-[#EEF1F5] rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: stat.w }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8 + (i * 0.1) }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
    </div>
  );
}
