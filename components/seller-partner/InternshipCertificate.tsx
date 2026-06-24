"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

export default function InternshipCertificate() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#050505]">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left: Content */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Verified Internship Certificate</h2>
          <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto lg:mx-0">
            Every successful student and intern receives a verifiable completion certificate from Virtual Valley, adding massive value to your resume and career profile.
          </p>
          <ul className="space-y-4 text-left max-w-sm mx-auto lg:mx-0">
            {["Official Virtual Valley Logo & Branding", "Specific Role & Duration Mentioned", "Authorized Signatures", "Unique Certificate ID for Verification"].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <CheckCircle className="text-gold flex-shrink-0" size={20} />
                <span className="text-white/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Certificate Mockup */}
        <motion.div 
          className="flex-1 relative w-full max-w-2xl"
          initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ perspective: 1000 }}
        >
          {/* Floating Badge */}
          <motion.div 
            className="absolute -top-6 -right-6 z-20 bg-gradient-to-r from-green-400 to-emerald-600 text-white font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-[0_0_30px_rgba(52,211,153,0.4)]"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <CheckCircle size={16} /> Verified Certificate
          </motion.div>

          {/* Realistic Certificate Image */}
          <div className="w-full rounded-xl shadow-[0_40px_100px_rgba(212,175,55,0.15)] relative overflow-hidden border border-white/20">
            <Image
              src="/certificate-template.png"
              alt="Virtual Valley Verified Certificate"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
