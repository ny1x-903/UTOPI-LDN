"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AudioContextType {
  hasEntered: boolean;
  enterSite: () => void;
  setHeroInView: (inView: boolean) => void;
}

const AudioContext = createContext<AudioContextType>({
  hasEntered: false,
  enterSite: () => {},
  setHeroInView: () => {},
});

export const useAudio = () => useContext(AudioContext);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [hasEntered, setHasEntered] = useState(true);
  const [heroInView, setHeroInView] = useState(true);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create the background music element
    const audio = new Audio("/videos/drill-beat-placeholder.mp3");
    audio.loop = true;
    audio.volume = 0; // start muted
    bgMusicRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (!bgMusicRef.current || !hasEntered) return;

    if (heroInView) {
      // Fade out background music when hero is in view
      const fadeOut = setInterval(() => {
        if (bgMusicRef.current) {
          if (bgMusicRef.current.volume > 0.1) {
            bgMusicRef.current.volume -= 0.1;
          } else {
            bgMusicRef.current.volume = 0;
            bgMusicRef.current.pause();
            clearInterval(fadeOut);
          }
        }
      }, 100);
      return () => clearInterval(fadeOut);
    } else {
      // Fade in background music when hero is out of view
      bgMusicRef.current.play().catch(e => console.log("Audio play prevented by browser autoplay policy:", e));
      const fadeIn = setInterval(() => {
        if (bgMusicRef.current) {
          if (bgMusicRef.current.volume < 0.4) {
            bgMusicRef.current.volume = Math.min(0.4, bgMusicRef.current.volume + 0.05);
          } else {
            clearInterval(fadeIn);
          }
        }
      }, 100);
      return () => clearInterval(fadeIn);
    }
  }, [heroInView, hasEntered]);

  const enterSite = () => {
    setHasEntered(true);
  };

  return (
    <AudioContext.Provider value={{ hasEntered, enterSite, setHeroInView }}>
      {children}
    </AudioContext.Provider>
  );
}
