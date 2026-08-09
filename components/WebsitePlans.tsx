"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { 
  CheckCircle2, 
  ArrowRight, 
  Globe, 
  ShieldCheck, 
  Zap, 
  CreditCard,
  Rocket,
  Wrench,
  ChevronDown,
  MonitorSmartphone,
  BarChart,
  Headset,
  CalendarHeart
} from "lucide-react";
import WebsitePlanModal from "./WebsitePlanModal";

const PRICING_PLANS = [
  {
    id: "Starter",
    name: "Starter",
    price: "₹2,499",
    period: "/month",
    label: "Perfect for Local Businesses",
    accent: "text-emerald-500",
    bgAccent: "bg-emerald-500/10",
    borderAccent: "border-emerald-500/30",
    shadowAccent: "hover:shadow-[0_20px_40px_rgba(16,185,129,0.15)]",
    features: [
      "Up to 6 Premium Pages",
      "Custom .com Domain",
      "City-Level SEO",
      "Mobile Responsive",
      "SSL Certificate",
      "Free Hosting",
      "Admin Panel",
      "WhatsApp Integrated Contact Form",
      "1 Website Maintenance Every Month",
      "Email Support",
    ]
  },
  {
    id: "Growth",
    name: "Growth",
    price: "₹3,999",
    period: "/month",
    label: "Designed for Growing Businesses",
    isPopular: true,
    accent: "text-[#334EAC]",
    bgAccent: "bg-[#334EAC]/10",
    borderAccent: "border-[#334EAC]/50",
    shadowAccent: "hover:shadow-[0_20px_50px_rgba(51,78,172,0.25)]",
    features: [
      "Everything in Starter",
      "Up to 10 Premium Pages",
      "State-Level SEO",
      "Premium UI/UX",
      "Smooth Premium Animations",
      "Booking Forms",
      "Email + WhatsApp Forms",
      "Basic Ecommerce (Up to 50 Products)",
      "Speed Optimization",
      "Two Maintenance Sessions Per Month",
      "Priority Support",
    ]
  },
  {
    id: "Scale",
    name: "Scale",
    price: "₹7,499",
    period: "/month",
    label: "Built for Brands Ready to Scale",
    accent: "text-purple-500",
    bgAccent: "bg-purple-500/10",
    borderAccent: "border-purple-500/30",
    shadowAccent: "hover:shadow-[0_20px_40px_rgba(168,85,247,0.15)]",
    features: [
      "Up to 15 Premium Pages",
      "National SEO",
      "AI Chatbot",
      "Advanced Admin Dashboard",
      "Ecommerce (Up to 300 Products)",
      "Payment Gateway Integration",
      "Blog / CMS",
      "Weekly Website Maintenance",
      "Monthly SEO Reports",
      "Priority Technical Support",
      "Dedicated Account Manager",
    ]
  }
];

const COMPARISON_FEATURES = [
  { name: "Pages", starter: "Up to 6", growth: "Up to 10", scale: "Up to 15" },
  { name: "SEO", starter: "City-Level", growth: "State-Level", scale: "National" },
  { name: "Hosting", starter: true, growth: true, scale: true },
  { name: "SSL", starter: true, growth: true, scale: true },
  { name: "Maintenance", starter: "1 / month", growth: "2 / month", scale: "Weekly" },
  { name: "Admin Panel", starter: true, growth: true, scale: "Advanced" },
  { name: "Animations", starter: false, growth: "Premium", scale: "Premium" },
  { name: "Ecommerce", starter: false, growth: "50 Products", scale: "300 Products" },
  { name: "AI Chatbot", starter: false, growth: false, scale: true },
  { name: "Payment Gateway", starter: false, growth: "Basic", scale: "Advanced" },
  { name: "Monthly Reports", starter: false, growth: false, scale: "SEO & Traffic" },
  { name: "Support", starter: "Email", growth: "Priority", scale: "Dedicated Manager" },
];

const WHY_CHOOSE_US = [
  {
    icon: CreditCard,
    title: "No Large Upfront Investment",
    description: "Launch your business without paying lakhs upfront."
  },
  {
    icon: Rocket,
    title: "Always Updated",
    description: "We continuously improve your website."
  },
  {
    icon: Globe,
    title: "Hosting Included",
    description: "No hidden hosting costs."
  },
  {
    icon: ShieldCheck,
    title: "Security Included",
    description: "SSL, backups, monitoring and protection."
  },
  {
    icon: BarChart,
    title: "SEO Included",
    description: "Better Google visibility every month."
  },
  {
    icon: Headset,
    title: "Dedicated Support",
    description: "We manage everything while you focus on your business."
  }
];

const WEBSITE_TIMELINE = [
  "Consultation",
  "Design",
  "Development",
  "Review",
  "Launch",
  "Monthly Maintenance"
];

const MAINTENANCE_TIMELINE = [
  "Website Check",
  "Security Update",
  "Performance Optimization",
  "Content Changes",
  "Backup",
  "SEO Improvements",
  "Report Delivered"
];

const FAQS = [
  {
    question: "Do I own the website?",
    answer: "Yes! After 12 months of continuous subscription, you gain full ownership of the website code and design. You can choose to continue the subscription for hosting and maintenance, or migrate it elsewhere."
  },
  {
    question: "What happens if I cancel?",
    answer: "You can cancel anytime. If you cancel before 12 months, the website will be taken offline as it is a SaaS model. If you cancel after 12 months, we will package the website files and hand them over to you."
  },
  {
    question: "Can I upgrade anytime?",
    answer: "Absolutely. You can upgrade from Starter to Growth, or Growth to Scale at any point in your billing cycle. We will pro-rate the difference."
  },
  {
    question: "Can I add more pages?",
    answer: "Yes, you can request additional pages. Depending on your plan, it might be included in your monthly maintenance updates, or there may be a small one-time fee per extra page."
  },
  {
    question: "Do you provide hosting?",
    answer: "Yes, premium cloud hosting is included in all our monthly plans. You don't have to worry about server costs, uptime, or bandwidth."
  },
  {
    question: "How fast do you deliver?",
    answer: "Typically, a Starter website takes 7-10 days to launch. Growth and Scale websites take 14-21 days, depending on the complexity of the e-commerce setup and content readiness."
  },
  {
    question: "Can I migrate my existing website?",
    answer: "Yes, we can rebuild your existing website on our premium tech stack and redirect your old URLs so you don't lose any existing SEO value."
  }
];

export default function WebsitePlans() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Starter");
  
  const handleOpenModal = (plan = "Starter") => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const scrollToPricing = () => {
    const el = document.getElementById("pricing-cards");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="website-plans" className="relative w-full bg-[#FAF6EE] overflow-hidden pt-24 pb-32">
      
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#081F5C]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#334EAC]/5 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[20%] w-[60%] h-[30%] bg-[#FAF6EE] rounded-full blur-[80px]" />
      </div>

      <div className="section-shell relative z-10 max-w-[1200px] mx-auto">
        
        {/* ================= HEADER ================= */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-[#081F5C]/10 bg-white px-4 py-2 mb-6 shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#334EAC] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#081F5C]">Website Subscription</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold text-[#081F5C] leading-[1.1] tracking-tight mb-6"
          >
            Build Once.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#081F5C] to-[#334EAC]">Grow Forever.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-[#081F5C]/70 max-w-2xl mb-10 leading-relaxed"
          >
            Professional websites with hosting, maintenance, SEO, security, and continuous improvements—all under one affordable monthly subscription.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button 
              onClick={scrollToPricing}
              className="btn-primary px-8 py-4 text-base shadow-[0_10px_30px_rgba(51,78,172,0.3)] hover:-translate-y-1 transition-all"
            >
              Get Started
            </button>
            <button 
              onClick={scrollToPricing}
              className="px-8 py-4 text-base font-bold text-[#081F5C] bg-white border border-[#081F5C]/10 rounded-full shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              Compare Plans
            </button>
          </motion.div>
        </div>

        {/* ================= PRICING CARDS ================= */}
        <div id="pricing-cards" className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32 pt-10">
          {PRICING_PLANS.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className={`relative flex flex-col bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 border transition-all duration-500 ${plan.borderAccent} ${plan.shadowAccent} ${plan.isPopular ? 'scale-100 lg:scale-105 z-10 shadow-[0_30px_60px_rgba(51,78,172,0.15)] bg-white/90' : 'z-0 hover:bg-white/80'}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#081F5C] to-[#334EAC] text-white text-xs font-bold uppercase tracking-widest py-2 px-6 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${plan.accent}`}>{plan.name}</h3>
                <div className="flex items-end gap-1 mb-3">
                  <span className="text-4xl md:text-5xl font-black text-[#081F5C] tracking-tight">{plan.price}</span>
                  <span className="text-[#081F5C]/50 font-medium mb-1.5">{plan.period}</span>
                </div>
                <p className="text-sm font-semibold text-[#081F5C]/60">{plan.label}</p>
              </div>

              <div className="flex-1 space-y-4 mb-10">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${plan.accent}`} />
                    <span className={`text-sm md:text-base font-medium ${feature.includes('Everything in') ? 'text-[#081F5C] font-bold' : 'text-[#081F5C]/80'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleOpenModal(plan.name)}
                className={`w-full py-4 rounded-full font-bold text-base transition-all duration-300 ${plan.isPopular ? 'bg-[#334EAC] text-white shadow-[0_10px_20px_rgba(51,78,172,0.3)] hover:bg-[#081F5C]' : 'bg-white border-2 border-[#081F5C]/10 text-[#081F5C] hover:border-[#334EAC] hover:text-[#334EAC]'}`}
              >
                {plan.name === 'Starter' ? 'Start Now' : plan.name === 'Growth' ? 'Choose Growth' : 'Scale My Business'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* ================= COMPARISON TABLE ================= */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h3 className="font-display text-3xl md:text-5xl font-bold text-[#081F5C] mb-4">Compare Features</h3>
            <p className="text-[#081F5C]/60 text-lg">Find the perfect plan for your business needs.</p>
          </div>

          <div className="overflow-x-auto pb-6 custom-scrollbar">
            <div className="min-w-[800px] bg-white/60 backdrop-blur-xl rounded-[2rem] border border-[#081F5C]/10 overflow-hidden shadow-xl">
              {/* Table Header */}
              <div className="grid grid-cols-4 bg-[#081F5C] text-white p-6 border-b border-[#081F5C]/10">
                <div className="font-bold text-lg">Features</div>
                <div className="font-bold text-lg text-center text-emerald-400">Starter</div>
                <div className="font-bold text-lg text-center text-blue-400">Growth</div>
                <div className="font-bold text-lg text-center text-purple-400">Scale</div>
              </div>
              
              {/* Table Body */}
              <div className="divide-y divide-[#081F5C]/5">
                {COMPARISON_FEATURES.map((feature, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ delay: idx * 0.05 }}
                    className="grid grid-cols-4 p-6 hover:bg-white/80 transition-colors items-center"
                  >
                    <div className="font-semibold text-[#081F5C]">{feature.name}</div>
                    {[feature.starter, feature.growth, feature.scale].map((val, vIdx) => (
                      <div key={vIdx} className="text-center flex justify-center text-[#081F5C]/80 font-medium">
                        {typeof val === 'boolean' ? (
                          val ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <span className="text-[#081F5C]/30">-</span>
                        ) : (
                          val
                        )}
                      </div>
                    ))}
                  </motion.div>
                ))}
                
                {/* Table Footer Buttons */}
                <div className="grid grid-cols-4 p-6 bg-white/40">
                  <div></div>
                  {PRICING_PLANS.map((plan) => (
                    <div key={plan.id} className="flex justify-center">
                      <button 
                        onClick={() => handleOpenModal(plan.name)}
                        className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${plan.isPopular ? 'bg-[#334EAC] text-white' : 'bg-white border border-[#081F5C]/10 text-[#081F5C] hover:border-[#334EAC]'}`}
                      >
                        Select
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= WHY MONTHLY ================= */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h3 className="font-display text-3xl md:text-5xl font-bold text-[#081F5C] mb-4">Why Choose Our Monthly Website Plans?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white/70 backdrop-blur-md border border-[#081F5C]/10 rounded-[2rem] p-8 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(8,31,92,0.08)] group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#081F5C]/5 flex items-center justify-center mb-6 group-hover:bg-[#334EAC] group-hover:text-white transition-colors duration-300">
                  <item.icon className="w-7 h-7 text-[#334EAC] group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-xl font-bold text-[#081F5C] mb-3">{item.title}</h4>
                <p className="text-[#081F5C]/70 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= TIMELINES ================= */}
        <div className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Website Timeline */}
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-[#081F5C] mb-10">Website Creation Process</h3>
            <div className="relative pl-8 space-y-8">
              <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#334EAC] to-[#081F5C]/20 rounded-full" />
              {WEBSITE_TIMELINE.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[37px] top-1 w-6 h-6 rounded-full border-4 border-[#FAF6EE] bg-[#334EAC] shadow-sm flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm border border-[#081F5C]/10 rounded-xl p-4 shadow-sm hover:shadow-md transition-all hover:bg-white">
                    <div className="text-xs font-bold text-[#334EAC] uppercase tracking-wider mb-1">Step {idx + 1}</div>
                    <div className="font-bold text-[#081F5C] text-lg">{step}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Maintenance Timeline */}
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-[#081F5C] mb-10">Monthly Maintenance Cycle</h3>
            <div className="relative pl-8 space-y-6">
              <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-emerald-500 to-emerald-500/20 rounded-full" />
              {MAINTENANCE_TIMELINE.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[37px] top-1.5 w-6 h-6 rounded-full border-4 border-[#FAF6EE] bg-emerald-500 shadow-sm flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <div className="flex items-center gap-3 p-3">
                    <span className="font-semibold text-[#081F5C] text-lg">{step}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* ================= FAQ ================= */}
        <div className="mb-32 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-display text-3xl md:text-5xl font-bold text-[#081F5C] mb-4">Frequently Asked Questions</h3>
          </div>
          
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        {/* ================= CTA BANNER ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#081F5C] to-[#334EAC] p-12 md:p-20 text-center shadow-[0_30px_80px_rgba(8,31,92,0.3)]"
        >
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-cyan/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/3" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Let&apos;s Build Your Business Online</h2>
            <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
              Stop worrying about website maintenance, security, and updates. We handle everything so you can focus on growth.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => handleOpenModal("Growth")}
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-bold text-[#081F5C] shadow-lg transition-all hover:scale-105 hover:bg-gray-50"
              >
                Book Free Consultation
              </button>
              <button 
                onClick={() => handleOpenModal("Starter")}
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/50"
              >
                Get Started Today
              </button>
            </div>
          </div>
        </motion.div>

      </div>
      
      <WebsitePlanModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedPlan={selectedPlan}
      />
    </section>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white/60 backdrop-blur-md border border-[#081F5C]/10 rounded-2xl overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
      >
        <span className="font-bold text-lg text-[#081F5C] pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-[#334EAC] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="px-6 pb-5 text-[#081F5C]/70 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}
