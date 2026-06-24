"use client";

import { motion } from "framer-motion";
import { Phone, Instagram } from "lucide-react";

const FloatingButton = ({
  icon: Icon,
  href,
  label,
  color,
  delay = 0,
}: {
  icon: React.ElementType;
  href: string;
  label: string;
  color: string;
  delay?: number;
}) => {
  return (
    <motion.a
      href={href}
      target={href.startsWith("tel:") ? "_self" : "_blank"}
      rel={href.startsWith("tel:") ? "" : "noreferrer"}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, type: "spring" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex items-center gap-3"
    >
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-xl border border-white/10 bg-black/80 px-4 py-2 text-sm font-medium text-white backdrop-blur-md md:block"
      >
        {label}
      </motion.div>

      {/* Button Container */}
      <div className="relative">
        {/* Glow Effect */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute inset-0 rounded-full ${color} blur-md`}
        />

        {/* Main Button */}
        <motion.div
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)",
          }}
          className={`relative flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white shadow-lg backdrop-blur-xl transition-all duration-300 md:h-16 md:w-16`}
        >
          <Icon size={24} className={href.startsWith("https://wa.me") ? "text-[#25D366]" : ""} />
        </motion.div>
      </div>
    </motion.a>
  );
};

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
      <FloatingButton
        icon={Phone}
        href="tel:+918017007352"
        label="Call Now"
        color="bg-purple/40"
        delay={0.1}
      />
      <FloatingButton
        icon={Instagram}
        href="https://www.instagram.com/thevirtualvalley/"
        label="Follow us on Instagram"
        color="bg-gradient-to-br from-purple/40 via-pink/40 to-orange/40"
        delay={0.2}
      />
      <FloatingButton
        icon={({ className }: { className?: string }) => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="24"
            height="24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
          >
            <path d="M19.11 17.35c-.28-.14-1.64-.81-1.89-.91-.25-.09-.43-.14-.61.14-.18.27-.7.91-.86 1.1-.16.18-.31.21-.59.07-.28-.14-1.17-.43-2.22-1.37-.82-.73-1.37-1.63-1.53-1.91-.16-.27-.02-.42.12-.55.13-.13.28-.32.41-.48.14-.16.18-.27.27-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.96.93-.96 2.27s.98 2.64 1.11 2.82c.14.18 1.93 2.95 4.67 4.13.65.28 1.16.45 1.56.58.66.21 1.26.18 1.73.11.53-.08 1.64-.67 1.87-1.31.23-.64.23-1.19.16-1.31-.07-.11-.25-.18-.52-.32Z" />
            <path d="M16.02 3.2c-6.99 0-12.66 5.66-12.66 12.64 0 2.23.58 4.41 1.68 6.33L3.2 28.8l6.8-1.78a12.63 12.63 0 0 0 6.02 1.53h.01c6.98 0 12.65-5.67 12.65-12.65 0-3.39-1.32-6.57-3.72-8.96A12.57 12.57 0 0 0 16.02 3.2Zm0 23.22h-.01a10.57 10.57 0 0 1-5.39-1.48l-.39-.23-4.03 1.05 1.08-3.93-.25-.4a10.48 10.48 0 0 1-1.62-5.58c0-5.82 4.74-10.56 10.57-10.56 2.82 0 5.47 1.1 7.46 3.09a10.47 10.47 0 0 1 3.1 7.47c0 5.83-4.74 10.57-10.52 10.57Z" />
          </svg>
        )}
        href="https://wa.me/918017007352"
        label="Chat on WhatsApp"
        color="bg-[#25D366]/40"
        delay={0.3}
      />
    </div>
  );
}
