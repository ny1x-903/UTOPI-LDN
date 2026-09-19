"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard, ProductCardProps } from "@/components/product/ProductCard";

interface WishlistViewProps {
  allProducts: ProductCardProps["product"][];
}

export function WishlistView({ allProducts }: WishlistViewProps) {
  const { wishlistIds, count } = useWishlist();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="py-24 text-center text-xs font-mono text-neutral-500">
        FAVORİLER YÜKLENİYOR...
      </div>
    );
  }

  const favoriteProducts = allProducts.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-6 border-b border-neutral-900 mb-8">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-[#e50914] fill-[#e50914]" />
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            KAYDEDİLEN PARÇALAR [{favoriteProducts.length}]
          </span>
        </div>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="py-24 text-center space-y-4 border border-dashed border-neutral-900 p-8">
          <div className="w-12 h-12 border border-neutral-800 text-neutral-600 flex items-center justify-center mx-auto">
            <Heart className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-mono uppercase tracking-wider text-neutral-300 font-bold">
            FAVORİ LİSTENİZDE HENÜZ PARÇA YOK
          </h2>
          <p className="text-xs font-mono text-neutral-500 max-w-sm mx-auto">
            Koleksiyondan beğendiğiniz parçaların üzerindeki kalp ikonuna tıklayarak buraya ekleyebilirsiniz.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-xs font-mono font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
          >
            KOLEKSİYONU KEŞFET
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
