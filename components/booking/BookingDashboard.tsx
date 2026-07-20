"use client";

import type { LucideIcon } from "lucide-react";
import { MonitorSmartphone } from "lucide-react";
import { useEffect, useState } from "react";
import { BookingSidebar } from "./BookingSidebar";
import { BookingWidget } from "./BookingWidget";
import { virtualValleyServices } from "./ServiceInfo";

type BookingDashboardProps = {
  title: string;
  description: string;
  duration: string;
  namespace: string;
  calLink: string;
  icon?: LucideIcon;
};

export function BookingDashboard({
  title,
  description,
  duration,
  namespace,
  calLink,
  icon = MonitorSmartphone,
}: BookingDashboardProps) {
  const [timeZone, setTimeZone] = useState("UTC");
  const matchingService = Object.values(virtualValleyServices).find((service) => service.title === title);
  const gradient = matchingService?.gradient ?? "from-violet-500 via-indigo-500 to-cyan-400";
  const includes = matchingService?.includes ?? ["Strategy session", "Clear recommendations", "Actionable next steps"];

  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#0f1117] font-body text-white">
      <div aria-hidden="true" className="fixed inset-0 -z-0 bg-[radial-gradient(circle_at_12%_10%,rgba(108,92,231,0.16),transparent_28%),radial-gradient(circle_at_90%_84%,rgba(54,211,153,0.06),transparent_24%)]" />
      <div aria-hidden="true" className="fixed inset-0 -z-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:36px_36px]" />

      <div className="relative mx-auto grid w-full max-w-[1600px] gap-5 px-4 py-4 sm:px-6 sm:py-6 xl:min-h-screen xl:grid-cols-[minmax(300px,32fr)_minmax(0,68fr)] xl:gap-6 xl:p-7">
        <BookingSidebar
          title={title}
          description={description}
          duration={duration}
          icon={icon}
          gradient={gradient}
          includes={includes}
          timeZone={timeZone}
          onTimeZoneChange={setTimeZone}
        />
        <BookingWidget namespace={namespace} calLink={calLink} timeZone={timeZone} />
      </div>
    </main>
  );
}

export default BookingDashboard;
