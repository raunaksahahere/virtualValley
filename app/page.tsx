"use client";

import dynamic from "next/dynamic";

import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

const Services = dynamic(() => import("@/components/Services"), { ssr: false });
const WebsitePlans = dynamic(() => import("@/components/WebsitePlans"), { ssr: false });
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"), { ssr: false });


const GrowWithVirtualValley = dynamic(
  () => import("@/components/GrowWithVirtualValley"),
  { ssr: false },
);

export default function Home() {
  return (
    <main id="top" className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />

      <Services />
      <WebsitePlans />
      <TestimonialsSection />

      <GrowWithVirtualValley />

      <Contact />
      <Footer />
    </main>
  );
}
