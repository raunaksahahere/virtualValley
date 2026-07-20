"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useMemo, useRef } from "react";

export default function HeroBackground() {
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse Tracking Values (-1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Raw Pixel Mouse Positions (for glowing light layer)
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  
  // Depth Layers (Moving based on mouse)
  const pxGrid = useSpring(mouseX, { damping: 40, stiffness: 80 });
  const pyGrid = useSpring(mouseY, { damping: 40, stiffness: 80 });

  const pxNear = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const pyNear = useSpring(mouseY, { damping: 20, stiffness: 150 });

  const pxMid = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const pyMid = useSpring(mouseY, { damping: 30, stiffness: 100 });

  const pxFar = useSpring(mouseX, { damping: 50, stiffness: 60 });
  const pyFar = useSpring(mouseY, { damping: 50, stiffness: 60 });

  // Spring Physics for Interactive Cursor Light
  const lightX = useSpring(rawMouseX, { damping: 25, stiffness: 120 });
  const lightY = useSpring(rawMouseY, { damping: 25, stiffness: 120 });

  // -------------------------------------------------------------
  // PRE-COMPUTED TRANSFORMS (Must be called here, before any early returns)
  // -------------------------------------------------------------
  const txGrid = useTransform(pxGrid, [-1, 1], [-20, 20]);
  const tyGrid = useTransform(pyGrid, [-1, 1], [-20, 20]);

  const txNear = useTransform(pxNear, [-1, 1], [-25, 25]);
  const tyNear = useTransform(pyNear, [-1, 1], [-25, 25]);

  const txMid = useTransform(pxMid, [-1, 1], [-15, 15]);
  const tyMid = useTransform(pyMid, [-1, 1], [-15, 15]);

  const txFar = useTransform(pxFar, [-1, 1], [-5, 5]);
  const tyFar = useTransform(pyFar, [-1, 1], [-5, 5]);

  const txNodes = useTransform(pxMid, [-1, 1], [-10, 10]);
  const tyNodes = useTransform(pyMid, [-1, 1], [-10, 10]);

  const lightTx = useTransform(lightX, (x) => x - 175);
  const lightTy = useTransform(lightY, (y) => y - 175);

  useEffect(() => {
    setMounted(true);
    // Initialize light to center on mount
    rawMouseX.set(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
    rawMouseY.set(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
  }, [rawMouseX, rawMouseY]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion || window.innerWidth < 737) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Normalize mouse position from -1 to 1 for parallax
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    
    mouseX.set(x);
    mouseY.set(y);

    // Set raw pixels for the interactive light
    rawMouseX.set(clientX);
    rawMouseY.set(clientY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Generate abstract glass panels
  const glassPanels = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      width: 100 + Math.random() * 200,
      height: 80 + Math.random() * 150,
      top: `${10 + Math.random() * 80}%`,
      left: `${10 + Math.random() * 80}%`,
      depth: Math.random() > 0.6 ? 'near' : Math.random() > 0.3 ? 'mid' : 'far',
      delay: Math.random() * 5
    }));
  }, []);

  // Generate Digital Nodes
  const { nodes, connections } = useMemo(() => {
    const generatedNodes = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      y: 10 + Math.random() * 80,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 4
    }));

    const generatedConnections = [];
    for (let i = 0; i < generatedNodes.length; i++) {
      if (Math.random() > 0.5) {
        const target = generatedNodes[Math.floor(Math.random() * generatedNodes.length)];
        if (target.id !== generatedNodes[i].id) {
          generatedConnections.push({
            id: `${generatedNodes[i].id}-${target.id}`,
            n1: generatedNodes[i],
            n2: target
          });
        }
      }
    }

    return { nodes: generatedNodes, connections: generatedConnections };
  }, []);

  if (!mounted) return null;

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ==============================================================
          LAYER 1: PREMIUM BACKGROUND GRADIENT (Slowly shifting)
      ============================================================== */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-80"
        animate={{
          background: [
            "radial-gradient(120% 120% at 0% 0%, rgb(var(--surface-secondary)) 0%, rgb(var(--background)) 55%, rgb(var(--surface)) 100%)",
            "radial-gradient(120% 120% at 100% 0%, rgb(var(--surface-secondary)) 0%, rgb(var(--background)) 55%, rgb(var(--surface)) 100%)",
            "radial-gradient(120% 120% at 100% 100%, rgb(var(--surface-secondary)) 0%, rgb(var(--background)) 55%, rgb(var(--surface)) 100%)",
            "radial-gradient(120% 120% at 0% 100%, rgb(var(--surface-secondary)) 0%, rgb(var(--background)) 55%, rgb(var(--surface)) 100%)",
            "radial-gradient(120% 120% at 0% 0%, rgb(var(--surface-secondary)) 0%, rgb(var(--background)) 55%, rgb(var(--surface)) 100%)",
          ]
        }}
        transition={{ duration: 50, repeat: shouldReduceMotion ? 0 : Infinity, ease: "linear" }}
      />

      {/* ==============================================================
          LAYER 2: 3D PARALLAX GRID
      ============================================================== */}
      <div className="absolute inset-0 z-10 [perspective:1000px] overflow-hidden flex items-center justify-center pointer-events-none">
        <motion.div 
          className="w-[200vw] h-[200vh] absolute top-[-50vh] left-[-50vw]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(51,78,172,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(51,78,172,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transformOrigin: 'center center',
            rotateX: 70,
            x: txGrid,
            y: tyGrid,
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 70%)',
          }}
        />
      </div>

      {/* ==============================================================
          LAYER 3: INTERACTIVE MOUSE LIGHT
      ============================================================== */}
      <motion.div 
        className="absolute z-20 pointer-events-none rounded-full"
        style={{
          width: 350,
          height: 350,
          backgroundColor: 'rgb(var(--accent-cyan))',
          opacity: 0.12,
          filter: 'blur(120px)',
          x: lightTx,
          y: lightTy,
        }}
      />

      {/* ==============================================================
          LAYER 4: FLOATING GLASS PANELS
      ============================================================== */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {glassPanels.slice(0, 4).map((panel) => {
          const px = panel.depth === 'near' ? txNear : panel.depth === 'mid' ? txMid : txFar;
          const py = panel.depth === 'near' ? tyNear : panel.depth === 'mid' ? tyMid : tyFar;

          return (
            <motion.div
              key={panel.id}
              className="absolute rounded-3xl border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_rgba(51,78,172,0.05)]"
              style={{
                width: panel.width,
                height: panel.height,
                top: panel.top,
                left: panel.left,
                x: px,
                y: py,
              }}
              animate={{
                y: ["-10px", "10px", "-10px"],
              }}
              transition={{
                duration: 6 + (panel.id % 4),
                repeat: shouldReduceMotion ? 0 : Infinity,
                ease: "easeInOut",
                delay: panel.delay
              }}
            />
          );
        })}
      </div>

      {/* ==============================================================
          LAYER 5 & 6: DIGITAL NODES & CONNECTIONS
      ============================================================== */}
      <motion.div 
        className="absolute inset-0 z-40 pointer-events-none"
        style={{
          x: txNodes,
          y: tyNodes,
        }}
      >
        <svg className="absolute inset-0 w-full h-full opacity-30">
          {connections.map((conn) => (
            <motion.path
              key={conn.id}
              d={`M ${conn.n1.x}% ${conn.n1.y}% L ${conn.n2.x}% ${conn.n2.y}%`}
              stroke="url(#node-grad)"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 1, 0],
                opacity: [0, 0.5, 0.5, 0]
              }}
              transition={{
                duration: 8 + (Math.random() * 4),
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5
              }}
            />
          ))}
          <defs>
            <linearGradient id="node-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(var(--accent-cyan))" />
              <stop offset="100%" stopColor="rgb(var(--primary))" />
            </linearGradient>
          </defs>
        </svg>

        {nodes.slice(0, 15).map((node) => (
          <motion.div
            key={node.id}
            className="absolute rounded-full bg-accent-cyan shadow-[0_0_10px_rgb(var(--accent-cyan)_/_0.8)]"
            style={{
              width: node.size,
              height: node.size,
              left: `${node.x}%`,
              top: `${node.y}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + (node.id % 3),
              repeat: shouldReduceMotion ? 0 : Infinity,
              ease: "easeInOut",
              delay: node.delay
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
