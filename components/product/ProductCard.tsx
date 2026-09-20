"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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

  // 3D Tilt Effect State
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    
    // Y ekseninde dönüş (sol/sağ), X ekseninde dönüş (yukarı/aşağı)
    const tiltX = ((y - centerY) / centerY) * -5; // max 5 derece
    const tiltY = ((x - centerX) / centerX) * 5;

    setRotateX(tiltX);
    setRotateY(tiltY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  // Calculate sold percentage for limited releases
  const percentSold =
    product.isLimited && product.totalPieces
      ? Math.min(100, Math.round(((product.piecesSold || 0) / product.totalPieces) * 100))
      : null;

  return (
    <motion.div
      data-cursor="view"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className="group relative flex flex-col bg-background border border-border hover:border-foreground/20 transition-colors duration-300 z-10 hover:z-20 shadow-none hover:shadow-2xl hover:shadow-[#e50914]/5"
    >
      {/* Image Container with Badges */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#0a0a0a] block"
      >
        <Image
          src={isHovered ? hoverImage : primaryImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Hover overlay with glitch-like line */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-white/20 animate-scanline" />
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10" style={{ transform: "translateZ(30px)" }}>
          <div className="flex flex-col gap-1.5">
            {product.isLimited && (
              <span className="bg-[#e50914] text-white text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 shadow-lg shadow-black/50 backdrop-blur-md">
                LIMITED DROP
              </span>
            )}
            {product.compareAtPrice && (
              <span className="bg-white text-black text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5">
                SALE
              </span>
            )}
          </div>

          <button
            onClick={handleWishlistClick}
            className={`p-2 bg-background/50 backdrop-blur-md border border-border hover:border-foreground transition-all ${
              isFavorited ? "text-[#e50914]" : "text-foreground"
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Sizes & Quick Add (Desktop Hover) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 hidden sm:block">
          <div className="space-y-3" style={{ transform: "translateZ(20px)" }}>
            <div className="flex gap-2 justify-center">
              {product.variants?.map((v) => (
                <button
                  key={v.size}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedSize(v.size);
                  }}
                  disabled={v.stock === 0}
                  className={`w-8 h-8 flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                    v.stock === 0
                      ? "opacity-30 line-through cursor-not-allowed"
                      : selectedSize === v.size
                      ? "bg-white text-black"
                      : "bg-black/50 text-white border border-white/20 hover:border-white"
                  }`}
                >
                  {v.size}
                </button>
              ))}
            </div>
            <button
              onClick={handleQuickAdd}
              className="w-full py-2.5 bg-foreground text-background text-[10px] font-mono font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              SEPETE EKLE
            </button>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow z-10 relative bg-background">
        <div className="flex justify-between items-start gap-4 mb-2">
          <div>
            <div className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest mb-1">
              {product.category}
            </div>
            <Link
              href={`/product/${product.slug}`}
              className="text-sm font-bold font-sans uppercase tracking-tight text-foreground group-hover:text-[#e50914] transition-colors line-clamp-1"
            >
              {product.name}
            </Link>
          </div>
          <div className="text-right shrink-0">
            <div className="text-sm font-mono font-bold text-foreground">
              {product.price.toLocaleString("tr-TR")} ₺
            </div>
            {product.compareAtPrice && (
              <div className="text-[10px] font-mono text-neutral-500 line-through">
                {product.compareAtPrice.toLocaleString("tr-TR")} ₺
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar for Limited Items */}
        {product.isLimited && percentSold !== null && (
          <div className="mt-auto pt-4 border-t border-border">
            <div className="flex justify-between text-[9px] font-mono uppercase tracking-widest mb-1.5">
              <span className="text-[#e50914] font-bold">SOLD OUT: {percentSold}%</span>
              <span className="text-neutral-500">
                {product.piecesSold} / {product.totalPieces}
              </span>
            </div>
            <div className="w-full h-1 bg-neutral-900">
              <div
                className="h-full bg-[#e50914]"
                style={{ width: `${percentSold}%` }}
              />
            </div>
          </div>
        )}

        {/* Mobile Quick Add */}
        <button
          onClick={handleQuickAdd}
          className="mt-4 sm:hidden w-full py-2.5 bg-[#111] hover:bg-neutral-900 text-foreground text-[10px] font-mono font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          HIZLI EKLE
        </button>
      </div>
    </motion.div>
  );
}
