"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard, ProductCardProps } from "@/components/product/ProductCard";

interface FeaturedGridProps {
  products: ProductCardProps["product"][];
}

const CATEGORIES = ["TÜMÜ", "HOODIES", "CARGOS", "T-SHIRTS", "JACKETS", "ACCESSORIES"];

export function FeaturedGrid({ products }: FeaturedGridProps) {
  const [activeCategory, setActiveCategory] = useState("TÜMÜ");

  const filteredProducts =
    activeCategory === "TÜMÜ"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="py-24 bg-[#050505] text-white border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header and Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-900">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#e50914] mb-1">
              <span className="w-2 h-2 rounded-full bg-[#e50914]" />
              SECTION 07 // CURATED STREETWEAR SELECTION
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-sans">
              ÖNE ÇIKAN PARÇALAR
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-mono font-bold tracking-wider uppercase transition-all ${
                  activeCategory === cat
                    ? "bg-white text-black"
                    : "bg-neutral-950 text-neutral-400 border border-neutral-900 hover:border-neutral-600 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 bg-neutral-950 border border-neutral-800 hover:border-white text-white text-xs font-mono font-bold tracking-widest uppercase transition-all"
          >
            TÜM ARŞİVİ GÖRÜNTÜLE ({products.length}+ PARÇA)
            <ArrowRight className="w-4 h-4 text-[#e50914]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
