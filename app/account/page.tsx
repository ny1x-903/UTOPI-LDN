import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { User, Package, MapPin, Shield, ArrowRight, Truck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HESABIM & SİPARİŞ TAKİBİ // UTOPIA LDN",
  description: "Siparişleriniz, teslimat adresleriniz ve hesap detaylarınız.",
};


export default async function AccountPage() {
  // Fetch real latest orders from database
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
    take: 5,
  });

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#1c1c1c] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Profile Header Banner */}
        <div className="p-8 bg-neutral-950 border border-neutral-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-none bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white font-mono font-bold text-xl">
              UTP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black uppercase font-sans">
                  VIP KULLANICI PORTALI
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#e50914] text-white font-bold">
                  PRO ÜYE
                </span>
              </div>
              <p className="text-xs font-mono text-neutral-400 mt-1">
                Kayıtlı E-Posta: vip.member@utopialdn.com // ID: #UTP-34982
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="px-5 py-2.5 bg-white text-black text-xs font-mono font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
            >
              YENİ SİPARİŞ VER
            </Link>
            <Link
              href="/admin"
              className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-mono uppercase tracking-wider text-[#e50914]"
            >
              ADMIN PANELİ
            </Link>
          </div>
        </div>

        {/* Orders Timeline & List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-[#e50914]" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
                SİPARİŞLERİM & KARGO TAKİBİ ({orders.length})
              </h2>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="py-16 text-center space-y-4 border border-dashed border-neutral-900 p-8">
              <Package className="w-8 h-8 text-neutral-700 mx-auto" />
              <p className="text-xs font-mono uppercase text-neutral-400">
                HENÜZ KAYITLI BİR SİPARİŞİNİZ BULUNMUYOR.
              </p>
              <Link
                href="/shop"
                className="inline-block px-6 py-2.5 bg-white text-black text-xs font-mono font-bold uppercase"
              >
                İLK PARÇANI SEÇ
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-6 bg-neutral-950 border border-neutral-900 space-y-4 hover:border-neutral-800 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-900/80 pb-4 text-xs font-mono">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-white text-sm">{order.orderNumber}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-emerald-400">
                          {order.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-neutral-500">
                        {new Date(order.createdAt).toLocaleDateString("tr-TR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold text-white block">
                        {order.totalAmount.toLocaleString("tr-TR")} ₺
                      </span>
                      <span className="text-[10px] text-[#e50914]">
                        Kargo Kodu: {order.trackingNumber}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {order.items.map((it) => (
                      <div
                        key={it.id}
                        className="p-2.5 bg-neutral-900/50 border border-neutral-900 flex gap-3 items-center text-xs font-mono"
                      >
                        <div className="flex-1">
                          <h4 className="font-bold text-white uppercase line-clamp-1">{it.productName}</h4>
                          <span className="text-[10px] text-neutral-400">
                            Beden: {it.size} // {it.quantity} Adet
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-500 text-[11px] flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-neutral-400" />
                      Yurtiçi Kargo güvencesiyle sigortalı gönderi
                    </span>
                    <Link
                      href={`/order-confirmation/${order.id}`}
                      className="text-white hover:text-[#e50914] flex items-center gap-1 font-bold transition-colors"
                    >
                      DETAYLI TAKİP
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Addresses & Security */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-neutral-950 border border-neutral-900 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#e50914]" />
              KAYITLI TESLİMAT ADRESİ
            </h3>
            <div className="p-4 bg-neutral-900/50 border border-neutral-800 text-xs font-mono text-neutral-300 space-y-1">
              <p className="font-bold text-white">VARSAYILAN ADRES</p>
              <p>Bağdat Caddesi No: 142 Daire: 8</p>
              <p className="text-neutral-400">Kadıköy / İstanbul 34710</p>
              <p className="text-neutral-500">Türkiye</p>
            </div>
          </div>

          <div className="p-6 bg-neutral-950 border border-neutral-900 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#e50914]" />
              GÜVENLİK VE AYARLAR
            </h3>
            <div className="p-4 bg-neutral-900/50 border border-neutral-800 text-xs font-mono text-neutral-300 space-y-2">
              <p className="flex justify-between">
                <span>İKİ ADIMLI DOĞRULAMA (2FA):</span>
                <span className="text-emerald-400 font-bold">AKTİF</span>
              </p>
              <p className="flex justify-between">
                <span>ŞİFRELİ OTURUM:</span>
                <span className="text-white">256-BIT TLS</span>
              </p>
              <p className="text-[11px] text-neutral-500 pt-2 border-t border-neutral-800">
                Hesap ve sipariş verileriniz KVKK kapsamında korunmaktadır.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
