"use client";

import { useState, useEffect } from "react";
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  Briefcase, 
  CheckCircle, 
  Loader2, 
  ArrowRight,
  Building,
  MonitorPlay,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WebsitePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
}

export default function WebsitePlanModal({ isOpen, onClose, selectedPlan: initialPlan }: WebsitePlanModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  
  // Form State
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    businessName: "",
    businessType: "",
    selectedPlan: initialPlan || "Starter",
    message: "",
    sellerId: ""
  });

  useEffect(() => {
    if (isOpen) {
      setError("");
      setSuccess(false);
      setForm(prev => ({ ...prev, selectedPlan: initialPlan || "Starter", sellerId: "" }));
    }
  }, [isOpen, initialPlan]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.businessName.trim() || !form.businessType.trim() || !form.message.trim()) {
      setError("Please fill out all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
    if (!phoneRegex.test(form.phone.replace(/\s+/g, ''))) {
      setError("Please enter a valid phone number.");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/website-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Failed to submit enquiry.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        {/* Animated Background Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/70 backdrop-blur-xl"
        >
          {/* Subtle moving gradient mesh */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-primary/20 mix-blend-screen filter blur-[86.4px] animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-[10%] right-[10%] h-[40vw] w-[40vw] animate-pulse rounded-full bg-accent-cyan/10 mix-blend-screen blur-[72px]" style={{ animationDuration: '10s', animationDelay: '2s' }} />
          </div>
          {/* Animated particle field */}
          <div className="absolute inset-0 opacity-[0.25]" 
               style={{ 
                 backgroundImage: 'radial-gradient(circle at center, rgba(51, 78, 172,0.3) 1px, transparent 1px)',
                 backgroundSize: '48px 48px',
                 animation: 'moveParticles 40s linear infinite'
               }} 
          />
        </motion.div>
        
        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 40 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-2xl glass-card-premium rounded-[2rem] overflow-hidden flex flex-col max-h-[95vh] shadow-2xl border border-border bg-background/40"
        >
          <div className="border-b border-border px-8 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted sm:px-12">
            Website Subscription Enquiry
          </div>
          {/* Close Button */}
          <button 
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-6 right-6 z-50 p-2.5 text-muted hover:text-foreground hover:bg-surface-secondary rounded-full transition-colors backdrop-blur-md border border-transparent hover:border-border"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-8 sm:p-12">
            <AnimatePresence mode="wait">
              {!success ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight mb-2">
                      Let&apos;s Build Your Online Presence
                    </h2>
                    <p className="text-muted text-lg">
                      Fill out the form below and we will get back to you shortly.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/50" />
                        <input 
                          type="text" 
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className="w-full bg-white/[0.03] border border-border rounded-xl py-4 pl-12 pr-4 text-foreground outline-none focus:border-accent-cyan focus:bg-white/[0.05] transition-all placeholder:text-foreground/20"
                          placeholder="Full Name"
                          required
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/50" />
                        <input 
                          type="tel" 
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className="w-full bg-white/[0.03] border border-border rounded-xl py-4 pl-12 pr-4 text-foreground outline-none focus:border-accent-cyan focus:bg-white/[0.05] transition-all placeholder:text-foreground/20"
                          placeholder="Phone Number"
                          required
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/50" />
                      <input 
                        type="email" 
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-white/[0.03] border border-border rounded-xl py-4 pl-12 pr-4 text-foreground outline-none focus:border-accent-cyan focus:bg-white/[0.05] transition-all placeholder:text-foreground/20"
                        placeholder="Email Address"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="relative">
                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/50" />
                        <input 
                          type="text" 
                          name="businessName"
                          value={form.businessName}
                          onChange={handleChange}
                          className="w-full bg-white/[0.03] border border-border rounded-xl py-4 pl-12 pr-4 text-foreground outline-none focus:border-accent-cyan focus:bg-white/[0.05] transition-all placeholder:text-foreground/20"
                          placeholder="Business Name"
                          required
                        />
                      </div>
                      <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/50" />
                        <input 
                          type="text" 
                          name="businessType"
                          value={form.businessType}
                          onChange={handleChange}
                          className="w-full bg-white/[0.03] border border-border rounded-xl py-4 pl-12 pr-4 text-foreground outline-none focus:border-accent-cyan focus:bg-white/[0.05] transition-all placeholder:text-foreground/20"
                          placeholder="Business Type (e.g. Retail)"
                          required
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <MonitorPlay className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/50" />
                      <select
                        name="selectedPlan"
                        value={form.selectedPlan}
                        onChange={handleChange}
                        className="w-full bg-white/[0.03] border border-border rounded-xl py-4 pl-12 pr-4 text-foreground outline-none focus:border-accent-cyan focus:bg-white/[0.05] transition-all appearance-none"
                        required
                      >
                        <option value="Starter">Starter Plan - ₹2,499/mo</option>
                        <option value="Growth">Growth Plan - ₹3,999/mo</option>
                        <option value="Scale">Scale Plan - ₹7,499/mo</option>
                      </select>
                    </div>

                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/50" />
                      <input 
                        type="text" 
                        name="sellerId"
                        value={form.sellerId}
                        onChange={handleChange}
                        className="w-full bg-white/[0.03] border border-border rounded-xl py-4 pl-12 pr-4 text-foreground outline-none focus:border-accent-cyan focus:bg-white/[0.05] transition-all placeholder:text-foreground/20"
                        placeholder="Seller / Referral ID (Optional)"
                      />
                    </div>

                    <div className="relative">
                      <FileText className="absolute left-4 top-6 w-5 h-5 text-muted/50" />
                      <textarea 
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        className="w-full bg-white/[0.03] border border-border rounded-xl py-4 pl-12 pr-4 text-foreground outline-none focus:border-accent-cyan focus:bg-white/[0.05] transition-all placeholder:text-foreground/20 resize-none"
                        placeholder="Tell us about your requirements..."
                        rows={4}
                        required
                      />
                    </div>

                    {error && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 mt-2 text-sm bg-red-950/40 p-4 rounded-xl border border-red-500/30">
                        {error}
                      </motion.p>
                    )}

                    <button 
                      type="submit"
                      disabled={loading}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-accent-cyan bg-primary px-6 py-5 text-lg font-bold text-primary-foreground shadow-[0_10px_30px_rgb(var(--accent-cyan)_/_0.25)] transition-all hover:-translate-y-1 hover:bg-accent-cyan hover:shadow-[0_15px_40px_rgb(var(--accent-cyan)_/_0.4)] disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                        <>Submit Enquiry <ArrowRight className="w-5 h-5" /></>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 relative"
                >
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                     <motion.div 
                       initial={{ scale: 0 }}
                       animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
                       transition={{ duration: 1.5 }}
                       className="w-64 h-64 bg-[#334EAC]/20 rounded-full blur-[72px]"
                     />
                  </div>

                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
                    className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border-4 border-primary bg-gradient-to-br from-accent-cyan to-primary shadow-[0_0_40px_rgb(var(--accent-cyan)_/_0.5)]"
                  >
                    <CheckCircle className="w-12 h-12 text-primary-foreground" />
                  </motion.div>
                  
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 tracking-tight">Enquiry Received!</h2>
                  <p className="text-lg text-muted mb-8 max-w-md mx-auto">
                    Thank you, {form.name}. We&apos;ve received your details and will contact you within 24 hours to discuss your {form.selectedPlan} plan.
                  </p>

                  <button 
                    onClick={onClose}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface-secondary px-8 py-4 text-base font-bold text-foreground hover:border-accent-cyan/40 hover:bg-surface-secondary transition-all hover:-translate-y-1"
                  >
                    Return to Homepage
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
