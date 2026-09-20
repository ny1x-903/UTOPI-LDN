"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const announcements = [
    "🔥 DROP 01 — AFTER DARK ŞU ANDA CANLI // SINIRLI STOK",
    "✦ DÜNYA GENELİ ÜCRETSİZ KARGO // 2.000₺ ÜZERİ SİPARİŞLER",
    "⚡ UTOPIA LDN // BUILT FOR THE SHADOWS",
    "🏴 NUMARALANDIRILMIŞ ARŞİV KUTULARI // 100 ADET LİMİTLİ ÜRETİM",
    "✦ 480 GSM HEAVYWEIGHT FRENCH TERRY // TAVİZSİZ KALİTE",
  ];

  // Duplicate for seamless loop
  const tickerText = [...announcements, ...announcements]
    .map((a) => a)
    .join("     ★     ");

  return (
    <div className="relative bg-[#e50914] text-white overflow-hidden z-[9995] select-none">
      <div className="flex items-center h-9">
        {/* Scrolling Ticker */}
        <div className="flex-1 overflow-hidden relative">
          <div className="animate-marquee-fast whitespace-nowrap flex items-center h-full">
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase px-4">
              {tickerText}
            </span>
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase px-4">
              {tickerText}
            </span>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 px-3 h-full flex items-center justify-center hover:bg-black/20 transition-colors"
          aria-label="Duyuru çubuğunu kapat"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
