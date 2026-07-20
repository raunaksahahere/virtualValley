"use client";

import dynamic from "next/dynamic";

import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

const StorySection = dynamic(() => import("@/components/StorySection"), { ssr: false });
const Services = dynamic(() => import("@/components/Services"), { ssr: false });

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
      <StorySection />

      <Services />
      <TestimonialsSection />

      <GrowWithVirtualValley />

      <About />
      <Contact />
      <Footer />
    </main>
  );
}
