"use client";

import {
  motion,
  useMotionValueEvent,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { 
  Store, TrendingUp, TrendingDown, Users, CheckCircle2, 
  MapPin, Globe2, Layout, Share2, Target, Crosshair, Crown
} from "lucide-react";
import {
  SiMeta, SiGoogleads, SiWhatsapp, SiFacebook, SiInstagram,
  SiZomato, SiSwiggy, SiGooglemaps, SiGoogle,
  SiGoogleanalytics, SiApple,
} from "react-icons/si";

const MOBILE_PANELS = 7;

function MobileScaledFrame({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen h-full flex-shrink-0 relative overflow-hidden flex items-center justify-center">
      <div
        style={{
          transform: "scale(0.48)",
          transformOrigin: "center center",
          position: "absolute",
          width: "208%",
          height: "208%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// --- Fake 3D Particle System ---
function FloatingParticles({ progress }: { progress: any }) {
  const y1 = useTransform(progress, [0, 1], ["0%", "-200%"]);
  const y2 = useTransform(progress, [0, 1], ["0%", "-100%"]);
  const y3 = useTransform(progress, [0, 1], ["0%", "-300%"]);
  const scale = useTransform(progress, [0, 0.5, 1], [1, 1.2, 0.8]);
  const opacity = useTransform(progress, [0, 0.5, 1], [0.3, 0.6, 0.2]);

  return (
    <motion.div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ scale, opacity }}>
      {/* Background Slow Particles (Blurred) */}
      <motion.div className="absolute inset-0" style={{ y: y1 }}>
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={`p1-${i}`} 
            className="absolute rounded-full bg-purple/20 blur-md"
            style={{
              width: Math.random() * 60 + 20 + 'px',
              height: Math.random() * 60 + 20 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 200 + '%',
            }}
          />
        ))}
      </motion.div>
      {/* Midground Particles */}
      <motion.div className="absolute inset-0" style={{ y: y2 }}>
        {Array.from({ length: 25 }).map((_, i) => (
          <div 
            key={`p2-${i}`} 
            className="absolute rounded-full bg-gold/30 blur-sm"
            style={{
              width: Math.random() * 20 + 10 + 'px',
              height: Math.random() * 20 + 10 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 200 + '%',
            }}
          />
        ))}
      </motion.div>
      {/* Foreground Fast Particles */}
      <motion.div className="absolute inset-0" style={{ y: y3 }}>
        {Array.from({ length: 40 }).map((_, i) => (
          <div 
            key={`p3-${i}`} 
            className="absolute rounded-full bg-white/40"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 200 + '%',
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const mobileX = useTransform(
    smoothProgress,
    [0, 1],
    ["0vw", `-${(MOBILE_PANELS - 1) * 100}vw`]
  );
  const mobilePanel4Progress = useTransform(smoothProgress, [3 / 7, 4 / 7], [0, 1]);

  // ============================================================================
  // FRAME MAPPING (0.0 to 1.0)
  // ============================================================================

  const cardWidth = useTransform(
    smoothProgress,
    [0, 0.1, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.6, 0.7, 0.8, 0.9, 1],
    [
      "320px", // F1
      "320px", // F2
      "400px", // F3
      "400px",
      "320px", // F4 (Business Card shrinks back to let pins orbit)
      "320px",
      "320px",
      "900px", // F5: Desktop Wireframe
      "900px",
      "900px", // F6
      "900px", // F7
      "900px", // F8
      "320px", // F9
    ]
  );

  const cardHeight = useTransform(
    smoothProgress,
    [0, 0.1, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.6, 0.7, 0.8, 0.9, 1],
    [
      "420px", // F1
      "420px", // F2
      "550px", // F3
      "550px",
      "420px", // F4
      "420px",
      "420px",
      "600px", // F5
      "600px",
      "600px",
      "600px",
      "600px",
      "420px", // F9
    ]
  );

  const cardOpacity = useTransform(
    smoothProgress,
    [0, 0.25, 0.3, 0.4, 0.45, 1],
    [1, 1, 1, 1, 1, 1] // Keep card visible continuously
  );

  const cardBorderRadius = useTransform(
    smoothProgress,
    [0, 0.2, 0.45, 0.9, 1],
    ["24px", "16px", "24px", "24px", "100px"]
  );

  const cardBorderColor = useTransform(
    smoothProgress,
    [0, 0.1, 0.2, 0.3, 0.45, 0.8, 0.9, 1],
    [
      "rgba(255,255,255,0.15)", // F1
      "rgba(239,68,68,0.5)",    // F2 (Red)
      "rgba(212,175,55,0.6)",   // F3 (Gold)
      "rgba(139,92,246,0.3)",   // F4
      "rgba(139,92,246,0.3)",   // F5 (Purple)
      "rgba(139,92,246,0.8)",   // F8
      "rgba(139,92,246,1)",
      "rgba(212,175,55,1)",     // F9
    ]
  );

  const cardBoxShadow = useTransform(
    smoothProgress,
    [0, 0.1, 0.2, 0.3, 0.45, 0.8, 0.9, 1],
    [
      "0 20px 40px rgba(0,0,0,0.5)", // F1
      "0 20px 60px rgba(239,68,68,0.2)", // F2
      "0 30px 80px rgba(212,175,55,0.25)", // F3
      "0 20px 50px rgba(139,92,246,0.2)",  // F4
      "0 40px 100px rgba(139,92,246,0.2)", // F5
      "0 40px 150px rgba(139,92,246,0.4)", // F8
      "0 0 200px rgba(139,92,246,0.6)", // F9 pre
      "0 0 250px rgba(212,175,55,0.8)", // F9
    ]
  );

  // Scaled down the entire scene to 0.85 so elements don't get cut by navbar
  const sceneScale = useTransform(
    smoothProgress,
    [0, 0.8, 0.9, 1],
    [0.85, 0.85, 0.3, 0.12]
  );

  // Background Depth Parallax
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.5]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.3, 0.8, 1]);

  // --- Frame Opacities ---
  const f1Opacity = useTransform(smoothProgress, [0, 0.15, 0.22], [1, 1, 0]); // extended opacity so it doesn't close too fast
  const f3Opacity = useTransform(smoothProgress, [0.18, 0.22, 0.28, 0.32], [0, 1, 1, 0]);
  const f4CenterOpacity = useTransform(smoothProgress, [0.3, 0.35, 0.4, 0.45], [0, 1, 1, 0]);
  const blocksOpacity = useTransform(smoothProgress, [0.3, 0.35, 0.4, 0.45], [0, 1, 1, 0]);
  const blocksSpread = useTransform(smoothProgress, [0.3, 0.4], [0, 1]);
  const f5Opacity = useTransform(smoothProgress, [0.42, 0.45, 0.6, 0.65], [0, 1, 1, 0]);
  const f5Progress = useTransform(smoothProgress, [0.45, 0.63], [0, 1]);
  const f6Opacity = useTransform(smoothProgress, [0.6, 0.65, 0.78, 0.8], [0, 1, 1, 0]);
  const f6SocialScale = useTransform(smoothProgress, [0.6, 0.65], [0.9, 1]);
  const f7AdsOpacity = useTransform(smoothProgress, [0.68, 0.72], [0, 1]);
  const f8Opacity = useTransform(smoothProgress, [0.78, 0.8, 0.9, 0.95], [0, 1, 1, 0]);
  const f9Opacity = useTransform(smoothProgress, [0.85, 0.95], [0, 1]);
  const f9RingScale = useTransform(smoothProgress, [0.9, 1], [0.5, 1.2]);

  // Frame 1/2 Micro-animations
  const f1Glow = useTransform(smoothProgress, [0, 0.1], ["0 0 30px rgba(255,255,255,0.4)", "0 0 0px rgba(255,255,255,0)"]);
  const f1GraphPath = useTransform(smoothProgress, [0, 0.1], [
    "M 0 80 Q 25 60 50 70 T 100 20", // Healthy up
    "M 0 80 Q 25 90 50 85 T 100 110"  // Sharp decline
  ]);
  const f1GraphColor = useTransform(smoothProgress, [0, 0.1], ["#4ade80", "#ef4444"]);
  const f1CustomerDrop = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  // Frame 3 Micro-animations
  const f3SignatureDraw = useTransform(smoothProgress, [0.2, 0.25], [0, 1]);
  const f3SealScale = useTransform(smoothProgress, [0.24, 0.26], [2, 1]);
  const f3SealOpacity = useTransform(smoothProgress, [0.24, 0.25], [0, 1]);
  const bgFogScale = useTransform(smoothProgress, [0, 1], [1, 2]);
  const f1StatusColor = useTransform(smoothProgress, [0, 0.1], ["#4ade80", "#ef4444"]);
  const f1TrendUpOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
  const f1TrendDownOpacity = useTransform(smoothProgress, [0, 0.1], [0, 1]);
  const f1DroppingColor = useTransform(smoothProgress, [0, 0.1], ["#ffffff", "#ef4444"]);
  const block0X = useTransform(blocksSpread, [0, 1], [0, 450]);
  const block0Y = useTransform(blocksSpread, [0, 1], [0, 0]);
  const block1X = useTransform(blocksSpread, [0, 1], [0, 411.086]);
  const block1Y = useTransform(blocksSpread, [0, 1], [0, 142.35]);
  const block2X = useTransform(blocksSpread, [0, 1], [0, 301.109]);
  const block2Y = useTransform(blocksSpread, [0, 1], [0, 259.94]);
  const block3X = useTransform(blocksSpread, [0, 1], [0, 139.058]);
  const block3Y = useTransform(blocksSpread, [0, 1], [0, 332.869]);
  const block4X = useTransform(blocksSpread, [0, 1], [0, -47.03]);
  const block4Y = useTransform(blocksSpread, [0, 1], [0, 347.989]);
  const block5X = useTransform(blocksSpread, [0, 1], [0, -225]);
  const block5Y = useTransform(blocksSpread, [0, 1], [0, 303.109]);
  const block6X = useTransform(blocksSpread, [0, 1], [0, -364.058]);
  const block6Y = useTransform(blocksSpread, [0, 1], [0, 205.725]);
  const block7X = useTransform(blocksSpread, [0, 1], [0, -440.166]);
  const block7Y = useTransform(blocksSpread, [0, 1], [0, 72.767]);
  const block8X = useTransform(blocksSpread, [0, 1], [0, -440.166]);
  const block8Y = useTransform(blocksSpread, [0, 1], [0, -72.767]);
  const block9X = useTransform(blocksSpread, [0, 1], [0, -364.058]);
  const block9Y = useTransform(blocksSpread, [0, 1], [0, -205.725]);
  const block10X = useTransform(blocksSpread, [0, 1], [0, -225]);
  const block10Y = useTransform(blocksSpread, [0, 1], [0, -303.109]);
  const block11X = useTransform(blocksSpread, [0, 1], [0, -47.03]);
  const block11Y = useTransform(blocksSpread, [0, 1], [0, -347.989]);
  const block12X = useTransform(blocksSpread, [0, 1], [0, 139.058]);
  const block12Y = useTransform(blocksSpread, [0, 1], [0, -332.869]);
  const block13X = useTransform(blocksSpread, [0, 1], [0, 301.109]);
  const block13Y = useTransform(blocksSpread, [0, 1], [0, -259.94]);
  const block14X = useTransform(blocksSpread, [0, 1], [0, 411.086]);
  const block14Y = useTransform(blocksSpread, [0, 1], [0, -142.35]);
  const blockMoves = [
    { x: block0X, y: block0Y },
    { x: block1X, y: block1Y },
    { x: block2X, y: block2Y },
    { x: block3X, y: block3Y },
    { x: block4X, y: block4Y },
    { x: block5X, y: block5Y },
    { x: block6X, y: block6Y },
    { x: block7X, y: block7Y },
    { x: block8X, y: block8Y },
    { x: block9X, y: block9Y },
    { x: block10X, y: block10Y },
    { x: block11X, y: block11Y },
    { x: block12X, y: block12Y },
    { x: block13X, y: block13Y },
    { x: block14X, y: block14Y },
  ];
  const f9OuterRotate = useTransform(smoothProgress, [0.8, 1], [0, 90]);
  const f9InnerRotate = useTransform(smoothProgress, [0.8, 1], [0, -45]);
  const textOverlays = [
    {
      opacity: useTransform(smoothProgress, [0, 0.05, 0.15, 0.18], [0, 1, 1, 0]),
      y: useTransform(smoothProgress, [0, 0.05], [20, 0]),
    },
    {
      opacity: useTransform(smoothProgress, [0.18, 0.2, 0.23, 0.25], [0, 1, 1, 0]),
      y: useTransform(smoothProgress, [0.18, 0.2], [20, 0]),
    },
    {
      opacity: useTransform(smoothProgress, [0.25, 0.27, 0.32, 0.34], [0, 1, 1, 0]),
      y: useTransform(smoothProgress, [0.25, 0.27], [20, 0]),
    },
    {
      opacity: useTransform(smoothProgress, [0.35, 0.38, 0.42, 0.45], [0, 1, 1, 0]),
      y: useTransform(smoothProgress, [0.35, 0.38], [20, 0]),
    },
    {
      opacity: useTransform(smoothProgress, [0.48, 0.52, 0.6, 0.62], [0, 1, 1, 0]),
      y: useTransform(smoothProgress, [0.48, 0.52], [20, 0]),
    },
    {
      opacity: useTransform(smoothProgress, [0.63, 0.65, 0.68, 0.7], [0, 1, 1, 0]),
      y: useTransform(smoothProgress, [0.63, 0.65], [20, 0]),
    },
    {
      opacity: useTransform(smoothProgress, [0.72, 0.74, 0.78, 0.8], [0, 1, 1, 0]),
      y: useTransform(smoothProgress, [0.72, 0.74], [20, 0]),
    },
    {
      opacity: useTransform(smoothProgress, [0.82, 0.85, 0.9, 0.92], [0, 1, 1, 0]),
      y: useTransform(smoothProgress, [0.82, 0.85], [20, 0]),
    },
    {
      opacity: useTransform(smoothProgress, [0.93, 0.95, 1, 1], [0, 1, 1, 1]),
      y: useTransform(smoothProgress, [0.93, 0.95], [20, 0]),
    },
  ];
  const staticFull = useMotionValue(1);
  const staticZero = useMotionValue(0);
  const staticF1GraphPath = useMotionValue("M 0 80 Q 25 60 50 70 T 100 20");
  const staticGreen = useMotionValue("#4ade80");
  const staticWhite = useMotionValue("#ffffff");
  const staticGoldSealScale = useMotionValue(1);

  const F1Content = ({ revealed = false }: { revealed?: boolean }) => (
    <div className="relative flex h-[420px] w-[320px] flex-col p-8 pointer-events-none">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/20">
            <Store className="text-white" size={24} />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold tracking-wider text-white">YOUR BUSINESS</h3>
            <motion.p
              className="text-xs uppercase tracking-widest"
              style={{ color: revealed ? staticGreen : f1StatusColor }}
            >
              Physical Location
            </motion.p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div
          className="rounded-xl border border-white/10 bg-white/5 p-4"
          style={{ opacity: revealed ? staticFull : f1CustomerDrop }}
        >
          <Users className="text-white/50 mb-2" size={16} />
          <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Foot Traffic</p>
          <p className="font-display text-xl font-bold text-white">Steady</p>
        </motion.div>
        <motion.div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <motion.div style={{ opacity: revealed ? staticFull : f1TrendUpOpacity }}>
            <TrendingUp className="text-green-400 mb-2" size={16} />
          </motion.div>
          <motion.div className="absolute top-4" style={{ opacity: revealed ? staticZero : f1TrendDownOpacity }}>
            <TrendingDown className="text-red-400 mb-2" size={16} />
          </motion.div>
          <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Visibility</p>
          <motion.p
            className="font-display text-xl font-bold"
            style={{ color: revealed ? staticWhite : f1DroppingColor }}
          >
            Dropping
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="relative flex-1 rounded-xl border border-white/10 bg-gradient-to-t from-white/5 to-transparent overflow-hidden p-6 flex flex-col justify-end"
        style={{ boxShadow: revealed ? "0 0 30px rgba(255,255,255,0.4)" : f1Glow }}
      >
        <div className="absolute inset-0 pointer-events-none p-4 opacity-50">
          <svg viewBox="0 0 100 120" preserveAspectRatio="none" className="h-full w-full overflow-visible drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">
            <motion.path
              fill="transparent"
              strokeWidth="2"
              strokeLinecap="round"
              d={(revealed ? staticF1GraphPath : f1GraphPath) as any}
              style={{ stroke: revealed ? staticGreen : f1GraphColor }}
            />
          </svg>
        </div>

        <div className="w-full h-24 border-t-2 border-x-2 border-white/20 bg-white/5 rounded-t-lg relative z-10 flex flex-col justify-end">
          <div className="w-full flex justify-around p-2">
            <motion.div className="w-4 h-12 bg-white/20 rounded-sm" style={{ opacity: revealed ? staticFull : f1CustomerDrop }} />
            <div className="w-10 h-16 bg-white/30 rounded-t-md" />
            <motion.div className="w-4 h-12 bg-white/20 rounded-sm" style={{ opacity: revealed ? staticFull : f1CustomerDrop }} />
          </div>
        </div>
      </motion.div>
    </div>
  );

  const F2Content = F1Content;

  const F3Content = ({ revealed = false }: { revealed?: boolean }) => (
    <div className="relative flex h-[420px] w-[320px] flex-col p-8 pointer-events-none">
      <div className="flex-1 rounded-[2rem] border border-gold/30 bg-gradient-to-br from-gold/10 via-black to-black p-8 relative overflow-hidden shadow-inner">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(212,175,55,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />
        <div className="relative z-10 flex flex-col items-center text-center h-full">
          <div className="h-16 w-16 rounded-full bg-gold/10 flex items-center justify-center border border-gold/40 shadow-[0_0_40px_rgba(212,175,55,0.4)] mb-8 overflow-hidden p-2">
            <Image src="/logo.png" alt="Virtual Valley" width={40} height={40} className="object-contain" />
          </div>
          <h3 className="font-display text-2xl font-bold text-white tracking-wide mb-2">Master Service Agreement</h3>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold/60 mb-8">Virtual Valley Digital Transformation</p>
          <div className="w-full space-y-4 text-left">
            <div className="h-2 w-full rounded bg-white/10" />
            <div className="h-2 w-5/6 rounded bg-white/10" />
            <div className="h-2 w-4/6 rounded bg-white/10" />
          </div>
          <div className="mt-auto w-full pt-8 border-t border-white/10 relative">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Authorized Signature</p>
                <svg viewBox="0 0 200 40" className="w-32 h-8">
                  <motion.path
                    d="M 10 20 Q 30 5 40 25 T 70 15 T 100 25 T 130 10 T 160 20"
                    fill="transparent"
                    stroke="#D4AF37"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    style={{ pathLength: revealed ? staticFull : f3SignatureDraw }}
                  />
                </svg>
              </div>
              <motion.div
                className="relative"
                style={{
                  scale: revealed ? staticGoldSealScale : f3SealScale,
                  opacity: revealed ? staticFull : f3SealOpacity,
                }}
              >
                <div className="absolute inset-0 rounded-full bg-gold blur-md opacity-50" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 border-2 border-yellow-200 shadow-xl">
                  <CheckCircle2 className="text-black" size={24} strokeWidth={3} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const F4Content = () => (
    <div className="relative flex h-[420px] w-[320px] flex-col p-8 pointer-events-none">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/20">
            <Store className="text-white" size={24} />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold tracking-wider text-white">YOUR BUSINESS</h3>
            <p className="text-xs uppercase tracking-widest text-purple-400">Digital Hub</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
          <Users className="text-white/50 mb-2" size={16} />
          <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Traffic</p>
          <p className="font-display text-xl font-bold text-white">Growing</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-[0_0_30px_rgba(74,222,128,0.3)]">
          <TrendingUp className="text-green-400 mb-2" size={16} />
          <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Visibility</p>
          <p className="font-display text-xl font-bold text-green-400">Expanding</p>
        </div>
      </div>
      <div className="relative flex-1 rounded-xl border border-purple/30 bg-gradient-to-t from-purple/20 to-transparent overflow-hidden p-6 flex flex-col justify-end shadow-[0_0_50px_rgba(139,92,246,0.3)]">
        <div className="w-full h-24 border-t-2 border-x-2 border-purple/50 bg-purple/20 rounded-t-lg relative z-10 flex flex-col justify-end">
          <div className="w-full flex justify-around p-2">
            <div className="w-4 h-12 bg-white/40 rounded-sm" />
            <div className="w-10 h-16 bg-white/60 rounded-t-md" />
            <div className="w-4 h-12 bg-white/40 rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );

  const F6Content = ({ revealed = false }: { revealed?: boolean }) => (
    <div className="relative h-[600px] w-[900px] bg-black/80 backdrop-blur-3xl p-8 border-t border-white/10 pointer-events-none">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full"
        style={{ scale: revealed ? staticFull : f6SocialScale }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <Share2 className="text-pink-500" size={16} />
            <span className="text-xs font-bold text-white uppercase tracking-widest">Social Engine</span>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 flex flex-col flex-1 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-3xl" />
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Total Audience</p>
                <p className="font-display text-3xl font-bold text-white">12,408</p>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-1 text-[10px] font-bold text-green-400">
                <TrendingUp size={10} /> +24%
              </div>
            </div>
            <div className="flex-1 rounded-xl bg-black border border-white/10 p-4 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-[2px]">
                  <div className="h-full w-full rounded-full bg-black" />
                </div>
                <div>
                  <div className="h-2 w-24 rounded bg-white/80 mb-1" />
                  <div className="h-1.5 w-16 rounded bg-white/40" />
                </div>
              </div>
              <div className="flex-1 rounded-lg bg-white/5" />
              <div className="flex gap-4">
                <div className="h-4 w-12 rounded-full bg-white/10" />
                <div className="h-4 w-12 rounded-full bg-white/10" />
              </div>
            </div>
          </div>
        </div>
        <motion.div
          className="flex flex-col gap-4"
          style={{ opacity: revealed ? staticFull : f7AdsOpacity }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Target className="text-blue-400" size={16} />
              <span className="text-xs font-bold text-white uppercase tracking-widest">Growth Engine</span>
            </div>
            <span className="flex items-center gap-1 text-[10px] text-green-400 font-bold uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" /> Active
            </span>
          </div>
          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 flex flex-col flex-1 shadow-[0_0_40px_rgba(59,130,246,0.1)] relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none" />
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md">
                <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Ad Spend</p>
                <p className="font-display text-2xl font-bold text-white">₹45.2K</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md">
                <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">ROAS</p>
                <p className="font-display text-2xl font-bold text-green-400">4.8x</p>
              </div>
            </div>
            <div className="flex-1 rounded-xl border border-white/10 bg-black/40 p-4 flex flex-col justify-end relative overflow-hidden">
              <div className="absolute inset-0 p-4 flex items-end opacity-50">
                <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
                  <path d="M 0 35 Q 20 30 40 15 T 70 20 T 100 5" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex justify-between w-full border-t border-white/10 pt-2 relative z-10">
                <div className="text-[8px] text-white/30">WEEK 1</div>
                <div className="text-[8px] text-white/30">WEEK 2</div>
                <div className="text-[8px] text-white/30">WEEK 3</div>
                <div className="text-[8px] text-white/30">WEEK 4</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );

  const F7Content = () => (
    <div className="relative flex h-[600px] w-[900px] flex-col items-center justify-center bg-black overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.3)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(212,175,55,0.2)_0%,transparent_60%)]" />
      <div className="relative z-10 text-center flex flex-col items-center w-full max-w-2xl px-8">
        <div className="mb-8 h-24 w-24 rounded-full bg-black/50 border border-white/10 flex items-center justify-center shadow-[0_0_80px_rgba(255,255,255,0.4)] overflow-hidden p-3 backdrop-blur-md">
          <Image src="/logo.png" alt="Virtual Valley" width={60} height={60} className="object-contain" />
        </div>
        <h2 className="font-display text-5xl font-black text-white mb-4 tracking-tight">MARKET LEADER</h2>
        <p className="text-gold tracking-[0.3em] text-sm font-bold uppercase mb-12 border-b border-gold/30 pb-4">Premium Brand Authority</p>
        <div className="grid grid-cols-3 w-full gap-4">
          <div className="flex flex-col items-center rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md">
            <span className="font-display text-4xl font-bold text-white mb-2">300%</span>
            <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Revenue Growth</span>
          </div>
          <div className="flex flex-col items-center rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md shadow-[0_0_30px_rgba(139,92,246,0.2)]">
            <span className="font-display text-4xl font-bold text-white mb-2">10k+</span>
            <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Active Customers</span>
          </div>
          <div className="flex flex-col items-center rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md">
            <span className="font-display text-4xl font-bold text-white mb-2">#1</span>
            <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Local Search</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <section
        ref={containerRef}
        id="story"
        className="relative bg-transparent text-white"
        style={{ minHeight: `${MOBILE_PANELS * 100}vh` }}
      >
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 flex h-full"
            style={{ x: mobileX, width: `${MOBILE_PANELS * 100}vw` }}
          >
            <MobileScaledFrame>
              <F1Content revealed />
            </MobileScaledFrame>

            <MobileScaledFrame>
              <F2Content revealed />
            </MobileScaledFrame>

            <MobileScaledFrame>
              <F3Content revealed />
            </MobileScaledFrame>

            <MobileScaledFrame>
              <F4Content />
            </MobileScaledFrame>

            <div className="w-screen h-full flex-shrink-0 flex items-center justify-center">
              <IPhoneClientChat f5Progress={mobilePanel4Progress} scale={0.85} />
            </div>

            <MobileScaledFrame>
              <F6Content revealed />
            </MobileScaledFrame>

            <MobileScaledFrame>
              <F7Content />
            </MobileScaledFrame>
          </motion.div>
        </div>
      </section>
    );
  }

  const orbitIcons = [
    { label: "Meta Ads",        Icon: SiMeta,              color: "#0081FB" },
    { label: "Google Ads",      Icon: SiGoogleads,         color: "#4285F4" },
    { label: "WhatsApp",        Icon: SiWhatsapp,          color: "#25D366" },
    { label: "Facebook",        Icon: SiFacebook,          color: "#1877F2" },
    { label: "Instagram",       Icon: SiInstagram,         color: "#E1306C" },
    { label: "Zomato",          Icon: SiZomato,            color: "#E23744" },
    { label: "Swiggy",          Icon: SiSwiggy,            color: "#FC8019" },
    { label: "Google Business", Icon: SiGoogle,            color: "#4285F4" },
    { label: "Google Maps",     Icon: SiGooglemaps,        color: "#34A853" },
    { label: "Analytics",       Icon: SiGoogleanalytics,   color: "#E37400" },
    { label: "Apple Maps",      Icon: SiApple,             color: "#F5F5F7" },
    { label: "JustDial",        Icon: null,                color: "#FF6600" },
  ];

  return (
    <section ref={containerRef} id="story" className="relative min-h-[1200vh] bg-black text-white">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">

        {/* ========================================================= */}
        {/* BACKGROUND 7-LAYER DEPTH SYSTEM */}
        {/* ========================================================= */}
        <div className="absolute inset-0 z-[-10] bg-[radial-gradient(circle_at_center,#110820_0%,#000000_100%)]" />
        
        {/* Neural Grid */}
        <motion.div 
          className="absolute inset-0 z-[-9] opacity-30"
          style={{ 
            backgroundImage: `linear-gradient(rgba(139,92,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
            scale: bgScale,
            filter: "blur(4px)"
          }} 
        />

        {/* Ambient Fog */}
        <motion.div 
          className="absolute inset-0 z-[-8]"
          style={{ 
            background: "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 60%)",
            opacity: bgOpacity,
            scale: bgFogScale
          }}
        />

        <FloatingParticles progress={smoothProgress} />

        <motion.div
          className="relative flex items-center justify-center z-10 perspective-[2000px]"
          style={{ scale: sceneScale }}
        >
          {/* ========================================================= */}
          {/* THE CENTRAL TRANSFORMING OBJECT */}
          {/* ========================================================= */}
          <motion.div
            className="relative flex flex-col items-center justify-center overflow-hidden bg-black/60 backdrop-blur-2xl will-change-transform"
            style={{
              width: cardWidth,
              height: cardHeight,
              opacity: cardOpacity,
              borderRadius: cardBorderRadius,
              borderColor: cardBorderColor,
              boxShadow: cardBoxShadow,
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            {/* FRAME 1 & 2: Struggle / Decline */}
            <motion.div
              className="absolute inset-0 flex flex-col p-8 pointer-events-none"
              style={{ opacity: f1Opacity }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/20">
                    <Store className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-wider text-white">YOUR BUSINESS</h3>
                    <motion.p 
                      className="text-xs uppercase tracking-widest"
                      style={{ color: f1StatusColor }}
                    >
                      Physical Location
                    </motion.p>
                  </div>
                </div>
              </div>

              {/* Status Modules */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <motion.div 
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                  style={{ opacity: f1CustomerDrop }}
                >
                  <Users className="text-white/50 mb-2" size={16} />
                  <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Foot Traffic</p>
                  <p className="font-display text-xl font-bold text-white">Steady</p>
                </motion.div>
                <motion.div 
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <motion.div style={{ opacity: f1TrendUpOpacity }}>
                    <TrendingUp className="text-green-400 mb-2" size={16} />
                  </motion.div>
                  <motion.div className="absolute top-4" style={{ opacity: f1TrendDownOpacity }}>
                    <TrendingDown className="text-red-400 mb-2" size={16} />
                  </motion.div>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Visibility</p>
                  <motion.p 
                    className="font-display text-xl font-bold"
                    style={{ color: f1DroppingColor }}
                  >
                    Dropping
                  </motion.p>
                </motion.div>
              </div>

              {/* Storefront Silhouette */}
              <motion.div 
                className="relative flex-1 rounded-xl border border-white/10 bg-gradient-to-t from-white/5 to-transparent overflow-hidden p-6 flex flex-col justify-end"
                style={{ boxShadow: f1Glow }}
              >
                {/* SVG Graph Overlay */}
                <div className="absolute inset-0 pointer-events-none p-4 opacity-50">
                   <svg viewBox="0 0 100 120" preserveAspectRatio="none" className="h-full w-full overflow-visible drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">
                    <motion.path
                      fill="transparent"
                      strokeWidth="2"
                      strokeLinecap="round"
                      d={f1GraphPath as any}
                      style={{ stroke: f1GraphColor }}
                    />
                  </svg>
                </div>
                
                <div className="w-full h-24 border-t-2 border-x-2 border-white/20 bg-white/5 rounded-t-lg relative z-10 flex flex-col justify-end">
                  <div className="w-full flex justify-around p-2">
                    <motion.div className="w-4 h-12 bg-white/20 rounded-sm" style={{ opacity: f1CustomerDrop }} />
                    <div className="w-10 h-16 bg-white/30 rounded-t-md" />
                    <motion.div className="w-4 h-12 bg-white/20 rounded-sm" style={{ opacity: f1CustomerDrop }} />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* FRAME 3: Partnership Agreement */}
            <motion.div
              className="absolute inset-0 flex flex-col p-8 pointer-events-none"
              style={{ opacity: f3Opacity }}
            >
              <div className="flex-1 rounded-[2rem] border border-gold/30 bg-gradient-to-br from-gold/10 via-black to-black p-8 relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(212,175,55,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />
                
                <div className="relative z-10 flex flex-col items-center text-center h-full">
                  <div className="h-16 w-16 rounded-full bg-gold/10 flex items-center justify-center border border-gold/40 shadow-[0_0_40px_rgba(212,175,55,0.4)] mb-8 overflow-hidden p-2">
                    <Image src="/logo.png" alt="Virtual Valley" width={40} height={40} className="object-contain" />
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold text-white tracking-wide mb-2">Master Service Agreement</h3>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold/60 mb-8">Virtual Valley Digital Transformation</p>
                  
                  <div className="w-full space-y-4 text-left">
                    <div className="h-2 w-full rounded bg-white/10" />
                    <div className="h-2 w-5/6 rounded bg-white/10" />
                    <div className="h-2 w-4/6 rounded bg-white/10" />
                  </div>

                  <div className="mt-auto w-full pt-8 border-t border-white/10 relative">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Authorized Signature</p>
                        <svg viewBox="0 0 200 40" className="w-32 h-8">
                          <motion.path
                            d="M 10 20 Q 30 5 40 25 T 70 15 T 100 25 T 130 10 T 160 20"
                            fill="transparent"
                            stroke="#D4AF37"
                            strokeWidth="2"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            style={{ pathLength: f3SignatureDraw }}
                          />
                        </svg>
                      </div>
                      
                      {/* Premium Gold Seal */}
                      <motion.div 
                        className="relative"
                        style={{ scale: f3SealScale, opacity: f3SealOpacity }}
                      >
                        <div className="absolute inset-0 rounded-full bg-gold blur-md opacity-50" />
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 border-2 border-yellow-200 shadow-xl">
                          <CheckCircle2 className="text-black" size={24} strokeWidth={3} />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FRAME 4: Business Re-emergence with Glowing Health */}
            <motion.div
              className="absolute inset-0 flex flex-col p-8 pointer-events-none"
              style={{ opacity: f4CenterOpacity }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/20">
                    <Store className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-wider text-white">YOUR BUSINESS</h3>
                    <p className="text-xs uppercase tracking-widest text-purple-400">Digital Hub</p>
                  </div>
                </div>
              </div>

              {/* Glowing Status Modules */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                  <Users className="text-white/50 mb-2" size={16} />
                  <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Traffic</p>
                  <p className="font-display text-xl font-bold text-white">Growing</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-[0_0_30px_rgba(74,222,128,0.3)]">
                  <TrendingUp className="text-green-400 mb-2" size={16} />
                  <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Visibility</p>
                  <p className="font-display text-xl font-bold text-green-400">Expanding</p>
                </div>
              </div>

              <div className="relative flex-1 rounded-xl border border-purple/30 bg-gradient-to-t from-purple/20 to-transparent overflow-hidden p-6 flex flex-col justify-end shadow-[0_0_50px_rgba(139,92,246,0.3)]">
                 <div className="w-full h-24 border-t-2 border-x-2 border-purple/50 bg-purple/20 rounded-t-lg relative z-10 flex flex-col justify-end">
                    <div className="w-full flex justify-around p-2">
                      <div className="w-4 h-12 bg-white/40 rounded-sm" />
                      <div className="w-10 h-16 bg-white/60 rounded-t-md" />
                      <div className="w-4 h-12 bg-white/40 rounded-sm" />
                    </div>
                 </div>
              </div>
            </motion.div>

            {/* FRAME 5: Website Development */}
            <motion.div
              className="absolute inset-0 flex flex-col bg-transparent pointer-events-none"
              style={{ opacity: f5Opacity }}
            >
              {/* F5: iPhone Client Chat */}
              <IPhoneClientChat f5Progress={f5Progress} />
            </motion.div>

            {/* FRAME 6 & 7: Social & Ads Dashboard */}
            <motion.div
              className="absolute inset-0 flex flex-col bg-black/80 backdrop-blur-3xl p-8 border-t border-white/10 pointer-events-none"
              style={{ opacity: f6Opacity }}
            >
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full"
                style={{ scale: f6SocialScale }}
              >
                {/* Social Engine */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Share2 className="text-pink-500" size={16} />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Social Engine</span>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 flex flex-col flex-1 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-3xl" />
                    
                    {/* Live Metric */}
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Total Audience</p>
                        <p className="font-display text-3xl font-bold text-white">12,408</p>
                      </div>
                      <div className="flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-1 text-[10px] font-bold text-green-400">
                        <TrendingUp size={10} /> +24%
                      </div>
                    </div>

                    {/* Feed Mockup */}
                    <div className="flex-1 rounded-xl bg-black border border-white/10 p-4 flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-[2px]">
                          <div className="h-full w-full rounded-full bg-black" />
                        </div>
                        <div>
                          <div className="h-2 w-24 rounded bg-white/80 mb-1" />
                          <div className="h-1.5 w-16 rounded bg-white/40" />
                        </div>
                      </div>
                      <div className="flex-1 rounded-lg bg-white/5" />
                      <div className="flex gap-4">
                        <div className="h-4 w-12 rounded-full bg-white/10" />
                        <div className="h-4 w-12 rounded-full bg-white/10" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ads Dashboard */}
                <motion.div
                  className="flex flex-col gap-4"
                  style={{ opacity: f7AdsOpacity }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Target className="text-blue-400" size={16} />
                      <span className="text-xs font-bold text-white uppercase tracking-widest">Growth Engine</span>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] text-green-400 font-bold uppercase tracking-wider">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" /> Active
                    </span>
                  </div>

                  <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 flex flex-col flex-1 shadow-[0_0_40px_rgba(59,130,246,0.1)] relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none" />
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md">
                        <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Ad Spend</p>
                        <p className="font-display text-2xl font-bold text-white">₹45.2K</p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md">
                        <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">ROAS</p>
                        <p className="font-display text-2xl font-bold text-green-400">4.8x</p>
                      </div>
                    </div>

                    {/* Chart Mockup */}
                    <div className="flex-1 rounded-xl border border-white/10 bg-black/40 p-4 flex flex-col justify-end relative overflow-hidden">
                      <div className="absolute inset-0 p-4 flex items-end opacity-50">
                        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
                          <path d="M 0 35 Q 20 30 40 15 T 70 20 T 100 5" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div className="flex justify-between w-full border-t border-white/10 pt-2 relative z-10">
                        <div className="text-[8px] text-white/30">WEEK 1</div>
                        <div className="text-[8px] text-white/30">WEEK 2</div>
                        <div className="text-[8px] text-white/30">WEEK 3</div>
                        <div className="text-[8px] text-white/30">WEEK 4</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* FRAME 8: Success */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center bg-black overflow-hidden pointer-events-none"
              style={{ opacity: f8Opacity }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.3)_0%,transparent_70%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(212,175,55,0.2)_0%,transparent_60%)]" />
              
              <motion.div
                className="relative z-10 text-center flex flex-col items-center w-full max-w-2xl px-8"
                initial={{ scale: 0.9, y: 20 }}
                whileInView={{ scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8 h-24 w-24 rounded-full bg-black/50 border border-white/10 flex items-center justify-center shadow-[0_0_80px_rgba(255,255,255,0.4)] overflow-hidden p-3 backdrop-blur-md">
                  <Image src="/logo.png" alt="Virtual Valley" width={60} height={60} className="object-contain" />
                </div>
                
                <h2 className="font-display text-5xl font-black text-white mb-4 tracking-tight">MARKET LEADER</h2>
                <p className="text-gold tracking-[0.3em] text-sm font-bold uppercase mb-12 border-b border-gold/30 pb-4">Premium Brand Authority</p>

                <div className="grid grid-cols-3 w-full gap-4">
                  <div className="flex flex-col items-center rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md">
                    <span className="font-display text-4xl font-bold text-white mb-2">300%</span>
                    <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Revenue Growth</span>
                  </div>
                  <div className="flex flex-col items-center rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                    <span className="font-display text-4xl font-bold text-white mb-2">10k+</span>
                    <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Active Customers</span>
                  </div>
                  <div className="flex flex-col items-center rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md">
                    <span className="font-display text-4xl font-bold text-white mb-2">#1</span>
                    <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Local Search</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ========================================================= */}
          {/* EXTERNAL FLOATING ELEMENTS */}
          {/* ========================================================= */}

          {/* Frame 4: Ecosystem Emergence (15 Map Pins & Signals) */}
          <motion.div
            className="absolute inset-0 pointer-events-none flex items-center justify-center z-20"
            style={{ opacity: blocksOpacity }}
          >
            {orbitIcons.map((item, i) => {
              return (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3"
                  style={{ x: blockMoves[i].x, y: blockMoves[i].y }}
                >
                  <div 
                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black border border-white/20 backdrop-blur-xl relative"
                    style={{ boxShadow: `0 20px 40px ${item.color}30, inset 0 0 20px ${item.color}20` }}
                  >
                    {item.Icon
                      ? <item.Icon size={22} color={item.color} />
                      : <span style={{ color: item.color, fontSize: 11, fontWeight: 800, letterSpacing: -0.5 }}>JD</span>
                    }
                    <div className="absolute inset-0 rounded-2xl border border-inherit animate-ping opacity-50" style={{ borderColor: item.color }} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 whitespace-nowrap">{item.label}</span>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Frame 9: Ecosystem Zoom Out (The Virtual Valley Empire) */}
          <motion.div
            className="absolute inset-0 pointer-events-none flex items-center justify-center z-0"
            style={{ opacity: f9Opacity }}
          >
            {/* Massive Outer Ring */}
            <motion.div
              className="absolute h-[1800px] w-[1800px] rounded-full border border-purple/20 border-dashed"
              style={{ scale: f9RingScale, rotate: f9OuterRotate }}
            />
            {/* Inner Gold Ring */}
            <motion.div
              className="absolute h-[1200px] w-[1200px] rounded-full border-2 border-gold/10"
              style={{ scale: f9RingScale, rotate: f9InnerRotate }}
            >
              <div className="absolute top-0 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_20px_#D4AF37]" />
            </motion.div>

            {/* Glowing Connections */}
            <motion.div
              className="absolute h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1)_0%,transparent_70%)]"
              style={{ scale: f9RingScale }}
            />

            {/* Orbiting nodes */}
            {[
              { text: "Scalable Website", deg: 0, icon: Globe2 },
              { text: "Google Ads", deg: 45, icon: Target },
              { text: "Meta Ads", deg: 90, icon: Crosshair },
              { text: "Local SEO", deg: 135, icon: MapPin },
              { text: "Social Engine", deg: 180, icon: Share2 },
              { text: "Content", deg: 225, icon: Layout },
              { text: "Brand Identity", deg: 270, icon: Crown },
              { text: "Lead Gen", deg: 315, icon: Users },
            ].map((node, i) => {
              const radius = 600;
              const rad = node.deg * (Math.PI / 180);
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;
              const NodeIcon = node.icon;
              return (
                <motion.div
                  key={i}
                  className="absolute flex items-center gap-4 rounded-full bg-black/80 border border-white/10 pr-6 pl-2 py-2 font-display font-bold text-white shadow-[0_0_40px_rgba(139,92,246,0.2)] backdrop-blur-xl"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: "translate(-50%, -50%)"
                  }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10">
                    <NodeIcon size={20} className="text-purple-300" />
                  </div>
                  {node.text}
                </motion.div>
              )
            })}
          </motion.div>

        </motion.div>

        {/* ========================================================= */}
        {/* CINEMATIC TEXT OVERLAYS */}
        {/* ========================================================= */}
        <div className="pointer-events-none absolute bottom-24 left-0 w-full text-center px-4 z-50">
          <motion.div className="absolute inset-x-0 bottom-0" style={textOverlays[0]}>
            <p className="text-2xl md:text-4xl font-display font-medium text-white drop-shadow-2xl">Your business has potential.<br /><span className="text-white/40">But people can&apos;t find you.</span></p>
          </motion.div>
          
          <motion.div className="absolute inset-x-0 bottom-0" style={textOverlays[1]}>
            <p className="text-2xl md:text-4xl font-display font-medium text-red-400 drop-shadow-2xl">No visibility. No traffic. No growth.</p>
          </motion.div>
          
          <motion.div className="absolute inset-x-0 bottom-0" style={textOverlays[2]}>
            <p className="text-2xl md:text-4xl font-display font-medium text-gold drop-shadow-2xl">Growth starts with the right partner.</p>
          </motion.div>
          
          <motion.div className="absolute inset-x-0 bottom-0" style={textOverlays[3]}>
            <p className="text-2xl md:text-4xl font-display font-medium text-white drop-shadow-2xl">Now customers can finally find you.</p>
          </motion.div>
          
          <motion.div className="absolute inset-x-0 bottom-0" style={textOverlays[4]}>
            <p className="text-2xl md:text-4xl font-display font-medium text-white drop-shadow-2xl">Your website becomes your most powerful salesperson.</p>
          </motion.div>
          
          <motion.div className="absolute inset-x-0 bottom-0" style={textOverlays[5]}>
            <p className="text-2xl md:text-4xl font-display font-medium text-white drop-shadow-2xl">Your brand starts building trust every day.</p>
          </motion.div>
          
          <motion.div className="absolute inset-x-0 bottom-0" style={textOverlays[6]}>
            <p className="text-2xl md:text-4xl font-display font-medium text-white drop-shadow-2xl">Visibility becomes measurable growth.</p>
          </motion.div>
          
          <motion.div className="absolute inset-x-0 bottom-0" style={textOverlays[7]}>
            <p className="text-2xl md:text-4xl font-display font-medium text-white drop-shadow-2xl">More customers. More profit. Stronger identity.</p>
          </motion.div>
          
          <motion.div className="absolute inset-x-0 bottom-0" style={textOverlays[8]}>
            <h2 className="text-5xl md:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-widest mb-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">WE BUILD. YOU DOMINATE.</h2>
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto">Your business deserves more than survival. It deserves growth.<br /><span className="text-gold mt-2 block font-bold tracking-widest uppercase">Powered by Virtual Valley</span></p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

// iPhone Client Chat
const CLIENT_MESSAGES = [
  { text: "Hi, is this Virtual Valley? 🙏", time: "2:14 PM" },
  { text: "Need a website for my restaurant urgently", time: "2:14 PM" },
  { text: "How much for social media management?", time: "2:15 PM" },
  { text: "My friend referred you, interested in a package", time: "2:15 PM" },
  { text: "Do you do logo + website combo deals?", time: "2:16 PM" },
  { text: "Budget is ₹15k, can we work something out?", time: "2:16 PM" },
  { text: "When can we schedule a call? 🤝", time: "2:17 PM" },
];

function IPhoneClientChat({
  f5Progress,
  scale = 1,
}: {
  f5Progress: MotionValue<number>;
  scale?: number;
}) {
  const [visibleCount, setVisibleCount] = useState(0);

  useMotionValueEvent(f5Progress, "change", (v) => {
    setVisibleCount(Math.ceil(v * CLIENT_MESSAGES.length));
  });

  const W = Math.round(320 * scale);
  const H = Math.round(640 * scale);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-5">
      <p
        className="text-xs uppercase tracking-[0.22em] text-[#D4AF37]"
        style={{ fontSize: Math.round(12 * scale) }}
      >
        Clients find you. You close deals.
      </p>

      {/* iPhone shell */}
      <div
        style={{
          width: W,
          height: H,
          background: "#0f0f0f",
          borderRadius: 44 * scale,
          border: `${8 * scale}px solid #2a2a2a`,
          boxShadow:
            "0 0 0 1px #3a3a3a, 0 40px 70px rgba(0,0,0,0.6), inset 0 0 0 1px #111",
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
        }}
      >
        {/* Dynamic Island */}
        <div
          style={{
            position: "absolute",
            top: 10 * scale,
            left: "50%",
            transform: "translateX(-50%)",
            width: 88 * scale,
            height: 26 * scale,
            background: "#0f0f0f",
            borderRadius: 20 * scale,
            zIndex: 10,
          }}
        />

        {/* Status bar */}
        <div
          style={{
            padding: `${10 * scale}px ${18 * scale}px 0`,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11 * scale,
            color: "#fff",
            fontWeight: 600,
            marginTop: 8 * scale,
          }}
        >
          <span>9:41</span>
          <span style={{ fontSize: 10 * scale, letterSpacing: 1 }}>▲▲▲ ■ 87%</span>
        </div>

        {/* Chat header */}
        <div
          style={{
            padding: `${8 * scale}px ${14 * scale}px`,
            background: "#161616",
            display: "flex",
            alignItems: "center",
            gap: 10 * scale,
            borderBottom: "1px solid #242424",
            marginTop: 4 * scale,
          }}
        >
          <div
            style={{
              width: 34 * scale,
              height: 34 * scale,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #C9A84C, #D4AF37)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11 * scale,
              fontWeight: 800,
              color: "#000",
              flexShrink: 0,
            }}
          >
            VV
          </div>
          <div>
            <div
              style={{ fontSize: 13 * scale, fontWeight: 700, color: "#fff" }}
            >
              Virtual Valley
            </div>
            <div
              style={{ fontSize: 10 * scale, color: "#4CAF50", marginTop: 1 }}
            >
              ● Business Account
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div
          style={{
            padding: `${10 * scale}px ${10 * scale}px`,
            display: "flex",
            flexDirection: "column",
            gap: 7 * scale,
            overflowY: "hidden",
            height: `calc(100% - ${130 * scale}px)`,
            background: "#0a0a0a",
          }}
        >
          {CLIENT_MESSAGES.slice(0, visibleCount).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{
                alignSelf: "flex-start",
                background: "#1e1e1e",
                borderRadius: `${12 * scale}px ${12 * scale}px ${12 * scale}px ${3 * scale}px`,
                padding: `${7 * scale}px ${10 * scale}px`,
                maxWidth: "86%",
              }}
            >
              <p
                style={{
                  fontSize: 11.5 * scale,
                  color: "#e5e5e5",
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                {msg.text}
              </p>
              <p
                style={{
                  fontSize: 9.5 * scale,
                  color: "#555",
                  marginTop: 3 * scale,
                  textAlign: "right",
                }}
              >
                {msg.time}
              </p>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {visibleCount > 0 && visibleCount < CLIENT_MESSAGES.length && (
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{
                alignSelf: "flex-start",
                padding: `${6 * scale}px ${12 * scale}px`,
                background: "#1e1e1e",
                borderRadius: 12 * scale,
              }}
            >
              <span
                style={{
                  fontSize: 14 * scale,
                  color: "#666",
                  letterSpacing: 3,
                }}
              >
                •••
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
