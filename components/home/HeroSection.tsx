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
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden vibrant-mesh-bg select-none py-20 px-4 sm:px-8"
    >
      {/* Floating Accent Orb */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none z-[0]"
        style={{ background: "radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 70%)" }}
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none z-[0]"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)" }}
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -40, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cinematic Video Container */}
      <motion.div
        className="absolute inset-0 sm:inset-6 md:inset-10 z-0 rounded-3xl overflow-hidden border border-neutral-200/50 shadow-2xl"
        style={{ scale: imageScale }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero_campaign.jpg"
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Dark Vignette to make text readable inside the video */}
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
      </motion.div>

      {/* Floating System Coordinates */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute top-12 left-10 md:left-16 z-10 hidden sm:block text-[10px] font-mono text-white/80 space-y-1"
      >
        <p className="flex items-center gap-1.5 text-white font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse-cyan" />
          GEO // 41.0082° N, 28.9784° E
        </p>
        <p className="text-white/60">LONDON ↔ ISTANBUL AXIS</p>
        <p className="text-white/80 mt-2">SYS.STATUS: ONLINE</p>
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute top-12 right-10 md:right-16 z-10 hidden sm:block text-[10px] font-mono text-white/80 text-right space-y-1"
      >
        <p className="text-white font-bold flex items-center justify-end gap-1.5">
          <Zap className="w-3 h-3 text-[#00f0ff]" />
          LIMITED DROP 01 // LIVE
        </p>
        <p className="text-white/60">HEAVYWEIGHT FRENCH TERRY 480 GSM</p>
        <p className="text-white/80 mt-2">100 PCS WORLDWIDE</p>
      </motion.div>

      {/* Hero Center Editorial Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center mt-20"
      >
        {/* Brand Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 glass-dark text-[8px] sm:text-[10px] md:text-xs font-mono tracking-[0.25em] text-[#00f0ff] font-bold uppercase mb-4 sm:mb-6 rounded-full"
        >
          <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#00f0ff]" />
          ORIGINAL HIGH-FASHION DRILL DRIP
        </motion.div>

        {/* Massive Headline with Glitch */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.06em] uppercase text-white font-sans leading-none drop-shadow-2xl"
        >
          <GlitchText text="UTOPIA" /> <span className="text-[#00f0ff]">LDN</span>
        </motion.h1>

        {/* Subheadline Manifesto */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-4 sm:mt-6 text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-[0.2em] sm:tracking-[0.35em] text-white/90 max-w-2xl leading-relaxed px-2 font-semibold drop-shadow-md"
        >
          NOT DESIGNED TO BLEND IN. BUILT FOR THE SHADOWS.
        </motion.p>

        {/* Dual Call-to-Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <Link
            href="/shop"
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-white text-black text-[10px] sm:text-xs font-extrabold tracking-widest uppercase hover:bg-neutral-100 transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-2xl group flex items-center justify-center gap-2 rounded-none"
          >
            KOLEKSİYONU İNCELE
            <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link
            href="/collections/drop-01-after-dark"
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 glass text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase hover:bg-white/20 transition-all transform hover:-translate-y-1 shadow-md flex items-center justify-center gap-2 border-white/20"
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#00f0ff] animate-pulse-cyan" />
            DROP 01 // AFTER DARK
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={scrollToNext}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-white/70 hover:text-white transition-colors"
      >
        <span>ARŞİVE GİRİŞ YAP</span>
        <ArrowDown className="w-3.5 h-3.5" />
      </motion.button>
    </section>
  );
}
