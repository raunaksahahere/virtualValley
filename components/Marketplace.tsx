"use client";

import { motion } from "framer-motion";
import { UtensilsCrossed, ShoppingBag, BriefcaseBusiness, Palette, Camera, ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export type MarketplaceFilter =
  | "all"
  | "restaurant"
  | "retail"
  | "service"
  | "branding"
  | "content-creation";

export type MarketplaceItem = {
  name: string;
  price: string;
  description: string;
  tags: Exclude<MarketplaceFilter, "all">[];
};

export const marketplaceItems: MarketplaceItem[] = [
  {
    name: "Google Review Management",
    price: "₹2,000+/mo",
    description: "Monitor, respond to, and improve review credibility across local discovery channels.",
    tags: ["restaurant", "retail", "service"],
  },
  {
    name: "Review QR Standee Design",
    price: "₹500+",
    description: "Create branded QR standees that make collecting customer reviews effortless.",
    tags: ["restaurant", "retail", "service"],
  },
  {
    name: "Monthly GMB Management",
    price: "₹2,500+/mo",
    description: "Keep listings fresh with updates, optimisations, and monthly growth-focused maintenance.",
    tags: ["restaurant", "retail", "service"],
  },
  {
    name: "Professional Menu Design",
    price: "₹1,500+",
    description: "Design a clear, premium menu presentation for dine-in, takeaway, and delivery channels.",
    tags: ["restaurant"],
  },
  {
    name: "Menu Upload/Modification",
    price: "₹500+",
    description: "Update menu items, pricing, and layout details across live ordering platforms.",
    tags: ["restaurant"],
  },
  {
    name: "Food Photo Optimization",
    price: "₹1,000+",
    description: "Improve food imagery for menus, listings, and social-first discovery experiences.",
    tags: ["restaurant", "content-creation"],
  },
  {
    name: "Swiggy/Zomato Menu Updates",
    price: "₹500+",
    description: "Keep your delivery app listings accurate, current, and conversion-ready.",
    tags: ["restaurant"],
  },
  {
    name: "Product Catalog Setup",
    price: "₹1,000+",
    description: "Structure your products into a clear, browsable catalog for retail customers.",
    tags: ["retail"],
  },
  {
    name: "WhatsApp Catalog Setup",
    price: "₹750+",
    description: "Turn WhatsApp into a cleaner sales channel with a ready-to-browse product catalog.",
    tags: ["retail"],
  },
  {
    name: "Facebook Shop Setup",
    price: "₹1,500+",
    description: "Launch a Facebook-native storefront that supports product browsing and conversion.",
    tags: ["retail"],
  },
  {
    name: "Lead Collection Form Setup",
    price: "₹500+",
    description: "Capture inbound enquiries with a lead form tailored to your service pipeline.",
    tags: ["service"],
  },
  {
    name: "Appointment Booking System",
    price: "₹1,500+",
    description: "Allow prospects to book time directly without manual back-and-forth.",
    tags: ["service"],
  },
  {
    name: "Service Catalog Setup",
    price: "₹750+",
    description: "Package your services into a clearer, more persuasive client-facing catalog.",
    tags: ["service"],
  },
  {
    name: "Logo Design",
    price: "₹1,500+",
    description: "Create a distinctive brand mark to strengthen business identity and trust.",
    tags: ["branding"],
  },
  {
    name: "Business Card Design",
    price: "₹500+",
    description: "Design clean, premium cards for offline credibility and business networking.",
    tags: ["branding"],
  },
  {
    name: "Brochure Design",
    price: "₹1,500+",
    description: "Present your business, offers, and capabilities in a polished printed format.",
    tags: ["branding"],
  },
  {
    name: "Banner/Poster Design",
    price: "₹500+",
    description: "Create promotional visuals for storefronts, events, or launch campaigns.",
    tags: ["branding", "content-creation"],
  },
  {
    name: "Product Photo Editing",
    price: "₹50+/img",
    description: "Enhance product visuals for catalogs, social media, and online selling.",
    tags: ["retail", "content-creation"],
  },
  {
    name: "Menu Photo Editing",
    price: "₹50+/img",
    description: "Refine food and menu visuals to improve appetite appeal and click-throughs.",
    tags: ["restaurant", "content-creation"],
  },
  {
    name: "Promotional Posters",
    price: "₹300+/des",
    description: "Launch offers, campaigns, and announcements with ready-to-publish creative assets.",
    tags: ["content-creation"],
  },
  {
    name: "Festival & Offer Creatives",
    price: "₹300+/des",
    description: "Stay relevant with campaign-ready designs for festive and seasonal promotions.",
    tags: ["content-creation"],
  },
];

const categoryIcons = {
  restaurant: UtensilsCrossed,
  retail: ShoppingBag,
  service: BriefcaseBusiness,
  branding: Palette,
  "content-creation": Camera,
};

function getMarketplaceLabel(tag: MarketplaceFilter) {
  if (tag === "all") return "All";
  if (tag === "content-creation") return "Content";
  return tag.charAt(0).toUpperCase() + tag.slice(1);
}

function MarketplaceCard({ item }: { item: MarketplaceItem }) {
  const Icon = categoryIcons[item.tags[0]] || UtensilsCrossed;
  
  return (
    <div className="relative h-auto w-full lg:h-36">
      {/* Absolute positioned actual card to allow overlap on hover */}
      <div className="group inset-x-0 top-0 z-10 flex flex-col overflow-hidden rounded-2xl border border-border bg-background/80 p-5 backdrop-blur-xl transition-all duration-300 hover:z-50 hover:scale-[1.02] hover:border-accent-cyan/40 hover:bg-background hover:shadow-[0_0_30px_rgb(var(--accent-cyan)_/_0.15)] lg:absolute">
        
        {/* Header - Always visible */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon size={14} className="text-accent-cyan" />
            <p className="text-[7.2px] font-bold uppercase tracking-widest text-foreground/50">
              {getMarketplaceLabel(item.tags[0])}
            </p>
          </div>
          <span className="rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-accent-cyan shadow-sm">
            {item.price}
          </span>
        </div>

        <h4 className="mt-4 font-display text-xl font-bold text-heading transition-colors group-hover:text-accent-cyan">
          {item.name}
        </h4>

        {/* Expandable Content - Hidden until hover */}
        <div className="mt-3 grid grid-rows-[1fr] opacity-100 transition-all duration-300 lg:mt-0 lg:grid-rows-[0fr] lg:opacity-0 lg:group-hover:mt-3 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100 lg:group-focus-within:mt-3 lg:group-focus-within:grid-rows-[1fr] lg:group-focus-within:opacity-100">
          <div className="overflow-hidden">
            <p className="text-sm leading-relaxed text-foreground/60">
              {item.description}
            </p>
            <Link
              href="/#contact"
              className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-surface-secondary py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface hover:text-accent-cyan"
            >
              View Details <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

function FeaturedCard({ item }: { item: MarketplaceItem }) {
  return (
    <Link
      href="/#contact"
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-accent-cyan/30 bg-background/60 p-6 shadow-[0_0_30px_rgb(var(--accent-cyan)_/_0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-accent-cyan/60 hover:shadow-[0_0_40px_rgb(var(--accent-cyan)_/_0.15)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(51, 78, 172,0.1),transparent_50%)]" />
      
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#334EAC]/10 text-accent-cyan border border-border">
          <Plus size={18} strokeWidth={3} />
        </div>
        <span className="rounded-full bg-gradient-to-r from-[#334EAC]/20 to-[#334EAC]/5 px-3 py-1 text-[7.2px] font-bold uppercase tracking-widest text-accent-cyan border border-border">
          {item.price}
        </span>
      </div>
      
      <div className="relative z-10 mt-6">
        <h4 className="font-display text-xl font-bold text-heading transition-colors group-hover:text-accent-cyan">
          {item.name}
        </h4>
        <p className="mt-2 text-sm text-foreground/50 line-clamp-2">
          {item.description}
        </p>
      </div>
    </Link>
  );
}

export default function Marketplace() {
  const [filter, setFilter] = useState<MarketplaceFilter>("all");

  const filteredItems = useMemo(() => {
    if (filter === "all") return marketplaceItems;
    return marketplaceItems.filter((item) => item.tags.includes(filter));
  }, [filter]);

  const featuredNames = useMemo(() => [
    "Monthly GMB Management",
    "Google Review Management",
    "Professional Menu Design",
    "Logo Design"
  ], []);
  const featuredItems = useMemo(() => 
    marketplaceItems.filter(item => featuredNames.includes(item.name)),
  [featuredNames]);

  const getCount = (tag: MarketplaceFilter) => {
    if (tag === "all") return marketplaceItems.length;
    return marketplaceItems.filter((item) => item.tags.includes(tag as any)).length;
  };

  return (
    <section id="marketplace" className="relative overflow-hidden py-24 md:py-32 bg-white">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(51, 78, 172,0.06),transparent_40%),radial-gradient(circle_at_20%_80%,rgba(8, 31, 92,0.04),transparent_40%)]" />
      {/* Massive Background Text */}
      <div className="pointer-events-none absolute left-1/2 top-32 -translate-x-1/2 whitespace-nowrap text-[12vw] font-display font-black tracking-tighter text-foreground opacity-[0.03] select-none">
        VIRTUAL VALLEY MARKETPLACE
      </div>

      <div className="section-shell relative z-10">
        
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-accent-cyan">
            ADDITIONAL SERVICES MARKETPLACE
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Build Your Perfect <span className="text-accent-cyan-gradient">Growth Stack</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-foreground/60 md:text-lg">
            Choose add-on services to strengthen your digital presence, branding, customer acquisition, and business growth.
          </p>
        </div>

        {/* Featured Section */}
        <div className="mt-20">
          <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-foreground/40 mb-6 border-b border-border pb-4">
            Most Popular Add-ons
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredItems.map((item) => (
              <FeaturedCard key={item.name} item={item} />
            ))}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-20 flex flex-wrap items-center gap-3">
          {(["all", "restaurant", "retail", "service", "branding", "content-creation"] as MarketplaceFilter[]).map((tag) => {
            const isActive = filter === tag;
            const Icon = tag !== "all" ? categoryIcons[tag] : null;
            
            return (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`group relative flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                  isActive
                    ? "border-accent-cyan bg-primary/10 text-foreground shadow-[0_0_20px_rgba(51, 78, 172,0.2)]"
                    : "border-border bg-surface-secondary text-foreground/60 hover:border-border/30 hover:bg-surface-secondary hover:text-foreground"
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-md -z-10" />
                )}
                {Icon && <Icon size={14} className={isActive ? "text-accent-cyan" : "text-foreground/40 group-hover:text-foreground/60"} />}
                <span className="uppercase tracking-widest">{getMarketplaceLabel(tag)}</span>
                <span className={`rounded-full px-1.5 py-0.5 text-xs ${isActive ? 'bg-primary/20 text-accent-cyan' : 'bg-surface-secondary text-foreground/40'}`}>
                  {getCount(tag)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Compact Grid */}
        <motion.div 
          layout
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <MarketplaceCard item={item} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
