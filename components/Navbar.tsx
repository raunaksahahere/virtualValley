"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "Pricing", href: "#pricing", section: "pricing" },
  { label: "Demos", href: "#demos", section: "demos" },
  { label: "About", href: "#about", section: "about" },
  { label: "Contact", href: "#contact", section: "contact" },
  { label: "Seller Partner", href: "/seller-partner", section: "seller-partner" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["pricing", "demos", "about", "contact"];
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

  const handleNavClick = (
    e: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: "instant" });
    }
  };

  return (
    <div className="fixed left-1/2 top-5 z-50 w-[calc(100%-1.5rem)] max-w-7xl -translate-x-1/2">
      <nav
        className={`rounded-full border transition-all duration-300 ${
          isScrolled
            ? "border-white/15 bg-black/80 shadow-[0_20px_60px_rgba(0,0,0,0.36)] backdrop-blur-xl"
            : "border-white/10 bg-black/45 backdrop-blur-lg"
        }`}
      >
        <div className="flex h-12 items-center justify-between px-4 md:h-16 md:px-6">
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

          <div className="hidden items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 md:flex">
            {navItems.map((item) => {
              const isPageLink = item.href.startsWith("/");
              const isActive = activeSection === item.section;
              const resolvedHref =
                !isPageLink && pathname !== "/" ? `/${item.href}` : item.href;

              return isPageLink ? (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => router.push(item.href)}
                  className={`group relative rounded-full px-4 py-2 text-sm transition-colors ${
                    isActive ? "bg-white/8" : ""
                  } ${
                    item.label === "Seller Partner"
                      ? "text-[#D4AF37] font-semibold"
                      : `font-medium ${isActive ? "text-white" : "text-white-secondary hover:text-white"}`
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 bg-gold transition-all duration-300 ${
                      isActive ? "w-8" : "w-0 group-hover:w-8"
                    }`}
                  />
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={resolvedHref}
                  className={`group relative rounded-full px-4 py-2 text-sm transition-colors ${
                    isActive ? "bg-white/8" : ""
                  } ${
                    item.label === "Seller Partner"
                      ? "text-[#D4AF37] font-semibold"
                      : `font-medium ${isActive ? "text-white" : "text-white-secondary hover:text-white"}`
                  }`}
                  onClick={
                    resolvedHref.startsWith("#")
                      ? (e) => handleNavClick(e, item.href)
                      : undefined
                  }
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 bg-gold transition-all duration-300 ${
                      isActive ? "w-8" : "w-0 group-hover:w-8"
                    }`}
                  />
                </a>
              );
            })}
            <a
              href="#pricing"
              className="btn-primary px-5 py-2 text-xs"
              onClick={(e) => handleNavClick(e, "#pricing")}
            >
              Get Started
            </a>
          </div>

          <button
            type="button"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-white backdrop-blur-md md:hidden"
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
            className="mt-3 overflow-hidden rounded-3xl border border-white/10 bg-black/85 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) =>
                item.href.startsWith("/") ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`rounded-2xl px-3 py-2 text-sm font-medium transition-colors hover:bg-white/5 hover:text-white ${
                      item.label === "Seller Partner" ? "text-[#D4AF37] font-semibold" : "text-white-secondary"
                    }`}
                    onClick={() => {
                      router.push(item.href);
                      setIsOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={pathname !== "/" ? `/${item.href}` : item.href}
                    className={`rounded-2xl px-3 py-2 text-sm font-medium transition-colors hover:bg-white/5 hover:text-white ${
                      item.label === "Seller Partner" ? "text-[#D4AF37] font-semibold" : "text-white-secondary"
                    }`}
                    onClick={(e) => {
                      if (pathname === "/") {
                        handleNavClick(e, item.href);
                      }
                      setIsOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                ),
              )}
              <a
                href="#pricing"
                className="btn-primary text-center"
                onClick={(e) => {
                  handleNavClick(e, "#pricing");
                  setIsOpen(false);
                }}
              >
                Get Started
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
