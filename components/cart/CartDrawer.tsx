"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    subtotal,
    shippingFee,
    freeShippingThreshold,
    freeShippingRemaining,
    discountCode,
    discountAmount,
    applyDiscount,
    removeDiscount,
    total,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [applying, setApplying] = useState(false);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    setApplying(true);
    setCouponError("");
    setCouponSuccess("");
    const res = await applyDiscount(inputCoupon);
    setApplying(false);
    if (res.success) {
      setCouponSuccess(res.message);
      setInputCoupon("");
    } else {
      setCouponError(res.message);
    }
  };

  const freeShippingPercent = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99995] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-md h-full bg-background border-l border-border flex flex-col z-10 text-foreground shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#e50914]" />
                <h2 className="text-sm font-bold uppercase tracking-widest font-mono">
                  SEPETİNİZ ({items.reduce((acc, i) => acc + i.quantity, 0)})
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-neutral-500 hover:text-foreground transition-colors"
                aria-label="Sepeti kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="px-6 py-3.5 bg-neutral-50 border-b border-border">
              <div className="flex justify-between items-center text-[11px] font-mono mb-1.5 text-neutral-500 uppercase">
                {freeShippingRemaining > 0 ? (
                  <span>
                    Ücretsiz kargo için{" "}
                    <strong className="text-foreground">
                      {freeShippingRemaining.toLocaleString("tr-TR")} ₺
                    </strong>{" "}
                    daha ekleyin
                  </span>
                ) : (
                  <span className="text-[#e50914] font-bold flex items-center gap-1">
                    ✓ ÜCRETSİZ SİGORTALI KARGO KAZANDINIZ
                  </span>
                )}
                <span>{freeShippingPercent}%</span>
              </div>
              <div className="w-full h-1 bg-neutral-200 overflow-hidden">
                <div
                  className="h-full bg-[#e50914] transition-all duration-300"
                  style={{ width: `${freeShippingPercent}%` }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scroll">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                  <div className="w-12 h-12 border border-neutral-300 flex items-center justify-center text-neutral-400 font-mono">
                    00
                  </div>
                  <p className="text-sm font-mono uppercase tracking-wider text-neutral-500">
                    SEPETİNİZDE HENÜZ PARÇA BULUNMUYOR
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2.5 bg-foreground text-background text-xs font-bold uppercase tracking-widest hover:bg-foreground/90 transition-colors"
                  >
                    KOLEKSİYONU KEŞFET
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex gap-4 p-3 bg-neutral-50 border border-border"
                  >
                    {/* Item Image */}
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="relative w-20 h-24 bg-neutral-200 flex-shrink-0 overflow-hidden"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </Link>

                    {/* Item Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <Link
                            href={`/product/${item.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="text-xs font-bold uppercase tracking-tight text-foreground hover:text-neutral-600 transition-colors line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-neutral-400 hover:text-[#e50914] transition-colors p-1"
                            title="Ürünü kaldır"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] font-mono text-neutral-500 mt-0.5">
                          BEDEN: <span className="text-foreground">{item.size}</span>
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-neutral-300">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1.5 text-neutral-500 hover:text-foreground transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-mono text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1.5 text-neutral-500 hover:text-foreground transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-xs font-mono font-bold text-foreground">
                          {(item.price * item.quantity).toLocaleString("tr-TR")} ₺
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="p-6 bg-neutral-50 border-t border-border space-y-4">
                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input
                        type="text"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        placeholder="İNDİRİM KODU (Örn: UTOPIA10)"
                        className="w-full bg-background border border-border text-xs font-mono uppercase pl-9 pr-3 py-2 text-foreground placeholder-neutral-400 outline-none focus:border-foreground"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={applying}
                      className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-xs font-mono uppercase tracking-wider text-foreground transition-colors disabled:opacity-50"
                    >
                      {applying ? "..." : "UYGULA"}
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[10px] font-mono text-[#e50914]">{couponError}</p>
                  )}
                  {couponSuccess && (
                    <p className="text-[10px] font-mono text-emerald-400">{couponSuccess}</p>
                  )}
                  {discountCode && (
                    <div className="flex items-center justify-between bg-emerald-50 px-3 py-1.5 text-xs font-mono text-emerald-700 border border-emerald-200">
                      <span>KOD: {discountCode}</span>
                      <button
                        type="button"
                        onClick={removeDiscount}
                        className="text-emerald-500 hover:text-emerald-800"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </form>

                {/* Totals Breakdown */}
                <div className="space-y-1.5 text-xs font-mono text-neutral-500 pt-2 border-t border-border">
                  <div className="flex justify-between">
                    <span>ARA TOPLAM</span>
                    <span className="text-foreground">{subtotal.toLocaleString("tr-TR")} ₺</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>İNDİRİM</span>
                      <span>-{discountAmount.toLocaleString("tr-TR")} ₺</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>SİGORTALI KARGO</span>
                    <span className="text-foreground">
                      {shippingFee === 0 ? "ÜCRETSİZ" : `${shippingFee} ₺`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-foreground pt-2 border-t border-border">
                    <span className="font-mono">GENEL TOPLAM</span>
                    <span className="text-base text-foreground">
                      {total.toLocaleString("tr-TR")} ₺
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-4 bg-foreground hover:bg-foreground/90 text-background text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors rounded-none group"
                >
                  SİPARİŞİ TAMAMLA
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-neutral-500 uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                  256-BIT SSL İLE GÜVENLİ ÖDEME // YURTİÇİ KARGO
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
