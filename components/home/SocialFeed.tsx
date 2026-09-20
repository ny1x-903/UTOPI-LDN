"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Camera, ShoppingBag, Heart, ExternalLink } from "lucide-react";

interface SocialPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  productSlug?: string;
  tag: string;
  isWide?: boolean;
}

const SOCIAL_POSTS: SocialPost[] = [
  {
    id: "1",
    image: "/images/hero_campaign.jpg",
    caption: "Shadow Division Hoodie — gece sokakları için tasarlandı",
    likes: 2847,
    productSlug: "utopia-shadow-division-hoodie",
    tag: "#UTOPIALDN",
    isWide: true,
  },
  {
    id: "2",
    image: "/images/products/shadow_hoodie_front.jpg",
    caption: "480 GSM French Terry — her dikiş bir manifesto",
    likes: 1923,
    productSlug: "utopia-shadow-division-hoodie",
    tag: "#BUILTFORTHESHADOWS",
  },
  {
    id: "3",
    image: "/images/products/shadow_hoodie_back.jpg",
    caption: "34-LDN koordinat baskısı — şehrin DNA'sı",
    likes: 3156,
    tag: "#DRILLCULTURE",
  },
  {
    id: "4",
    image: "/images/products/district_cargo_front.jpg",
    caption: "District Cargo — modüler cep sistemi",
    likes: 2504,
    productSlug: "district-34-tactical-cargo",
    tag: "#UTOPIALDN",
  },
  {
    id: "5",
    image: "/images/products/shadow_hoodie_front.jpg",
    caption: "Limited Drop 01 — tükenmeden yakala",
    likes: 4201,
    productSlug: "utopia-shadow-division-hoodie",
    tag: "#AFTERDARK",
    isWide: true,
  },
  {
    id: "6",
    image: "/images/hero_campaign.jpg",
    caption: "Underground koleksiyonu — sokak ve sahne arasında",
    likes: 1789,
    tag: "#UNDERGROUND",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

function formatLikes(num: number): string {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function SocialFeed() {
  return (
    <section className="py-24 bg-[#050505] text-white border-b border-neutral-900 relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[160px] md:text-[240px] font-black font-sans text-neutral-950 select-none pointer-events-none tracking-tighter opacity-30 -rotate-90 origin-center -translate-x-1/3">
        SOCIAL
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-900">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#e50914] mb-1">
              <Camera className="w-3.5 h-3.5 text-[#e50914]" />
              COMMUNITY // @UTOPIALDN
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-sans">
              SOKAĞIN SESİ
            </h2>
            <p className="text-xs font-mono text-neutral-400 mt-2 uppercase max-w-lg">
              Topluluğumuzun paylaşımları. UTOPIA LDN&apos;i giyen herkes bu
              hikayenin bir parçası.
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-950 border border-neutral-800 hover:border-white text-white text-xs font-mono font-bold tracking-widest uppercase transition-all group"
          >
            <Camera className="w-4 h-4" />
            @UTOPIALDN TAKİP ET
            <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>

        {/* Masonry Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {SOCIAL_POSTS.map((post, index) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              className={`relative group overflow-hidden bg-neutral-950 border border-neutral-900 ${
                post.isWide ? "col-span-2 row-span-2" : ""
              }`}
            >
              <div
                className={`relative w-full ${
                  post.isWide ? "aspect-square" : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes={post.isWide ? "50vw" : "25vw"}
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="text-center px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs font-mono text-white/80 max-w-[220px] leading-relaxed mb-3">
                      {post.caption}
                    </p>
                    <div className="flex items-center justify-center gap-4 text-xs font-mono">
                      <span className="flex items-center gap-1 text-[#e50914]">
                        <Heart className="w-3.5 h-3.5 fill-current" />
                        {formatLikes(post.likes)}
                      </span>
                      {post.productSlug && (
                        <Link
                          href={`/product/${post.productSlug}`}
                          className="flex items-center gap-1 text-white hover:text-[#e50914] transition-colors"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          SATIN AL
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tag Badge */}
                <div className="absolute bottom-2 left-2 text-[9px] font-mono text-white/60 bg-black/50 backdrop-blur-sm px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {post.tag}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
