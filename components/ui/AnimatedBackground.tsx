"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ParticleCanvas } from "./ParticleCanvas";

export function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  // Parallax constraints (10-20px movement as requested)
  const springConfig = { stiffness: 50, damping: 20, mass: 1 };
  
  // Create smooth animated springs for the mouse position
  // We use numeric values directly and let Framer interpolate them
  const [windowCenter, setWindowCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setWindowCenter({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize between -1 and 1
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll-based dynamic styling
  // Evolve the background based on scroll depth
  const greenOrbScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.9]);
  const limeOrbOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.04, 0.08, 0.06, 0.05]);
  const whiteGlowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.02, 0.05, 0.02]);
  
  // Use strings for spring values as framer-motion handles it natively via animate props
  const mouseXParallax1 = mousePosition.x * -15; 
  const mouseYParallax1 = mousePosition.y * -15;
  
  const mouseXParallax2 = mousePosition.x * 20;
  const mouseYParallax2 = mousePosition.y * 20;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Layer 3: Animated mesh gradient base (Subtle blending underlying everything) */}
      <div className="absolute inset-0 opacity-[0.25] mix-blend-screen">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle_at_center,#4C1D95_0%,transparent_60%)] blur-[108px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle_at_center,#4C1D95_0%,transparent_60%)] blur-[108px]" />
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[50%] rounded-full bg-[radial-gradient(circle_at_center,#334EAC_0%,transparent_50%)] opacity-30 blur-[108px]" />
      </div>

      {/* Layer 2: Floating Orbs */}
      <motion.div 
        className="absolute inset-0"
        animate={{ x: mouseXParallax1, y: mouseYParallax1 }}
        transition={{ type: "spring", ...springConfig }}
      >
        {/* Dominant Green Orbs */}
        <motion.div
          style={{ scale: greenOrbScale }}
          className="absolute top-[10%] left-[15%] w-[360px] h-[360px] rounded-full bg-primary mix-blend-screen blur-[144px] opacity-[0.10]"
          animate={{
            x: [0, 30, 0, -20, 0],
            y: [0, -20, 20, 0, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[45%] w-[504px] h-[504px] rounded-full bg-primary mix-blend-screen blur-[180px] opacity-[0.08]"
          animate={{
            x: [0, -40, 20, 0],
            y: [0, 30, -30, 0],
            scale: [1, 1.1, 0.95, 1]
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Premium Lime Orbs */}
        <motion.div
          style={{ opacity: limeOrbOpacity }}
          className="absolute top-[30%] right-[20%] w-[288px] h-[288px] rounded-full bg-[#334EAC] mix-blend-screen blur-[129.6px]"
          animate={{
            x: [0, -20, 20, 0],
            y: [0, 40, -10, 0],
            scale: [1, 1.05, 0.9, 1]
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        animate={{ x: mouseXParallax2, y: mouseYParallax2 }}
        transition={{ type: "spring", ...springConfig }}
      >
        {/* Additional Orbs & White Blooms */}
        <motion.div
          className="absolute top-[60%] left-[5%] w-[216px] h-[216px] rounded-full bg-primary mix-blend-screen blur-[108px] opacity-[0.09]"
          animate={{
            x: [0, 50, -20, 0],
            y: [0, -30, 40, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />
        <motion.div
          style={{ opacity: whiteGlowOpacity }}
          className="absolute top-[40%] left-[30%] w-[432px] h-[432px] rounded-full bg-white mix-blend-screen blur-[216px]"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{ opacity: limeOrbOpacity }}
          className="absolute bottom-[10%] right-[15%] w-[360px] h-[360px] rounded-full bg-[#334EAC] mix-blend-screen blur-[158.4px]"
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -20, 30, 0],
          }}
          transition={{ duration: 45, repeat: Infinity, ease: "easeInOut", delay: 10 }}
        />
      </motion.div>

      {/* Layer 5: Depth Fog */}
      <motion.div
        className="absolute inset-0"
        animate={{ x: mouseXParallax1 * 0.5, y: mouseYParallax1 * 0.5 }}
        transition={{ type: "spring", ...springConfig }}
      >
        <motion.div 
          className="absolute top-[20%] w-[120%] h-[216px] left-[-10%] bg-primary mix-blend-screen blur-[180px] opacity-[0.04] rounded-[100%]"
          animate={{
            x: ["-5%", "5%", "-5%"],
            scaleY: [1, 1.2, 1]
          }}
          transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[30%] w-[120%] h-[288px] right-[-10%] bg-[#334EAC] mix-blend-screen blur-[216px] opacity-[0.02] rounded-[100%]"
          animate={{
            x: ["5%", "-5%", "5%"],
            scaleY: [1, 1.3, 1]
          }}
          transition={{ duration: 60, repeat: Infinity, ease: "easeInOut", delay: 15 }}
        />
      </motion.div>

      {/* Layer 4: Particle Canvas */}
      <ParticleCanvas />
      
      {/* Noise Overlay to prevent color banding and add texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>
    </div>
  );
}
