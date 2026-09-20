import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


export default async function CollectionsIndexPage() {
  const collections = await prisma.collection.findMany({
    include: {
      products: {
        select: { id: true },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-b border-neutral-900 pb-8">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#e50914] block mb-1">
            UTOPIA LDN // SEASONAL CHRONOLOGY
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight font-sans">
            TÜM DROPLAR & ARŞİV
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-2 max-w-xl uppercase leading-relaxed">
            Her sezon sınırlı sayıda üretilen ve tekrarı olmayan konsept koleksiyonlar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              className="group relative aspect-[16/11] bg-neutral-950 border border-neutral-900 hover:border-neutral-700 overflow-hidden flex flex-col justify-between p-8 transition-all"
            >
              <Image
                src={col.heroImage}
                alt={col.title}
                fill
                className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-transparent" />

              <div className="relative z-10 flex justify-between items-start">
                <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 bg-black/80 border border-neutral-800 text-white">
                  {col.products.length} PARÇA
                </span>
                <span className="text-3xl font-black font-mono text-neutral-600 group-hover:text-[#e50914] transition-colors">
                  #{col.dropNumber || "01"}
                </span>
              </div>

              <div className="relative z-10 space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-sans group-hover:text-neutral-200">
                  {col.title}
                </h2>
                <p className="text-xs font-mono text-neutral-400 line-clamp-2 leading-relaxed uppercase">
                  {col.manifesto}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-white uppercase group-hover:text-[#e50914] transition-colors">
                  KOLEKSİYONU İNCELE
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
