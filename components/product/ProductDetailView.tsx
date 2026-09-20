"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  Share2,
  ChevronDown,
  Check,
  Zap,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export interface ProductDetailProps {
  product: {
    id: string;
    slug: string;
    name: string;
    subtitle?: string | null;
    description: string;
    price: number;
    compareAtPrice?: number | null;
    category: string;
    fit: string;
    material: string;
    color: string;
    colorHex: string;
    isLimited: boolean;
    totalPieces?: number | null;
    piecesSold?: number;
    images: { id: string; url: string; alt?: string | null; type: string }[];
    variants: { id: string; size: string; stock: number; sku: string }[];
    collection?: { title: string; slug: string } | null;
  };
}

export function ProductDetailView({ product }: ProductDetailProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [measurementUnit, setMeasurementUnit] = useState<"cm" | "in">("cm");
  const [copiedLink, setCopiedLink] = useState(false);

  // Accordion state
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    description: true,
    material: true,
    sizeFit: false,
    shipping: false,
    returns: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const currentImage =
    product.images[selectedImageIndex]?.url ||
    product.images[0]?.url ||
    "/images/products/shadow_hoodie_front.jpg";

  const selectedVariant = product.variants.find((v) => v.size === selectedSize);
  const isOutOfStock = !selectedVariant || selectedVariant.stock <= 0;
  const isLowStock = selectedVariant && selectedVariant.stock > 0 && selectedVariant.stock <= 3;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      size: selectedSize,
      quantity: 1,
      image: product.images[0]?.url || "/images/products/shadow_hoodie_front.jpg",
      color: product.color,
    });
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      size: selectedSize,
      quantity: 1,
      image: product.images[0]?.url || "/images/products/shadow_hoodie_front.jpg",
      color: product.color,
    });
    router.push("/checkout");
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Multi-Angle Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnail selector */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[600px] custom-scroll flex-shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-24 md:w-24 md:h-32 bg-neutral-100 border transition-all overflow-hidden flex-shrink-0 ${
                    selectedImageIndex === idx
                      ? "border-[#e50914] opacity-100"
                      : "border-border opacity-60 hover:opacity-90"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.alt || product.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                  <span className="absolute bottom-1 left-1 text-[8px] font-mono uppercase bg-background/80 px-1 py-0.5 text-foreground">
                    {img.type}
                  </span>
                </button>
              ))}
            </div>

            {/* Main Active Image Viewport */}
            <div className="relative aspect-[3/4] flex-1 bg-neutral-50 border border-border overflow-hidden group">
              <Image
                src={currentImage}
                alt={product.name}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              {/* Tag Overlays */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isLimited && (
                  <span className="bg-[#e50914] text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1">
                    LIMITED DROP // ONLY {product.totalPieces} PIECES
                  </span>
                )}
                {product.collection && (
                  <span className="bg-background/70 backdrop-blur-md border border-border text-foreground text-[10px] font-mono uppercase tracking-wider px-2.5 py-1">
                    {product.collection.title}
                  </span>
                )}
              </div>

              {/* Angle Indicator */}
              <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-md border border-border text-[10px] font-mono text-neutral-600 px-3 py-1">
                AÇI: {product.images[selectedImageIndex]?.type || "FRONT"} [
                {selectedImageIndex + 1} / {product.images.length}]
              </div>
            </div>
          </div>

          {/* Right Column: Garment Information & Commerce Panel */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            {/* Header info */}
            <div className="space-y-2 border-b border-border pb-6">
              <div className="flex justify-between items-center text-xs font-mono text-neutral-500 uppercase">
                <span>{product.category}</span>
                <span>RENK: {product.color}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-foreground font-sans">
                {product.name}
              </h1>

              {product.subtitle && (
                <p className="text-xs font-mono text-neutral-500 uppercase">
                  {product.subtitle}
                </p>
              )}

              {/* Price Row */}
              <div className="pt-2 flex items-baseline gap-4">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-foreground">
                  {product.price.toLocaleString("tr-TR")} ₺
                </span>
                {product.compareAtPrice && (
                  <span className="text-base font-mono line-through text-neutral-400">
                    {product.compareAtPrice.toLocaleString("tr-TR")} ₺
                  </span>
                )}
                <span className="text-xs font-mono text-emerald-600">
                  KDV DAHİL // PEŞİN FİYATINA TAKSİT
                </span>
              </div>
            </div>

            {/* Size Selector & Guide Trigger */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-neutral-500 uppercase">
                  BEDEN SEÇİN: <strong className="text-foreground">{selectedSize}</strong>
                </span>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-neutral-500 hover:text-foreground flex items-center gap-1 underline underline-offset-4 decoration-neutral-300"
                >
                  <Ruler className="w-3.5 h-3.5 text-[#e50914]" />
                  BEDEN TABLOSU
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {product.variants.map((v) => {
                  const outOfStock = v.stock <= 0;
                  const isSelected = selectedSize === v.size;
                  return (
                    <button
                      key={v.id}
                      disabled={outOfStock}
                      onClick={() => setSelectedSize(v.size)}
                      className={`py-3 text-xs font-mono font-bold transition-all relative ${
                        outOfStock
                          ? "bg-neutral-100 text-neutral-400 border border-border cursor-not-allowed line-through"
                          : isSelected
                          ? "bg-foreground text-background border border-foreground"
                          : "bg-background text-neutral-600 border border-border hover:border-neutral-400"
                      }`}
                    >
                      {v.size}
                      {v.stock > 0 && v.stock <= 3 && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#e50914]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {isLowStock && (
                <p className="text-[11px] font-mono text-[#e50914] flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  DİKKAT: {selectedSize} bedende son {selectedVariant?.stock} adet kaldı!
                </p>
              )}
            </div>

            {/* Action CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="flex-1 py-4 bg-foreground text-background text-xs font-extrabold uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {isOutOfStock ? "TÜKENDİ" : "SEPETE EKLE"}
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-4 border transition-colors ${
                    isFavorited
                      ? "bg-[#e50914] border-[#e50914] text-white"
                      : "bg-background border-border text-foreground hover:border-neutral-400"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? "fill-white" : ""}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="w-full py-3.5 bg-neutral-100 hover:bg-neutral-200 border border-border text-foreground text-xs font-mono font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 disabled:opacity-40"
              >
                HEMEN SATIN AL // EXPRESS CHECKOUT
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border text-xs font-mono text-neutral-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-neutral-500" />
                <span>24-48 SAATTE SİGORTALI SEVKİYAT</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-neutral-500" />
                <span>14 GÜN KOŞULSUZ İADE & DEĞİŞİM</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-neutral-500" />
                <span>ORİJİNAL SERİ NUMARALI ÜRÜN</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Share2 className="w-4 h-4 text-neutral-500" />
                  <span>{copiedLink ? "BAĞLANTI KOPYALANDI!" : "PAYLAŞ"}</span>
                </button>
              </div>
            </div>

            {/* Accordion Editorial Sections */}
            <div className="pt-6 border-t border-border divide-y divide-border font-mono text-xs">
              {/* Description */}
              <div>
                <button
                  onClick={() => toggleAccordion("description")}
                  className="w-full py-4 flex justify-between items-center text-foreground font-bold uppercase tracking-wider text-left"
                >
                  <span>ÜRÜN HİKAYESİ VE TASARIM</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openAccordions.description ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordions.description && (
                  <div className="pb-4 text-neutral-600 leading-relaxed uppercase space-y-2">
                    <p>{product.description}</p>
                    <p className="text-[11px] text-neutral-500">
                      KESİM: {product.fit} // RENK KODU: {product.colorHex}
                    </p>
                  </div>
                )}
              </div>

              {/* Material */}
              <div>
                <button
                  onClick={() => toggleAccordion("material")}
                  className="w-full py-4 flex justify-between items-center text-foreground font-bold uppercase tracking-wider text-left"
                >
                  <span>MATERYAL VE BAKIM DETAYLARI</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openAccordions.material ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordions.material && (
                  <div className="pb-4 text-neutral-600 leading-relaxed uppercase space-y-2">
                    <p>• {product.material}</p>
                    <p>• 30°C'de tersten benzer renklerle yıkayınız.</p>
                    <p>• Ağartıcı ve tamburlu kurutma uygulamayınız.</p>
                    <p>• Baskı ve donanım üzerine doğrudan ütü vurmayınız.</p>
                  </div>
                )}
              </div>

              {/* Shipping */}
              <div>
                <button
                  onClick={() => toggleAccordion("shipping")}
                  className="w-full py-4 flex justify-between items-center text-foreground font-bold uppercase tracking-wider text-left"
                >
                  <span>TESLİMAT VE SEVKİYAT SÜRECİ</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openAccordions.shipping ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordions.shipping && (
                  <div className="pb-4 text-neutral-600 leading-relaxed uppercase space-y-2">
                    <p>
                      Siparişleriniz İstanbul merkez stüdyomuzdan 24-48 saat içinde özel korumalı UTOPIA LDN arşiv kutusunda kargolanır.
                    </p>
                    <p>
                      2.000 ₺ ve üzeri tüm siparişlerde Yurtiçi Kargo ile sigortalı gönderim ücretsizdir.
                    </p>
                  </div>
                )}
              </div>

              {/* Returns */}
              <div>
                <button
                  onClick={() => toggleAccordion("returns")}
                  className="w-full py-4 flex justify-between items-center text-foreground font-bold uppercase tracking-wider text-left"
                >
                  <span>İADE VE BEDEN DEĞİŞİMİ</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openAccordions.returns ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordions.returns && (
                  <div className="pb-4 text-neutral-600 leading-relaxed uppercase space-y-2">
                    <p>
                      Ürünü teslim aldığınız tarihten itibaren 14 gün içinde faturası ve etiketiyle birlikte ücretsiz geri gönderebilirsiniz.
                    </p>
                    <p>
                      Beden değişimi stok durumuna bağlı olarak 2 iş günü içinde sevk edilir.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar for Mobile Viewport */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border p-4 flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-neutral-500 uppercase block">
            BEDEN: {selectedSize}
          </span>
          <span className="text-base font-bold font-mono text-foreground">
            {product.price.toLocaleString("tr-TR")} ₺
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="flex-1 py-3 bg-foreground text-background text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          {isOutOfStock ? "TÜKENDİ" : "SEPETE EKLE"}
        </button>
      </div>

      {/* Size Guide Modal */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-[99999] bg-foreground/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-background border border-border max-w-xl w-full p-6 md:p-8 text-foreground space-y-6">
            <div className="flex justify-between items-center border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-[#e50914]" />
                <h3 className="text-sm font-bold uppercase tracking-widest font-mono">
                  UTOPIA LDN BEDEN ÖLÇÜ REHBERİ
                </h3>
              </div>
              <button
                onClick={() => setSizeGuideOpen(false)}
                className="text-neutral-500 hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-neutral-500">
                ÖLÇÜ BİRİMİ:
              </span>
              <div className="flex border border-border">
                <button
                  onClick={() => setMeasurementUnit("cm")}
                  className={`px-3 py-1 ${
                    measurementUnit === "cm" ? "bg-foreground text-background font-bold" : "text-neutral-500"
                  }`}
                >
                  SANTİMETRE (CM)
                </button>
                <button
                  onClick={() => setMeasurementUnit("in")}
                  className={`px-3 py-1 ${
                    measurementUnit === "in" ? "bg-foreground text-background font-bold" : "text-neutral-500"
                  }`}
                >
                  İNÇ (IN)
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono text-left border-collapse">
                <thead>
                  <tr className="border-b border-border text-neutral-500">
                    <th className="py-2.5">BEDEN</th>
                    <th className="py-2.5">GÖĞÜS ENİ</th>
                    <th className="py-2.5">BOY UZUNLUĞU</th>
                    <th className="py-2.5">OMUZ GENİŞLİĞİ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-neutral-600">
                  <tr>
                    <td className="py-2.5 font-bold text-foreground">S</td>
                    <td className="py-2.5">{measurementUnit === "cm" ? "58 cm" : "22.8 in"}</td>
                    <td className="py-2.5">{measurementUnit === "cm" ? "70 cm" : "27.5 in"}</td>
                    <td className="py-2.5">{measurementUnit === "cm" ? "54 cm" : "21.2 in"}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-foreground">M</td>
                    <td className="py-2.5">{measurementUnit === "cm" ? "61 cm" : "24.0 in"}</td>
                    <td className="py-2.5">{measurementUnit === "cm" ? "72 cm" : "28.3 in"}</td>
                    <td className="py-2.5">{measurementUnit === "cm" ? "56 cm" : "22.0 in"}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-foreground">L</td>
                    <td className="py-2.5">{measurementUnit === "cm" ? "64 cm" : "25.2 in"}</td>
                    <td className="py-2.5">{measurementUnit === "cm" ? "74 cm" : "29.1 in"}</td>
                    <td className="py-2.5">{measurementUnit === "cm" ? "58 cm" : "22.8 in"}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-foreground">XL</td>
                    <td className="py-2.5">{measurementUnit === "cm" ? "67 cm" : "26.4 in"}</td>
                    <td className="py-2.5">{measurementUnit === "cm" ? "76 cm" : "29.9 in"}</td>
                    <td className="py-2.5">{measurementUnit === "cm" ? "60 cm" : "23.6 in"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] font-mono text-neutral-500 leading-relaxed uppercase">
              Tüm ürünlerimiz kutu & bol kesim (boxy / oversized) olarak tasarlanmıştır. Standart vücuda oturan görünüm tercih ediyorsanız bir beden küçük seçmenizi tavsiye ederiz.
            </p>

            <button
              onClick={() => setSizeGuideOpen(false)}
              className="w-full py-3 bg-neutral-100 hover:bg-neutral-200 text-foreground text-xs font-mono uppercase tracking-widest transition-colors"
            >
              KAPAT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
