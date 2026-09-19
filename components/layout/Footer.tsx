"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#030303] text-white border-t border-neutral-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Newsletter & Brand Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-900">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl md:text-2xl font-black tracking-tighter uppercase font-sans">
                UTOPIA LDN
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 bg-[#e50914]/20 border border-[#e50914] text-[#e50914]">
                EST. 2026
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-mono max-w-md leading-relaxed uppercase">
              Born in the shadows of Istanbul & London. Built around individuality. Designed for those who move differently.
            </p>
            <div className="pt-2">
              <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                SYSTEM STATUS: ACTIVE // WORLDWIDE DISPATCH
              </div>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block">
              VIP UNDERGROUND COMMUNITY ACCESS // SIFIR SPAM
            </span>
            {subscribed ? (
              <div className="p-4 bg-neutral-950 border border-neutral-800 text-xs font-mono text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ÖZEL DROP ERİŞİM LİSTESİNE KAYDINIZ ALINDI. ŞİFRE E-POSTANIZA GÖNDERİLDİ.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-POSTA ADRESİNİZİ YAZIN..."
                  required
                  className="bg-neutral-950 border border-neutral-800 px-4 py-3 text-xs font-mono text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-black text-xs font-extrabold uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                >
                  ERİŞİM SAĞLA
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <p className="text-[10px] font-mono text-neutral-600 uppercase">
              Kaydolarak yeni drop bildirimlerini ve sınırlı arşiv parçalarının şifrelerini ilk siz alırsınız.
            </p>
          </div>
        </div>

        {/* Middle Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-12 text-xs font-mono">
          {/* Shop */}
          <div className="space-y-3">
            <h4 className="text-white font-bold tracking-widest uppercase">KOLEKSİYON</h4>
            <ul className="space-y-2 text-neutral-400">
              <li><Link href="/shop?category=HOODIES" className="hover:text-white transition-colors">HOODIES</Link></li>
              <li><Link href="/shop?category=CARGOS" className="hover:text-white transition-colors">CARGOS</Link></li>
              <li><Link href="/shop?category=T-SHIRTS" className="hover:text-white transition-colors">T-SHIRTS</Link></li>
              <li><Link href="/shop?category=JACKETS" className="hover:text-white transition-colors">JACKETS</Link></li>
              <li><Link href="/shop?category=LIMITED" className="hover:text-white transition-colors text-[#e50914]">LIMITED DROPS</Link></li>
            </ul>
          </div>

          {/* Drops */}
          <div className="space-y-3">
            <h4 className="text-white font-bold tracking-widest uppercase">DROPS</h4>
            <ul className="space-y-2 text-neutral-400">
              <li><Link href="/collections/drop-01-after-dark" className="hover:text-white transition-colors">DROP 01 — AFTER DARK</Link></li>
              <li><Link href="/collections/drop-02-no-signal" className="hover:text-white transition-colors">DROP 02 — NO SIGNAL</Link></li>
              <li><Link href="/collections/drop-03-underground" className="hover:text-white transition-colors">DROP 03 — UNDERGROUND</Link></li>
              <li><Link href="/collections/drop-04-34" className="hover:text-white transition-colors">DROP 04 — 34</Link></li>
              <li><Link href="/collections/limited-archive" className="hover:text-white transition-colors">ARCHIVE</Link></li>
            </ul>
          </div>

          {/* Brand & Support */}
          <div className="space-y-3">
            <h4 className="text-white font-bold tracking-widest uppercase">KURUMSAL & YARDIM</h4>
            <ul className="space-y-2 text-neutral-400">
              <li><Link href="/about" className="hover:text-white transition-colors">MANIFESTO</Link></li>
              <li><Link href="/legal/shipping-policy" className="hover:text-white transition-colors">TESLİMAT & KARGO</Link></li>
              <li><Link href="/legal/return-policy" className="hover:text-white transition-colors">İADE & DEĞİŞİM</Link></li>
              <li><Link href="/account" className="hover:text-white transition-colors">SİPARİŞ TAKİBİ</Link></li>
              <li><Link href="/admin" className="text-[#e50914] hover:underline">ADMIN PANELİ</Link></li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div className="space-y-3">
            <h4 className="text-white font-bold tracking-widest uppercase">YASAL & SOSYAL</h4>
            <ul className="space-y-2 text-neutral-400">
              <li><Link href="/legal/kvkk" className="hover:text-white transition-colors">KVKK AYDINLATMA</Link></li>
              <li><Link href="/legal/distance-sales" className="hover:text-white transition-colors">MESAFELİ SATIŞ</Link></li>
              <li><Link href="/legal/privacy-policy" className="hover:text-white transition-colors">GİZLİLİK POLİTİKASI</Link></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">INSTAGRAM // @UTOPIALDN</a></li>
              <li><a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TIKTOK // @UTOPIALDN</a></li>
            </ul>
          </div>
        </div>

        {/* Large Final Brand Slogan */}
        <div className="py-12 border-t border-neutral-900 text-center overflow-hidden">
          <h2 className="text-3xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-neutral-900 hover:text-neutral-800 select-none transition-colors duration-500">
            BUILT FOR THE SHADOWS.
          </h2>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-neutral-950 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-600">
          <p>© 2026 UTOPIA LDN LTD. TÜM HAKLARI SAKLIDIR.</p>
          <p className="mt-2 sm:mt-0">ORIGINAL TURKISH & UK DRILL LUXURY STREETWEAR</p>
        </div>
      </div>
    </footer>
  );
}
