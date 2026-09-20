"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Volume2, VolumeX, Sparkles, Zap } from "lucide-react";
import { useAudio } from "@/components/providers/AudioProvider";

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
  const { hasEntered, setHeroInView } = useAudio();
  const [soundActive, setSoundActive] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isInView = useInView(sectionRef, { amount: 0.1 });

  useEffect(() => {
    setHeroInView(isInView);
    // Pause video when out of view to save resources, but only if we have a ref
    if (videoRef.current) {
      if (isInView) {
        // İlk olarak sesi açık bir şekilde oynatmayı dener (Tarayıcı izin verirse)
        videoRef.current.muted = false;
        videoRef.current.play().then(() => {
          setSoundActive(true);
        }).catch((e) => {
          // Eğer tarayıcı sesi engellerse (Kullanıcı etkileşimi yok diye), videonun durmaması için sessize alıp oynat
          console.log("Tarayıcı otomatik sesi engelledi, sessiz oynatılıyor:", e);
          if (videoRef.current) {
             videoRef.current.muted = true;
             videoRef.current.play();
             setSoundActive(false);
          }
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView, setHeroInView]);

  const toggleSound = () => {
    setSoundActive(!soundActive);
    if (videoRef.current) {
      videoRef.current.muted = soundActive; // If it was active, mute it.
    }
  };

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
      className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#050505] select-none"
    >
      {/* Background Video with subtle scale parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: imageScale }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={!soundActive}
          playsInline
          poster="/images/hero_campaign.jpg"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Cinematic Vignette & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
      </motion.div>

      {/* Animated Noise Overlay */}
      <div className="absolute inset-0 z-[1] noise-bg opacity-40 pointer-events-none" />

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
        className="absolute top-28 left-6 md:left-12 z-10 hidden sm:block text-[10px] font-mono text-neutral-400 space-y-1"
      >
        <p className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e50914] animate-pulse-red" />
          GEO // 41.0082° N, 28.9784° E
        </p>
        <p className="text-neutral-500">LONDON ↔ ISTANBUL AXIS</p>
        <p className="text-neutral-600 mt-2">SYS.STATUS: ONLINE</p>
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute top-28 right-6 md:right-12 z-10 hidden sm:block text-[10px] font-mono text-neutral-400 text-right space-y-1"
      >
        <p className="text-white font-bold flex items-center justify-end gap-1.5">
          <Zap className="w-3 h-3 text-[#e50914]" />
          LIMITED DROP 01 // LIVE
        </p>
        <p className="text-neutral-500">HEAVYWEIGHT FRENCH TERRY 480 GSM</p>
        <p className="text-neutral-600 mt-2">100 PCS WORLDWIDE</p>
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
          className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-[-0.06em] uppercase text-white font-sans text-glow-white leading-none whitespace-nowrap"
        >
          <GlitchText text="UTOPIA" /> <span className="text-[#e50914]">LDN</span>
        </motion.h1>

        {/* Subheadline Manifesto */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-4 sm:mt-6 text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-[0.2em] sm:tracking-[0.35em] text-neutral-300 max-w-2xl leading-relaxed px-2"
        >
          NOT DESIGNED TO BLEND IN. BUILT FOR THE SHADOWS.
        </motion.p>

        {/* BIG PROMINENT SOUND TOGGLE / ENTER BUTTON */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          onClick={toggleSound}
          className={`mt-6 sm:mt-10 px-6 sm:px-10 py-3 sm:py-5 flex items-center justify-center gap-2 sm:gap-4 border-2 transition-all duration-500 font-black tracking-widest text-[10px] sm:text-sm uppercase backdrop-blur-sm w-full sm:w-auto
            ${soundActive 
              ? 'border-[#e50914] bg-[#e50914]/20 text-white shadow-[0_0_30px_rgba(229,9,20,0.5)]' 
              : 'border-white/30 bg-white/5 text-white hover:bg-white hover:text-black hover:border-white animate-pulse'
            }
          `}
        >
           {soundActive ? (
             <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
           ) : (
             <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
           )}
           <span className="truncate">{soundActive ? "ATMOSFER AKTİF - UTOPIA İÇİNDESİN" : "SESİ AÇ VE TARZA KATIL"}</span>
        </motion.button>

        {/* Dual Call-to-Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <Link
            href="/shop"
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-white text-black text-[10px] sm:text-xs font-extrabold tracking-widest uppercase hover:bg-neutral-200 transition-all transform hover:-translate-y-0.5 shadow-xl hover:shadow-2xl group flex items-center justify-center gap-2"
          >
            KOLEKSİYONU İNCELE
            <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link
            href="/collections/drop-01-after-dark"
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 glass text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all transform hover:-translate-y-0.5 animate-border-glow flex items-center justify-center gap-2"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-neutral-500 hover:text-white transition-colors"
      >
        <span>ARŞİVE GİRİŞ YAP</span>
        <ArrowDown className="w-3.5 h-3.5" />
      </motion.button>

      {/* Bottom Gradient Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-[2]" />
    </section>
  );
}
