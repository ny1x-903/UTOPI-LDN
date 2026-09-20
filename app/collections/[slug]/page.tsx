import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product/ProductCard";
import { Sparkles, Calendar, Layers } from "lucide-react";

export const dynamicParams = false;

export async function generateStaticParams() {
  const collections = await prisma.collection.findMany({ select: { slug: true } });
  return collections.map((collection) => ({
    slug: collection.slug,
  }));
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const collection = await prisma.collection.findUnique({
    where: { slug },
    include: {
      products: {
        where: { status: "ACTIVE" },
        include: {
          images: { orderBy: { order: "asc" } },
          variants: true,
        },
      },
    },
  });

  if (!collection) {
    notFound();
  }

  const formattedProducts = collection.products.map((p) => ({
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
    <div className="pt-20 min-h-screen bg-[#050505] text-white">
      {/* Cinematic Collection Hero */}
      <div className="relative w-full h-[55vh] min-h-[450px] flex items-end pb-12 overflow-hidden border-b border-neutral-900">
        <Image
          src={collection.heroImage}
          alt={collection.title}
          fill
          priority
          className="object-cover opacity-35 scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] px-2.5 py-1 bg-[#e50914] text-white font-bold">
              DROP #{collection.dropNumber}
            </span>
            {collection.releaseDate && (
              <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                LANSMAN: {new Date(collection.releaseDate).toLocaleDateString("tr-TR")}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight font-sans">
            {collection.title}
          </h1>

          <p className="text-xs sm:text-sm font-mono text-neutral-300 max-w-2xl leading-relaxed uppercase">
            {collection.manifesto}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between pb-6 border-b border-neutral-900 mb-8">
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-[#e50914]" />
            KOLEKSİYONDAKİ PARÇALAR [{formattedProducts.length}]
          </span>
          <span className="text-xs font-mono text-neutral-500">
            HER PARÇA SINIRLI NUMARALIDIR
          </span>
        </div>

        {formattedProducts.length === 0 ? (
          <div className="py-20 text-center text-neutral-500 font-mono text-xs uppercase">
            BU DROP İÇİN PARÇALAR HAZIRLANIYOR.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {formattedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
