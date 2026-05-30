"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Services", href: "#services", section: "services" },
  { label: "Pricing", href: "#pricing", section: "pricing" },
  { label: "Demos", href: "#demos", section: "demos" },
  { label: "About", href: "#about", section: "about" },
  { label: "Contact", href: "#contact", section: "contact" },
  { label: "Growth Partner", href: "/growth-partner", section: "growth-partner" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["services", "pricing", "demos", "about", "contact"];
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
      } else if (pathname === "/growth-partner") {
        setActiveSection("growth-partner");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <div className="fixed left-1/2 top-6 z-50 w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2">
      <nav
        className={`rounded-full border transition-all duration-300 ${
          isScrolled
            ? "border-white/15 bg-neutral-950/95 backdrop-blur-md"
            : "border-gray-800 bg-neutral-950/80 backdrop-blur-sm"
        }`}
      >
        <div className="flex h-12 items-center justify-between px-4 md:h-14 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Virtual Valley Logo"
              width={48}
              height={48}
              priority
              className="h-8 w-8 rounded-full object-cover md:h-12 md:w-12"
            />
            <span className="font-display text-sm font-bold tracking-[0.28em] text-white md:text-base">
              VIRTUAL VALLEY
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => {
              const isPageLink = item.href.startsWith("/");
              const isActive = activeSection === item.section;
              const resolvedHref =
                !isPageLink && pathname !== "/" ? `/${item.href}` : item.href;

              return isPageLink ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group relative text-sm font-medium text-gray-300 hover:text-white"
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-0.5 bg-gold transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={resolvedHref}
                  className="group relative text-sm font-medium text-gray-300 hover:text-white"
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-0.5 bg-gold transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
            <a href="#pricing" className="btn-primary px-5 py-2 text-xs">
              Get Started
            </a>
          </div>

          <button
            type="button"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            className="rounded-full border border-white/10 p-2 text-white md:hidden"
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
            className="mt-3 overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/95 p-4 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) =>
                item.href.startsWith("/") ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm font-medium text-gray-300 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={pathname !== "/" ? `/${item.href}` : item.href}
                    className="text-sm font-medium text-gray-300 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ),
              )}
              <a href="#pricing" className="btn-primary text-center" onClick={() => setIsOpen(false)}>
                Get Started
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
