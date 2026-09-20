"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Volume2, VolumeX, Play } from "lucide-react";

export function VideoShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.5, 0.8]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden bg-[#1c1c1c] border-b border-neutral-900"
    >
      {/* Video Background — using a dark gradient placeholder since we don't have a real video */}
      <div className="absolute inset-0">
        {/* Animated gradient background simulating video atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#050505]">
          {/* Animated noise layer */}
          <div className="absolute inset-0 noise-bg opacity-60" />
          
          {/* Static gradient orbs for cinematic feel (Animations removed to fix lag) */}
          <div
            className="absolute w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full blur-[80px] sm:blur-[120px] opacity-20 -top-[10%] -left-[20%]"
            style={{ background: "radial-gradient(circle, #FF5500 0%, transparent 70%)" }}
          />
          <div
            className="absolute right-[-20%] bottom-[-20%] w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] rounded-full blur-[60px] sm:blur-[100px] opacity-15"
            style={{ background: "radial-gradient(circle, #FF5500 0%, transparent 70%)" }}
          />
        </div>

        {/* Dark Overlay */}
        <motion.div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />

        {/* Scanline Effect */}
        <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
      </div>

      {/* Parallax Text Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.div style={{ y: textY }}>
          {/* Section Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-black/50 backdrop-blur-md border border-neutral-800 text-[10px] font-mono tracking-[0.25em] text-[#FF5500] uppercase mb-6"
          >
            <Play className="w-3 h-3 fill-current" />
            CİNEMATİK DENEYİM // SS26 CAMPAIGN
          </motion.div>

          {/* Large Headline */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-[-0.06em] text-white font-sans leading-none"
          >
            <span className="block">NOT DESIGNED</span>
            <span className="block text-neutral-500">TO BLEND IN.</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-neutral-400 max-w-2xl mx-auto"
          >
            İstanbul&apos;un karanlık sokaklarından Londra&apos;nın beton
            ormanlarına — bir kıyafetten fazlası, bir manifesto.
          </motion.p>

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-10"
          >
            {[
              { label: "GSM AĞIRLIK", value: "480" },
              { label: "LİMİTLİ PARÇA", value: "100" },
              { label: "ÜLKE SEVKİYAT", value: "34+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="block text-2xl sm:text-3xl font-black font-mono text-white">
                  {stat.value}
                </span>
                <span className="block text-[10px] font-mono text-neutral-500 tracking-widest uppercase mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Sound Toggle */}
      <div className="absolute bottom-6 right-6 z-20">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="flex items-center gap-2 px-3 py-1.5 glass text-[10px] font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-[#FF5500]" />
          )}
          <span className="hidden sm:inline">{isMuted ? "SES KAPALI" : "ATMOSFER AKTIF"}</span>
        </button>
      </div>

      {/* Bottom Gradient Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </section>
  );
}
