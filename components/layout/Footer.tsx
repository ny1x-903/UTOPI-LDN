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
    <footer className="relative bg-[#111111] text-foreground pt-16 pb-12 overflow-hidden">
      {/* Premium Gradient Divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF5500]/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Section: Newsletter & Brand Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-border">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl md:text-2xl font-black tracking-tighter uppercase font-sans">
                UTOPIA LDN
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 bg-[#FF5500]/20 border border-[#FF5500] text-[#FF5500]">
                EST. 2026
              </span>
            </div>
            <p className="text-xs text-neutral-600 font-mono max-w-md leading-relaxed uppercase">
              Born in the shadows of Istanbul & London. Built around individuality. Designed for those who move differently.
            </p>
            <div className="pt-2">
              <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                SYSTEM STATUS: ACTIVE // WORLDWIDE DISPATCH
              </div>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-600 block">
              VIP UNDERGROUND COMMUNITY ACCESS // SIFIR SPAM
            </span>
            {subscribed ? (
              <div className="p-4 bg-[#181818] border border-[#FF5500]/30 text-xs font-mono text-emerald-500 flex items-center gap-2 shadow-[0_0_10px_rgba(255,85,0,0.1)]">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
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
                  className="bg-[#181818] border border-border px-4 py-3 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF5500] transition-colors flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#FF5500] text-white text-xs font-extrabold uppercase tracking-widest hover:bg-[#FF5500]/80 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,85,0,0.3)]"
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
            <h4 className="text-foreground font-bold tracking-widest uppercase">KOLEKSİYON</h4>
            <ul className="space-y-2 text-neutral-600">
              <li><Link href="/shop?category=HOODIES" className="hover:text-foreground transition-colors">HOODIES</Link></li>
              <li><Link href="/shop?category=CARGOS" className="hover:text-foreground transition-colors">CARGOS</Link></li>
              <li><Link href="/shop?category=T-SHIRTS" className="hover:text-foreground transition-colors">T-SHIRTS</Link></li>
              <li><Link href="/shop?category=JACKETS" className="hover:text-foreground transition-colors">JACKETS</Link></li>
              <li><Link href="/shop?category=LIMITED" className="hover:text-foreground transition-colors text-[#FF5500]">LIMITED DROPS</Link></li>
            </ul>
          </div>

          {/* Drops */}
          <div className="space-y-3">
            <h4 className="text-foreground font-bold tracking-widest uppercase">DROPS</h4>
            <ul className="space-y-2 text-neutral-600">
              <li><Link href="/collections/drop-01-after-dark" className="hover:text-foreground transition-colors">DROP 01 — AFTER DARK</Link></li>
              <li><Link href="/collections/drop-02-no-signal" className="hover:text-foreground transition-colors">DROP 02 — NO SIGNAL</Link></li>
              <li><Link href="/collections/drop-03-underground" className="hover:text-foreground transition-colors">DROP 03 — UNDERGROUND</Link></li>
              <li><Link href="/collections/drop-04-34" className="hover:text-foreground transition-colors">DROP 04 — 34</Link></li>
              <li><Link href="/collections/limited-archive" className="hover:text-foreground transition-colors">ARCHIVE</Link></li>
            </ul>
          </div>

          {/* Brand & Support */}
          <div className="space-y-3">
            <h4 className="text-foreground font-bold tracking-widest uppercase">KURUMSAL & YARDIM</h4>
            <ul className="space-y-2 text-neutral-600">
              <li><Link href="/about" className="hover:text-foreground transition-colors">MANIFESTO</Link></li>
              <li><Link href="/legal/shipping-policy" className="hover:text-foreground transition-colors">TESLİMAT & KARGO</Link></li>
              <li><Link href="/legal/return-policy" className="hover:text-foreground transition-colors">İADE & DEĞİŞİM</Link></li>
              <li><Link href="/account" className="hover:text-foreground transition-colors">SİPARİŞ TAKİBİ</Link></li>
              <li><Link href="/admin" className="text-[#FF5500] hover:underline">ADMIN PANELİ</Link></li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div className="space-y-3">
            <h4 className="text-foreground font-bold tracking-widest uppercase">YASAL & SOSYAL</h4>
            <ul className="space-y-2 text-neutral-600">
              <li><Link href="/legal/kvkk" className="hover:text-foreground transition-colors">KVKK AYDINLATMA</Link></li>
              <li><Link href="/legal/distance-sales" className="hover:text-foreground transition-colors">MESAFELİ SATIŞ</Link></li>
              <li><Link href="/legal/privacy-policy" className="hover:text-foreground transition-colors">GİZLİLİK POLİTİKASI</Link></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">INSTAGRAM // @UTOPIALDN</a></li>
              <li><a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">TIKTOK // @UTOPIALDN</a></li>
            </ul>
          </div>
        </div>

        {/* Large Final Brand Slogan */}
        <div className="py-12 border-t border-border text-center overflow-hidden">
          <h2 className="text-3xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-neutral-200 hover:text-neutral-300 select-none transition-colors duration-500">
            BUILT FOR THE SHADOWS.
          </h2>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-500">
          <p>© 2026 UTOPIA LDN LTD. TÜM HAKLARI SAKLIDIR.</p>
          <p className="mt-2 sm:mt-0">ORIGINAL TURKISH & UK DRILL LUXURY STREETWEAR</p>
        </div>
      </div>
    </footer>
  );
}
