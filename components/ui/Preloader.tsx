"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if preloader was already shown this session
    const hasSeen = sessionStorage.getItem("utopia_preloader_seen");
    if (hasSeen) {
      setLoading(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem("utopia_preloader_seen", "true");
          }, 400);
          return 100;
        }
        // Accelerating counter
        const step = Math.floor(Math.random() * 14) + 4;
        return Math.min(100, prev + step);
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[999999] flex flex-col justify-between bg-[#1c1c1c] p-8 md:p-14 text-white scanlines select-none"
        >
          {/* Top Bar */}
          <div className="flex justify-between items-center text-xs tracking-widest text-neutral-500 uppercase font-mono">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e50914] animate-ping" />
              SYSTEM BOOT // PROTOCOL 34
            </span>
            <span>IST / LDN // 2026</span>
          </div>

          {/* Center Brand Identity */}
          <div className="flex flex-col items-center justify-center my-auto text-center space-y-4">
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-7xl font-black tracking-tighter uppercase font-sans text-glow-white"
            >
              UTOPIA LDN
            </motion.h1>
            <p className="text-xs md:text-sm tracking-[0.4em] text-neutral-400 uppercase">
              NOT DESIGNED TO BLEND IN
            </p>
          </div>

          {/* Bottom Progress Bar */}
          <div className="w-full space-y-3">
            <div className="flex justify-between items-baseline text-xs font-mono text-neutral-400">
              <span className="tracking-widest">
                INITIALIZING DROP 01 ARCHIVE
              </span>
              <span className="text-xl font-bold font-mono text-white">
                {progress.toString().padStart(3, "0")}%
              </span>
            </div>
            <div className="w-full h-[2px] bg-neutral-900 overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-neutral-600 via-neutral-200 to-[#e50914]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
