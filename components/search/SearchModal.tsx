"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowUpRight, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SearchProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  imageUrl: string;
  isLimited: boolean;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  "Shadow Division Hoodie",
  "District Heavyweight Cargo",
  "34 Nocturne",
  "Technical Shell",
  "Oversized Hoodie",
  "Drop 01",
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.products || []);
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99990] bg-[#050505]/95 backdrop-blur-xl flex flex-col p-6 md:p-12 text-white"
        >
          {/* Top Bar */}
          <div className="flex justify-between items-center max-w-5xl mx-auto w-full border-b border-neutral-800 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              UTOPIA ARCHIVE SEARCH // ESC TO CLOSE
            </span>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Input */}
          <div className="max-w-5xl mx-auto w-full my-8">
            <div className="relative flex items-center">
              <Search className="w-7 h-7 text-neutral-500 absolute left-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ARAMAK İSTEDİĞİNİZ PARÇAYI YAZIN..."
                className="w-full bg-transparent pl-12 pr-4 py-4 text-2xl md:text-4xl font-light uppercase tracking-wider text-white placeholder-neutral-700 outline-none border-b border-neutral-800 focus:border-[#e50914] transition-colors"
              />
              {loading && (
                <div className="absolute right-0 w-5 h-5 border-2 border-[#e50914] border-t-transparent rounded-full animate-spin" />
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="max-w-5xl mx-auto w-full flex-1 overflow-y-auto pr-2 custom-scroll">
            {query.trim().length === 0 ? (
              <div className="space-y-8 py-4">
                <div>
                  <h3 className="text-xs font-mono tracking-widest uppercase text-neutral-500 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-[#e50914]" />
                    POPÜLER ARAMALAR
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map((item) => (
                      <button
                        key={item}
                        onClick={() => setQuery(item)}
                        className="px-4 py-2 border border-neutral-800 hover:border-neutral-500 bg-neutral-900/40 text-xs md:text-sm uppercase tracking-wider text-neutral-300 hover:text-white transition-all rounded-none"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-mono tracking-widest uppercase text-neutral-500 mb-4">
                    KOLEKSİYONLAR
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link
                      href="/collections/drop-01-after-dark"
                      onClick={onClose}
                      className="group p-5 border border-neutral-800/80 bg-neutral-950 hover:border-neutral-600 transition-all block"
                    >
                      <span className="text-[10px] font-mono text-[#e50914] block">
                        DROP 01
                      </span>
                      <span className="text-base font-bold tracking-tight uppercase flex items-center justify-between mt-1">
                        AFTER DARK
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                    </Link>
                    <Link
                      href="/collections/drop-02-no-signal"
                      onClick={onClose}
                      className="group p-5 border border-neutral-800/80 bg-neutral-950 hover:border-neutral-600 transition-all block"
                    >
                      <span className="text-[10px] font-mono text-neutral-400 block">
                        DROP 02
                      </span>
                      <span className="text-base font-bold tracking-tight uppercase flex items-center justify-between mt-1">
                        NO SIGNAL
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                    </Link>
                    <Link
                      href="/shop?category=LIMITED"
                      onClick={onClose}
                      className="group p-5 border border-neutral-800/80 bg-neutral-950 hover:border-neutral-600 transition-all block"
                    >
                      <span className="text-[10px] font-mono text-neutral-400 block">
                        ARCHIVE
                      </span>
                      <span className="text-base font-bold tracking-tight uppercase flex items-center justify-between mt-1">
                        LIMITED PIECES
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="group border border-neutral-900 bg-neutral-950 hover:border-neutral-700 transition-all p-3 block"
                  >
                    <div className="relative aspect-[3/4] bg-neutral-900 overflow-hidden mb-3">
                      <Image
                        src={product.imageUrl || "/images/products/shadow_hoodie_front.jpg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      {product.isLimited && (
                        <span className="absolute top-2 left-2 bg-[#e50914] text-white text-[9px] font-mono uppercase px-2 py-0.5">
                          LIMITED
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-start text-xs font-mono text-neutral-400">
                      <span>{product.category}</span>
                      <span className="text-white font-bold">
                        {product.price.toLocaleString("tr-TR")} ₺
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold tracking-tight uppercase text-white mt-1 group-hover:text-neutral-300">
                      {product.name}
                    </h4>
                  </Link>
                ))}
              </div>
            ) : (
              !loading && (
                <div className="text-center py-20 text-neutral-500">
                  <p className="text-lg uppercase tracking-widest font-light">
                    "{query}" ile eşleşen parça bulunamadı.
                  </p>
                  <p className="text-xs font-mono text-neutral-600 mt-2">
                    Lütfen kelimelerinizi kontrol edin veya kategorilere göz atın.
                  </p>
                </div>
              )
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
