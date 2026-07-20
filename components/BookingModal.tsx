"use client";

import { useState, useEffect } from "react";
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  MapPin, 
  Mail, 
  Briefcase, 
  CheckCircle, 
  ChevronRight, 
  Loader2, 
  CalendarHeart,
  MonitorPlay,
  Globe,
  Bot,
  Smartphone,
  Palette,
  Megaphone,
  ArrowRight,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: string;
}

const SERVICES = [
  {
    title: "Website Development",
    icon: MonitorPlay,
    description: "Professional business websites, e-commerce stores, and optimization.",
    duration: "45 mins"
  },
  {
    title: "Online Presence",
    icon: Globe,
    description: "Google Business, local listings, and visibility optimization.",
    duration: "30 mins"
  },
  {
    title: "AI Automation",
    icon: Bot,
    description: "Chatbots, WhatsApp auto-reply, and CRM automation.",
    duration: "45 mins"
  },
  {
    title: "App Development",
    icon: Smartphone,
    description: "iOS, Android, custom applications and software.",
    duration: "45 mins"
  },
  {
    title: "Digital Branding",
    icon: Palette,
    description: "Logo, identity, color palette, and visual design language.",
    duration: "30 mins"
  },
  {
    title: "Ads Management",
    icon: Megaphone,
    description: "Google Ads, Meta Ads, and performance marketing campaigns.",
    duration: "45 mins"
  },
];

// Generate days for custom calendar (next 30 days)
const generateCalendarDays = () => {
  const days = [];
  const today = new Date();
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    // Skip Sundays (0)
    if (date.getDay() !== 0) {
      days.push({
        date: date,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        fullDate: [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-")
      });
    }
  }
  return days;
};

export default function BookingModal({ isOpen, onClose, selectedService: initialService }: BookingModalProps) {
  // 1 = Choose Service, 2 = Wizard Details, 3 = Schedule, 4 = Success
  const [step, setStep] = useState(1);
  const [wizardStep, setWizardStep] = useState(1); // 1: Name, 2: Location, 3: Contact, 4: Sales ID
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Form State
  const [service, setService] = useState(initialService || "");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientLocation, setClientLocation] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [salesGuyId, setSalesGuyId] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [salesGuyName, setSalesGuyName] = useState("");
  const [brochureEmailSent, setBrochureEmailSent] = useState<boolean | null>(null);

  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [calendarDays, setCalendarDays] = useState(generateCalendarDays());
  
  useEffect(() => {
    if (isOpen) {
      setStep(initialService ? 2 : 1);
      if (initialService) setService(initialService);
      setWizardStep(1);
      setError("");
      setSalesGuyName("");
      setScheduleDate("");
      setMeetingTime("");
      setAvailableSlots([]);
      setBrochureEmailSent(null);
    }
  }, [isOpen, initialService]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const handleServiceSelect = (s: string) => {
    setService(s);
    setStep(2);
    setWizardStep(1);
  };

  const handleWizardNext = async () => {
    if (wizardStep === 1 && !clientName.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (wizardStep === 2 && !clientLocation.trim()) {
      setError("Please enter your location.");
      return;
    }
    if (wizardStep === 3) {
      if (!clientEmail.trim() || !clientPhone.trim()) {
        setError("Please provide both email and phone number.");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(clientEmail.trim())) {
        setError("Please enter a valid email address.");
        return;
      }
      const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
      if (!phoneRegex.test(clientPhone.replace(/\s+/g, ''))) {
        setError("Please enter a valid phone number (e.g. 9876543210).");
        return;
      }
    }
    
    setError("");

    if (wizardStep < 4) {
      setWizardStep(wizardStep + 1);
    } else {
      setSalesGuyName(salesGuyId ? "Referred Lead" : "Direct Lead");
      setStep(3);
    }
  };

  const handleBook = async () => {
    if (!scheduleDate || !meetingTime) {
      setError("Please select a date and time.");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/cal/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: clientName,
          phone: clientPhone,
          city: clientLocation,
          email: clientEmail,
          service,
          start: meetingTime,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          referralId: salesGuyId,
        }),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setBrochureEmailSent(data.brochureEmailSent !== false);
        setStep(4);
      } else {
        setError(data.error || "Failed to book meeting.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatSlotTime = (slot: string) => new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }).format(new Date(slot));

  const loadAvailableSlots = async (date: string) => {
    setLoading(true);
    setError("");
    setAvailableSlots([]);
    try {
      const params = new URLSearchParams({
        service,
        date,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
      const res = await fetch(`/api/cal/slots?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Unable to load available times.");
      setAvailableSlots(data.slots || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load available times.");
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
          {/* Animated particle field (simplified with CSS pattern) */}
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
          className="relative w-full max-w-4xl glass-card-premium rounded-[2rem] overflow-hidden flex flex-col max-h-[95vh] shadow-2xl border border-border bg-background/40"
        >
          <div className="border-b border-border px-8 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted sm:px-12">
            Service <span className="px-1 text-accent-cyan">→</span> Details <span className="px-1 text-accent-cyan">→</span> Time
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
              {/* STEP 1: CHOOSE SERVICE */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-10"
                >
                  <div className="text-center max-w-2xl mx-auto space-y-4">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground tracking-tight">
                      Choose Your Strategy Session
                    </h2>
                    <p className="text-muted text-lg">
                      Select a service to explore how we can engineer your growth.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {SERVICES.map((s, i) => {
                      const Icon = s.icon;
                      return (
                        <motion.button
                          key={s.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          onClick={() => handleServiceSelect(s.title)}
                          className="group relative overflow-hidden rounded-3xl border border-border bg-white/[0.03] p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:border-accent-cyan/40 hover:bg-surface-secondary hover:shadow-[0_15px_40px_rgb(var(--accent-cyan)_/_0.12)]"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-[#334EAC]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="relative z-10 flex flex-col h-full">
                            <div className="w-14 h-14 rounded-2xl bg-background/40 border border-border flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-[#334EAC]/40 group-hover:bg-[#334EAC]/5 transition-all duration-500 shadow-lg">
                              <Icon className="w-7 h-7 text-accent-cyan" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">{s.title}</h3>
                            <p className="text-sm text-muted mb-4 flex-grow leading-relaxed">{s.description}</p>
                            <div className="flex items-center justify-between mt-auto pt-5 border-t border-border">
                              <span className="text-xs font-medium text-muted flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> {s.duration}</span>
                              <span className="text-accent-cyan text-sm font-bold flex items-center group-hover:translate-x-1 transition-transform">Continue <ChevronRight className="w-4 h-4 ml-0.5" /></span>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: WIZARD DETAILS */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="max-w-xl mx-auto py-10"
                >
                  <div className="mb-12">
                    <div className="flex flex-col mb-6 bg-white/[0.03] border border-border p-4 rounded-2xl">
                      <span className="text-[7.2px] font-bold text-muted uppercase tracking-widest mb-1">Selected Service</span>
                      <div className="flex items-center justify-between">
                        <span className="text-base font-bold text-foreground">{service}</span>
                        <button onClick={() => setStep(1)} className="text-sm text-accent-cyan hover:text-white transition-colors underline">Change</button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-accent-cyan uppercase tracking-[0.2em]">Step 2 of 3</span>
                    </div>
                    {/* Animated Progress Bar */}
                    <div className="h-1.5 w-full bg-surface-secondary rounded-full overflow-hidden shadow-inner">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-[#081F5C] to-[#334EAC] rounded-full"
                        initial={{ width: `${((wizardStep - 1) / 4) * 100}%` }}
                        animate={{ width: `${(wizardStep / 4) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {wizardStep === 1 && (
                      <motion.div key="w1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground tracking-tight">What should we call you?</h2>
                        <div className="relative mt-8">
                          <User className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted/50" />
                          <input 
                            autoFocus
                            type="text" 
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleWizardNext()}
                            className="w-full bg-white/[0.03] border border-border rounded-[1.5rem] py-6 pl-16 pr-6 text-2xl text-foreground outline-none focus:border-accent-cyan focus:bg-white/[0.05] transition-all placeholder:text-foreground/20 shadow-inner"
                            placeholder="e.g. John Doe"
                          />
                        </div>
                      </motion.div>
                    )}

                    {wizardStep === 2 && (
                      <motion.div key="w2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground tracking-tight">Where are you located?</h2>
                        <div className="relative mt-8">
                          <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted/50" />
                          <input 
                            autoFocus
                            type="text" 
                            value={clientLocation}
                            onChange={(e) => setClientLocation(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleWizardNext()}
                            className="w-full bg-white/[0.03] border border-border rounded-[1.5rem] py-6 pl-16 pr-6 text-2xl text-foreground outline-none focus:border-accent-cyan focus:bg-white/[0.05] transition-all placeholder:text-foreground/20 shadow-inner"
                            placeholder="City, Country"
                          />
                        </div>
                      </motion.div>
                    )}

                    {wizardStep === 3 && (
                      <motion.div key="w3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground tracking-tight">How can we reach you?</h2>
                        <div className="space-y-5 mt-8">
                          <div className="relative">
                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted/50" />
                            <input 
                              autoFocus
                              type="email" 
                              value={clientEmail}
                              onChange={(e) => setClientEmail(e.target.value)}
                              className="w-full bg-white/[0.03] border border-border rounded-[1.5rem] py-5 pl-16 pr-6 text-xl text-foreground outline-none focus:border-accent-cyan focus:bg-white/[0.05] transition-all placeholder:text-foreground/20 shadow-inner"
                              placeholder="Email Address"
                            />
                          </div>
                          <div className="relative">
                            <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted/50" />
                            <input 
                              type="tel" 
                              value={clientPhone}
                              onChange={(e) => setClientPhone(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleWizardNext()}
                              className="w-full bg-white/[0.03] border border-border rounded-[1.5rem] py-5 pl-16 pr-6 text-xl text-foreground outline-none focus:border-accent-cyan focus:bg-white/[0.05] transition-all placeholder:text-foreground/20 shadow-inner"
                              placeholder="Phone Number"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {wizardStep === 4 && (
                      <motion.div key="w4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground tracking-tight">Have a referral ID?</h2>
                        <p className="text-muted text-lg mt-2">Optional. Enter your Sales Representative ID if you were referred.</p>
                        <div className="relative mt-8">
                          <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted/50" />
                          <input 
                            autoFocus
                            type="text" 
                            value={salesGuyId}
                            onChange={(e) => setSalesGuyId(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleWizardNext()}
                            className="w-full bg-white/[0.03] border border-border rounded-[1.5rem] py-6 pl-16 pr-6 text-2xl text-foreground outline-none focus:border-accent-cyan focus:bg-white/[0.05] transition-all placeholder:text-foreground/20 shadow-inner"
                            placeholder="Enter ID or press Enter to skip"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {error && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 mt-6 text-sm bg-red-950/40 p-4 rounded-xl border border-red-500/30">
                      {error}
                    </motion.p>
                  )}

                  <div className="mt-12 flex items-center justify-between">
                    <button 
                      onClick={() => wizardStep > 1 ? setWizardStep(wizardStep - 1) : setStep(1)} 
                      className="text-muted hover:text-foreground px-6 py-3 transition-colors text-lg"
                    >
                      Back
                    </button>
                    <button 
                      onClick={handleWizardNext}
                      disabled={loading}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-accent-cyan bg-primary px-10 py-5 text-lg font-bold text-primary-foreground shadow-[0_10px_30px_rgb(var(--accent-cyan)_/_0.25)] transition-all hover:-translate-y-1 hover:bg-accent-cyan hover:shadow-[0_15px_40px_rgb(var(--accent-cyan)_/_0.4)] disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                        <>{wizardStep === 4 ? "Select Date & Time" : "Continue"} <ArrowRight className="w-6 h-6" /></>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: SCHEDULE */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="max-w-5xl mx-auto"
                >
                  <div className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-accent-cyan uppercase tracking-[0.2em]">Final Step</span>
                      <button onClick={() => setStep(2)} className="text-sm text-muted hover:text-foreground transition-colors">Edit Details</button>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4 tracking-tight">Schedule Your Call</h2>
                    <p className="text-muted text-lg">Select a date and time for your strategy session.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8">
                    {/* Custom Calendar */}
                    <div className="bg-white/[0.02] border border-border rounded-[2rem] p-8 shadow-inner">
                      <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3"><CalendarIcon className="w-6 h-6 text-accent-cyan"/> Select Date</h3>
                      <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 max-h-[252px] overflow-y-auto custom-scrollbar pr-2 pb-2">
                        {calendarDays.map((day) => {
                          const isSelected = scheduleDate === day.fullDate;
                          return (
                            <motion.button
                              key={day.fullDate}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setScheduleDate(day.fullDate);
                                setMeetingTime("");
                                void loadAvailableSlots(day.fullDate);
                              }}
                              className={`flex flex-col items-center justify-center py-4 px-2 rounded-2xl border transition-all duration-300 ${
                                isSelected 
                                  ? "scale-105 border-accent-cyan bg-primary text-primary-foreground shadow-[0_10px_25px_rgb(var(--accent-cyan)_/_0.3)]" 
                                  : "bg-surface-secondary border-border text-foreground hover:bg-surface-secondary hover:border-border/30"
                              }`}
                            >
                              <span className={`text-xs uppercase font-bold tracking-widest ${isSelected ? 'text-primary-foreground/70' : 'text-muted'}`}>{day.dayName}</span>
                              <span className={`text-2xl font-black my-1.5 ${isSelected ? 'text-primary-foreground' : 'text-foreground'}`}>{day.dayNumber}</span>
                              <span className={`text-xs font-semibold ${isSelected ? 'text-primary-foreground/70' : 'text-muted'}`}>{day.month}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div className="bg-white/[0.02] border border-border rounded-[2rem] p-8 flex flex-col shadow-inner">
                      <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3"><Clock className="w-6 h-6 text-accent-cyan"/> Available Time</h3>
                      
                      {!scheduleDate ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-muted text-center p-8 bg-white/[0.02] rounded-[1.5rem] border border-border border-dashed">
                          <CalendarIcon className="w-12 h-12 mb-4 opacity-20" />
                          <p className="text-lg">Select a date to view available times.</p>
                        </div>
                      ) : loading ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-muted text-center p-8 bg-white/[0.02] rounded-[1.5rem] border border-border border-dashed">
                          <Loader2 className="w-10 h-10 mb-4 animate-spin text-accent-cyan" />
                          <p className="text-lg">Checking Cal.com availability…</p>
                        </div>
                      ) : availableSlots.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-muted text-center p-8 bg-white/[0.02] rounded-[1.5rem] border border-border border-dashed">
                          <Clock className="w-12 h-12 mb-4 opacity-20" />
                          <p className="text-lg">No times are available for this date.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-4">
                          {availableSlots.map((slot) => {
                            const isSelected = meetingTime === slot;
                            return (
                              <button
                                key={slot}
                                onClick={() => setMeetingTime(slot)}
                                className={`p-4 rounded-2xl border text-lg flex items-center justify-center transition-all duration-300 ${
                                  isSelected 
                                    ? "bg-[#334EAC]/20 text-accent-cyan border-[#334EAC] font-bold shadow-[inset_0_0_20px_rgba(51, 78, 172,0.2)]" 
                                    : "bg-surface-secondary border-border text-foreground hover:bg-surface-secondary hover:border-accent-cyan/40"
                                }`}
                              >
                                {formatSlotTime(slot)}
                              </button>
                            );
                          })}
                        </div>
                      )}
                      
                      {error && (
                        <p className="text-red-400 mt-6 text-sm bg-red-950/40 p-4 rounded-xl border border-red-500/30">
                          {error}
                        </p>
                      )}

                      <button 
                        onClick={handleBook} 
                        disabled={loading || !scheduleDate || !meetingTime}
                        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border border-accent-cyan bg-primary px-6 py-5 text-lg font-bold text-primary-foreground shadow-[0_10px_30px_rgb(var(--accent-cyan)_/_0.25)] transition-all hover:-translate-y-1 hover:bg-accent-cyan hover:shadow-[0_15px_40px_rgb(var(--accent-cyan)_/_0.4)] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                      >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Confirm Strategy Session"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: SUCCESS SCREEN */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-2xl mx-auto text-center py-16 relative"
                >
                  {/* Glowing success particles behind */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                     <motion.div 
                       initial={{ scale: 0 }}
                       animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
                       transition={{ duration: 1.5 }}
                       className="w-[288px] h-[288px] bg-[#334EAC]/20 rounded-full blur-[72px]"
                     />
                  </div>

                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
                    className="mx-auto mb-10 flex h-28 w-28 items-center justify-center rounded-full border-4 border-primary bg-gradient-to-br from-accent-cyan to-primary shadow-[0_0_60px_rgb(var(--accent-cyan)_/_0.5)]"
                  >
                    <CheckCircle className="w-14 h-14 text-primary-foreground" />
                  </motion.div>
                  
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 tracking-tight">Session Confirmed</h2>
                  <p className="text-xl text-muted mb-12">
                    {brochureEmailSent
                      ? "You’re officially booked. Your brochure and calendar invite are on their way to your inbox."
                      : "You’re officially booked. We couldn’t deliver the brochure by email, so you can download it below."}
                  </p>

                  <div className="bg-white/[0.03] backdrop-blur-xl border border-border rounded-[2rem] p-8 text-left space-y-6 mb-10 shadow-inner">
                    <div className="flex justify-between items-center pb-6 border-b border-border">
                      <span className="text-muted text-lg">Strategic Focus</span>
                      <span className="font-bold text-accent-cyan text-xl text-right">{service}</span>
                    </div>
                    <div className="flex justify-between items-center pb-6 border-b border-border">
                      <span className="text-muted text-lg">Date & Time</span>
                      <span className="font-bold text-foreground text-xl text-right">{new Date(`${scheduleDate}T12:00:00`).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric'})}<br/>{formatSlotTime(meetingTime)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted text-lg">Attendees</span>
                      <span className="font-bold text-foreground text-xl text-right">{clientName} & Virtual Valley</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <a 
                      href="https://meet.google.com/qhx-nuog-fwj" 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-accent-cyan bg-primary px-6 py-5 text-base font-bold text-primary-foreground shadow-[0_10px_25px_rgb(var(--accent-cyan)_/_0.25)] transition-all hover:-translate-y-1 hover:bg-accent-cyan hover:shadow-[0_15px_35px_rgb(var(--accent-cyan)_/_0.35)]"
                    >
                      Join Meeting Link
                    </a>
                    <a 
                      href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Strategy+Session+with+Virtual+Valley&details=Service:+${encodeURIComponent(service)}%0A%0AMeet+Link:+https://meet.google.com/qhx-nuog-fwj&dates=${scheduleDate.replace(/-/g, "")}T100000Z/${scheduleDate.replace(/-/g, "")}T110000Z`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface-secondary px-6 py-5 text-base font-bold text-foreground hover:border-border/40 hover:bg-surface-secondary transition-all hover:-translate-y-1"
                    >
                      <CalendarHeart className="w-5 h-5" /> Add to Calendar
                    </a>
                  </div>

                  {!brochureEmailSent && (
                    <a
                      href="/Brochure.pdf"
                      download
                      className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-accent-cyan/50 px-6 py-4 text-base font-bold text-accent-cyan transition-colors hover:bg-accent-cyan hover:text-primary"
                    >
                      <Download className="h-5 w-5" /> Download Brochure
                    </a>
                  )}
                  
                  <button 
                    onClick={onClose}
                    className="mt-10 text-muted hover:text-foreground underline underline-offset-8 decoration-white/20 transition-all text-lg"
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
