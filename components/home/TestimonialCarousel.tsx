"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  text: string;
  product: string;
  verified: boolean;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Kaan Y.",
    city: "İstanbul",
    rating: 5,
    text: "Hayatımda giydiğim en kaliteli hoodie. 480 GSM kumaş gerçekten zırh gibi. Soğukta bile ter attırmıyor. Kumaşı efsane kalın ve sağlam.",
    product: "Shadow Division Hoodie",
    verified: true,
    initials: "KY",
  },
  {
    id: "2",
    name: "Elif T.",
    city: "Ankara",
    rating: 5,
    text: "Kutusu bile sanata eseriydi. Numaralı sertifikası, custom tissue paper, her şey düşünülmüş. Marka deneyimi başka bir seviye.",
    product: "Night Protocol T-Shirt",
    verified: true,
    initials: "ET",
  },
  {
    id: "3",
    name: "Mert K.",
    city: "İzmir",
    rating: 5,
    text: "Cargo pantolon mükemmel. Cep sistemi hem fonksiyonel hem de estetik olarak çok iyi düşünülmüş. Oversized fit tam istediğim gibi.",
    product: "District 34 Tactical Cargo",
    verified: true,
    initials: "MK",
  },
  {
    id: "4",
    name: "Selin A.",
    city: "Bursa",
    rating: 5,
    text: "Erkek arkadaşıma aldım, kendime de aynısından sipariş ettim. Unisex fit harika duruyor. Kalite/fiyat oranı piyasadaki en iyisi.",
    product: "Shadow Division Hoodie",
    verified: true,
    initials: "SA",
  },
  {
    id: "5",
    name: "Emre D.",
    city: "London",
    rating: 5,
    text: "UK'de yüzlerce streetwear markası denedim. UTOPIA LDN kalitesi hepsini geçti. Metal hardware detayları ve kumaş kalitesi inanılmaz.",
    product: "Utopia Tactical Vest",
    verified: true,
    initials: "ED",
  },
  {
    id: "6",
    name: "Zeynep B.",
    city: "Antalya",
    rating: 5,
    text: "Kargo aynı gün çıktı, ertesi gün elime ulaştı. Ürün fotoğraftan çok daha kaliteli çıktı. Kesinlikle tekrar alışveriş yapacağım.",
    product: "Night Protocol T-Shirt",
    verified: true,
    initials: "ZB",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < rating ? "text-[#e50914] fill-[#e50914]" : "text-neutral-700"
          }`}
        />
      ))}
    </div>
  );
}

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );
  }, []);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const current = TESTIMONIALS[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section className="py-24 bg-[#080808] text-white border-b border-neutral-900 relative overflow-hidden">
      {/* Background Quote Mark */}
      <div className="absolute right-8 top-12 text-[200px] md:text-[300px] font-serif text-neutral-950 select-none pointer-events-none leading-none opacity-40">
        &ldquo;
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-900">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#e50914] mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#e50914]" />
              DOĞRULANMIŞ YORUMLAR // SOSYAL KANIT
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-sans">
              TOPLULUK NE DİYOR?
            </h2>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <span className="block text-2xl font-black font-mono text-white">4.9</span>
              <StarRating rating={5} />
              <span className="block text-[10px] font-mono text-neutral-500 mt-1">
                ORTALAMA PUAN
              </span>
            </div>
            <div className="w-px h-12 bg-neutral-800" />
            <div className="text-center">
              <span className="block text-2xl font-black font-mono text-white">500+</span>
              <span className="block text-[10px] font-mono text-neutral-500 mt-1">
                MUTLU MÜŞTERİ
              </span>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="mt-12 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[280px]">
            {/* Main Testimonial Card */}
            <div className="lg:col-span-8 relative overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="glass-card p-8 md:p-10"
                >
                  <Quote className="w-8 h-8 text-[#e50914] opacity-40 mb-4" />
                  
                  <p className="text-base md:text-lg text-neutral-200 leading-relaxed font-sans mb-6">
                    &ldquo;{current.text}&rdquo;
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 bg-gradient-to-br from-[#e50914] to-[#991b1b] flex items-center justify-center text-xs font-bold font-mono text-white">
                        {current.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">
                            {current.name}
                          </span>
                          {current.verified && (
                            <span className="text-[9px] font-mono px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              ✓ DOĞRULANDI
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-neutral-500">
                          {current.city} // {current.product}
                        </span>
                      </div>
                    </div>
                    <StarRating rating={current.rating} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Side Navigation + Preview */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {/* Navigation */}
              <div className="flex items-center justify-between lg:justify-start gap-3">
                <button
                  onClick={prev}
                  className="p-3 border border-neutral-800 hover:border-white transition-colors"
                  aria-label="Önceki yorum"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm font-mono text-neutral-400">
                  <strong className="text-white">{currentIndex + 1}</strong> / {TESTIMONIALS.length}
                </span>
                <button
                  onClick={next}
                  className="p-3 border border-neutral-800 hover:border-white transition-colors"
                  aria-label="Sonraki yorum"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Mini Preview Cards */}
              <div className="hidden lg:flex flex-col gap-2">
                {TESTIMONIALS.slice(0, 4).map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setDirection(i > currentIndex ? 1 : -1);
                      setCurrentIndex(i);
                    }}
                    className={`text-left p-3 transition-all ${
                      i === currentIndex
                        ? "bg-neutral-900 border border-neutral-700"
                        : "bg-transparent border border-transparent hover:border-neutral-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 flex items-center justify-center text-[9px] font-mono font-bold ${
                        i === currentIndex ? "bg-[#e50914] text-white" : "bg-neutral-800 text-neutral-400"
                      }`}>
                        {t.initials}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">{t.name}</span>
                        <span className="text-[10px] font-mono text-neutral-500">{t.product}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Badges */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {[
            { icon: "🔒", text: "GÜVENLİ ÖDEME" },
            { icon: "🚚", text: "AYNI GÜN SEVKİYAT" },
            { icon: "↩️", text: "14 GÜN İADE" },
            { icon: "📦", text: "ÖZEL ARŞİV KUTUSU" },
            { icon: "🌍", text: "DÜNYA GENELİ KARGO" },
          ].map((badge) => (
            <div key={badge.text} className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="text-base">{badge.icon}</span>
              <span className="uppercase tracking-wider">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
