"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import BookingModal from "./BookingModal";

const navItems = [
  { label: "About", href: "#about", section: "about" },
  { label: "Services", href: "#services", section: "services" },
  { label: "Website Plans", href: "#website-plans", section: "website-plans" },
  { label: "Reviews", href: "#testimonials", section: "testimonials" },
  { label: "Contact", href: "#contact", section: "contact" },
  { label: "Sales Intern", href: "/seller-partner", section: "seller-partner" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["about", "services", "website-plans", "testimonials", "contact"];
      const current = sections.findLast((section) => {
        const element = document.getElementById(section);
        if (!element) {
          return false;
        }

        const rect = element.getBoundingClientRect();
        return rect.top <= 140 && rect.bottom >= 140;
      });

      if (current) {
        setActiveSection(current);
      } else if (pathname === "/seller-partner") {
        setActiveSection("seller-partner");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <div 
      className="fixed left-0 right-0 top-5 z-50 mx-auto"
      style={{
        width: "min(1400px, calc(100% - 48px))",
        maxWidth: "1400px",
        boxSizing: "border-box"
      }}
    >
      <nav
        className={`w-full rounded-full border border-[rgba(255,255,255,0.1)] bg-[#081F5C]/90 transition-all duration-500 overflow-hidden ${
          isScrolled
            ? "shadow-[0_30px_80px_rgba(8,31,92,0.4)] backdrop-blur-[17.3px]"
            : "shadow-[0_20px_60px_rgba(8,31,92,0.2)] backdrop-blur-[17.3px]"
        }`}
      >
        <div className="flex h-12 w-full items-center justify-between px-4 md:h-16 md:px-6">
          {/* Logo - Left */}
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image
              src="/logo.png"
              alt="Virtual Valley Logo"
              width={34}
              height={34}
              priority
              className="h-8 w-8 object-contain md:h-12 md:w-12"
            />
            <span className="font-display text-sm font-bold tracking-[0.28em] text-white md:text-base whitespace-nowrap">
              VIRTUAL VALLEY
            </span>
          </Link>

          {/* Navigation - Center */}
          <div className="hidden flex-1 items-center justify-center md:flex px-4">
            <div className="flex items-center gap-1 xl:gap-2 rounded-full bg-white/[0.03] px-3 py-1.5">
              {navItems.map((item) => {
                const isPageLink = item.href.startsWith("/");
                const isActive = activeSection === item.section;
                const resolvedHref =
                  !isPageLink && pathname !== "/" ? `/${item.href}` : item.href;

                return isPageLink ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`group relative rounded-full px-3 xl:px-4 py-2 text-xs xl:text-sm font-medium transition-colors whitespace-nowrap ${
                      item.label === "Sales Intern" ? "border border-accent-cyan/50 text-accent-cyan" : ""
                    } ${
                      isActive ? "bg-white/20 text-white" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 bg-[#334EAC] transition-all duration-300 ${
                        isActive ? "w-8" : "w-0 group-hover:w-8"
                      }`}
                    />
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={resolvedHref}
                    className={`group relative rounded-full px-3 xl:px-4 py-2 text-xs xl:text-sm font-medium transition-colors whitespace-nowrap ${
                      item.label === "Sales Intern" ? "border border-accent-cyan/50 text-accent-cyan" : ""
                    } ${
                      isActive ? "bg-white/20 text-white" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 bg-[#334EAC] transition-all duration-300 ${
                        isActive ? "w-8" : "w-0 group-hover:w-8"
                      }`}
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* CTA - Right */}
          <div className="hidden shrink-0 items-center justify-end gap-3 md:flex">
            <a
              href="/Brochure.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/90 transition-colors hover:border-accent-cyan hover:bg-white/10 hover:text-white xl:text-sm"
            >
              <Download size={15} />
              Download Brochure
            </a>
            <button 
              onClick={() => setIsBookingModalOpen(true)} 
              className="btn-primary px-5 py-2 text-xs xl:text-sm whitespace-nowrap overflow-hidden text-ellipsis" 
              style={{ minWidth: '170px', maxWidth: '220px' }}
            >
              Book a Call
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            className="rounded-full border border-white/20 bg-white/10 p-2 text-white backdrop-blur-md md:hidden shrink-0"
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mt-3 overflow-hidden rounded-3xl border border-white/10 bg-[#081F5C]/95 p-4 shadow-[0_20px_60px_rgba(8,31,92,0.5)] backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) =>
                item.href.startsWith("/") ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`rounded-2xl px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-white ${
                      item.label === "Sales Intern" ? "border border-accent-cyan/50 text-accent-cyan" : "text-white/70"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={pathname !== "/" ? `/${item.href}` : item.href}
                    className={`rounded-2xl px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-white ${
                      item.label === "Sales Intern" ? "border border-accent-cyan/50 text-accent-cyan" : "text-white/70"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ),
              )}
              <a
                href="/Brochure.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-full border border-accent-cyan/50 px-3 py-3 text-sm font-semibold text-accent-cyan transition-colors hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                <Download size={16} />
                Download Brochure
              </a>
              <button 
                className="btn-primary mt-2 text-center" 
                onClick={() => {
                  setIsOpen(false);
                  setIsBookingModalOpen(true);
                }}
              >
                Book a Call
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        selectedService=""
      />
    </div>
  );
}
