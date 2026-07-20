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
    <footer className="dark-section footer-section relative overflow-hidden border-t border-accent-cyan/30 py-16">
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_center,rgba(51, 78, 172,0.08),transparent_72%)]" />
      <div className="section-shell">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Virtual Valley Logo"
                width={32}
                height={32}
                className="h-11 w-11 rounded-full object-cover"
              />
              <span className="font-display text-lg font-bold tracking-[0.24em] text-foreground">
                VIRTUAL VALLEY
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-7 text-muted">
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
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface-secondary text-foreground backdrop-blur-md hover:border-accent-cyan hover:bg-surface hover:shadow-[0_0_24px_rgb(var(--accent-cyan)_/_0.25)]"
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold text-foreground">Services</h3>
            <div className="mt-5 flex flex-col gap-3 text-sm text-muted">
              <a className="hover:text-foreground" href="#services">Website Development</a>
              <a className="hover:text-foreground" href="#services">Website Repair & Maintenance</a>
              <a className="hover:text-foreground" href="#services">Social Media Management</a>
              <a className="hover:text-foreground" href="#contact">Request a proposal</a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold text-foreground">Company</h3>
            <div className="mt-5 flex flex-col gap-3 text-sm text-muted">
              <a className="hover:text-foreground" href="#about">About</a>
              <a className="hover:text-foreground" href="#testimonials">Client reviews</a>
              <a className="hover:text-foreground" href="#contact">Contact</a>
              <Link className="hover:text-foreground" href="/blog">Blog</Link>
              <p className="pt-2">contact@thevirtualvalley.com</p>
              <p>Kolkata, West Bengal, India</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} Virtual Valley. All rights reserved.</span>
            <Link className="hover:text-foreground" href="/privacy-policy">Privacy Policy</Link>
            <Link className="hover:text-foreground" href="/terms-of-service">Terms of Service</Link>
            <Link className="hover:text-foreground" href="/refund-policy">Refund Policy</Link>
          </div>
          <a href="#top" className="hover:text-accent-cyan">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
