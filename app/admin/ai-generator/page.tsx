"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  RefreshCw,
  UploadCloud,
  CheckCircle2,
  Copy,
  ArrowLeft,
  Share2,
  Layers,
  Camera,
  FileText,
} from "lucide-react";

export default function AIDropGeneratorPage() {
  const [form, setForm] = useState({
    category: "HOODIES",
    name: "UTOPIA Phantom Division Heavy Hoodie",
    color: "Matte Black",
    fit: "Oversized Boxy Cut",
    material: "480 GSM Heavyweight French Terry",
    graphicStyle: "Minimalist Gothic Brutalism",
    conceptNotes: "Gövdede ton sür ton kabartmalı UTOPIA yazısı, arkada İstanbul-Londra koordinatları.",
    price: 3650,
    collectionSlug: "drop-01-after-dark",
  });

  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [generatedData, setGeneratedData] = useState<any>(null);
  const [publishSuccess, setPublishSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"prompts" | "copy" | "social" | "preview">("preview");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPublishSuccess(null);

    try {
      const res = await fetch("/api/ai/generate-drop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, publishNow: false }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setGeneratedData(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePublishToLiveStore = async () => {
    if (!generatedData) return;
    setPublishing(true);
    setPublishSuccess(null);

    try {
      const res = await fetch("/api/ai/generate-drop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, publishNow: true }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPublishSuccess(
          `"${form.name}" başarıyla veritabanına kaydedildi ve canlı mağazada yayınlandı!`
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setPublishing(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#1c1c1c] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-900">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-white transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              ADMIN DASHBOARD'A DÖN
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#e50914]" />
              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight font-sans">
                AI DROP GENERATOR // STUDIO ENGINE
              </h1>
            </div>
          </div>
          <div className="text-xs font-mono text-neutral-500">
            AUTO-PROMPT ENGINE // V3.4 MULTI-ANGLE LOCK
          </div>
        </div>

        {publishSuccess && (
          <div className="mt-6 p-4 bg-emerald-950/40 border border-emerald-500 text-xs font-mono text-emerald-300 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>{publishSuccess}</span>
            </div>
            <Link
              href="/shop"
              className="px-4 py-1.5 bg-emerald-500 text-black font-bold uppercase tracking-wider text-[11px]"
            >
              MAĞAZADA GÖRÜNTÜLE
            </Link>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Input Form */}
          <div className="lg:col-span-5 p-6 bg-neutral-950 border border-neutral-900 space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#e50914] flex items-center gap-2">
              <Layers className="w-4 h-4" />
              DROP PARAMETRELERİ & TASARIM GİRDİSİ
            </h2>

            <form onSubmit={handleGenerate} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-neutral-400 mb-1">ÜRÜN KATEGORİSİ</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-[#111] border border-neutral-800 p-2.5 text-white outline-none focus:border-white"
                >
                  <option value="HOODIES">HOODIES</option>
                  <option value="CARGOS">CARGOS</option>
                  <option value="T-SHIRTS">T-SHIRTS</option>
                  <option value="JACKETS">JACKETS</option>
                  <option value="SWEATPANTS">SWEATPANTS</option>
                  <option value="TRACKSUITS">TRACKSUITS</option>
                  <option value="ACCESSORIES">ACCESSORIES</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">ÜRÜN ADI</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#111] border border-neutral-800 p-2.5 text-white outline-none focus:border-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">RENK & TON</label>
                  <input
                    type="text"
                    value={form.color}
                    onChange={(e) => setForm({ ...form, color: e.target.value })}
                    className="w-full bg-[#111] border border-neutral-800 p-2.5 text-white outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">HEDEF FİYAT (₺)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full bg-[#111] border border-neutral-800 p-2.5 text-white outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">SİLÜET / KESİM</label>
                  <select
                    value={form.fit}
                    onChange={(e) => setForm({ ...form, fit: e.target.value })}
                    className="w-full bg-[#111] border border-neutral-800 p-2.5 text-white outline-none focus:border-white"
                  >
                    <option value="Oversized Boxy Cut">Oversized Boxy</option>
                    <option value="Relaxed Tapered Fit">Relaxed Tapered</option>
                    <option value="Drop Shoulder Heavy">Drop Shoulder</option>
                    <option value="Engineered Tactical Shell">Tactical Shell</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">GRAFİK STİLİ</label>
                  <select
                    value={form.graphicStyle}
                    onChange={(e) => setForm({ ...form, graphicStyle: e.target.value })}
                    className="w-full bg-[#111] border border-neutral-800 p-2.5 text-white outline-none focus:border-white"
                  >
                    <option value="Minimalist Gothic Brutalism">Minimal Gothic</option>
                    <option value="Tonal Embossed Typography">Tonal Embossed</option>
                    <option value="Abstract Dystopian Geometry">Abstract Geometry</option>
                    <option value="Clean Tactical Coordinates">Clean Coordinates</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">KUMAŞ VE MATERYAL</label>
                <select
                  value={form.material}
                  onChange={(e) => setForm({ ...form, material: e.target.value })}
                  className="w-full bg-[#111] border border-neutral-800 p-2.5 text-white outline-none focus:border-white"
                >
                  <option value="480 GSM Heavyweight French Terry">480 GSM Heavy French Terry</option>
                  <option value="340 GSM Ripstop Technical Cotton">340 GSM Ripstop Cotton</option>
                  <option value="280 GSM Vintage Washed Jersey">280 GSM Washed Jersey</option>
                  <option value="3-Ply Waterproof Technical Shell">3-Ply Waterproof Shell</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">BAĞLI OLDUĞU DROP</label>
                <select
                  value={form.collectionSlug}
                  onChange={(e) => setForm({ ...form, collectionSlug: e.target.value })}
                  className="w-full bg-[#111] border border-neutral-800 p-2.5 text-white outline-none focus:border-white"
                >
                  <option value="drop-01-after-dark">DROP 01 — AFTER DARK</option>
                  <option value="drop-02-no-signal">DROP 02 — NO SIGNAL</option>
                  <option value="drop-03-underground">DROP 03 — UNDERGROUND</option>
                  <option value="drop-04-34">DROP 04 — 34</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">TASARIM DETAYLARI & NOTLAR</label>
                <textarea
                  rows={3}
                  value={form.conceptNotes}
                  onChange={(e) => setForm({ ...form, conceptNotes: e.target.value })}
                  placeholder="Lazer gravürlü donanım, gizli cepler, kilit dikişler..."
                  className="w-full bg-[#111] border border-neutral-800 p-2.5 text-white outline-none focus:border-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#e50914] hover:bg-[#c70812] text-white font-extrabold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>YAPAY ZEKA DROP ÜRETİYOR...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>DROP ÜRET & PROMPT'LARI SENTEZLE</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Results & Preview */}
          <div className="lg:col-span-7 space-y-6">
            {generatedData ? (
              <div className="bg-neutral-950 border border-neutral-900 p-6 space-y-6">
                {/* Result Navigation Tabs */}
                <div className="flex border-b border-neutral-900 gap-4 text-xs font-mono">
                  <button
                    onClick={() => setActiveTab("preview")}
                    className={`pb-3 border-b-2 flex items-center gap-1.5 uppercase ${
                      activeTab === "preview"
                        ? "border-[#e50914] text-white font-bold"
                        : "border-transparent text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    GÖRSEL ÖN İZLEME
                  </button>
                  <button
                    onClick={() => setActiveTab("prompts")}
                    className={`pb-3 border-b-2 flex items-center gap-1.5 uppercase ${
                      activeTab === "prompts"
                        ? "border-[#e50914] text-white font-bold"
                        : "border-transparent text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    5x AÇI PROMPT'LARI
                  </button>
                  <button
                    onClick={() => setActiveTab("copy")}
                    className={`pb-3 border-b-2 flex items-center gap-1.5 uppercase ${
                      activeTab === "copy"
                        ? "border-[#e50914] text-white font-bold"
                        : "border-transparent text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    EDİTÖRYAL & SEO
                  </button>
                  <button
                    onClick={() => setActiveTab("social")}
                    className={`pb-3 border-b-2 flex items-center gap-1.5 uppercase ${
                      activeTab === "social"
                        ? "border-[#e50914] text-white font-bold"
                        : "border-transparent text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    SOSYAL MEDYA KİTİ
                  </button>
                </div>

                {/* TAB 1: Preview Cards */}
                {activeTab === "preview" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="aspect-[3/4] bg-neutral-900 border border-neutral-800 relative overflow-hidden">
                        <Image
                          src="/images/products/shadow_hoodie_front.jpg"
                          alt="FRONT"
                          fill
                          className="object-cover"
                        />
                        <span className="absolute bottom-1 left-1 bg-black/80 px-1.5 py-0.5 text-[9px] font-mono text-white">
                          01 // FRONT
                        </span>
                      </div>
                      <div className="aspect-[3/4] bg-neutral-900 border border-neutral-800 relative overflow-hidden">
                        <Image
                          src="/images/products/shadow_hoodie_back.jpg"
                          alt="BACK"
                          fill
                          className="object-cover"
                        />
                        <span className="absolute bottom-1 left-1 bg-black/80 px-1.5 py-0.5 text-white text-[9px] font-mono">
                          02 // BACK
                        </span>
                      </div>
                      <div className="aspect-[3/4] bg-neutral-900 border border-neutral-800 relative overflow-hidden">
                        <Image
                          src="/images/products/shadow_hoodie_detail.jpg"
                          alt="DETAIL"
                          fill
                          className="object-cover"
                        />
                        <span className="absolute bottom-1 left-1 bg-black/80 px-1.5 py-0.5 text-white text-[9px] font-mono">
                          03 // DETAIL
                        </span>
                      </div>
                      <div className="aspect-[3/4] bg-neutral-900 border border-neutral-800 relative overflow-hidden">
                        <Image
                          src="/images/hero_campaign.jpg"
                          alt="CAMPAIGN"
                          fill
                          className="object-cover"
                        />
                        <span className="absolute bottom-1 left-1 bg-black/80 px-1.5 py-0.5 text-white text-[9px] font-mono">
                          04 // MODEL
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-neutral-900/60 border border-neutral-800 space-y-2 text-xs font-mono">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-base font-bold text-white uppercase">
                          {generatedData.productName}
                        </h3>
                        <span className="text-[#e50914] font-bold text-sm">
                          {generatedData.price.toLocaleString("tr-TR")} ₺
                        </span>
                      </div>
                      <p className="text-neutral-400 uppercase leading-relaxed">
                        {generatedData.description}
                      </p>
                    </div>

                    {/* Publish Action Button */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        onClick={handlePublishToLiveStore}
                        disabled={publishing}
                        className="flex-1 py-4 bg-white hover:bg-neutral-200 text-black text-xs font-extrabold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                      >
                        <UploadCloud className="w-4 h-4 text-[#e50914]" />
                        {publishing ? "MAĞAZAYA AKTARILIYOR..." : "CANLI MAĞAZAYA YAYINLA (1-CLICK)"}
                      </button>
                      <button
                        onClick={handleGenerate}
                        className="px-6 py-4 border border-neutral-800 hover:border-white text-white text-xs font-mono uppercase tracking-wider"
                      >
                        YENİDEN ÜRET
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 2: 5x Structured Prompts */}
                {activeTab === "prompts" && (
                  <div className="space-y-4 text-xs font-mono">
                    <p className="text-neutral-400">
                      Aşağıdaki prompt'lar UTOPIA LDN görsel tutarlılık motoru tarafından kilitlenmiş tasarım öznitelikleriyle oluşturulmuştur:
                    </p>

                    {Object.entries(generatedData.imagePrompts).map(([key, prompt]: any) => (
                      <div key={key} className="p-3 bg-neutral-900 border border-neutral-800 space-y-1.5">
                        <div className="flex justify-between items-center text-neutral-400">
                          <span className="text-[#e50914] font-bold uppercase">{key.toUpperCase()} PROMPT</span>
                          <button
                            onClick={() => copyToClipboard(prompt, key)}
                            className="text-neutral-400 hover:text-white flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            <span>{copiedKey === key ? "KOPYALANDI" : "KOPYALA"}</span>
                          </button>
                        </div>
                        <p className="text-neutral-300 text-[11px] leading-relaxed select-all">
                          {prompt}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 3: Copywriting & SEO */}
                {activeTab === "copy" && (
                  <div className="space-y-4 text-xs font-mono">
                    <div className="p-3 bg-neutral-900 border border-neutral-800 space-y-1">
                      <span className="text-neutral-500 uppercase text-[10px]">KAMPANYA SLOGANI</span>
                      <p className="text-white font-bold">{generatedData.campaignSlogan}</p>
                    </div>
                    <div className="p-3 bg-neutral-900 border border-neutral-800 space-y-1">
                      <span className="text-neutral-500 uppercase text-[10px]">SEO BAŞLIĞI</span>
                      <p className="text-white">{generatedData.seoTitle}</p>
                    </div>
                    <div className="p-3 bg-neutral-900 border border-neutral-800 space-y-1">
                      <span className="text-neutral-500 uppercase text-[10px]">META AÇIKLAMASI</span>
                      <p className="text-neutral-300">{generatedData.seoDescription}</p>
                    </div>
                    <div className="p-3 bg-neutral-900 border border-neutral-800 space-y-1">
                      <span className="text-neutral-500 uppercase text-[10px]">ÜRÜN ETİKETLERİ</span>
                      <p className="text-neutral-400">{generatedData.tags}</p>
                    </div>
                  </div>
                )}

                {/* TAB 4: Social Media Kit */}
                {activeTab === "social" && (
                  <div className="space-y-4 text-xs font-mono">
                    <div className="p-4 bg-neutral-900 border border-neutral-800 space-y-2">
                      <div className="flex justify-between items-center text-neutral-400">
                        <span className="text-[#e50914] font-bold">INSTAGRAM GÖNDERİ METNİ</span>
                        <button
                          onClick={() => copyToClipboard(generatedData.socialKit.instagramCaption, "ig")}
                          className="text-neutral-400 hover:text-white flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedKey === "ig" ? "KOPYALANDI" : "KOPYALA"}</span>
                        </button>
                      </div>
                      <pre className="text-neutral-300 whitespace-pre-wrap font-mono text-[11px] leading-relaxed">
                        {generatedData.socialKit.instagramCaption}
                      </pre>
                    </div>

                    <div className="p-3 bg-neutral-900 border border-neutral-800 space-y-1">
                      <span className="text-neutral-500 uppercase text-[10px]">TIKTOK VİDEO AÇIKLAMASI</span>
                      <p className="text-white">{generatedData.socialKit.tiktokCaption}</p>
                    </div>

                    <div className="p-3 bg-neutral-900 border border-neutral-800 space-y-1">
                      <span className="text-neutral-500 uppercase text-[10px]">9:16 DİKEY REELS PROMPT'U</span>
                      <p className="text-neutral-400 text-[11px]">{generatedData.socialKit.verticalPrompt}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full min-h-[400px] border border-dashed border-neutral-800 flex flex-col items-center justify-center text-center p-8 space-y-3">
                <Sparkles className="w-8 h-8 text-neutral-700" />
                <h3 className="text-sm font-mono uppercase text-neutral-400 font-bold">
                  HENÜZ BİR DROP SENTEZLENMEDİ
                </h3>
                <p className="text-xs font-mono text-neutral-600 max-w-sm">
                  Sol paneldeki formdan kumaş, silüet ve grafik stilini seçip "DROP ÜRET" butonuna basarak yapay zeka tasarım motorunu başlatın.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
