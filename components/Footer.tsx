"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/virtualvalley", icon: Instagram },
  { label: "Facebook", href: "https://facebook.com/virtualvalley", icon: Facebook },
  { label: "YouTube", href: "https://youtube.com/@virtualvalley", icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-neutral-950 py-14">
      <div className="section-shell">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Virtual Valley Logo"
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover"
              />
              <span className="font-display text-lg font-bold tracking-[0.24em] text-white">
                VIRTUAL VALLEY
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-7 text-gray-400">
              Premium digital agency services for brands that want better websites, sharper social media, and more credible digital presence.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-label={`Visit Virtual Valley on ${item.label}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10"
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold text-white">Services</h3>
            <div className="mt-5 flex flex-col gap-3 text-sm text-gray-400">
              <a href="#services">Website Development</a>
              <a href="#services">Website Repair & Maintenance</a>
              <a href="#services">Social Media Management</a>
              <a href="#pricing">Pricing</a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold text-white">Company</h3>
            <div className="mt-5 flex flex-col gap-3 text-sm text-gray-400">
              <a href="#about">About</a>
              <a href="#portfolio">Portfolio</a>
              <Link href="/recentprojects">Recent Projects</Link>
              <a href="#contact">Contact</a>
              <Link href="/blog">Blog</Link>
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold text-white">Contact</h3>
            <div className="mt-5 flex flex-col gap-3 text-sm text-gray-400">
              <p>contact.virtualvalley@gmail.com</p>
              <p>+91 8017007352</p>
              <p>Kolkata, West Bengal, India</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} Virtual Valley. All rights reserved.</span>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
            <Link href="/refund-policy">Refund Policy</Link>
          </div>
          <a href="#top" className="hover:text-gold">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
