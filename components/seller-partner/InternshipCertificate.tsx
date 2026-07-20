"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

export default function InternshipCertificate() {
  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#081F5C 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[576px] h-[576px] bg-[radial-gradient(circle_at_center,rgba(51, 78, 172,0.06)_0%,transparent_60%)] pointer-events-none blur-3xl" />

      <div className="max-w-[1008px] mx-auto px-4 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        
        {/* Left: Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight tracking-tight text-heading md:text-5xl">
              Verified Experience <br className="hidden lg:block"/>
              <span className="text-[#334EAC]">Certificate</span>
            </h2>
            <p className="mb-10 mx-auto max-w-xl text-lg leading-relaxed text-text lg:mx-0">
              Every successful sales intern receives a verifiable completion certificate, adding massive value to your resume and professional portfolio.
            </p>
            <ul className="space-y-5 text-left max-w-sm mx-auto lg:mx-0">
              {["Official Virtual Valley Branding", "Specific Role & Duration Mentioned", "Authorized Signatures", "Unique ID for Verification"].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#081F5C]/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="text-[#081F5C]" size={14} strokeWidth={3} />
                  </div>
                  <span className="font-medium text-heading">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Right: Premium Glass Showcase */}
        <div className="flex-1 w-full max-w-2xl relative perspective-1000">
          
          {/* Floating Verifiable Badge */}
          <motion.div 
            className="absolute -top-6 -right-6 lg:-right-10 z-30 bg-[#081F5C] text-white font-bold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-[0_15px_30px_rgba(8,31,92,0.3)] border border-[#334EAC]"
            animate={{ y: [0, -12, 0], scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <CheckCircle size={16} className="text-[#FFFDD0]" /> Verifiable
          </motion.div>

          {/* Glass Frame */}
          <motion.div 
            className="relative p-4 md:p-6 rounded-[2rem] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_30px_80px_rgba(8,31,92,0.12)] group"
            initial={{ opacity: 0, rotateY: -15, scale: 0.9 }}
            whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            whileHover={{ rotateY: -2, rotateX: 2, scale: 1.02 }}
          >
            {/* Rotating Light Sweep */}
            <motion.div 
              className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none"
              style={{ zIndex: 20 }}
            >
              <motion.div 
                className="absolute top-0 bottom-0 w-[200%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-30deg]"
                animate={{ left: ["-150%", "150%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 12, ease: "easeInOut" }}
              />
            </motion.div>
            
            {/* Spotlight Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.8),transparent_50%)] rounded-[2rem] pointer-events-none" />

            <div className="w-full rounded-xl overflow-hidden shadow-inner border border-[rgba(8,31,92,0.05)] relative z-10 bg-white">
              <Image
                src="/certificate-template.png"
                alt="Virtual Valley Verified Certificate"
                width={576}
                height={432}
                className="w-full h-auto object-cover opacity-95 transition-opacity group-hover:opacity-100"
                priority
              />
            </div>
            
            {/* Reflection under the frame */}
            <div className="absolute -bottom-12 inset-x-10 h-8 bg-[#081F5C]/10 blur-xl rounded-[100%]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
