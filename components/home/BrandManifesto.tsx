"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Compass, Layers } from "lucide-react";

export function BrandManifesto() {
  return (
    <section id="section-manifesto" className="py-24 md:py-36 bg-[#1c1c1c] border-t border-neutral-900 text-white relative overflow-hidden">
      {/* Background Subtle Coordinate Watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[140px] md:text-[220px] font-black font-sans text-neutral-950 select-none pointer-events-none tracking-tighter opacity-40">
        34/LDN
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF5500] mb-8">
          <span className="w-2 h-2 rounded-full bg-[#FF5500]" />
          SECTION 01 // BRAND PHILOSOPHY & MANIFESTO
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Huge Typography Manifesto */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.1] font-sans">
              BİZ SIRADAN BİR GİYİM MARKASI DEĞİLİZ. <br />
              <span className="text-neutral-500">
                SOKAKLARIN KARANLIĞINDA SESSİZCE HAREKET EDENLER İÇİN BİR ÜNİFORMAYIZ.
              </span>
            </h2>

            <div className="pt-4 border-l-2 border-[#FF5500] pl-6 space-y-3">
              <p className="text-sm md:text-base text-neutral-300 font-mono leading-relaxed uppercase">
                İstanbul'un ham gece enerjisi ile Londra'nın distopik drill kültürünün kesişiminde kuruldu.
                Her dikiş, her 480 GSM kumaş lifi ve her metal donanım tavizsiz bir standardın ürünüdür.
              </p>
              <p className="text-xs font-mono text-neutral-500 tracking-wider">
                NO MASS PRODUCTION // LIMITED DROPS ONLY // BUILT FOR THE STREETS
              </p>
            </div>
          </div>

          {/* 3 Core Pillars */}
          <div className="lg:col-span-4 space-y-6 lg:border-l lg:border-neutral-900 lg:pl-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase">
                <Layers className="w-4 h-4 text-[#FF5500]" />
                480 GSM HEAVYWEIGHT DOKUMA
              </div>
              <p className="text-xs text-neutral-400 font-mono leading-relaxed">
                Yıkandıkça formunu kaybetmeyen, rüzgara ve gece soğuğuna karşı zırh gibi duran özel dokunmuş Fransız havlu kumaşı.
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-neutral-900">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase">
                <ShieldAlert className="w-4 h-4 text-[#FF5500]" />
                SINIRLI VE NUMARALI ÜRETİM
              </div>
              <p className="text-xs text-neutral-400 font-mono leading-relaxed">
                Tükenen hiçbir parça yeniden üretilmez. Arşiv parçası haline gelir ve sahiplerine özel bir statü kazandırır.
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-neutral-900">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase">
                <Compass className="w-4 h-4 text-[#FF5500]" />
                KÜRESEL STANDART // YEREL RUH
              </div>
              <p className="text-xs text-neutral-400 font-mono leading-relaxed">
                Türkiye'nin dünya lideri tekstil zanaatını uluslararası high-fashion drill estetiğiyle harmanlıyoruz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
