"use client";

import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import pricingData from "@/data/pricing.json";

type WebsitePackage = (typeof pricingData.websiteBuild)[number];
type RepairPackage = (typeof pricingData.websiteRepair)[number];
type SocialPackage = (typeof pricingData.socialMedia)[number];

type CardData =
  | (WebsitePackage & { kind: "website-build" | "website-repair"; displayPrice: string })
  | (SocialPackage & { kind: "social-weekly" | "social-monthly"; displayPrice: string });

export default function Pricing() {
  const [category, setCategory] = useState<"website" | "social">("website");
  const [websiteMode, setWebsiteMode] = useState<"build" | "repair">("build");
  const [socialMode, setSocialMode] = useState<"weekly" | "monthly">("weekly");
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const cards: CardData[] =
    category === "website"
      ? (websiteMode === "build" ? pricingData.websiteBuild : pricingData.websiteRepair).map(
          (item) => ({
            ...item,
            kind: websiteMode === "build" ? "website-build" : "website-repair",
            displayPrice: item.price,
          }),
        )
      : pricingData.socialMedia.map((item) => ({
          ...item,
          kind: socialMode === "weekly" ? "social-weekly" : "social-monthly",
          displayPrice: String(socialMode === "weekly" ? item.weekly : item.monthly),
        }));

  useEffect(() => {
    setActiveIndex(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [category, websiteMode, socialMode]);

  const moveCarousel = (direction: "prev" | "next") => {
    if (!scrollRef.current) {
      return;
    }

    const nextIndex =
      direction === "next"
        ? Math.min(activeIndex + 1, cards.length - 1)
        : Math.max(activeIndex - 1, 0);

    const width = scrollRef.current.clientWidth;
    scrollRef.current.scrollTo({ left: width * nextIndex, behavior: "smooth" });
    setActiveIndex(nextIndex);
  };

  const selectSlide = (index: number) => {
    if (!scrollRef.current) {
      return;
    }

    scrollRef.current.scrollTo({
      left: scrollRef.current.clientWidth * index,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  const isFiveCards = cards.length === 5;

  return (
    <section id="pricing" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-shell relative z-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-gray-500 font-semibold">
              Flexible plans
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl tracking-tight">
              Pricing <span className="text-gold-gradient">Packages</span>
            </h2>
            <p className="section-copy mt-5 text-gray-400">
              Choose the plan that fits your current stage, then send an enquiry with the package pre-selected.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setCategory("website")}
              className={`rounded-full border px-5 py-2.5 text-sm font-semibold tracking-wide transition-all ${
                category === "website"
                  ? "border-white bg-white text-black shadow-lg"
                  : "border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20"
              }`}
            >
              Website
            </button>
            <button
              type="button"
              onClick={() => setCategory("social")}
              className={`rounded-full border px-5 py-2.5 text-sm font-semibold tracking-wide transition-all ${
                category === "social"
                  ? "border-white bg-white text-black shadow-lg"
                  : "border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20"
              }`}
            >
              Social Media
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {category === "website" ? (
            <>
              <button
                type="button"
                onClick={() => setWebsiteMode("build")}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  websiteMode === "build"
                    ? "border-white bg-white text-black"
                    : "border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                Build
              </button>
              <button
                type="button"
                onClick={() => setWebsiteMode("repair")}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  websiteMode === "repair"
                    ? "border-white bg-white text-black"
                    : "border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                Repair
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setSocialMode("weekly")}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  socialMode === "weekly"
                    ? "border-white bg-white text-black"
                    : "border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                Weekly
              </button>
              <button
                type="button"
                onClick={() => setSocialMode("monthly")}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  socialMode === "monthly"
                    ? "border-white bg-white text-black"
                    : "border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                28 Days
              </button>
            </>
          )}
        </div>

        {/* Desktop grid layout with Framer Motion entry/exit crossfades */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${category}-${websiteMode}-${socialMode}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`mt-10 hidden gap-8 lg:grid ${
              isFiveCards 
                ? "lg:grid-cols-6" 
                : "lg:grid-cols-3"
            }`}
          >
            {cards.map((item, index) => (
              <div
                key={`${item.name}-${item.kind}`}
                className={`${
                  isFiveCards 
                    ? (index < 3 ? "lg:col-span-2" : "lg:col-span-3") 
                    : "lg:col-span-1"
                }`}
              >
                <PricingCard
                  item={item}
                  isMonthly={item.kind === "social-monthly"}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Mobile carousel layout with same entry/exit animations */}
        <div className="mt-10 lg:hidden">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => moveCarousel("prev")}
                className="rounded-full border border-white/10 bg-white/5 p-3 text-white hover:bg-white/10 active:scale-95 transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => moveCarousel("next")}
                className="rounded-full border border-white/10 bg-white/5 p-3 text-white hover:bg-white/10 active:scale-95 transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              {cards.map((item, index) => (
                <button
                  key={`${item.name}-${index}`}
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
              key={`${category}-${websiteMode}-${socialMode}-mobile`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              ref={scrollRef}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 w-full max-w-full [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {cards.map((item) => (
                <div key={`${item.name}-${item.kind}`} className="w-full shrink-0 snap-center px-1">
                  <PricingCard item={item} isMonthly={item.kind === "social-monthly"} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  item,
  isMonthly,
}: {
  item: CardData;
  isMonthly: boolean;
}) {
  const serviceType = item.kind.startsWith("social") ? "social" : "website";
  const packageType =
    item.kind === "website-build"
      ? "build"
      : item.kind === "website-repair"
        ? "repair"
        : isMonthly
          ? "28-days"
          : "weekly";

  const packagePayload = encodeURIComponent(
    JSON.stringify({
      name: item.name,
      price: item.displayPrice,
      packageType,
      serviceType,
    }),
  );

  const formattedPrice = serviceType === "social"
    ? Number(item.displayPrice).toLocaleString("en-IN")
    : item.displayPrice;

  const isRange = serviceType === "website";

  return (
    <div
      className={`relative flex h-full flex-col rounded-[2rem] overflow-hidden p-8 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 ${
        item.popular
          ? "border border-gold/60 bg-neutral-950/50 backdrop-blur-xl shadow-[0_0_30px_rgba(201,168,76,0.12)] hover:border-gold hover:shadow-[0_0_40px_rgba(201,168,76,0.2)]"
          : "glass-card-premium shadow-glow-white-hover"
      }`}
    >
      {/* Premium subtle inner radial glow */}
      {item.popular ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,168,76,0.07),transparent_50%)] pointer-events-none" />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.02),transparent_40%)] pointer-events-none" />
      )}

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-500">
            {serviceType === "website" ? "Website" : "Social Media"}
          </p>
          <h3 className="mt-3 font-display text-2xl font-bold text-white tracking-tight">
            {item.name}
          </h3>
        </div>
        {item.popular ? (
          <span className="rounded-full bg-gradient-to-r from-gold-light via-gold to-gold-dark px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black shadow-md shadow-gold/20 animate-shimmer">
            Popular
          </span>
        ) : null}
      </div>

      <div className="relative z-10 mt-8 flex items-baseline gap-1 font-display text-white">
        <span className="text-sm font-semibold text-gold/80 self-start mt-1.5">INR</span>
        <span className="text-4xl font-extrabold tracking-tight md:text-5xl bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
          {formattedPrice}
        </span>
        {!isRange && (
          <span className="text-xs font-semibold text-gray-500 ml-1.5 uppercase tracking-wider">
            / {isMonthly ? "28 Days" : "Week"}
          </span>
        )}
      </div>

      <p className="relative z-10 mt-3 text-sm text-gray-400 leading-relaxed min-h-[40px]">
        {serviceType === "website"
          ? "Project-based pricing tailored to scope."
          : isMonthly
            ? "28-day retainer with content delivery cadence."
            : "Weekly sprint pricing for active brand management."}
      </p>

      {/* Decorative divider */}
      <div className="relative z-10 my-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <ul className="relative z-10 flex-grow space-y-4 text-sm text-gray-300">
        {item.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold/10 border border-gold/20">
              <Check className="h-3.5 w-3.5 text-gold" strokeWidth={3} />
            </div>
            <span className="leading-tight">{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={`/order?selectedPackage=${packagePayload}&isMonthly=${isMonthly}`}
        className={`relative z-10 mt-8 w-full inline-flex items-center justify-center rounded-full py-3.5 text-sm font-bold tracking-wide transition-all duration-300 active:scale-98 ${
          item.popular
            ? "bg-gold border border-gold text-black hover:bg-gold-light hover:border-gold-light hover:shadow-glow-gold hover:-translate-y-0.5"
            : "bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black hover:border-white hover:-translate-y-0.5"
        }`}
      >
        Enquire Now
      </Link>
    </div>
  );
}
