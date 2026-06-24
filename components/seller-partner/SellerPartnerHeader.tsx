"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Rocket, Network } from "lucide-react";
import Link from "next/link";

export default function SellerPartnerHeader() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden px-4">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <motion.div 
          className="flex flex-col items-start z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-widest text-gold mb-6 uppercase">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            Hiring Now
          </div>
          <h1 className="font-display text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Become a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Virtual Valley</span><br />
            Seller Partner
          </h1>
          <p className="text-lg text-white/70 mb-10 max-w-xl leading-relaxed">
            Earn commissions, gain real-world experience, receive verified certificates, and access internship and job opportunities while helping businesses grow online.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="#apply">
              <button className="bg-gradient-to-r from-gold to-yellow-600 text-black font-bold px-8 py-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all transform hover:scale-105">
                Apply Now
              </button>
            </Link>
            <Link href="#opportunities">
              <button className="border border-white/20 bg-white/5 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-all">
                View Opportunities
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Right Illustration / Cards */}
        <motion.div 
          className="relative z-10 grid grid-cols-2 gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Student Card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm flex flex-col items-center text-center transform translate-y-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="h-16 w-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
              <GraduationCap size={32} />
            </div>
            <h3 className="font-bold text-white mb-2">Student</h3>
            <p className="text-xs text-white/50">Gain real experience & certificates</p>
          </div>
          
          {/* Freelancer Card */}
          <div className="rounded-2xl border border-purple/30 bg-purple/10 p-6 backdrop-blur-sm flex flex-col items-center text-center shadow-[0_0_30px_rgba(139,92,246,0.2)]">
            <div className="h-16 w-16 rounded-full bg-purple/30 flex items-center justify-center mb-4 text-purple-300">
              <Rocket size={32} />
            </div>
            <h3 className="font-bold text-white mb-2">Freelancer</h3>
            <p className="text-xs text-white/50">Unlimited earning potential</p>
          </div>

          {/* Sales Partner Card */}
          <div className="rounded-2xl border border-gold/30 bg-gold/10 p-6 backdrop-blur-sm flex flex-col items-center text-center translate-y-8 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
            <div className="h-16 w-16 rounded-full bg-gold/20 flex items-center justify-center mb-4 text-gold">
              <Briefcase size={32} />
            </div>
            <h3 className="font-bold text-white mb-2">Sales Partner</h3>
            <p className="text-xs text-white/50">High-ticket commission payouts</p>
          </div>

          {/* Business Growth Card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 text-green-400">
              <Network size={32} />
            </div>
            <h3 className="font-bold text-white mb-2">Business Growth</h3>
            <p className="text-xs text-white/50">Help local brands dominate</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
