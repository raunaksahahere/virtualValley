"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type LoaderProps = {
  onComplete: () => void;
};

export default function Loader({ onComplete }: LoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [hasVideoError, setHasVideoError] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setIsVisible(false), 1500);
    const completeTimer = window.setTimeout(onComplete, 2000);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {hasVideoError ? (
            <div className="flex h-28 w-28 items-center justify-center rounded-full border border-gold/30 bg-white/5 font-display text-xl font-bold tracking-[0.35em] text-white shadow-glow-gold">
              VV
            </div>
          ) : (
            <video
              autoPlay
              muted
              playsInline
              preload="auto"
              onError={() => setHasVideoError(true)}
              className="object-contain"
              style={{
                maxWidth: "44.8vw",
                maxHeight: "44.8vh",
                mixBlendMode: "screen",
              }}
            >
              <source src="/logovid.webm" type="video/webm" />
            </video>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
