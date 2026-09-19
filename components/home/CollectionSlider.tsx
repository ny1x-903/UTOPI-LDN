"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface CollectionItem {
  id: string;
  slug: string;
  title: string;
  dropNumber: string;
  manifesto: string;
  heroImage: string;
  status: string;
  count: string;
}

const COLLECTIONS: CollectionItem[] = [
  {
    id: "1",
    slug: "drop-01-after-dark",
    title: "DROP 01 — AFTER DARK",
    dropNumber: "01",
    manifesto: "Doğduğu sokakların karanlığından beslenen kural tanımaz silüetler. 480 GSM kumaşlar ve endüstriyel detaylar.",
    heroImage: "/images/hero_campaign.jpg",
    status: "CANLI // SATIŞTA",
    count: "4 PARÇA",
  },
  {
    id: "2",
    slug: "drop-02-no-signal",
    title: "DROP 02 — NO SIGNAL",
    dropNumber: "02",
    manifesto: "Sinyalin kesildiği, distopik metropol geceleri için tasarlandı. Yansıtıcı detaylar ve modüler donanım.",
    heroImage: "/images/products/shadow_hoodie_back.jpg",
    status: "YAKINDA // ERKEN ERİŞİM",
    count: "3 PARÇA",
  },
  {
    id: "3",
    slug: "drop-03-underground",
    title: "DROP 03 — UNDERGROUND",
    dropNumber: "03",
    manifesto: "İstanbul ve Londra metrosunun yer altı ham enerjisi. Ağır gramajlı süprem ve yıkanmış pamuk.",
    heroImage: "/images/products/district_cargo_front.jpg",
    status: "ÜRETİM AŞAMASINDA",
    count: "5 PARÇA",
  },
  {
    id: "4",
    slug: "drop-04-34",
    title: "DROP 04 — 34",
    dropNumber: "34",
    manifesto: "34 plakasının ham sokak ruhu. Asfalt yansımaları ve ödün vermeyen karanlık drill duruşu.",
    heroImage: "/images/hero_campaign.jpg",
    status: "ARŞİV HAZIRLANIYOR",
    count: "6 PARÇA",
  },
];

export function CollectionSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 bg-[#050505] text-white border-b border-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-neutral-900">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#e50914] mb-1">
              <span className="w-2 h-2 rounded-full bg-[#e50914]" />
              SECTION 04 // SEASONAL DROP SYSTEM
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-sans">
              KOLEKSİYONLAR & DROPLAR
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-3 border border-neutral-800 hover:border-white transition-colors"
              aria-label="Önceki drop"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 border border-neutral-800 hover:border-white transition-colors"
              aria-label="Sonraki drop"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Slider */}
        <div
          ref={scrollContainerRef}
          className="mt-10 flex gap-6 overflow-x-auto pb-6 scrollbar-none custom-scroll snap-x"
        >
          {COLLECTIONS.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              className="group relative min-w-[300px] sm:min-w-[380px] md:min-w-[440px] aspect-[4/5] bg-neutral-950 border border-neutral-900 hover:border-neutral-700 transition-all overflow-hidden flex flex-col justify-between p-6 snap-start"
            >
              {/* Image Background */}
              <Image
                src={col.heroImage}
                alt={col.title}
                fill
                className="object-cover opacity-45 group-hover:opacity-65 group-hover:scale-105 transition-all duration-700"
                sizes="440px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-transparent" />

              {/* Card Top Details */}
              <div className="relative z-10 flex justify-between items-start">
                <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 bg-black/70 border border-neutral-800 text-white backdrop-blur-md">
                  {col.status}
                </span>
                <span className="text-2xl font-black font-mono text-neutral-600 group-hover:text-[#e50914] transition-colors">
                  #{col.dropNumber}
                </span>
              </div>

              {/* Card Bottom Details */}
              <div className="relative z-10 space-y-3">
                <span className="text-[10px] font-mono text-[#e50914] tracking-widest block">
                  {col.count}
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white font-sans group-hover:text-neutral-200">
                  {col.title}
                </h3>
                <p className="text-xs font-mono text-neutral-400 line-clamp-2 leading-relaxed">
                  {col.manifesto}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-white uppercase group-hover:text-[#e50914] transition-colors">
                  DROPU KEŞFET
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
