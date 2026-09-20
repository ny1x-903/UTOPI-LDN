import { prisma } from "@/lib/prisma";
import { WishlistView } from "@/components/wishlist/WishlistView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAVORİLERİM // UTOPIA LDN",
  description: "Kaydettiğiniz özel UTOPIA LDN sokak giyim parçaları ve sınırlı drop parçaları.",
};


export default async function WishlistPage() {
  const rawProducts = await prisma.product.findMany({
    where: { status: "ACTIVE" },
    include: {
      images: { orderBy: { order: "asc" } },
      variants: true,
    },
  });

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
    <div className="pt-28 pb-20 min-h-screen bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-neutral-900 pb-6">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#e50914] block mb-1">
            KİŞİSEL ARŞİV
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-sans">
            FAVORİ PARÇALAR
          </h1>
        </div>

        <WishlistView allProducts={products} />
      </div>
    </div>
  );
}
