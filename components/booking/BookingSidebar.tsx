"use client";

import Image from "next/image";
import { ChevronDown, CircleHelp, Clock3, MessageCircleMore, Video } from "lucide-react";
import { motion } from "framer-motion";

import { ServiceInfo } from "./ServiceInfo";
import type { LucideIcon } from "lucide-react";

type BookingSidebarProps = {
  title: string;
  description: string;
  duration: string;
  icon: LucideIcon;
  gradient: string;
  includes: readonly string[];
  timeZone: string;
  onTimeZoneChange: (timeZone: string) => void;
};

export function BookingSidebar({
  title,
  description,
  duration,
  icon: Icon,
  gradient,
  includes,
  timeZone,
  onTimeZoneChange,
}: BookingSidebarProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#171b22]/80 p-5 shadow-2xl shadow-black/25 backdrop-blur-2xl sm:p-7 xl:flex xl:min-h-[760px] xl:flex-col"
    >
      <div aria-hidden="true" className={`absolute inset-x-8 top-0 h-px bg-gradient-to-r ${gradient} opacity-80`} />
      <div aria-hidden="true" className="absolute -left-16 -top-16 size-44 rounded-full bg-violet-500/15 blur-3xl" />

      <div className="relative space-y-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Virtual Valley" width={40} height={40} className="size-10 rounded-xl object-contain" priority />
            <span className="font-body text-xs font-semibold tracking-[0.22em] text-white/75">VIRTUAL VALLEY</span>
          </div>
          <span className="rounded-full border border-emerald-300/15 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-200">
            Available
          </span>
        </div>

        <div>
          <div className={`mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg shadow-violet-950/50`}>
            <Icon className="size-5 text-white" aria-hidden="true" />
          </div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-violet-300">Strategy session</p>
          <h1 className="font-body text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h1>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/60">{description}</p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
          <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-black/10 px-3.5 py-3">
            <Clock3 className="size-4 text-violet-300" aria-hidden="true" />
            <div>
              <p className="text-[11px] text-white/45">Duration</p>
              <p className="text-sm font-medium text-white/80">{duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-black/10 px-3.5 py-3">
            <Video className="size-4 text-violet-300" aria-hidden="true" />
            <div>
              <p className="text-[11px] text-white/45">Meeting type</p>
              <p className="text-sm font-medium text-white/80">Google Meet</p>
            </div>
          </div>
        </div>

        <label className="block">
          <span className="mb-2 block text-xs font-medium text-white/55">Your timezone</span>
          <span className="relative block">
            <select
              value={timeZone}
              onChange={(event) => onTimeZoneChange(event.target.value)}
              className="w-full appearance-none rounded-xl border border-white/10 bg-black/15 px-3.5 py-3 pr-10 text-sm text-white/75 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
              aria-label="Your timezone"
            >
              <option value={timeZone}>Local time zone ({timeZone})</option>
              <option value="Asia/Kolkata">India Standard Time</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="Europe/London">Greenwich Mean Time</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-white/45" aria-hidden="true" />
          </span>
        </label>

        <ServiceInfo duration={duration} includes={includes} />
      </div>

      <div className="relative mt-7 grid gap-3 border-t border-white/[0.07] pt-5 sm:grid-cols-2 xl:mt-auto xl:grid-cols-1">
        <div className="rounded-2xl bg-violet-400/[0.08] px-4 py-3.5">
          <p className="text-xs font-medium text-violet-200">Estimated response time</p>
          <p className="mt-1 text-sm text-white/70">Within one business day</p>
        </div>
        <a href="mailto:hello@thevirtualvalley.com" className="group flex items-center gap-3 rounded-2xl border border-white/[0.07] px-4 py-3.5 text-sm text-white/65 transition hover:border-violet-400/35 hover:bg-white/[0.04] hover:text-white">
          <span className="flex size-8 items-center justify-center rounded-xl bg-white/[0.06] text-violet-300"><CircleHelp className="size-4" aria-hidden="true" /></span>
          <span className="min-w-0 flex-1"><span className="block text-xs text-white/45">Need help?</span><span className="block font-medium">Talk to our team</span></span>
          <MessageCircleMore className="size-4 text-white/35 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
      </div>
    </motion.aside>
  );
}
