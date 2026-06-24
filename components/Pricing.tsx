"use client";

import {
  BarChart3,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe2,
  Megaphone,
  MousePointerClick,
  ShoppingBag,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import pricingData from "@/data/pricing.json";

type PricingCategory = "website" | "social" | "digital-presence" | "ads";
type WebsiteMode = "build" | "repair";
type SocialMode = "weekly" | "monthly";
type DigitalPresenceMode =
  | "restaurant-cafe"
  | "product-selling-shop"
  | "service-business";
type AdsMode = "google-ads" | "meta-ads";


type BasePackageCard = {
  id: string;
  name: string;
  price: string;
  popular: boolean;
  features: string[];
  description: string;
  serviceType: string;
  packageType: string;
  billingLabel?: string;
  categoryLabel: string;
  recommendedAddons: string[];
  highlight?: "gold" | "purple";
};



const topLevelTabs: Array<{
  id: PricingCategory;
  label: string;
  icon: typeof Globe2;
}> = [
  { id: "website", label: "Website", icon: Globe2 },
  { id: "social", label: "Social Media", icon: BarChart3 },
  { id: "digital-presence", label: "Digital Presence", icon: Store },
  { id: "ads", label: "Ads", icon: Megaphone },
];

const digitalPresenceSegments: Array<{
  id: DigitalPresenceMode;
  label: string;
  icon: typeof UtensilsCrossed;
}> = [
  { id: "restaurant-cafe", label: "Restaurant / Cafe", icon: UtensilsCrossed },
  { id: "product-selling-shop", label: "Product Selling Shop", icon: ShoppingBag },
  { id: "service-business", label: "Service Business", icon: BriefcaseBusiness },
];

const adsTabs: Array<{
  id: AdsMode;
  label: string;
  icon: typeof Megaphone;
}> = [
  { id: "google-ads", label: "Google Ads", icon: MousePointerClick },
  { id: "meta-ads", label: "Meta Ads", icon: Megaphone },
];

const digitalPresenceData: Record<DigitalPresenceMode, BasePackageCard[]> = {
  "restaurant-cafe": [
    {
      id: "restaurant-starter",
      name: "Starter",
      price: "5,000",
      popular: false,
      description: "Get your restaurant online with the essential setup customers expect.",
      categoryLabel: "Restaurant / Cafe",
      serviceType: "digital-presence",
      packageType: "restaurant-cafe-starter",
      features: [
        "Google Business Profile (GMB)",
        "Swiggy Setup",
        "Zomato Setup",
        "Basic Business Information Setup",
        "Contact & Timing Configuration",
      ],
      recommendedAddons: [
        "Professional Menu Design",
        "Review QR Standee Design",
        "Food Photo Optimization",
      ],
    },
    {
      id: "restaurant-growth",
      name: "Growth",
      price: "6,500",
      popular: false,
      description: "Improve visibility and customer trust across discovery channels.",
      categoryLabel: "Restaurant / Cafe",
      serviceType: "digital-presence",
      packageType: "restaurant-cafe-growth",
      features: [
        "Google Business Profile (GMB)",
        "Swiggy Setup",
        "Zomato Setup",
        "Apple Maps",
        "Justdial",
        "WhatsApp Business",
        "Review QR Code",
      ],
      recommendedAddons: [
        "Monthly GMB Management",
        "Menu Upload/Modification",
        "Food Photo Optimization",
      ],
    },
    {
      id: "restaurant-premium",
      name: "Premium",
      price: "8,000",
      popular: true,
      highlight: "gold",
      description: "A complete restaurant digital presence stack for discovery, trust, and repeat visits.",
      categoryLabel: "Restaurant / Cafe",
      serviceType: "digital-presence",
      packageType: "restaurant-cafe-premium",
      features: [
        "Google Business Profile (GMB)",
        "Swiggy Setup",
        "Zomato Setup",
        "Apple Maps",
        "Justdial",
        "TripAdvisor",
        "Instagram Business Account",
        "Facebook Business Page",
        "Facebook Business Manager",
        "WhatsApp Business",
        "QR Menu",
        "Review QR Code",
      ],
      recommendedAddons: [
        "Professional Menu Design",
        "Monthly GMB Management",
        "Swiggy/Zomato Menu Updates",
        "Food Photo Optimization",
      ],
    },
  ],
  "product-selling-shop": [
    {
      id: "retail-starter",
      name: "Starter",
      price: "5,000",
      popular: false,
      description: "Make your retail business discoverable and easier to contact online.",
      categoryLabel: "Product Selling Shop",
      serviceType: "digital-presence",
      packageType: "product-selling-shop-starter",
      features: [
        "Google Business Profile (GMB)",
        "Apple Maps",
        "Justdial",
        "WhatsApp Business",
        "Business Information Setup",
      ],
      recommendedAddons: [
        "Product Catalog Setup",
        "Product Photo Editing",
        "Review QR Standee Design",
      ],
    },
    {
      id: "retail-growth",
      name: "Growth",
      price: "6,500",
      popular: false,
      description: "Expand visibility with stronger profile setup and social proof touchpoints.",
      categoryLabel: "Product Selling Shop",
      serviceType: "digital-presence",
      packageType: "product-selling-shop-growth",
      features: [
        "Google Business Profile (GMB)",
        "Apple Maps",
        "Justdial",
        "Instagram Business Account",
        "Facebook Business Page",
        "WhatsApp Business",
        "Review QR Code",
      ],
      recommendedAddons: [
        "WhatsApp Catalog Setup",
        "Product Catalog Setup",
        "Product Photo Editing",
      ],
    },
    {
      id: "retail-premium",
      name: "Premium",
      price: "8,000",
      popular: true,
      highlight: "gold",
      description: "A complete digital storefront presence for shops ready to scale customer confidence.",
      categoryLabel: "Product Selling Shop",
      serviceType: "digital-presence",
      packageType: "product-selling-shop-premium",
      features: [
        "Google Business Profile (GMB)",
        "Apple Maps",
        "Justdial",
        "Instagram Business Account",
        "Facebook Business Page",
        "Facebook Business Manager",
        "WhatsApp Business",
        "Review QR Code",
        "Product Catalog Setup",
        "Google Maps Optimization",
      ],
      recommendedAddons: [
        "Facebook Shop Setup",
        "Product Photo Editing",
        "Monthly GMB Management",
      ],
    },
  ],
  "service-business": [
    {
      id: "service-starter",
      name: "Starter",
      price: "5,000",
      popular: false,
      description: "A clean setup for service businesses that need discoverability and enquiry readiness.",
      categoryLabel: "Service Business",
      serviceType: "digital-presence",
      packageType: "service-business-starter",
      features: [
        "Google Business Profile (GMB)",
        "Apple Maps",
        "Justdial",
        "WhatsApp Business",
        "Business Information Setup",
      ],
      recommendedAddons: [
        "Lead Collection Form Setup",
        "Review QR Standee Design",
      ],
    },
    {
      id: "service-growth",
      name: "Growth",
      price: "6,500",
      popular: false,
      description: "Build trust and capture more inbound interest with stronger digital visibility.",
      categoryLabel: "Service Business",
      serviceType: "digital-presence",
      packageType: "service-business-growth",
      features: [
        "Google Business Profile (GMB)",
        "Apple Maps",
        "Justdial",
        "Instagram Business Account",
        "Facebook Business Page",
        "WhatsApp Business",
        "Review QR Code",
      ],
      recommendedAddons: [
        "Appointment Booking System",
        "Lead Collection Form Setup",
      ],
    },
    {
      id: "service-premium",
      name: "Premium",
      price: "8,000",
      popular: true,
      highlight: "gold",
      description: "An end-to-end service business presence designed for authority, trust, and lead capture.",
      categoryLabel: "Service Business",
      serviceType: "digital-presence",
      packageType: "service-business-premium",
      features: [
        "Google Business Profile (GMB)",
        "Apple Maps",
        "Justdial",
        "Instagram Business Account",
        "Facebook Business Page",
        "Facebook Business Manager",
        "WhatsApp Business",
        "Review QR Code",
        "Service Catalog Setup",
        "Google Maps Optimization",
        "Lead Collection Form Setup",
      ],
      recommendedAddons: [
        "Appointment Booking System",
        "Monthly GMB Management",
        "Service Catalog Enhancement",
      ],
    },
  ],
};



function formatInr(value: number) {
  return new Intl.NumberFormat("en-IN").format(Math.round(value));
}

function interpolate(min: number, max: number, ratio: number) {
  return min + (max - min) * ratio;
}

function buildOrderHref(input: {
  name: string;
  price: string;
  packageType: string;
  serviceType: string;
  isMonthly?: boolean;
}) {
  const payload = encodeURIComponent(
    JSON.stringify({
      name: input.name,
      price: input.price,
      packageType: input.packageType,
      serviceType: input.serviceType,
    }),
  );

  return `/order?selectedPackage=${payload}&isMonthly=${input.isMonthly ? "true" : "false"}`;
}

function getWebsiteAddons(mode: WebsiteMode, packageName: string) {
  if (mode === "repair") {
    return ["Lead Collection Form Setup", "Brochure Design", "Banner/Poster Design"];
  }

  if (packageName === "Professional Build") {
    return ["Logo Design", "Lead Collection Form Setup", "Appointment Booking System"];
  }

  return ["Logo Design", "Business Card Design", "Brochure Design"];
}

function getSocialAddons(planName: string) {
  if (planName === "Professional Plan" || planName === "Enterprise Plan") {
    return ["Promotional Posters", "Festival & Offer Creatives", "Product Photo Editing"];
  }

  return ["Promotional Posters", "Festival & Offer Creatives", "Banner/Poster Design"];
}



function usePackageCards(
  category: PricingCategory,
  websiteMode: WebsiteMode,
  socialMode: SocialMode,
  digitalPresenceMode: DigitalPresenceMode,
) {
  return useMemo<BasePackageCard[]>(() => {
    if (category === "website") {
      const websitePackages =
        websiteMode === "build" ? pricingData.websiteBuild : pricingData.websiteRepair;

      return websitePackages.map((item) => ({
        id: `${websiteMode}-${item.name}`,
        name: item.name,
        price: item.price,
        popular: item.popular,
        features: item.features,
        description:
          websiteMode === "build"
            ? "Custom website builds designed for speed, clarity, and business growth."
            : "Website repair and recovery support to improve reliability, speed, and trust.",
        serviceType: "website",
        packageType: websiteMode,
        categoryLabel: websiteMode === "build" ? "Website Build" : "Website Repair",
        recommendedAddons: getWebsiteAddons(websiteMode, item.name),
      }));
    }

    if (category === "social") {
      return pricingData.socialMedia.map((item) => ({
        id: `${socialMode}-${item.name}`,
        name: item.name,
        price: String(socialMode === "weekly" ? item.weekly : item.monthly),
        popular: item.popular,
        features: item.features,
        description:
          socialMode === "monthly"
            ? "A structured 28-day content and management cadence for consistent growth."
            : "A weekly sprint for active brands that need faster content delivery.",
        serviceType: "social",
        packageType: socialMode === "monthly" ? "28-days" : "weekly",
        billingLabel: socialMode === "monthly" ? "28 Days" : "Week",
        categoryLabel: "Social Media",
        recommendedAddons: getSocialAddons(item.name),
      }));
    }

    if (category === "digital-presence") {
      return digitalPresenceData[digitalPresenceMode];
    }

    return [];
  }, [category, websiteMode, socialMode, digitalPresenceMode]);
}

export default function Pricing() {
  const [category, setCategory] = useState<PricingCategory>("website");
  const [websiteMode, setWebsiteMode] = useState<WebsiteMode>("build");
  const [socialMode, setSocialMode] = useState<SocialMode>("weekly");
  const [digitalPresenceMode, setDigitalPresenceMode] =
    useState<DigitalPresenceMode>("restaurant-cafe");
  const [adsMode, setAdsMode] = useState<AdsMode>("google-ads");
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedAddons, setExpandedAddons] = useState<string | null>(null);

  const [googleBudget, setGoogleBudget] = useState(5500);
  const [metaDailyBudget, setMetaDailyBudget] = useState(120);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const cards = usePackageCards(
    category,
    websiteMode,
    socialMode,
    digitalPresenceMode,
  );

  useEffect(() => {
    setActiveIndex(0);
    setExpandedAddons(null);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [category, websiteMode, socialMode, digitalPresenceMode]);

  const moveCarousel = (direction: "prev" | "next") => {
    if (!scrollRef.current || cards.length === 0) return;

    const nextIndex =
      direction === "next"
        ? Math.min(activeIndex + 1, cards.length - 1)
        : Math.max(activeIndex - 1, 0);

    const width = scrollRef.current.clientWidth;
    scrollRef.current.scrollTo({ left: width * nextIndex, behavior: "smooth" });
    setActiveIndex(nextIndex);
  };

  const selectSlide = (index: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      left: scrollRef.current.clientWidth * index,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };



  const googleRatio = (googleBudget - 5500) / (150000 - 5500);
  const googleClicksLow = interpolate(100, 3100, googleRatio);
  const googleClicksHigh = interpolate(200, 5320, googleRatio);
  const googleLeadLow = interpolate(8, 120, googleRatio);
  const googleLeadHigh = interpolate(16, 260, googleRatio);
  const googleDailyBudget = googleBudget / 30;

  const metaRatio = (metaDailyBudget - 120) / (12000 - 120);
  const metaImpressionsLow = interpolate(0, 11900, metaRatio);
  const metaImpressionsHigh = interpolate(499, 22000, metaRatio);
  const metaReachLow = interpolate(80, 4800, metaRatio);
  const metaReachHigh = interpolate(220, 9400, metaRatio);
  const metaMonthlyBudget = metaDailyBudget * 30;

  const renderSubSelector = () => {
    if (category === "website") {
      return (
        <div className="mt-8 flex flex-wrap gap-3">
          {[
            { id: "build" as const, label: "Build" },
            { id: "repair" as const, label: "Repair" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setWebsiteMode(item.id)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] transition-all ${
                websiteMode === item.id
                  ? "border-gold/40 bg-gold/10 text-gold shadow-[0_0_0_1px_rgba(212,175,55,0.12)]"
                  : "border-white/10 bg-white/5 text-white-secondary hover:border-white/20 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      );
    }

    if (category === "social") {
      return (
        <div className="mt-8 flex flex-wrap gap-3">
          {[
            { id: "weekly" as const, label: "Weekly" },
            { id: "monthly" as const, label: "28 Days" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSocialMode(item.id)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] transition-all ${
                socialMode === item.id
                  ? "border-gold/40 bg-gold/10 text-gold shadow-[0_0_0_1px_rgba(212,175,55,0.12)]"
                  : "border-white/10 bg-white/5 text-white-secondary hover:border-white/20 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      );
    }

    if (category === "digital-presence") {
      return (
        <div className="mt-8 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="inline-flex min-w-full gap-3 rounded-[2rem] border border-white/10 bg-white/[0.03] p-2 backdrop-blur-md">
            {digitalPresenceSegments.map((segment) => {
              const Icon = segment.icon;
              const isActive = digitalPresenceMode === segment.id;

              return (
                <button
                  key={segment.id}
                  type="button"
                  onClick={() => setDigitalPresenceMode(segment.id)}
                  className={`inline-flex min-w-max items-center gap-2 rounded-[1.25rem] px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-purple/20 to-gold/15 text-white shadow-[0_0_0_1px_rgba(139,92,246,0.18)]"
                      : "text-white-secondary hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-gold" : "text-purple"} />
                  {segment.label}
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    if (category === "ads") {
      return (
        <div className="mt-8 flex flex-wrap gap-3">
          {adsTabs.map((item) => {
            const Icon = item.icon;
            const isActive = adsMode === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setAdsMode(item.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] transition-all ${
                  isActive
                    ? "border-purple/40 bg-purple/10 text-white"
                    : "border-white/10 bg-white/5 text-white-secondary hover:border-white/20 hover:text-white"
                }`}
              >
                <Icon size={14} className={isActive ? "text-gold" : "text-purple"} />
                {item.label}
              </button>
            );
          })}
        </div>
      );
    }

    return null;
  };

  return (
    <section id="pricing" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gold/6 blur-[140px]" />
      <div className="absolute inset-x-0 top-[28%] h-40 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.12),transparent_70%)]" />

      <div className="section-shell relative z-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white-secondary">
              Flexible plans
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-5xl">
              Pricing <span className="text-gold-gradient">Packages</span>
            </h2>
            <p className="section-copy mt-5">
              Explore a structured, premium pricing experience for websites, social media, digital presence, ads, and value-added services.
            </p>
          </div>
        </div>

        <div className="mt-10 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="inline-flex min-w-full gap-3 rounded-[2rem] border border-white/10 bg-white/[0.03] p-2 backdrop-blur-xl">
            {topLevelTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = category === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCategory(tab.id)}
                  className={`inline-flex min-w-max items-center gap-2 rounded-[1.25rem] px-5 py-3 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-purple/20 via-white/[0.06] to-gold/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
                      : "text-white-secondary hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-gold" : "text-purple"} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {renderSubSelector()}

        {category !== "ads" ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${category}-${websiteMode}-${socialMode}-${digitalPresenceMode}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="mt-10 hidden gap-6 lg:grid lg:grid-cols-3"
              >
                {cards.map((item) => (
                  <PackageCard
                    key={item.id}
                    item={item}
                    expandedAddons={expandedAddons}
                    setExpandedAddons={setExpandedAddons}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 lg:hidden">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex gap-3">
                  <button
                    type="button"
                    aria-label="Previous pricing card"
                    onClick={() => moveCarousel("prev")}
                    className="rounded-full border border-white/10 bg-white/5 p-3 text-white transition-all hover:bg-white/10 active:scale-95"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next pricing card"
                    onClick={() => moveCarousel("next")}
                    className="rounded-full border border-white/10 bg-white/5 p-3 text-white transition-all hover:bg-white/10 active:scale-95"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  {cards.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-label={`Go to ${item.name}`}
                      onClick={() => selectSlide(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        activeIndex === index ? "w-8 bg-gold" : "w-2.5 bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${category}-${websiteMode}-${socialMode}-${digitalPresenceMode}-mobile`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  ref={scrollRef}
                  className="flex w-full max-w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {cards.map((item) => (
                    <div key={item.id} className="w-full shrink-0 snap-center px-1">
                      <PackageCard
                        item={item}
                        expandedAddons={expandedAddons}
                        setExpandedAddons={setExpandedAddons}
                      />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={adsMode}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-10 mx-auto max-w-4xl"
            >
              {adsMode === "google-ads" ? (
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black-card/80 p-8 shadow-[0_0_50px_rgba(139,92,246,0.1)] backdrop-blur-xl md:p-12">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.15),transparent_40%)]" />
                  
                  <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-xl">
                      <p className="inline-flex items-center gap-2 rounded-full border border-purple/30 bg-purple/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-purple">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-purple"></span>
                        </span>
                        Google Ads Simulator
                      </p>
                      <h3 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
                        Dynamic Budget Planner
                      </h3>
                      <p className="mt-4 text-base leading-relaxed text-white/60">
                        Adjust the monthly budget to visualise daily spend, estimated clicks, and lead potential before sending an enquiry.
                      </p>
                    </div>
                    <div className="shrink-0 rounded-3xl border border-gold/20 bg-gradient-to-b from-gold/10 to-transparent p-5 text-center backdrop-blur-sm shadow-inner shadow-gold/10">
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold/80">
                        Monthly Budget
                      </p>
                      <p className="mt-2 bg-gradient-to-b from-white to-white/70 bg-clip-text font-display text-4xl font-bold text-transparent">
                        ₹{formatInr(googleBudget)}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 mt-8">
                    <CustomSlider
                      min={5500}
                      max={150000}
                      step={500}
                      value={googleBudget}
                      onChange={setGoogleBudget}
                      tooltipContent={
                        <div className="flex flex-col gap-1">
                          <p className="text-xs uppercase tracking-[0.2em] text-white-secondary">
                            Monthly
                          </p>
                          <p className="font-display text-xl font-bold text-white">
                            ₹{formatInr(googleBudget)}
                          </p>
                          <p className="text-xs text-white-secondary">
                            ₹{formatInr(googleDailyBudget)}/day
                          </p>
                        </div>
                      }
                    />
                    <div className="mt-8 flex items-center justify-between text-xs font-medium uppercase tracking-widest text-white/40">
                      <span>₹5,500 / month</span>
                      <span>₹150,000 / month</span>
                    </div>
                  </div>

                  <div className="relative z-10 mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <MetricPanel
                      label="Monthly Budget"
                      value={`₹${formatInr(googleBudget)}`}
                    />
                    <MetricPanel
                      label="Daily Budget"
                      value={`₹${formatInr(googleDailyBudget)}`}
                    />
                    <MetricPanel
                      label="Estimated Clicks"
                      value={`${formatInr(googleClicksLow)}–${formatInr(googleClicksHigh)}`}
                    />
                    <MetricPanel
                      label="Lead Potential"
                      value={`${formatInr(googleLeadLow)}–${formatInr(googleLeadHigh)}`}
                    />
                  </div>

                  <div className="relative z-10 mt-6 grid gap-6 sm:grid-cols-2">
                    <DataBar
                      label="Estimated Click Capacity"
                      current={googleClicksHigh}
                      max={5320}
                      accent="purple"
                    />
                    <DataBar
                      label="Lead Potential"
                      current={googleLeadHigh}
                      max={260}
                      accent="gold"
                    />
                  </div>

                  <div className="relative z-10 mt-10 flex flex-col items-center gap-4 sm:flex-row">
                    <Link
                      href={buildOrderHref({
                        name: "Google Ads - Scale",
                        price: `₹${formatInr(googleBudget)}/month`,
                        packageType: "scale",
                        serviceType: "ads",
                      })}
                      className="btn-primary w-full sm:w-auto"
                    >
                      Enquire for Google Ads Scale
                    </Link>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedAddons((current) =>
                          current === "google-ads-scale" ? null : "google-ads-scale",
                        )
                      }
                      className="btn-secondary w-full justify-center sm:w-auto"
                    >
                      Recommended Add-ons
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          expandedAddons === "google-ads-scale" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <AnimatePresence initial={false}>
                    {expandedAddons === "google-ads-scale" ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="relative z-10 overflow-hidden"
                      >
                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                          {[
                            "Lead Collection Form Setup",
                            "Banner/Poster Design",
                            "Festival & Offer Creatives",
                          ].map((addon) => (
                            <div
                              key={addon}
                              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/70"
                            >
                              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple/20 text-purple">
                                +
                              </div>
                              {addon}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black-card/80 p-8 shadow-[0_0_50px_rgba(212,175,55,0.08)] backdrop-blur-xl md:p-12">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.1),transparent_40%)]" />
                  
                  <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-xl">
                      <p className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-gold">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-gold"></span>
                        </span>
                        Meta Ads Simulator
                      </p>
                      <h3 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
                        Daily Budget Planner
                      </h3>
                      <p className="mt-4 text-base leading-relaxed text-white/60">
                        Adjust your daily budget to estimate monthly spend, reach, and impressions for Instagram and Facebook campaigns.
                      </p>
                    </div>
                    <div className="shrink-0 rounded-3xl border border-purple/20 bg-gradient-to-b from-purple/10 to-transparent p-5 text-center backdrop-blur-sm shadow-inner shadow-purple/10">
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-purple-300">
                        Daily Budget
                      </p>
                      <p className="mt-2 bg-gradient-to-b from-white to-white/70 bg-clip-text font-display text-4xl font-bold text-transparent">
                        ₹{formatInr(metaDailyBudget)}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 mt-8">
                    <CustomSlider
                      min={120}
                      max={12000}
                      step={20}
                      value={metaDailyBudget}
                      onChange={setMetaDailyBudget}
                      tooltipContent={
                        <div className="flex flex-col gap-1">
                          <p className="text-xs uppercase tracking-[0.2em] text-white-secondary">
                            Daily
                          </p>
                          <p className="font-display text-xl font-bold text-white">
                            ₹{formatInr(metaDailyBudget)}
                          </p>
                          <p className="text-xs text-white-secondary">
                            ₹{formatInr(metaMonthlyBudget)}/month
                          </p>
                        </div>
                      }
                    />
                    <div className="mt-8 flex items-center justify-between text-xs font-medium uppercase tracking-widest text-white/40">
                      <span>₹120 / day</span>
                      <span>₹12,000 / day</span>
                    </div>
                  </div>

                  <div className="relative z-10 mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <MetricPanel
                      label="Daily Budget"
                      value={`₹${formatInr(metaDailyBudget)}`}
                    />
                    <MetricPanel
                      label="Monthly Budget"
                      value={`₹${formatInr(metaMonthlyBudget)}`}
                    />
                    <MetricPanel
                      label="Estimated Reach"
                      value={`${formatInr(metaReachLow)}–${formatInr(metaReachHigh)}`}
                    />
                    <MetricPanel
                      label="Estimated Impressions"
                      value={`${formatInr(metaImpressionsLow)}–${formatInr(metaImpressionsHigh)}`}
                    />
                  </div>

                  <div className="relative z-10 mt-6 grid gap-6 sm:grid-cols-2">
                    <DataBar
                      label="Reach Potential"
                      current={metaReachHigh}
                      max={9400}
                      accent="purple"
                    />
                    <DataBar
                      label="Impression Potential"
                      current={metaImpressionsHigh}
                      max={22000}
                      accent="gold"
                    />
                  </div>

                  <div className="relative z-10 mt-10 flex flex-col items-center gap-4 sm:flex-row">
                    <Link
                      href={buildOrderHref({
                        name: "Meta Ads - Interactive Plan",
                        price: `₹${formatInr(metaDailyBudget)}/day`,
                        packageType: "meta-ads",
                        serviceType: "ads",
                      })}
                      className="btn-primary w-full sm:w-auto"
                    >
                      Enquire for Meta Ads
                    </Link>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedAddons((current) =>
                          current === "meta-ads-scale" ? null : "meta-ads-scale",
                        )
                      }
                      className="btn-secondary w-full justify-center sm:w-auto"
                    >
                      Recommended Add-ons
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          expandedAddons === "meta-ads-scale" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <AnimatePresence initial={false}>
                    {expandedAddons === "meta-ads-scale" ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="relative z-10 overflow-hidden"
                      >
                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                          {[
                            "Promotional Posters",
                            "Festival & Offer Creatives",
                            "Product Photo Editing",
                          ].map((addon) => (
                            <div
                              key={addon}
                              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/70"
                            >
                              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-gold">
                                +
                              </div>
                              {addon}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}


      </div>
    </section>
  );
}

function PackageCard({
  item,
  expandedAddons,
  setExpandedAddons,
}: {
  item: BasePackageCard;
  expandedAddons: string | null;
  setExpandedAddons: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const isActive = expandedAddons === item.id;
  const isFeatured = item.popular || item.highlight === "gold";
  const href = buildOrderHref({
    name: item.name,
    price: item.price,
    packageType: item.packageType,
    serviceType: item.serviceType,
    isMonthly: item.billingLabel === "28 Days",
  });

  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] ${
        isFeatured
          ? "border border-gold/60 bg-black-card/70 shadow-[0_0_40px_rgba(212,175,55,0.12)]"
          : "glass-card-premium shadow-glow-white-hover"
      }`}
    >
      {isFeatured ? (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.1),transparent_48%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.08),transparent_34%)]" />
      ) : null}

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white-secondary">
            {item.categoryLabel}
          </p>
          <h3 className="mt-3 font-display text-2xl font-bold text-white">
            {item.name}
          </h3>
        </div>
        {isFeatured ? (
          <span className="rounded-full bg-luxury-gradient px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black shadow-md shadow-gold/20">
            Premium
          </span>
        ) : null}
      </div>

      <div className="relative z-10 mt-8 flex items-baseline gap-2 font-display">
        <span className="text-sm font-semibold text-gold/80">₹</span>
        <span className="bg-gradient-to-b from-white to-white-secondary bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
          {item.price}
        </span>
        {item.billingLabel ? (
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white-secondary">
            / {item.billingLabel}
          </span>
        ) : null}
      </div>

      <p className="relative z-10 mt-4 text-sm leading-7 text-white-secondary">
        {item.description}
      </p>

      <div className="relative z-10 my-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <ul className="relative z-10 flex-grow space-y-4 text-sm text-white-secondary">
        {item.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-purple/20 bg-purple/10">
              <Check className="h-3.5 w-3.5 text-purple" strokeWidth={3} />
            </div>
            <span className="leading-tight">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="relative z-10 mt-8 space-y-3">
        <Link
          href={href}
          className={`inline-flex w-full items-center justify-center rounded-full py-3.5 text-sm font-bold tracking-wide transition-all duration-300 ${
            isFeatured
              ? "border border-gold/50 bg-luxury-gradient text-black hover:-translate-y-0.5 hover:shadow-glow-gold"
              : "border border-white/10 bg-white/5 text-white hover:border-purple/40 hover:bg-white/10 hover:shadow-glow-purple"
          }`}
        >
          Enquire Now
        </Link>

        <button
          type="button"
          onClick={() => setExpandedAddons((current) => (current === item.id ? null : item.id))}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-white-secondary transition-all hover:border-white/20 hover:text-white"
        >
          Recommended Add-ons
          <ChevronDown
            size={16}
            className={`transition-transform ${isActive ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isActive ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="relative z-10 overflow-hidden"
          >
            <div className="mt-5 grid gap-3">
              {item.recommendedAddons.map((addon) => (
                <div
                  key={addon}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white-secondary"
                >
                  + {addon}
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function AdsSummaryCard({
  title,
  subtitle,
  priceLabel,
  secondaryLabel,
  metrics,
  href,
  recommendedAddons,
  expandedAddons,
  setExpandedAddons,
  addonsId,
}: {
  title: string;
  subtitle: string;
  priceLabel: string;
  secondaryLabel: string;
  metrics: Array<{ label: string; value: string }>;
  href: string;
  recommendedAddons: string[];
  expandedAddons: string | null;
  setExpandedAddons: React.Dispatch<React.SetStateAction<string | null>>;
  addonsId: string;
}) {
  const isActive = expandedAddons === addonsId;

  return (
    <div className="glass-card-premium rounded-[2rem] p-6 md:p-8">
      <p className="text-sm uppercase tracking-[0.3em] text-white-secondary">{title}</p>
      <h3 className="mt-2 font-display text-3xl font-semibold text-white">{priceLabel}</h3>
      <p className="mt-2 text-sm text-gold">{secondaryLabel}</p>
      <p className="mt-4 text-sm leading-7 text-white-secondary">{subtitle}</p>

      <div className="mt-8 grid gap-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4"
          >
            <p className="text-[10px] uppercase tracking-[0.28em] text-white-secondary">
              {metric.label}
            </p>
            <p className="mt-2 text-base font-semibold text-white">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-3">
        <Link href={href} className="btn-primary w-full justify-center">
          Send Enquiry
        </Link>
        <button
          type="button"
          onClick={() =>
            setExpandedAddons((current) => (current === addonsId ? null : addonsId))
          }
          className="btn-secondary w-full justify-center"
        >
          Recommended Add-ons
          <ChevronDown
            size={16}
            className={`transition-transform ${isActive ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isActive ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-5 grid gap-3">
              {recommendedAddons.map((addon) => (
                <div
                  key={addon}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white-secondary"
                >
                  + {addon}
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function MetricPanel({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
      <p className="text-[10px] uppercase tracking-[0.28em] text-white-secondary">
        {label}
      </p>
      <p className="mt-2 text-base font-semibold text-white">{value}</p>
    </div>
  );
}

function CustomSlider({
  min,
  max,
  step,
  value,
  onChange,
  tooltipContent,
}: {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  tooltipContent: React.ReactNode;
}) {
  const percentage = ((value - min) / (max - min)) * 100;
  const sliderId = `slider-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="relative mt-8">
      {/* Tooltip */}
      <motion.div
        className="absolute -top-20 left-0 z-10 flex flex-col items-center"
        style={{ left: `calc(${percentage}% - 60px)` }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="rounded-2xl border border-white/10 bg-black/80 px-4 py-3 text-center backdrop-blur-md">
          {tooltipContent}
        </div>
        <div className="mt-1 h-3 w-3 rotate-45 border-b border-r border-white/10 bg-black/80" />
      </motion.div>

      {/* Slider Track */}
      <div className="relative h-2 w-full rounded-full bg-white/10">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-purple to-gold"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Custom Thumb */}
      <input
        id={sliderId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute -top-5 left-0 z-20 h-12 w-full cursor-pointer appearance-none bg-transparent"
        style={{
          WebkitAppearance: "none",
        }}
      />
      <style dangerouslySetInnerHTML={{ __html: `
        #${sliderId}::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8B5CF6 0%, #D4AF37 100%);
          cursor: pointer;
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(212, 175, 55, 0.4);
          border: 3px solid white;
          transition: all 0.2s ease;
        }

        #${sliderId}::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.8), 0 0 60px rgba(212, 175, 55, 0.6);
        }

        #${sliderId}::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8B5CF6 0%, #D4AF37 100%);
          cursor: pointer;
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(212, 175, 55, 0.4);
          border: 3px solid white;
          transition: all 0.2s ease;
        }

        #${sliderId}::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.8), 0 0 60px rgba(212, 175, 55, 0.6);
        }
      `}} />
    </div>
  );
}

function DataBar({
  label,
  current,
  max,
  accent,
}: {
  label: string;
  current: number;
  max: number;
  accent: "purple" | "gold";
}) {
  const width = Math.min((current / max) * 100, 100);

  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-sm text-white-secondary">{formatInr(current)}</p>
      </div>
      <div className="mt-4 h-2 rounded-full bg-white/10">
        <div
          className={`h-2 rounded-full ${
            accent === "purple"
              ? "bg-gradient-to-r from-purple to-purple-secondary"
              : "bg-gradient-to-r from-gold to-gold-light"
          }`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
