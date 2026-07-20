"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";

type BookingWidgetProps = {
  namespace: string;
  calLink: string;
  timeZone: string;
};

function BookingWidgetSkeleton() {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-10 bg-[#171b22] p-5 sm:p-8">
      <div className="mx-auto max-w-2xl animate-pulse space-y-8">
        <div className="flex items-center justify-between">
          <div className="h-6 w-36 rounded-lg bg-white/[0.08]" />
          <div className="h-9 w-28 rounded-xl bg-white/[0.06]" />
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }, (_, index) => (
            <div key={index} className="aspect-square rounded-xl bg-white/[0.05]" />
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="h-12 rounded-xl bg-white/[0.06]" />
          <div className="h-12 rounded-xl bg-white/[0.06]" />
        </div>
      </div>
    </div>
  );
}

export function BookingWidget({ namespace, calLink, timeZone }: BookingWidgetProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    const onReady = () => {
      if (isMounted) setIsLoading(false);
    };

    void getCalApi({ namespace }).then((cal) => {
      cal("ui", {
        theme: "dark",
        layout: "month_view",
        styles: { branding: { brandColor: "#6C5CE7" } },
      });
      cal("on", { action: "linkReady", callback: onReady });
    });

    return () => {
      isMounted = false;
    };
  }, [namespace, calLink, timeZone]);

  return (
    <motion.section
      aria-label="Choose a meeting time"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
      className="relative min-h-[760px] overflow-hidden rounded-3xl border border-white/10 bg-[#171b22] shadow-2xl shadow-black/40"
    >
      <div aria-hidden="true" className="absolute inset-x-10 top-0 z-20 h-px bg-gradient-to-r from-transparent via-violet-400/80 to-transparent" />
      <div className="absolute inset-0 overflow-hidden [&_iframe]:min-h-[760px] [&_iframe]:w-full">
        <Cal
          key={`${namespace}-${timeZone}`}
          namespace={namespace}
          calLink={calLink}
          config={{ layout: "month_view", theme: "dark", timezone: timeZone }}
          className="min-h-[760px] w-full bg-[#171b22]"
        />
      </div>
      {isLoading ? <BookingWidgetSkeleton /> : null}
      <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/[0.07] bg-[#171b22]/90 px-3 py-1.5 text-[10px] font-medium text-white/40 shadow-lg backdrop-blur-md">
        <CalendarDays className="size-3 text-violet-300" aria-hidden="true" />
        Secure scheduling powered by Cal.com
      </div>
    </motion.section>
  );
}
