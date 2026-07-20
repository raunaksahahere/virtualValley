"use client";

import { motion, useInView } from "framer-motion";
import { Zap, Clock, Video, Shield, ArrowRight, CheckCircle2, User, MessageCircle, FileText, Calendar } from "lucide-react";
import { useState, useRef } from "react";

// ============================================================================
// ILLUSTRATION WIDGETS
// ============================================================================

const FloatingWidget = ({ children, className, animateY, delay = 0 }: { children: React.ReactNode, className: string, animateY: number[], delay?: number }) => (
  <motion.div 
    className={`absolute z-20 flex items-center gap-3 overflow-hidden rounded-xl border border-border bg-surface p-3 shadow-[0_15px_40px_rgb(var(--primary)_/_0.15)] ${className}`}
    animate={{ y: animateY }}
    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay }}
  >
    {children}
  </motion.div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function Contact() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    service: "",
    budget: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const fieldClass = "w-full rounded-xl border border-border bg-surface-secondary px-5 py-4 text-base text-heading placeholder:text-muted focus:border-accent-cyan focus:bg-background";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error("Failed to send message.");
      
      setStatus("success");
      setFeedback("Message received! We will be in touch shortly.");
      setForm({ name: "", email: "", phone: "", business: "", service: "", budget: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Unable to send your message right now.");
    }
  };

  const features = [
    { icon: Zap, text: "Strategy Call" },
    { icon: Clock, text: "Fast Response" },
    { icon: Video, text: "Google Meet" },
    { icon: Shield, text: "Premium Support" },
  ];

  return (
    <section id="contact" className="dark-section relative overflow-hidden py-24 md:py-32" ref={containerRef}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-surface to-transparent" />
      
      {/* ------------------------------------------------------------- */}
      {/* ANIMATED BACKGROUND (SERVICES AESTHETIC) */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Blueprint Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`, 
            backgroundSize: '60px 60px' 
          }} 
        />
        
        {/* Soft Cream Light Ray */}
        <motion.div 
          className="absolute top-0 right-[10%] w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,rgba(240,237,211,0.05),transparent_60%)] -rotate-12 blur-[28.8px]"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="section-shell relative z-10 max-w-[1008px]">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-12 items-center">
          
          {/* ------------------------------------------------------------- */}
          {/* LEFT SIDE (40%) */}
          {/* ------------------------------------------------------------- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-[45%] flex flex-col pt-8"
          >
            <div className="mb-6 inline-flex w-max items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground">Start a Conversation</span>
            </div>
            
            <h2 className="mb-8 font-display text-5xl font-bold leading-[1.05] tracking-tight text-heading lg:text-[43.2px]">
              Let&apos;s Build <br/>
              Something <br/>
              <span className="text-primary-foreground">Exceptional.</span>
            </h2>

            <p className="mb-12 max-w-md text-lg leading-relaxed text-text">
              Whether you&apos;re launching a startup, modernizing an existing business, automating operations, or growing your online presence, Virtual Valley is ready to help.
            </p>

            {/* Cream Capsule Tags */}
            <div className="flex flex-wrap gap-3">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: 0.3 + (idx * 0.05) }}
                  className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-foreground/30 hover:bg-primary-foreground/10 hover:shadow-[0_4px_15px_rgb(var(--primary-foreground)_/_0.1)]"
                >
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                  <feature.icon className="relative z-10 h-3.5 w-3.5 text-primary-foreground" />
                  <span className="relative z-10 text-xs font-semibold text-primary-foreground/90">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ------------------------------------------------------------- */}
          {/* RIGHT SIDE (55% Form + Widgets) */}
          {/* ------------------------------------------------------------- */}
          <div className="w-full lg:w-[55%] relative">
            
            {/* FLOATING UI WIDGETS (Only visible on desktop) */}
            <div className="hidden lg:block absolute inset-[-28.8px] pointer-events-none">
              
              {/* Widget 1: Incoming Lead */}
              <FloatingWidget className="top-10 -left-16" animateY={[0, -15, 0]} delay={0}>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs font-bold text-heading">Incoming Lead</p>
                  <p className="text-xs font-semibold text-muted">Analysis initiated...</p>
                </div>
              </FloatingWidget>

              {/* Widget 2: Meeting Scheduled */}
              <FloatingWidget className="top-[45%] -right-12" animateY={[0, 15, 0]} delay={2}>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-cyan/20">
                  <Calendar className="h-4 w-4 text-accent-cyan" />
                </div>
                <div>
                  <p className="text-xs font-bold text-heading">Meeting Scheduled</p>
                  <p className="text-xs font-semibold text-muted">Google Meet • 30m</p>
                </div>
              </FloatingWidget>

              {/* Widget 3: WhatsApp Connected */}
              <FloatingWidget className="-bottom-6 left-10" animateY={[0, -10, 0]} delay={4}>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-green/30">
                  <MessageCircle className="h-4 w-4 text-accent-green" />
                </div>
                <div>
                  <p className="text-xs font-bold text-heading">Reply within 24h</p>
                  <div className="flex gap-1 mt-0.5">
                    <motion.div className="h-1 w-1 rounded-full bg-accent-green" animate={{ opacity: [1,0.3,1] }} transition={{ duration: 1, repeat: Infinity }} />
                    <motion.div className="h-1 w-1 rounded-full bg-accent-green" animate={{ opacity: [1,0.3,1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
                    <motion.div className="h-1 w-1 rounded-full bg-accent-green" animate={{ opacity: [1,0.3,1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
                  </div>
                </div>
              </FloatingWidget>
            </div>

            {/* FORM CONTAINER */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 w-full rounded-2xl border border-border bg-background p-8 text-text shadow-[0_30px_60px_rgb(var(--primary)_/_0.15)] md:p-10"
            >
              <p className="mb-5 text-center text-sm font-semibold text-muted lg:hidden">Reply within 24h</p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="px-1 text-xs font-bold uppercase tracking-widest text-heading">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      name="name" 
                      value={form.name} 
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={fieldClass}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="px-1 text-xs font-bold uppercase tracking-widest text-heading">Email Address</label>
                    <input 
                      required 
                      type="email" 
                      name="email" 
                      value={form.email} 
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="px-1 text-xs font-bold uppercase tracking-widest text-heading">Phone (Optional)</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={form.phone} 
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className={fieldClass}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="px-1 text-xs font-bold uppercase tracking-widest text-heading">Business Name</label>
                    <input 
                      type="text" 
                      name="business" 
                      value={form.business} 
                      onChange={handleChange}
                      placeholder="Your Company Ltd"
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="px-1 text-xs font-bold uppercase tracking-widest text-heading">Service Required</label>
                    <div className="relative">
                      <select 
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className={`${fieldClass} appearance-none`}
                      >
                        <option value="">Select a service...</option>
                        <option value="website">Premium Website</option>
                        <option value="app">App Development</option>
                        <option value="automation">AI & Automation</option>
                        <option value="marketing">Digital Marketing</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="px-1 text-xs font-bold uppercase tracking-widest text-heading">Estimated Budget</label>
                    <div className="relative">
                      <select 
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        className={`${fieldClass} appearance-none`}
                      >
                        <option value="">Select budget range...</option>
                        <option value="<25k">Less than ₹25k</option>
                        <option value="25k-50k">₹25k - ₹50k</option>
                        <option value="50k-1L">₹50k - ₹1L</option>
                        <option value=">1L">More than ₹1L</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mt-2">
                  <label className="px-1 text-xs font-bold uppercase tracking-widest text-heading">Project Details</label>
                  <textarea 
                    required 
                    name="message" 
                    value={form.message} 
                    onChange={handleChange}
                    placeholder="Tell us about your goals, target audience, and what you're looking to achieve..."
                    rows={4}
                    className={`${fieldClass} resize-none`}
                  />
                </div>

                {feedback && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    className={`mt-2 p-4 rounded-xl text-sm font-semibold flex items-center gap-3 ${status === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}
                  >
                    {status === 'success' && <CheckCircle2 className="w-5 h-5" />}
                    {feedback}
                  </motion.div>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="group relative mt-2 flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-primary px-8 py-5 text-base font-bold text-primary-foreground shadow-[0_10px_20px_rgb(var(--primary)_/_0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-cyan disabled:opacity-70"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <span className="relative z-10">{status === 'loading' ? 'Sending...' : 'Request Proposal'}</span>
                  <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
