"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles, Zap } from "lucide-react";

function GlitchText({ text, className }: { text: string; className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      {isGlitching && (
        <>
          <span
            className="absolute inset-0 text-[#e50914] z-20"
            style={{
              clipPath: "inset(20% 0 60% 0)",
              transform: "translate(-2px, 1px)",
            }}
            aria-hidden
          >
            {text}
          </span>
          <span
            className="absolute inset-0 text-cyan-500 z-20"
            style={{
              clipPath: "inset(60% 0 10% 0)",
              transform: "translate(2px, -1px)",
            }}
            aria-hidden
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, 80]);

  const scrollToNext = () => {
    const nextSection = document.getElementById("section-manifesto");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[600px] max-h-[1000px] flex items-center justify-center overflow-hidden bg-background select-none"
    >
      {/* Background Video with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: imageScale }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero_campaign.jpg"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Cinematic Vignette & Gradients for Light Theme */}
        <div className="absolute inset-0 bg-background/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
      </motion.div>

      {/* Floating Accent Orb */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full blur-[80px] pointer-events-none z-[1]"
        style={{ background: "radial-gradient(circle, rgba(229,9,20,0.15) 0%, transparent 70%)" }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating System Coordinates */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute top-28 left-6 md:left-12 z-10 hidden sm:block text-[10px] font-mono text-neutral-600 space-y-1"
      >
        <p className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e50914] animate-pulse-red" />
          GEO // 41.0082° N, 28.9784° E
        </p>
        <p className="text-neutral-500">LONDON ↔ ISTANBUL AXIS</p>
        <p className="text-neutral-700 mt-2">SYS.STATUS: ONLINE</p>
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute top-28 right-6 md:right-12 z-10 hidden sm:block text-[10px] font-mono text-neutral-600 text-right space-y-1"
      >
        <p className="text-foreground font-bold flex items-center justify-end gap-1.5">
          <Zap className="w-3 h-3 text-[#e50914]" />
          LIMITED DROP 01 // LIVE
        </p>
        <p className="text-neutral-500">HEAVYWEIGHT FRENCH TERRY 480 GSM</p>
        <p className="text-neutral-700 mt-2">100 PCS WORLDWIDE</p>
      </motion.div>

      {/* Hero Center Editorial Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center"
      >
        {/* Brand Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 glass text-[8px] sm:text-[10px] md:text-xs font-mono tracking-[0.25em] text-[#e50914] uppercase mb-4 sm:mb-6"
        >
          <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#e50914]" />
          ORIGINAL HIGH-FASHION DRILL DRIP
        </motion.div>

        {/* Massive Headline with Glitch */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-[-0.06em] uppercase text-foreground font-sans leading-none drop-shadow-md"
        >
          <GlitchText text="UTOPIA" /> <span className="text-[#e50914]">LDN</span>
        </motion.h1>

        {/* Subheadline Manifesto */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-4 sm:mt-6 text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-[0.2em] sm:tracking-[0.35em] text-neutral-700 max-w-2xl leading-relaxed px-2 font-semibold"
        >
          NOT DESIGNED TO BLEND IN. BUILT FOR THE SHADOWS.
        </motion.p>

        {/* Dual Call-to-Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <Link
            href="/shop"
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-foreground text-background text-[10px] sm:text-xs font-extrabold tracking-widest uppercase hover:bg-neutral-800 transition-all transform hover:-translate-y-0.5 shadow-xl hover:shadow-2xl group flex items-center justify-center gap-2"
          >
            KOLEKSİYONU İNCELE
            <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link
            href="/collections/drop-01-after-dark"
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 glass text-foreground text-[10px] sm:text-xs font-bold tracking-widest uppercase hover:bg-white transition-all transform hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2 border-neutral-300/50"
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#e50914] animate-pulse-red" />
            DROP 01 // AFTER DARK
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={scrollToNext}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-neutral-600 hover:text-foreground transition-colors"
      >
        <span>ARŞİVE GİRİŞ YAP</span>
        <ArrowDown className="w-3.5 h-3.5" />
      </motion.button>

      {/* Bottom Gradient Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-[2]" />
    </section>
  );
}
