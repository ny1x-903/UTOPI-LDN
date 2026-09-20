"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface KineticTypographyProps {
  text: string;
  baseVelocity?: number;
}

export function KineticTypography({ text, baseVelocity = 5 }: KineticTypographyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Moves text left or right based on scroll
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden whitespace-nowrap bg-[#e50914] py-4 sm:py-6 relative flex flex-col gap-2 border-y border-neutral-900"
    >
      <motion.div style={{ x: x1 }} className="flex whitespace-nowrap">
        {/* Repeat text multiple times to ensure it fills the screen */}
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="text-4xl sm:text-6xl md:text-8xl font-black uppercase text-black mx-4 tracking-tighter"
          >
            {text} //
          </span>
        ))}
      </motion.div>
      <motion.div style={{ x: x2 }} className="flex whitespace-nowrap">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="text-4xl sm:text-6xl md:text-8xl font-black uppercase text-black mx-4 tracking-tighter opacity-70"
            style={{ WebkitTextStroke: "2px black", color: "transparent" }}
          >
            {text} //
          </span>
        ))}
      </motion.div>
    </div>
  );
}
