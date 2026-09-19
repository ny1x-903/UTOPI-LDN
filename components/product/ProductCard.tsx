"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    name: string;
    subtitle?: string | null;
    price: number;
    compareAtPrice?: number | null;
    category: string;
    color: string;
    isLimited: boolean;
    totalPieces?: number | null;
    piecesSold?: number;
    images: { url: string; alt?: string | null; type?: string }[];
    variants?: { size: string; stock: number }[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("M");

  const primaryImage = product.images[0]?.url || "/images/products/shadow_hoodie_front.jpg";
  const hoverImage = product.images[1]?.url || primaryImage;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      size: selectedSize,
      quantity: 1,
      image: primaryImage,
      color: product.color,
    });
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const isFavorited = isInWishlist(product.id);

  // Calculate sold percentage for limited releases
  const percentSold =
    product.isLimited && product.totalPieces
      ? Math.min(100, Math.round(((product.piecesSold || 0) / product.totalPieces) * 100))
      : null;

  return (
    <div
      data-cursor="view"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-[#070707] border border-neutral-900 hover:border-neutral-700 transition-all duration-300"
    >
      {/* Image Container with Badges */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950 block"
      >
        <Image
          src={isHovered ? hoverImage : primaryImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
          <div className="flex flex-col gap-1.5">
            {product.isLimited && (
              <span className="bg-[#e50914] text-white text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5">
                LIMITED DROP
              </span>
            )}
            {product.compareAtPrice && (
              <span className="bg-white text-black text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5">
                SALE
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            className={`p-2 backdrop-blur-md border transition-colors ${
              isFavorited
                ? "bg-[#e50914] border-[#e50914] text-white"
                : "bg-black/40 border-white/10 text-white hover:bg-black/70"
            }`}
            aria-label="Favorilere ekle"
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorited ? "fill-white" : ""}`} />
          </button>
        </div>

        {/* Quick Add Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          {/* Quick Size Selectors */}
          <div className="flex justify-center gap-1 mb-2 bg-black/80 backdrop-blur-md p-1 border border-neutral-800">
            {["S", "M", "L", "XL"].map((sz) => (
              <button
                key={sz}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedSize(sz);
                }}
                className={`text-[10px] font-mono font-bold py-1 px-2.5 transition-colors ${
                  selectedSize === sz
                    ? "bg-white text-black"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 bg-white text-black text-[11px] font-extrabold uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1.5 shadow-lg"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            HIZLI EKLE ({selectedSize})
          </button>
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between border-t border-neutral-900/60">
        <div>
          <div className="flex justify-between items-baseline text-[11px] font-mono text-neutral-500 uppercase">
            <span>{product.category}</span>
            <span>{product.color}</span>
          </div>

          <Link href={`/product/${product.slug}`} className="block mt-1">
            <h3 className="text-sm font-bold uppercase tracking-tight text-white group-hover:text-neutral-300 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mt-3 pt-2 border-t border-neutral-900 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold font-mono text-white">
              {product.price.toLocaleString("tr-TR")} ₺
            </span>
            {product.compareAtPrice && (
              <span className="text-xs font-mono line-through text-neutral-600">
                {product.compareAtPrice.toLocaleString("tr-TR")} ₺
              </span>
            )}
          </div>

          {product.isLimited && percentSold !== null && (
            <span className="text-[10px] font-mono text-[#e50914]">
              {product.piecesSold} / {product.totalPieces} SATILDI
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
