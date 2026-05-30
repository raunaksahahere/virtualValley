"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import WhatsAppButton from "@/components/WhatsAppButton";

const VideoSection = dynamic(() => import("@/components/VideoSection"), { ssr: false });
const Pricing = dynamic(() => import("@/components/Pricing"), { ssr: false });
const Portfolio = dynamic(() => import("@/components/Portfolio"), { ssr: false });
const Celebration = dynamic(() => import("@/components/Celebration"), { ssr: false });
const GrowWithVirtualValley = dynamic(
  () => import("@/components/GrowWithVirtualValley"),
  { ssr: false },
);

export default function HomePage() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <main id="top" className="bg-black text-white">
      {!loaderDone ? <Loader onComplete={() => setLoaderDone(true)} /> : null}
      {loaderDone ? <Navbar /> : null}
      <Hero />
      <VideoSection />
      <Services />
      <Pricing />
      <Celebration />
      <GrowWithVirtualValley />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
