import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, ShieldAlert, Layers } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MANIFESTO // UTOPIA LDN",
  description:
    "Born in the shadows of Istanbul & London. Built around individuality. Designed for those who move differently.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#1c1c1c] text-white">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="border-b border-neutral-900 pb-8">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#e50914] block mb-1">
            ORIGINAL BRAND MANIFESTO // 2026
          </span>
          <h1 className="text-4xl sm:text-7xl font-black uppercase tracking-tight font-sans">
            BUILT FOR THE SHADOWS.
          </h1>
        </div>

        {/* Hero Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 relative aspect-[16/10] bg-neutral-950 border border-neutral-900 overflow-hidden">
            <Image
              src="/images/hero_campaign.jpg"
              alt="UTOPIA LDN Underground Streetwear Campaign"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 text-[10px] font-mono text-neutral-400">
              CAMP. 01 // METROPOLİTAN DRILL DİSTOPIA
            </span>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-sans leading-tight">
              GÖZ ÖNÜNDE OLMAK İÇİN DEĞİL, <br />
              <span className="text-[#e50914]">KENDİ GERÇEKLİĞİNİ YARATMAK İÇİN.</span>
            </h2>

            <p className="text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed uppercase">
              UTOPIA LDN, tek tipleşen fast-fashion endüstrisine ve ruhsuz kalıplara karşı bir başkaldırıdır.
              İstanbul'un yer altı beton dokusu ile Londra sokaklarının drill enerjisini bir araya getirdik.
            </p>

            <p className="text-xs sm:text-sm font-mono text-neutral-400 leading-relaxed uppercase">
              Ürettiğimiz her kapüşonlu, kargo pantolon veya teknik ceket; en yoğun 480 GSM Fransız havlu pamukları,
              özel döküm metal donanımlar ve su geçirmez fermuarlarla donatılmış fonksiyonel bir zırhtır.
            </p>

            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors"
              >
                GÜNCEL DROPU İNCELE
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-neutral-900">
          <div className="p-8 bg-neutral-950 border border-neutral-900 space-y-4">
            <Layers className="w-6 h-6 text-[#e50914]" />
            <h3 className="text-base font-bold font-mono uppercase text-white">
              01 // 480 GSM TAVİZSİZ STANDART
            </h3>
            <p className="text-xs font-mono text-neutral-400 leading-relaxed uppercase">
              Kumaşlarımız özel olarak yüksek dansitede dokunur. Yıkandığında formunu kaybetmez, rüzgarı geçirmez ve kalıbını daima korur.
            </p>
          </div>

          <div className="p-8 bg-neutral-950 border border-neutral-900 space-y-4">
            <ShieldAlert className="w-6 h-6 text-[#e50914]" />
            <h3 className="text-base font-bold font-mono uppercase text-white">
              02 // SINIRLI ADETLER & ARŞİV
            </h3>
            <p className="text-xs font-mono text-neutral-400 leading-relaxed uppercase">
              Asla seri üretim yapmayız. Her parça 50 ila 150 adet arasında sınırlı numaralı olarak üretilir ve tükendiğinde sonsuza dek arşive kalkar.
            </p>
          </div>

          <div className="p-8 bg-neutral-950 border border-neutral-900 space-y-4">
            <Compass className="w-6 h-6 text-[#e50914]" />
            <h3 className="text-base font-bold font-mono uppercase text-white">
              03 // SOKAK AKSI: 34 ↔ LDN
            </h3>
            <p className="text-xs font-mono text-neutral-400 leading-relaxed uppercase">
              41.0082° N, 28.9784° E koordinatlarından doğan Türk zanaatkarlığı, uluslararası drill estetiğiyle birleşir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
