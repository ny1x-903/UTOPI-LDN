"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Volume2, VolumeX, Sparkles } from "lucide-react";

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (e.clientX / innerWidth - 0.5) * 20,
        y: (e.clientY / innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById("section-manifesto");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#050505] select-none">
      {/* Background Image with Parallax & Dark Grading */}
      <motion.div
        className="absolute inset-0 z-0 scale-105"
        animate={{
          x: mousePosition.x * -0.5,
          y: mousePosition.y * -0.5,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      >
        <Image
          src="/images/hero_campaign.jpg"
          alt="UTOPIA LDN Underground Streetwear Campaign"
          fill
          priority
          className="object-cover object-center opacity-85"
          sizes="100vw"
        />
        {/* Cinematic Vignette & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
      </motion.div>

      {/* Floating System Coordinates */}
      <div className="absolute top-24 left-6 md:left-12 z-10 hidden sm:block text-[10px] font-mono text-neutral-400 space-y-1">
        <p className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e50914] animate-ping" />
          GEO // 41.0082° N, 28.9784° E
        </p>
        <p className="text-neutral-500">LONDON ↔ ISTANBUL AXIS</p>
      </div>

      <div className="absolute top-24 right-6 md:right-12 z-10 hidden sm:block text-[10px] font-mono text-neutral-400 text-right space-y-1">
        <p className="text-white font-bold">LIMITED DROP 01 // LIVE</p>
        <p className="text-neutral-500">HEAVYWEIGHT FRENCH TERRY 480 GSM</p>
      </div>

      {/* Ambient Sound Toggle Button */}
      <div className="absolute bottom-10 right-6 md:right-12 z-20">
        <button
          onClick={() => setSoundActive(!soundActive)}
          className="flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md border border-neutral-800 text-[10px] font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
        >
          {soundActive ? <Volume2 className="w-3.5 h-3.5 text-[#e50914]" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{soundActive ? "ATMOSPHERE ON" : "AUDIO MUTED"}</span>
        </button>
      </div>

      {/* Hero Center Editorial Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Brand Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md border border-neutral-800 text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#e50914] uppercase mb-6"
        >
          <Sparkles className="w-3 h-3 text-[#e50914]" />
          ORIGINAL HIGH-FASHION DRILL DRIP
        </motion.div>

        {/* Massive Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-9xl font-black tracking-[-0.06em] uppercase text-white font-sans text-glow-white leading-none"
        >
          UTOPIA LDN
        </motion.h1>

        {/* Subheadline Manifesto */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 text-xs sm:text-sm md:text-base font-mono uppercase tracking-[0.35em] text-neutral-300 max-w-2xl leading-relaxed"
        >
          NOT DESIGNED TO BLEND IN. BUILT FOR THE SHADOWS.
        </motion.p>

        {/* Dual Call-to-Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/shop"
            className="w-full sm:w-auto px-8 py-4 bg-white text-black text-xs font-extrabold tracking-widest uppercase hover:bg-neutral-200 transition-all transform hover:-translate-y-0.5 rounded-none shadow-xl"
          >
            KOLEKSİYONU İNCELE
          </Link>
          <Link
            href="/collections/drop-01-after-dark"
            className="w-full sm:w-auto px-8 py-4 bg-black/60 backdrop-blur-md border border-neutral-700 text-white text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all transform hover:-translate-y-0.5 rounded-none"
          >
            DROP 01 // AFTER DARK
          </Link>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={scrollToNext}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-neutral-500 hover:text-white transition-colors"
      >
        <span>ARŞİVE GİRİŞ YAP</span>
        <ArrowDown className="w-3.5 h-3.5" />
      </motion.button>
    </section>
  );
}
