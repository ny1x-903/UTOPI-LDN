"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ZoomIn, Check, Info } from "lucide-react";

interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  specs: string;
  description: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "1",
    x: 52,
    y: 48,
    title: "ENGRAVED MATTE HARDWARE",
    specs: "ZAMAK 5 // ANODIZED MATTE BLACK",
    description: "Özel kalıpta dökülmüş, lazer gravürlü UTOPIA LDN bağcık uçları ve paslanmaz korozyon direnci.",
  },
  {
    id: "2",
    x: 62,
    y: 62,
    title: "CRIMSON BAR-TACK STITCH",
    specs: "REINFORCED GÜÇLENDİRME DİKİŞİ",
    description: "Gerilme noktalarında kırmızı naylon iplikle atılan askeri sınıf kilit dikiş.",
  },
  {
    id: "3",
    x: 35,
    y: 75,
    title: "480 GSM FRENCH TERRY",
    specs: "%100 ORGANİK EGE PAMUĞU",
    description: "Ağır gramajlı, nefes alabilen ve tüylenmeye karşı enzim yıkamalı özel havlu kumaş dokuması.",
  },
];

export function ProductCloseUpViewer() {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(HOTSPOTS[0]);

  return (
    <section className="py-24 bg-[#161616] text-white border-b border-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF5500] mb-2">
          <ZoomIn className="w-3.5 h-3.5 text-[#FF5500]" />
          SECTION 05 // PRODUCT CLOSE-UP & MATERIAL ARCHITECTURE
        </div>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-sans mb-12">
          ZANAAT VE DONANIM DETAYLARI
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-950 border border-neutral-900 p-6 md:p-10">
          {/* Visual Image with Interactive Hotspots */}
          <div className="lg:col-span-7 relative aspect-square bg-neutral-900 border border-neutral-800 overflow-hidden">
            <Image
              src="/images/products/shadow_hoodie_detail.jpg"
              alt="UTOPIA LDN Kumaş ve Donanım Yakın Çekimi"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />

            {/* Hotspot Pins */}
            {HOTSPOTS.map((spot) => {
              const isSelected = activeHotspot.id === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => setActiveHotspot(spot)}
                  style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-[#FF5500] scale-125 shadow-[0_0_20px_#FF5500]"
                      : "bg-black/70 border border-white/40 hover:bg-black hover:border-white"
                  }`}
                  aria-label={spot.title}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                  <span className="absolute w-2 h-2 rounded-full bg-white" />
                </button>
              );
            })}

            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-neutral-800 text-[10px] font-mono text-neutral-400">
              İNTERAKTİF NOKTALARA DOKUNARAK MATERYALİ İNCELEYİN
            </div>
          </div>

          {/* Inspector Data Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#FF5500]">
                <Info className="w-3.5 h-3.5" />
                SEÇİLİ BİLEŞEN
              </div>

              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-sans">
                {activeHotspot.title}
              </h3>

              <div className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 inline-block">
                {activeHotspot.specs}
              </div>

              <p className="text-sm text-neutral-300 font-mono leading-relaxed uppercase">
                {activeHotspot.description}
              </p>
            </div>

            {/* Technical Spec List */}
            <div className="pt-6 border-t border-neutral-900 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-neutral-400">
                <span>GRAMAJ (GSM):</span>
                <span className="text-white font-bold">480 G/M² DENSE WEIGHT</span>
              </div>
              <div className="flex items-center justify-between text-neutral-400">
                <span>BOYAMA METODU:</span>
                <span className="text-white font-bold">REAKTİF SİYAH // SOLMA DİRENCİ</span>
              </div>
              <div className="flex items-center justify-between text-neutral-400">
                <span>MENŞEİ:</span>
                <span className="text-white font-bold">İSTANBUL, TR // UTOPIA LAB</span>
              </div>
            </div>

            <div className="p-4 bg-neutral-900/40 border border-neutral-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-[11px] font-mono text-neutral-400">
                Her bir garment bağımsız kalite kontrolünden geçer ve özel seri numarası mühürlenir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
