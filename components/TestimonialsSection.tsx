"use client";

import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import { useState, useMemo, FormEvent, useEffect, useRef } from "react";
import { Loader2, CheckCircle, Star, Send } from "lucide-react";
import CountUp from "react-countup";
import { testimonials } from "../data/testimonials";

const SERVICES = [
  "All",
  "Website Development",
  "Online Presence",
  "AI Automation",
  "App Development",
  "Digital Branding",
  "Ads Management"
];

export default function TestimonialsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [filter, setFilter] = useState("All");
  
  // Form state
  const [formData, setFormData] = useState({ name: "", email: "", service: "", review: "", rating: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Filter reviews
  const filteredTestimonials = useMemo(() => {
    return testimonials.filter(t => filter === "All" || t.service.includes(filter));
  }, [filter]);

  // For infinite scroll, we duplicate the list so it can scroll seamlessly
  const scrollableReviews = useMemo(() => {
    // If the list is short, duplicate it more times to ensure it fills the container and can scroll
    const minItems = 10;
    let items = [...filteredTestimonials];
    while (items.length > 0 && items.length < minItems) {
      items = [...items, ...filteredTestimonials];
    }
    return [...items, ...items]; 
  }, [filteredTestimonials]);

  // Handle auto-scrolling logic
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || scrollableReviews.length === 0 || !showAllReviews || prefersReducedMotion || window.innerWidth < 768) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    const pixelsPerSecond = 35; // Adjust speed here

    const loop = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      if (!isHovered && container) {
        container.scrollTop += (pixelsPerSecond * deltaTime) / 1000;
        
        // Infinite scroll logic: if we've scrolled past half the scrollHeight, reset to 0
        // Because the list is duplicated, resetting by half the scroll height is seamless
        if (container.scrollTop >= container.scrollHeight / 2) {
          container.scrollTop -= container.scrollHeight / 2;
        }
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, scrollableReviews, showAllReviews, prefersReducedMotion]);

  // Reset scroll position when filter changes to avoid weird jumps
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [filter]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    if (formData.review.length < 20 || formData.review.length > 800) {
      setFormError("Review must be between 20 and 800 characters.");
      return;
    }
    if (!formData.service) {
      setFormError("Please select a service.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Sent with rating hardcoded or preserved, even though hidden
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, rating: 5 }) 
      });
      
      if (!res.ok) throw new Error("Failed to submit review");
      
      setIsSuccess(true);
      setFormData({ name: "", email: "", service: "", review: "", rating: 5 });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to generate consistent avatar colors based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-surface text-heading",
      "bg-surface-secondary text-accent-cyan",
      "bg-primary/10 text-primary",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  };

  return (
    <MotionConfig reducedMotion="user">
      <section id="testimonials" className="relative flex min-h-screen flex-col items-center overflow-hidden bg-surface py-24 md:py-32">
      
      {/* ---------------------------------------------------------------- */}
      {/* Animated Background Elements                                     */}
      {/* ---------------------------------------------------------------- */}
      
      {/* Subtle grid lines */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ backgroundImage: "linear-gradient(#081F5C 1px, transparent 1px), linear-gradient(90deg, #081F5C 1px, transparent 1px)", backgroundSize: "40px 40px" }}
      />
      
      {/* Slow floating blurred circles */}
      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, -40, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: prefersReducedMotion ? 0 : Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-accent-cyan mix-blend-multiply blur-[120px] pointer-events-none opacity-[0.04]"
      />
      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, 50, 0], x: [0, -30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 18, repeat: prefersReducedMotion ? 0 : Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-primary mix-blend-multiply blur-[120px] pointer-events-none opacity-[0.03]"
      />
      
      <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
        
        {/* ---------------------------------------------------------------- */}
        {/* Header & Animated Counters                                       */}
        {/* ---------------------------------------------------------------- */}
        <div className="text-center mb-12 flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 font-display text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl"
          >
            Trusted by Businesses
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-8 md:gap-16 justify-center"
          >
            <div className="flex flex-col items-center">
              <div className="flex font-display text-3xl font-black text-heading md:text-4xl">
                <CountUp end={100} duration={2.5} enableScrollSpy scrollSpyOnce />+
              </div>
              <p className="mt-1 flex items-center justify-center gap-1 text-xs font-semibold uppercase tracking-widest text-heading/70">
                Verified Reviews
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 font-display text-3xl font-black text-heading md:text-4xl">
                <CountUp end={4} duration={2.5} enableScrollSpy scrollSpyOnce />.
                <CountUp end={9} duration={2.5} enableScrollSpy scrollSpyOnce />
                <span className="text-xl text-heading/50 md:text-2xl">/5</span>
              </div>
              <p className="mt-1 flex items-center justify-center gap-1 text-xs font-semibold uppercase tracking-widest text-heading/70">
                Average Rating
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-display text-3xl font-black text-heading md:text-4xl">
                <CountUp end={6} duration={2.5} enableScrollSpy scrollSpyOnce />
              </div>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-heading/70">Services</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-display text-3xl font-black text-accent-cyan md:text-4xl">
                <CountUp end={98} duration={2.5} enableScrollSpy scrollSpyOnce />%
              </div>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-heading/70">Recommend Us</p>
            </div>
          </motion.div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Filters                                                          */}
        {/* ---------------------------------------------------------------- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-10 max-w-4xl"
        >
          {SERVICES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`flex min-h-11 items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 shadow-sm ${
                filter === s
                  ? "bg-primary text-primary-foreground shadow-[0_5px_15px_rgb(var(--primary)_/_0.3)] scale-105"
                  : "border border-border bg-background/60 text-heading hover:bg-background"
              }`}
            >
              {s}
            </button>
          ))}
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* Auto-scrolling Review Feed                                       */}
        {/* ---------------------------------------------------------------- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={`relative mx-auto mb-8 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-border bg-background/60 shadow-[0_20px_60px_rgb(var(--primary)_/_0.08)] backdrop-blur-xl ${showAllReviews ? "h-[560px] md:h-[700px]" : "h-auto"}`}
          style={{
            // Create the fade in at bottom, fade out at top effect using mask-image
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
          }}
        >
          <div
            ref={scrollRef}
            className={`h-full w-full ${showAllReviews ? "overflow-y-auto" : "overflow-visible"}`}
            style={{
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE/Edge
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
          >
            {/* Custom style to hide webkit scrollbar */}
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            <div className="py-10 flex flex-col">
              {(showAllReviews ? scrollableReviews : filteredTestimonials.slice(0, 3)).length === 0 ? (
                <div className="py-20 text-center font-medium text-heading/50">
                  No reviews found for this service.
                </div>
              ) : (
                (showAllReviews ? scrollableReviews : filteredTestimonials.slice(0, 3)).map((t, index) => {
                  const avatarColor = getAvatarColor(t.name);
                  const initials = getInitials(t.name);
                  
                  return (
                    <div 
                      key={`${t.id}-${index}`}
                      className="group border-b border-primary/5 px-6 py-8 transition-all duration-500 hover:bg-background/70 md:px-12 last:border-b-0"
                    >
                      <div className="flex items-start gap-4 transition-transform duration-500 group-hover:scale-[1.02] group-hover:translate-x-2">
                        {/* Avatar */}
                        <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center font-bold text-sm ${avatarColor}`}>
                          {initials}
                        </div>
                        
                        <div className="flex-1">
                          {/* Top Row: Name & Badges */}
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                            <h4 className="text-base font-bold text-heading transition-colors group-hover:text-accent-cyan">
                              {t.name}
                            </h4>
                            
                            {t.verified && (
                              <div className="flex items-center gap-1 rounded-full bg-accent-green/30 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-heading transition-all">
                                <CheckCircle className="w-3 h-3" />
                                Verified Client
                              </div>
                            )}
                          </div>
                          
                          {/* Second Row: Service & Stars */}
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className="text-sm font-medium text-heading/60">
                              {t.service[0]}
                            </span>
                            <div className="h-1 w-1 rounded-full bg-heading/20" />
                            <div className="flex items-center gap-0.5 text-accent-cyan">
                              {[...Array(t.rating)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-current" />
                              ))}
                            </div>
                          </div>
                          
                          {/* Review Text */}
                          <p className="text-base leading-[1.6] text-text">
                            &quot;{t.review}&quot;
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </motion.div>
        <button
          type="button"
          onClick={() => setShowAllReviews((value) => !value)}
          className="mb-16 inline-flex min-h-11 items-center justify-center rounded-full border border-accent-cyan px-5 py-2 text-sm font-semibold text-accent-cyan hover:bg-accent-cyan hover:text-primary-foreground"
        >
          {showAllReviews ? "Show selected reviews" : "Browse all reviews"}
        </button>

        {/* ---------------------------------------------------------------- */}
        {/* Share Your Experience Form                                       */}
        {/* ---------------------------------------------------------------- */}
        <div className="relative z-10 mx-auto w-full max-w-2xl rounded-[2.5rem] border border-primary/10 bg-background/70 p-8 shadow-[0_20px_50px_rgb(var(--primary)_/_0.04)] backdrop-blur-md md:p-10 group/form">
          <div className="mb-8 text-center">
            <h3 className="font-display text-2xl font-bold text-heading">Share Your Experience</h3>
            <p className="mt-2 text-sm text-heading/60">Help others by sharing your journey with Virtual Valley.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full rounded-full border border-border bg-surface/50 px-6 py-3.5 text-sm text-heading outline-none transition-all placeholder:text-muted focus:border-accent-cyan focus:ring-4 focus:ring-accent-cyan/10"
                  placeholder="Full Name"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full rounded-full border border-border bg-surface/50 px-6 py-3.5 text-sm text-heading outline-none transition-all placeholder:text-muted focus:border-accent-cyan focus:ring-4 focus:ring-accent-cyan/10"
                  placeholder="Email Address"
                />
              </div>
            </div>
            
            <div className="relative">
              <select
                required
                value={formData.service}
                onChange={(e) => setFormData({...formData, service: e.target.value})}
                className="w-full cursor-pointer appearance-none rounded-full border border-border bg-surface/50 px-6 py-3.5 text-sm text-heading outline-none transition-all focus:border-accent-cyan focus:ring-4 focus:ring-accent-cyan/10"
              >
                <option value="" disabled>Select the service you received</option>
                {SERVICES.filter(s => s !== "All").map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            
            <div className="relative">
              <textarea
                required
                rows={4}
                value={formData.review}
                onChange={(e) => setFormData({...formData, review: e.target.value})}
                className="w-full resize-none rounded-[2rem] border border-border bg-surface/50 px-6 py-4 text-sm text-heading outline-none transition-all placeholder:text-muted focus:border-accent-cyan focus:ring-4 focus:ring-accent-cyan/10"
                placeholder="Write your detailed review here..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-sm font-bold text-primary-foreground transition-all hover:bg-accent-cyan hover:shadow-[0_0_20px_rgb(var(--accent-cyan)_/_0.2)] disabled:cursor-not-allowed disabled:opacity-70 group-hover/form:border group-hover/form:border-accent-cyan/20"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isSuccess ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Submitted!
                </>
              ) : (
                <>
                  Submit Review
                  <Send className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
            
            {formError && (
              <p className="text-red-500 text-[11px] text-center mt-2">{formError}</p>
            )}
          </form>
        </div>

      </div>
      </section>
    </MotionConfig>
  );
}
