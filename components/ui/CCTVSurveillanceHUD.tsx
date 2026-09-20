"use client";

import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

export function CCTVSurveillanceHUD() {
  const [isActive, setIsActive] = useState(false);
  const [timeString, setTimeString] = useState("");
  const [recordSeconds, setRecordSeconds] = useState(14);
  const [strobeActive, setStrobeActive] = useState(true);

  // Live CCTV timestamp
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toISOString().replace("T", " ").substring(0, 19) + " UTC"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Record timer
  useEffect(() => {
    if (!isActive) return;
    const timer = setInterval(() => {
      setRecordSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isActive]);

  const formatRecTime = (sec: number) => {
    const hrs = Math.floor(sec / 3600).toString().padStart(2, "0");
    const mins = Math.floor((sec % 3600) / 60).toString().padStart(2, "0");
    const secs = (sec % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <>
      {/* Floating Concept Trigger Bar (Bottom Right HUD) */}
      <div className="fixed bottom-6 right-6 z-[9990] flex items-center gap-2">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`flex items-center gap-2 px-3.5 py-2.5 text-[11px] font-mono font-bold tracking-wider uppercase border backdrop-blur-md transition-all duration-300 shadow-2xl ${
            isActive
              ? "bg-[#FF5500] text-white border-[#FF5500] shadow-[0_0_25px_rgba(255,85,0,0.6)]"
              : "bg-black/80 text-white/80 border-white/20 hover:border-[#FF5500] hover:text-[#FF5500] hover:shadow-[0_0_15px_rgba(255,85,0,0.3)]"
          }`}
          title="CCTV / Polis Güvenlik Modunu Aç/Kapat"
        >
          {isActive ? (
            <>
              <EyeOff className="w-3.5 h-3.5 animate-pulse text-white" />
              <span>CCTV: AÇIK [CAM 04]</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5 text-[#FF5500]" />
              <span className="hidden sm:inline">GÜVENLİK / CCTV MODU</span>
              <span className="sm:hidden">CCTV</span>
            </>
          )}
        </button>
      </div>

      {/* CCTV & POLICE STROBE OVERLAY */}
      {isActive && (
        <div className="fixed inset-0 pointer-events-none z-[9980] overflow-hidden select-none">
          {/* Subtle Night Vision Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-40" />
          <div className="absolute inset-0 bg-[#00ff41]/[0.02] mix-blend-color-dodge" />

          {/* POLICE STROBE FLASHERS (Left: Blue, Right: Orange/Red) */}
          {strobeActive && (
            <>
              <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600/15 rounded-full blur-[100px] animate-[pulse_0.4s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF5500]/20 rounded-full blur-[100px] animate-[pulse_0.4s_cubic-bezier(0.4,0,0.6,1)_infinite_0.2s]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-red-600/10 rounded-full blur-[80px] animate-[pulse_0.6s_ease-in-out_infinite]" />
            </>
          )}

          {/* TOP CCTV BAR */}
          <div className="absolute top-16 left-4 right-4 sm:left-8 sm:right-8 flex justify-between items-start text-xs font-mono tracking-widest text-[#FF5500] drop-shadow-[0_0_8px_rgba(255,85,0,0.8)]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping inline-block" />
                <span className="font-bold text-red-500">● REC [{formatRecTime(recordSeconds)}]</span>
                <span className="text-white/60">// 4K 60FPS</span>
              </div>
              <div className="text-[10px] text-white/70">
                CAM 04: ISTANBUL HUB // HIGH STREET FEED
              </div>
            </div>

            <div className="text-right space-y-1">
              <div className="text-[10px] text-white/80">
                LAT: 41.0082° N // LON: 28.9784° E
              </div>
              <div className="text-[9px] text-[#FF5500] font-bold">
                ENCRYPTED AES-256 // PROTOCOL: DRILL
              </div>
            </div>
          </div>

          {/* CENTER CROSSHAIR & CAMERA BRACKETS */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40">
            <div className="w-24 h-24 border border-white/30 relative">
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#FF5500]" />
              <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[#FF5500]" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[#FF5500]" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#FF5500]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#FF5500] rounded-full" />
            </div>
          </div>

          {/* SCREEN CORNERS BRACKETS */}
          <div className="absolute top-12 left-4 w-8 h-8 border-t-2 border-l-2 border-white/40" />
          <div className="absolute top-12 right-4 w-8 h-8 border-t-2 border-r-2 border-white/40" />
          <div className="absolute bottom-12 left-4 w-8 h-8 border-b-2 border-l-2 border-white/40" />
          <div className="absolute bottom-12 right-4 w-8 h-8 border-b-2 border-r-2 border-white/40" />

          {/* BOTTOM CCTV STATUS */}
          <div className="absolute bottom-6 left-4 sm:left-8 flex items-center gap-4 text-[10px] font-mono text-white/60">
            <div>{timeString || "2026-09-20 13:58:00 UTC"}</div>
            <div className="hidden sm:inline text-emerald-400">● LIVE FEED ACTIVE</div>
          </div>
        </div>
      )}
    </>
  );
}
