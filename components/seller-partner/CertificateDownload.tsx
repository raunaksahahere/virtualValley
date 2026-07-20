"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, FileBadge, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CertificateDownload() {
  const [certId, setCertId] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (certId.trim()) {
      setStatus("loading");
      const cleanId = certId.trim().replace(/^CERT-ID:\s*/i, "").split('/').pop();
      
      // Simulate network delay for premium feel
      setTimeout(() => {
        setStatus("success");
        setTimeout(() => {
          if (cleanId) {
            router.push(`/verify/${cleanId}`);
          }
        }, 800);
      }, 1200);
    }
  };

  return (
    <section className="relative overflow-hidden border-y border-border bg-surface py-24 md:py-32">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,rgba(51, 78, 172,0.08)_0%,transparent_60%)] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(45deg, #081F5C 1px, transparent 1px)", backgroundSize: "20px 20px" }}
      />
      
      <div className="max-w-[1008px] mx-auto px-4 relative z-10 flex justify-center">
        <motion.div 
          className="w-full max-w-4xl bg-white/70 backdrop-blur-2xl border border-white shadow-[0_20px_50px_rgba(8,31,92,0.08)] rounded-[2.5rem] p-8 md:p-14 flex flex-col md:flex-row gap-12 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Left Text */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#081F5C]/10 mb-6 relative">
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-[#334EAC] border-dashed"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <FileBadge className="w-8 h-8 text-[#081F5C]" />
            </div>
            <h2 className="mb-4 font-display text-3xl font-bold text-heading md:text-4xl">
              Verify Certificate
            </h2>
            <p className="text-lg leading-relaxed text-text">
              Employers and clients can instantly verify the authenticity of any Virtual Valley certificate by entering the unique ID below.
            </p>
          </div>

          {/* Right Input Form */}
          <div className="flex-1 w-full max-w-md">
            <form onSubmit={handleVerify} className="flex flex-col gap-4 relative">
              <motion.div 
                className={`relative rounded-2xl p-1 transition-colors duration-300 ${isFocused ? 'bg-gradient-to-r from-[#081F5C] to-[#334EAC]' : 'bg-transparent'}`}
              >
                <div className="relative bg-white rounded-xl shadow-sm border border-[rgba(8,31,92,0.1)] flex items-center overflow-hidden">
                  <div className="pl-5 pr-2">
                    <Search className={`h-5 w-5 transition-colors ${isFocused ? 'text-accent-cyan' : 'text-muted'}`} />
                  </div>
                  <input
                    type="text"
                    required
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Enter Certificate ID..."
                    className="flex-1 bg-transparent px-2 py-5 font-medium text-heading outline-none placeholder:text-muted/60"
                  />
                </div>
              </motion.div>
              
              <button
                type="submit"
                disabled={status !== "idle" || !certId.trim()}
                className="group w-full py-4 bg-[#081F5C] text-white rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:bg-[#334EAC] disabled:opacity-80 disabled:cursor-not-allowed shadow-[0_10px_20px_rgba(8,31,92,0.15)] hover:shadow-[0_15px_30px_rgba(8,31,92,0.25)]"
              >
                {status === "idle" && (
                  <>
                    Verify Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
                {status === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
                {status === "success" && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2 text-accent-cyan">
                    <CheckCircle className="w-5 h-5" /> Verified
                  </motion.div>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
