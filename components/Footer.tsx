"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/thevirtualvalley/", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61589295369603", icon: Facebook },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black py-16">
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.14),transparent_72%)]" />
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
            <p className="mt-5 max-w-xs text-sm leading-7 text-white-secondary">
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
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md hover:border-purple/30 hover:bg-white/10 hover:shadow-glow-purple"
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold text-white">Services</h3>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white-secondary">
              <a className="hover:text-white" href="#services">Website Development</a>
              <a className="hover:text-white" href="#services">Website Repair & Maintenance</a>
              <a className="hover:text-white" href="#services">Social Media Management</a>
              <a className="hover:text-white" href="#pricing">Pricing</a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold text-white">Company</h3>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white-secondary">
              <a className="hover:text-white" href="#about">About</a>
              <a className="hover:text-white" href="#portfolio">Portfolio</a>
              <Link className="hover:text-white" href="/recentprojects">Recent Projects</Link>
              <a className="hover:text-white" href="#contact">Contact</a>
              <Link className="hover:text-white" href="/blog">Blog</Link>
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold text-white">Contact</h3>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white-secondary">
              <p>contact@thevirtualvalley.com</p>
              <p>+91 8017007352</p>
              <p>Kolkata, West Bengal, India</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white-secondary md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} Virtual Valley. All rights reserved.</span>
            <Link className="hover:text-white" href="/privacy-policy">Privacy Policy</Link>
            <Link className="hover:text-white" href="/terms-of-service">Terms of Service</Link>
            <Link className="hover:text-white" href="/refund-policy">Refund Policy</Link>
          </div>
          <a href="#top" className="hover:text-gold">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
