"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause, Disc3 } from "lucide-react";

export function DrillAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Using a royalty-free placeholder drill/hip-hop beat if available, 
  // or a placeholder audio file for demonstration.
  const AUDIO_SRC = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_47fa7a26f0.mp3?filename=trap-beat-104996.mp3";

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    const attemptAutoplay = async () => {
      if (!hasStarted && audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setHasStarted(true);
        } catch (error) {
          // Autoplay blocked by browser. Will wait for user interaction.
        }
      }
    };

    // Attempt immediately (might work if user interacted with domain before)
    attemptAutoplay();

    // The trick: Start on any interaction
    const handleInteraction = () => {
      if (!hasStarted) {
        attemptAutoplay();
      }
    };

    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("scroll", handleInteraction, { once: true });
    document.addEventListener("keydown", handleInteraction, { once: true });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("scroll", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
    };
  }, [hasStarted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
    setHasStarted(true);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Sesi açma butonunu daha üstte belirgin yere alma talebi: (from "sesi açma butonunu daha üstte daha belirgin yere al")
  return (
    <div className="fixed top-24 right-4 sm:right-8 z-[100] flex items-center gap-3 bg-[#050505]/90 backdrop-blur-xl border border-neutral-800 p-2 sm:p-3 shadow-2xl transition-all hover:border-[#e50914]/80 group">
      {/* Spinning vinyl/disk icon */}
      <div className={`relative hidden sm:flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-full border border-neutral-700 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }}>
        <Disc3 className="w-4 h-4 sm:w-5 sm:h-5 text-[#e50914]" />
      </div>

      <div className="flex flex-col mr-2 sm:mr-4">
        <span className="text-[8px] sm:text-[9px] font-mono text-[#e50914] uppercase tracking-widest font-bold animate-pulse">
          MODE VE TARZA KATIL
        </span>
        <span className="text-[10px] sm:text-xs font-mono text-white truncate max-w-[100px] sm:max-w-[140px]">
          UTOPIA LDN RADIO
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 border-l border-neutral-800 pl-3 sm:pl-4">
        <button
          onClick={togglePlay}
          className="text-neutral-400 hover:text-white transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>
        <button
          onClick={toggleMute}
          className="text-[#e50914] hover:text-white transition-colors"
          title="Sesi Aç/Kapat"
        >
          {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>
      </div>
    </div>
  );
}
