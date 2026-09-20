"use client";

import React, { useState, useMemo } from "react";
import { SlidersHorizontal, Grid3X3, Grid2X2, LayoutGrid, X } from "lucide-react";
import { ProductCard, ProductCardProps } from "@/components/product/ProductCard";

interface ShopCatalogProps {
  initialProducts: ProductCardProps["product"][];
  collections: { id: string; slug: string; title: string }[];
  initialCategory?: string;
}

const CATEGORIES = [
  "TÜMÜ",
  "NEW DROP",
  "HOODIES",
  "T-SHIRTS",
  "SWEATPANTS",
  "CARGOS",
  "JACKETS",
  "TRACKSUITS",
  "ACCESSORIES",
  "LIMITED",
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

export function ShopCatalog({
  initialProducts,
  collections,
  initialCategory,
}: ShopCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || "TÜMÜ"
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(7000);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        // Category filter
        if (selectedCategory !== "TÜMÜ") {
          if (selectedCategory === "NEW DROP" && !p.isLimited) return true;
          if (selectedCategory === "LIMITED" && !p.isLimited) return false;
          if (selectedCategory !== "NEW DROP" && selectedCategory !== "LIMITED") {
            if (p.category !== selectedCategory) return false;
          }
        }

        // Size filter
        if (selectedSize && p.variants) {
          const hasSizeInStock = p.variants.some(
            (v) => v.size === selectedSize && v.stock > 0
          );
          if (!hasSizeInStock) return false;
        }

        // Stock filter
        if (onlyInStock && p.variants) {
          const totalStock = p.variants.reduce((acc, v) => acc + v.stock, 0);
          if (totalStock <= 0) return false;
        }

        // Price filter
        if (p.price > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "bestseller") return (b.piecesSold || 0) - (a.piecesSold || 0);
        return 0; // featured default
      });
  }, [initialProducts, selectedCategory, selectedSize, onlyInStock, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("TÜMÜ");
    setSelectedSize(null);
    setOnlyInStock(false);
    setMaxPrice(7000);
    setSortBy("featured");
  };

  const hasActiveFilters =
    selectedCategory !== "TÜMÜ" ||
    selectedSize !== null ||
    onlyInStock ||
    maxPrice < 7000;

  return (
    <div className="w-full">
      {/* Category Pills Bar */}
      <div className="border-b border-border bg-background sticky top-[68px] z-20 overflow-x-auto custom-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1.5 py-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1 text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-foreground text-background font-bold"
                  : "text-neutral-500 hover:text-foreground bg-[#181818] border border-border hover:border-foreground/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls Bar: Filter Toggle, Count, Sorting, Grid */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-[#181818] border border-border text-xs font-mono uppercase tracking-wider text-foreground hover:border-foreground/30 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF5500]" />
              FİLTRELER {hasActiveFilters && "(AKTİF)"}
            </button>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs font-mono text-neutral-500 hover:text-[#FF5500] transition-colors flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                TEMİZLE
              </button>
            )}

            <span className="text-xs font-mono text-neutral-500 hidden sm:inline">
              [{filteredProducts.length} PARÇA LİSTELENİYOR]
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Sorting Select */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-neutral-500 hidden md:inline">SIRALA:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#181818] border border-border px-3 py-2 text-foreground font-mono text-xs uppercase outline-none focus:border-foreground"
              >
                <option value="featured">ÖNE ÇIKANLAR</option>
                <option value="bestseller">EN ÇOK SATANLAR</option>
                <option value="price-asc">FİYAT (DÜŞÜKTEN YÜKSEĞE)</option>
                <option value="price-desc">FİYAT (YÜKSEKTEN DÜŞÜĞE)</option>
              </select>
            </div>

            {/* Grid Layout Switcher (Desktop) */}
            <div className="hidden lg:flex items-center gap-1 border border-border p-1 bg-[#181818]">
              <button
                onClick={() => setGridCols(2)}
                className={`p-1.5 transition-colors ${
                  gridCols === 2 ? "bg-foreground text-background" : "text-neutral-500 hover:text-foreground"
                }`}
                aria-label="2 columns"
              >
                <Grid2X2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 transition-colors ${
                  gridCols === 3 ? "bg-foreground text-background" : "text-neutral-500 hover:text-foreground"
                }`}
                aria-label="3 columns"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 transition-colors ${
                  gridCols === 4 ? "bg-foreground text-background" : "text-neutral-500 hover:text-foreground"
                }`}
                aria-label="4 columns"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Collapsible Filter Panel */}
        {filterDrawerOpen && (
          <div className="mt-4 p-6 bg-[#181818] border border-border grid grid-cols-1 sm:grid-cols-3 gap-6 animate-in slide-in-from-top-2 duration-200">
            {/* Size Filter */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                BEDEN FİLTRESİ
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SIZES.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(selectedSize === sz ? null : sz)}
                    className={`px-3 py-1.5 text-xs font-mono font-bold transition-colors ${
                      selectedSize === sz
                        ? "bg-foreground text-background"
                        : "bg-[#181818] text-neutral-600 border border-border hover:border-foreground/30"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider text-neutral-400">
                <span>MAKSİMUM FİYAT</span>
                <span className="text-foreground font-bold">{maxPrice.toLocaleString("tr-TR")} ₺</span>
              </div>
              <input
                type="range"
                min={1000}
                max={7000}
                step={250}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#FF5500] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-600">
                <span>1.000 ₺</span>
                <span>7.000 ₺</span>
              </div>
            </div>

            {/* Availability Filter */}
            <div className="space-y-2 flex flex-col justify-end">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4 rounded-none accent-[#FF5500] bg-background border-border cursor-pointer"
                />
                <span className="text-xs font-mono uppercase text-neutral-600">
                  SADECE STOKTAKİLERİ GÖSTER
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <p className="text-xl font-mono uppercase tracking-widest text-neutral-400">
              SEÇİLİ KRİTERLERE UYGUN PARÇA BULUNAMADI.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-foreground text-background text-xs font-bold uppercase tracking-widest hover:bg-foreground/90 transition-colors"
            >
              FİLTRELERİ SIFIRLA
            </button>
          </div>
        ) : (
          <div
            className={`mt-8 grid gap-6 ${
              gridCols === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : gridCols === 4
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
