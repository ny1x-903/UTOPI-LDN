"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause, Radio } from "lucide-react";

export function DrillRadio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Generate authentic drill 808 sub-pulse using Web Audio API (Zero bytes asset!)
  const togglePlay = () => {
    if (isPlaying) {
      // Stop
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setIsPlaying(false);
      return;
    }

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const playDrumHit = () => {
        if (!ctx || ctx.state === "closed") return;
        const now = ctx.currentTime;

        // 808 Sub-Bass Kick
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(38, now + 0.15);

        gain.gain.setValueAtTime(isMuted ? 0 : 0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.45);

        // Subtle Hi-hat click
        const bufferSize = ctx.sampleRate * 0.04;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.value = 8000;

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(isMuted ? 0 : 0.03, now + 0.2);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        whiteNoise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        whiteNoise.start(now + 0.2);
      };

      playDrumHit();
      // Loop at 140 BPM drill tempo (quarter note every ~428ms)
      intervalRef.current = setInterval(playDrumHit, 856);
      setIsPlaying(true);
    } catch {
      // Browser blocked autoplay before gesture
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  return (
    <div className="fixed top-20 right-4 sm:right-8 z-[990] flex items-center gap-2">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-black/80 border border-white/20 backdrop-blur-md text-xs font-mono rounded-none shadow-xl">
        <Radio className={`w-3.5 h-3.5 ${isPlaying ? "text-[#FF5500] animate-pulse" : "text-neutral-500"}`} />
        <span className="text-[10px] text-white/90 font-bold hidden sm:inline">
          UTOPIA 104.2 FM
        </span>

        {/* Equalizer Visualizer Bars */}
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-3 px-1">
            <span className="w-0.5 bg-[#FF5500] h-full animate-[pulse_0.4s_ease-in-out_infinite]" />
            <span className="w-0.5 bg-[#FF5500] h-2/3 animate-[pulse_0.6s_ease-in-out_infinite_0.1s]" />
            <span className="w-0.5 bg-[#FF5500] h-full animate-[pulse_0.3s_ease-in-out_infinite_0.2s]" />
            <span className="w-0.5 bg-[#FF5500] h-1/2 animate-[pulse_0.5s_ease-in-out_infinite]" />
          </div>
        )}

        <button
          onClick={togglePlay}
          className="p-1 hover:text-[#FF5500] text-white transition-colors"
          title={isPlaying ? "Durdur" : "Yeraltı 808 Radyosunu Başlat"}
        >
          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
        </button>

        {isPlaying && (
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1 text-neutral-400 hover:text-white transition-colors"
            title={isMuted ? "Sesi Aç" : "Sessize Al"}
          >
            {isMuted ? <VolumeX className="w-3 h-3 text-red-500" /> : <Volume2 className="w-3 h-3" />}
          </button>
        )}
      </div>
    </div>
  );
}
