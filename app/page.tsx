"use client";

import dynamic from "next/dynamic";

import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";


const StorySection = dynamic(() => import("@/components/StorySection"), { ssr: false });
const Pricing = dynamic(() => import("@/components/Pricing"), { ssr: false });
const Portfolio = dynamic(() => import("@/components/Portfolio"), { ssr: false });

const Marketplace = dynamic(() => import("@/components/Marketplace"), { ssr: false });

const GrowWithVirtualValley = dynamic(
  () => import("@/components/GrowWithVirtualValley"),
  { ssr: false },
);

export default function Home() {
  return (
    <main id="top" className="bg-black text-white">
      <Navbar />
      <Hero />
      <StorySection />

      <Pricing />
      <Marketplace />


      <GrowWithVirtualValley />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
