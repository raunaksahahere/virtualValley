"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="section-shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-gray-500">
              Flexible plans
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">
              Pricing <span className="text-gold-gradient">Packages</span>
            </h2>
            <p className="section-copy mt-5">
              Choose the plan that fits your current stage, then send an enquiry with the package pre-selected.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setCategory("website")}
              className={`rounded-full border px-4 py-2 text-sm font-medium ${
                category === "website"
                  ? "border-white bg-white text-black"
                  : "border-white/15 bg-white/5 text-gray-300"
              }`}
            >
              Website
            </button>
            <button
              type="button"
              onClick={() => setCategory("social")}
              className={`rounded-full border px-4 py-2 text-sm font-medium ${
                category === "social"
                  ? "border-white bg-white text-black"
                  : "border-white/15 bg-white/5 text-gray-300"
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
                className={`rounded-full border px-4 py-2 text-sm font-medium ${
                  websiteMode === "build"
                    ? "border-white bg-white text-black"
                    : "border-white/15 bg-white/5 text-gray-300"
                }`}
              >
                Build
              </button>
              <button
                type="button"
                onClick={() => setWebsiteMode("repair")}
                className={`rounded-full border px-4 py-2 text-sm font-medium ${
                  websiteMode === "repair"
                    ? "border-white bg-white text-black"
                    : "border-white/15 bg-white/5 text-gray-300"
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
                className={`rounded-full border px-4 py-2 text-sm font-medium ${
                  socialMode === "weekly"
                    ? "border-white bg-white text-black"
                    : "border-white/15 bg-white/5 text-gray-300"
                }`}
              >
                Weekly
              </button>
              <button
                type="button"
                onClick={() => setSocialMode("monthly")}
                className={`rounded-full border px-4 py-2 text-sm font-medium ${
                  socialMode === "monthly"
                    ? "border-white bg-white text-black"
                    : "border-white/15 bg-white/5 text-gray-300"
                }`}
              >
                28 Days
              </button>
            </>
          )}
        </div>

        <div className="mt-10 hidden gap-6 lg:grid lg:grid-cols-3 xl:grid-cols-5">
          {cards.map((item) => (
            <PricingCard
              key={`${item.name}-${item.kind}`}
              item={item}
              isMonthly={item.kind === "social-monthly"}
            />
          ))}
        </div>

        <div className="mt-10 lg:hidden">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => moveCarousel("prev")}
                className="rounded-full border border-white/15 p-3 text-white"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => moveCarousel("next")}
                className="rounded-full border border-white/15 p-3 text-white"
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
                    activeIndex === index ? "w-8 bg-white" : "w-2.5 bg-white/25"
                  }`}
                />
              ))}
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {cards.map((item) => (
              <div key={`${item.name}-${item.kind}`} className="min-w-full snap-center">
                <PricingCard item={item} isMonthly={item.kind === "social-monthly"} />
              </div>
            ))}
          </div>
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

  const pricePrefix = serviceType === "social" ? "INR " : "INR ";
  const priceLabel = serviceType === "social" ? `${pricePrefix}${item.displayPrice}` : item.displayPrice;

  return (
    <div
      className={`flex h-full flex-col rounded-[1.75rem] border bg-neutral-950 p-6 ${
        item.popular ? "border-gold/60" : "border-white/10"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-gray-500">
            {serviceType === "website" ? "Website" : "Social Media"}
          </p>
          <h3 className="mt-4 font-display text-2xl font-semibold text-white">
            {item.name}
          </h3>
        </div>
        {item.popular ? (
          <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-black">
            Popular
          </span>
        ) : null}
      </div>

      <div className="mt-8 font-display text-4xl font-semibold text-white">
        {priceLabel}
      </div>
      <p className="mt-2 text-sm text-gray-400">
        {serviceType === "website"
          ? "Project-based pricing tailored to scope."
          : isMonthly
            ? "28-day retainer with content delivery cadence."
            : "Weekly sprint pricing for active brand management."}
      </p>

      <ul className="mt-8 space-y-3 text-sm text-gray-300">
        {item.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <span className="mt-2 h-2 w-2 rounded-full bg-gold" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={`/order?selectedPackage=${packagePayload}&isMonthly=${isMonthly}`}
        className="btn-primary mt-8 w-full"
      >
        Enquire Now
      </Link>
    </div>
  );
}
