"use client";

import React, { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  life: number;
  maxLife: number;
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const colors = [
      "rgba(255, 255, 255, 1)", // White
      "rgba(51, 78, 172, 1)", // Green
      "rgba(51, 78, 172, 1)", // Lime
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      // Adjust particle count based on screen size for performance
      const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 18000);

      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle(true));
      }
    };

    const createParticle = (randomizeLife = false): Particle => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5, // 0.5 to 3px
        speedX: (Math.random() - 0.5) * 0.2, // Very slow horizontal drift
        speedY: -Math.random() * 0.3 - 0.1, // Very slow upward drift
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.1, // Base opacity 0.1 to 0.6
        life: randomizeLife ? Math.random() * 100 : 0,
        maxLife: Math.random() * 200 + 100, // Frame count life
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Gentle opacity fade in and out
        let currentOpacity = p.opacity;
        const halfLife = p.maxLife / 2;
        if (p.life < halfLife) {
            currentOpacity = (p.life / halfLife) * p.opacity;
        } else {
            currentOpacity = (1 - ((p.life - halfLife) / halfLife)) * p.opacity;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Replace alpha in the rgba string with dynamic opacity
        ctx.fillStyle = p.color.replace("1)", `${currentOpacity})`);
        ctx.fill();

        // Move
        p.x += p.speedX;
        p.y += p.speedY;
        p.life += 1;

        // Reset if dead or off-screen
        if (p.life >= p.maxLife || p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          particles[i] = createParticle();
          particles[i].y = canvas.height + 10; // Respawn at bottom
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{ opacity: 0.8 }}
    />
  );
}
