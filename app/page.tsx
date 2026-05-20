"use client";

import { useState } from "react";

import About from "@/components/About";
import Celebration from "@/components/Celebration";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GrowWithVirtualValley from "@/components/GrowWithVirtualValley";
import Hero from "@/components/Hero";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import Services from "@/components/Services";
import VideoSection from "@/components/VideoSection";
import WhatsAppButton from "@/components/WhatsAppButton";

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
