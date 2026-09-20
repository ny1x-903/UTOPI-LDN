"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Timer, ArrowRight, ShieldCheck, Flame } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function LimitedDropTracker() {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("L");

  // Real-time Countdown timer calculating remaining time for Drop 01 Vault Close
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 11,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    // Drop end target date (72 hours from current baseline)
    const target = new Date();
    target.setHours(target.getHours() + 58);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const totalPieces = 100;
  const soldPieces = 87;
  const remainingPieces = totalPieces - soldPieces;
  const percentSold = Math.round((soldPieces / totalPieces) * 100);

  const handleQuickAdd = () => {
    addItem({
      productId: "drop01-shadow-hoodie",
      name: "UTOPIA Shadow Division Hoodie",
      slug: "utopia-shadow-division-hoodie",
      price: 3450,
      size: selectedSize,
      quantity: 1,
      image: "/images/products/shadow_hoodie_front.jpg",
      color: "Matte Black",
    });
  };

  return (
    <section className="py-24 bg-[#161616] border-t border-b border-neutral-900 text-white relative overflow-hidden">
      {/* Subtle Orange Glow Ambient Background */}
      <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-[#FF5500]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#FF5500]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-neutral-900">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF5500] mb-1">
              <Flame className="w-3.5 h-3.5 text-[#FF5500] animate-pulse" />
              SECTION 02 // ACTIVE DROP SPOTLIGHT
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-sans">
              DROP 01 — AFTER DARK
            </h2>
          </div>

          {/* Real Live Countdown */}
          <div className="flex items-center gap-2 bg-neutral-950 px-4 py-2 border border-neutral-800">
            <Timer className="w-4 h-4 text-[#FF5500]" />
            <span className="text-[11px] font-mono text-neutral-400 uppercase mr-2 hidden sm:inline">
              KASA KAPANMASINA:
            </span>
            <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-white">
              <span>{String(timeLeft.days).padStart(2, "0")}G</span>:
              <span>{String(timeLeft.hours).padStart(2, "0")}S</span>:
              <span>{String(timeLeft.minutes).padStart(2, "0")}D</span>:
              <span className="text-[#FF5500]">{String(timeLeft.seconds).padStart(2, "0")}SN</span>
            </div>
          </div>
        </div>

        {/* Drop Spotlight Showcase Card */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-950 border border-neutral-900 p-6 md:p-10">
          {/* Product Dual Angle Photos */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] bg-neutral-900 border border-neutral-800/80 overflow-hidden group">
              <Image
                src="/images/products/shadow_hoodie_front.jpg"
                alt="UTOPIA Shadow Division Hoodie Ön"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <span className="absolute bottom-2 left-2 text-[9px] font-mono text-neutral-400 bg-black/60 px-2 py-0.5">
                ÖN // EMBOSSED LOGO
              </span>
            </div>
            <div className="relative aspect-[3/4] bg-neutral-900 border border-neutral-800/80 overflow-hidden group">
              <Image
                src="/images/products/shadow_hoodie_back.jpg"
                alt="UTOPIA Shadow Division Hoodie Arka"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <span className="absolute bottom-2 left-2 text-[9px] font-mono text-[#FF5500] bg-black/60 px-2 py-0.5">
                ARKA // 34-LDN KOORDİNAT
              </span>
            </div>
          </div>

          {/* Product Info & Live Limited Stock Gauge */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider police-strobe px-2 py-0.5 font-bold">
                  KÜRESEL SINIRLI DROP
                </span>
                <span className="text-[10px] font-mono text-neutral-400">
                  SKU: UTP-SHADOW-01
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-sans">
                UTOPIA Shadow Division Hoodie
              </h3>
              <p className="text-xs font-mono text-neutral-400 uppercase mt-1">
                480 GSM HEAVYWEIGHT FRENCH TERRY // MATTE BLACK HARDWARE
              </p>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-white">
                  3.450 ₺
                </span>
                <span className="text-sm font-mono line-through text-neutral-600">
                  4.200 ₺
                </span>
                <span className="text-xs font-mono text-emerald-400">
                  -%18 DROP LANSMAN İNDİRİMİ
                </span>
              </div>
            </div>

            {/* Real Piece Counter Progress */}
            <div className="p-4 bg-neutral-900/60 border border-neutral-800/80 space-y-2">
              <div className="flex justify-between items-baseline text-xs font-mono">
                <span className="text-neutral-400">STOK DURUMU:</span>
                <span className="font-bold text-white">
                  <strong className="text-[#FF5500]">{soldPieces}</strong> / {totalPieces} SATILDI (%{percentSold})
                </span>
              </div>
              <div className="w-full h-2 bg-neutral-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-neutral-300 via-white to-[#FF5500] transition-all duration-500"
                  style={{ width: `${percentSold}%` }}
                />
              </div>
              <p className="text-[11px] font-mono text-neutral-400 flex items-center justify-between">
                <span>KALAN ADET: <strong className="text-white">{remainingPieces} PARÇA</strong></span>
                <span className="text-[#FF5500]">TÜKENMEK ÜZERE</span>
              </p>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-neutral-400 uppercase">
                BEDEN SEÇİMİ:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { size: "XS", disabled: true },
                  { size: "S", disabled: false },
                  { size: "M", disabled: false },
                  { size: "L", disabled: false },
                  { size: "XL", disabled: false },
                  { size: "XXL", disabled: true },
                ].map((item) => (
                  <button
                    key={item.size}
                    disabled={item.disabled}
                    onClick={() => setSelectedSize(item.size)}
                    className={`px-4 py-2.5 text-xs font-mono font-bold transition-all ${
                      item.disabled
                        ? "bg-neutral-900 text-neutral-600 border border-neutral-800 line-through cursor-not-allowed"
                        : selectedSize === item.size
                        ? "bg-white text-black border border-white"
                        : "bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-500"
                    }`}
                  >
                    {item.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleQuickAdd}
                className="flex-1 py-4 bg-white text-black text-xs font-extrabold uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
              >
                HIZLI SİPARİŞ VER ({selectedSize})
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/product/utopia-shadow-division-hoodie"
                className="px-6 py-4 border border-neutral-800 hover:border-neutral-500 text-white text-xs font-mono uppercase tracking-wider text-center transition-colors"
              >
                DETAYLI İNCELE
              </Link>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-mono text-neutral-500 pt-2 border-t border-neutral-900">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                NUMARALANDIRILMIŞ ARŞİV KUTUSU
              </span>
              <span>//</span>
              <span>24 SAATTE SEVKİYAT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
