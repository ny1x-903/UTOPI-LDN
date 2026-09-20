import { prisma } from "@/lib/prisma";
import { ShopCatalog } from "@/components/shop/ShopCatalog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KOLEKSİYON // UTOPIA LDN ARCHIVE",
  description:
    "Explore the complete UTOPIA LDN streetwear archive. Heavyweight hoodies, tactical cargos, boxy tees, and technical outerwear.",
};

export const dynamic = "force-static";

export default async function ShopPage() {
  const [rawProducts, collections] = await Promise.all([
    prisma.product.findMany({
      where: { status: "ACTIVE" },
      include: {
        images: { orderBy: { order: "asc" } },
        variants: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.collection.findMany({
      select: { id: true, slug: true, title: true },
    }),
  ]);

  const products = rawProducts.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    subtitle: p.subtitle,
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    category: p.category,
    color: p.color,
    isLimited: p.isLimited,
    totalPieces: p.totalPieces,
    piecesSold: p.piecesSold,
    images: p.images.map((img) => ({
      url: img.url,
      alt: img.alt,
      type: img.type,
    })),
    variants: p.variants.map((v) => ({
      size: v.size,
      stock: v.stock,
    })),
  }));

  return (
    <div className="pt-24 min-h-screen bg-[#1c1c1c] text-white">
      {/* Page Header Banner */}
      <div className="border-b border-neutral-900 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF5500] block mb-1">
          UTOPIA LDN ARCHIVE // REPO 34
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight font-sans">
          TÜM KOLEKSİYON
        </h1>
        <p className="text-xs font-mono text-neutral-400 mt-2 max-w-xl uppercase leading-relaxed">
          Tavizsiz kumaş standartları ve sınırlı üretim felsefesiyle tasarlanmış orijinal sokak silüetleri.
        </p>
      </div>

      {/* Main Catalog View */}
      <ShopCatalog
        initialProducts={products}
        collections={collections}
        initialCategory={"TÜMÜ"}
      />
    </div>
  );
}

