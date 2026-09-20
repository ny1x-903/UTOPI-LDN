"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { ProductCard, ProductCardProps } from "@/components/product/ProductCard";

interface FeaturedGridProps {
  products: ProductCardProps["product"][];
}

const CATEGORIES = ["TÜMÜ", "HOODIES", "CARGOS", "T-SHIRTS", "JACKETS", "ACCESSORIES"];

// Framer Motion variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export function FeaturedGrid({ products }: FeaturedGridProps) {
  const [activeCategory, setActiveCategory] = useState("TÜMÜ");

  const filteredProducts =
    activeCategory === "TÜMÜ"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="relative py-24 bg-[#111111] text-foreground overflow-hidden">
      {/* Premium Divider Top */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF5500]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header and Category Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF5500] mb-1">
              <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
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
                className={`px-3.5 py-1.5 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#FF5500] text-white scale-105 border-[#FF5500] shadow-[0_0_15px_rgba(255,85,0,0.4)]"
                    : "bg-[#181818] text-neutral-400 border border-border hover:border-[#FF5500]/50 hover:text-[#FF5500]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Product Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <Link
            href="/shop"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#181818] border border-[#FF5500]/30 text-white text-xs font-mono font-bold tracking-widest uppercase overflow-hidden shadow-[0_0_15px_rgba(255,85,0,0.1)] hover:border-[#FF5500]"
          >
            {/* Hover Glitch Background */}
            <div className="absolute inset-0 w-0 bg-[#FF5500] transition-all duration-500 ease-out group-hover:w-full z-0" />
            
            <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
              TÜM ARŞİVİ GÖRÜNTÜLE ({products.length}+ PARÇA)
            </span>
            <ArrowRight className="w-4 h-4 text-[#FF5500] relative z-10 transition-colors duration-500 group-hover:text-white" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
