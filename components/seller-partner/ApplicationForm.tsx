"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      window.location.href = "/seller-partner?submitted=true";
    }, 1500);
  };

  return (
    <section id="apply" className="py-24 bg-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(139,92,246,0.1)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Start Your Journey</h2>
          <p className="text-white/50 text-lg">Apply now. No complex interviews required.</p>
        </div>

        <motion.div 
          className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-8 md:p-12 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-white/70 uppercase tracking-widest font-semibold">Full Name *</label>
                <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/70 uppercase tracking-widest font-semibold">Phone Number *</label>
                <input required type="tel" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="+91 98765 43210" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-white/70 uppercase tracking-widest font-semibold">Email Address *</label>
                <input required type="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/70 uppercase tracking-widest font-semibold">City *</label>
                <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="Mumbai, Bangalore, etc." />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/70 uppercase tracking-widest font-semibold">Opportunity Type *</label>
              <div className="relative">
                <select required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none">
                  <option value="" disabled selected>Select an opportunity...</option>
                  <option value="Internship">Internship</option>
                  <option value="Job">Job</option>
                  <option value="Referral">Referral Partner</option>
                  <option value="Seller">Seller Partner</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">▼</div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/70 uppercase tracking-widest font-semibold">Experience / Current Status (Optional)</label>
              <textarea className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors h-24 resize-none" placeholder="E.g., 3rd year student, freelance marketer, etc." />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Apply Now"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
