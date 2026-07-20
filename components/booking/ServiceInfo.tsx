import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Brush,
  Check,
  Clock3,
  Globe2,
  Megaphone,
  MonitorSmartphone,
  Sparkles,
  Smartphone,
} from "lucide-react";

export type VirtualValleyService =
  | "Website Development"
  | "Online Presence"
  | "AI Automation"
  | "App Development"
  | "Digital Branding"
  | "Ads Management";

export type ServiceDetails = {
  title: VirtualValleyService;
  description: string;
  duration: string;
  icon: LucideIcon;
  gradient: string;
  includes: readonly string[];
};

export const virtualValleyServices: Record<VirtualValleyService, ServiceDetails> = {
  "Website Development": {
    title: "Website Development",
    description: "Plan a high-converting website built to make your business feel unmistakably premium.",
    duration: "45 min",
    icon: MonitorSmartphone,
    gradient: "from-violet-500 via-indigo-500 to-cyan-400",
    includes: ["Project discovery", "Growth-focused roadmap", "Clear next steps"],
  },
  "Online Presence": {
    title: "Online Presence",
    description: "Turn local search, listings, and reviews into a dependable source of customer trust.",
    duration: "30 min",
    icon: Globe2,
    gradient: "from-sky-500 via-cyan-400 to-emerald-400",
    includes: ["Visibility audit", "Listing opportunities", "Local growth plan"],
  },
  "AI Automation": {
    title: "AI Automation",
    description: "Find the automation opportunities that save time and make every lead feel attended to.",
    duration: "45 min",
    icon: Bot,
    gradient: "from-fuchsia-500 via-violet-500 to-indigo-500",
    includes: ["Workflow review", "Automation ideas", "Implementation plan"],
  },
  "App Development": {
    title: "App Development",
    description: "Map an intuitive product experience and the technical path to bring it to market.",
    duration: "45 min",
    icon: Smartphone,
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    includes: ["Product discovery", "Feature priorities", "Build strategy"],
  },
  "Digital Branding": {
    title: "Digital Branding",
    description: "Shape a distinctive identity system that gives your business instant recognition.",
    duration: "30 min",
    icon: Brush,
    gradient: "from-rose-500 via-fuchsia-500 to-violet-500",
    includes: ["Brand direction", "Visual audit", "Identity recommendations"],
  },
  "Ads Management": {
    title: "Ads Management",
    description: "Build a sharper paid media plan designed to turn budget into measurable growth.",
    duration: "45 min",
    icon: Megaphone,
    gradient: "from-orange-400 via-rose-500 to-fuchsia-500",
    includes: ["Campaign review", "Audience opportunities", "Performance roadmap"],
  },
};

type ServiceInfoProps = {
  duration: string;
  includes: readonly string[];
};

export function ServiceInfo({ duration, includes }: ServiceInfoProps) {
  return (
    <section aria-labelledby="booking-included" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 id="booking-included" className="text-sm font-semibold text-white">
          What&apos;s included
        </h2>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/50">
          <Clock3 className="size-3.5" aria-hidden="true" />
          {duration}
        </span>
      </div>

      <div className="grid gap-2 sm:grid-cols-3 xl:grid-cols-1">
        {includes.map((item) => (
          <div
            key={item}
            className="group rounded-2xl border border-white/[0.07] bg-white/[0.035] p-3.5 transition-colors hover:border-violet-400/30 hover:bg-violet-400/[0.07]"
          >
            <Sparkles className="mb-3 size-4 text-violet-300 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
            <p className="text-xs font-medium leading-5 text-white/75">{item}</p>
          </div>
        ))}
      </div>

      <ul className="space-y-2 border-t border-white/[0.07] pt-4 text-sm text-white/60">
        <li className="flex items-center gap-2">
          <Check className="size-4 text-violet-300" aria-hidden="true" />
          No obligation, just useful clarity.
        </li>
      </ul>
    </section>
  );
}
