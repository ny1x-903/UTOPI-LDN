"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera } from "lucide-react";

export function LookbookEditorial() {
  return (
    <section className="py-24 bg-[#1c1c1c] text-white border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-neutral-900">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF5500] mb-1">
              <Camera className="w-3.5 h-3.5 text-[#FF5500]" />
              LOOKBOOK // CAMPAIGN VISUALS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-sans">
              NO SIGNAL // KAMPANYA SERİSİ
            </h2>
          </div>
          <p className="text-xs font-mono text-neutral-400 max-w-sm uppercase">
            35mm analog doku, derin gölgeler ve gece asfaltı yansımaları.
          </p>
        </div>

        {/* Dynamic Editorial Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Large Left Campaign Shot */}
          <div className="md:col-span-8 relative aspect-[16/10] bg-neutral-950 border border-neutral-900 overflow-hidden group">
            <Image
              src="/images/hero_campaign.jpg"
              alt="UTOPIA LDN Editorial Lookbook"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div>
                <span className="text-[10px] font-mono text-[#FF5500] tracking-widest block mb-1">
                  LOOK 01 // OVERSIZED FIT
                </span>
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white">
                  SHADOW DIVISION HOODIE + DISTRICT CARGO
                </h3>
              </div>
              <Link
                href="/shop"
                className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:bg-neutral-200 transition-colors"
              >
                GÖRÜNÜMÜ AL
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Smaller Campaign Cards */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="relative aspect-[4/3] flex-1 bg-neutral-950 border border-neutral-900 overflow-hidden group">
              <Image
                src="/images/products/shadow_hoodie_back.jpg"
                alt="UTOPIA LDN Arka Görünüm"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[9px] font-mono text-neutral-400 block">
                  ARKİTEKTÜR VE GRAFİK
                </span>
                <p className="text-xs font-bold uppercase text-white mt-0.5">
                  İSTANBUL - LONDRA KOORDİNAT BASKISI
                </p>
              </div>
            </div>

            <div className="relative aspect-[4/3] flex-1 bg-neutral-950 border border-neutral-900 overflow-hidden group">
              <Image
                src="/images/products/district_cargo_front.jpg"
                alt="UTOPIA LDN Kargo Donanımı"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[9px] font-mono text-neutral-400 block">
                  FONKSİYONEL SOKAK DONANIMI
                </span>
                <p className="text-xs font-bold uppercase text-white mt-0.5">
                  MODÜLER ASİMETRİK 3D CEP SİSTEMİ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
