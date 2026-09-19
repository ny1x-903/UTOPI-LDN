import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  TrendingUp,
  Package,
  ShoppingBag,
  AlertTriangle,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
} from "lucide-react";
import { AdminAIAssistant } from "@/components/admin/AdminAIAssistant";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [orders, products, collections, lowStockVariants] = await Promise.all([
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      include: { items: true },
    }),
    prisma.product.findMany({
      where: { status: "ACTIVE" },
      include: { variants: true },
    }),
    prisma.collection.findMany(),
    prisma.productVariant.findMany({
      where: { stock: { lte: 3 } },
      include: { product: true },
      take: 6,
    }),
  ]);

  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalItemsSold = orders.reduce(
    (acc, o) => acc + o.items.reduce((s, it) => s + it.quantity, 0),
    0
  );

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-900">
          <div>
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#e50914] uppercase block">
              CREATIVE DIRECTION & OPERATIONS CONTROL
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-sans">
              UTOPIA ADMIN SUITE
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/ai-generator"
              className="px-5 py-2.5 bg-[#e50914] hover:bg-[#c70812] text-white text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 transition-colors shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI DROP GENERATOR
            </Link>
            <Link
              href="/shop"
              className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white text-xs font-mono uppercase tracking-wider"
            >
              CANLI MAĞAZA
            </Link>
          </div>
        </div>

        {/* Core KPI Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-neutral-950 border border-neutral-900 space-y-2">
            <div className="flex justify-between items-center text-neutral-400 text-xs font-mono">
              <span>TOPLAM CİRO</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
              {totalRevenue.toLocaleString("tr-TR")} ₺
            </div>
            <p className="text-[10px] font-mono text-emerald-400">
              ✓ Gerçek zamanlı sipariş verileri
            </p>
          </div>

          <div className="p-5 bg-neutral-950 border border-neutral-900 space-y-2">
            <div className="flex justify-between items-center text-neutral-400 text-xs font-mono">
              <span>SİPARİŞ SAYISI</span>
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
              {orders.length} SİPARİŞ
            </div>
            <p className="text-[10px] font-mono text-neutral-500">
              {totalItemsSold} parça sevk edildi
            </p>
          </div>

          <div className="p-5 bg-neutral-950 border border-neutral-900 space-y-2">
            <div className="flex justify-between items-center text-neutral-400 text-xs font-mono">
              <span>AKTİF PARÇA SAYISI</span>
              <Package className="w-4 h-4 text-[#e50914]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
              {products.length} GARMENT
            </div>
            <p className="text-[10px] font-mono text-neutral-500">
              {collections.length} aktif drop koleksiyonu
            </p>
          </div>

          <div className="p-5 bg-neutral-950 border border-neutral-900 space-y-2">
            <div className="flex justify-between items-center text-neutral-400 text-xs font-mono">
              <span>KRİTİK STOK UYARISI</span>
              <AlertTriangle className="w-4 h-4 text-[#e50914]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#e50914]">
              {lowStockVariants.length} BEDEN
            </div>
            <p className="text-[10px] font-mono text-neutral-500">
              Stok ≤ 3 parça kalan varyantlar
            </p>
          </div>
        </div>

        {/* AI Command Assistant Terminal */}
        <AdminAIAssistant />

        {/* Two-Column Section: Recent Orders & Inventory Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Orders Table */}
          <div className="lg:col-span-8 p-6 bg-neutral-950 border border-neutral-900 space-y-4">
            <div className="flex justify-between items-center border-b border-neutral-900 pb-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
                SON SİPARİŞLER ({orders.length})
              </h3>
              <span className="text-[10px] font-mono text-neutral-500">
                YURTİÇİ KARGO ENTEGRASYONLU
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="py-12 text-center text-xs font-mono text-neutral-500">
                HENÜZ SİPARİŞ OLUŞTURULMADI. MAĞAZADAN TEST SİPARİŞİ VEREBİLİRSİNİZ.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono text-left border-collapse">
                  <thead>
                    <tr className="text-neutral-500 border-b border-neutral-900">
                      <th className="py-2.5">SİPARİŞ NO</th>
                      <th className="py-2.5">MÜŞTERİ</th>
                      <th className="py-2.5">ŞEHİR</th>
                      <th className="py-2.5">TUTAR</th>
                      <th className="py-2.5">KARGO TAKİP</th>
                      <th className="py-2.5">DURUM</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900 text-neutral-300">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-neutral-900/40 transition-colors">
                        <td className="py-3 font-bold text-white">{order.orderNumber}</td>
                        <td className="py-3">{order.customerName}</td>
                        <td className="py-3 uppercase">{order.city}</td>
                        <td className="py-3 font-bold text-white">
                          {order.totalAmount.toLocaleString("tr-TR")} ₺
                        </td>
                        <td className="py-3 text-[#e50914]">{order.trackingNumber}</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-[10px] text-emerald-400">
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Low Stock & Inventory Status */}
          <div className="lg:col-span-4 p-6 bg-neutral-950 border border-neutral-900 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#e50914] border-b border-neutral-900 pb-3 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              KRİTİK STOK LİSTESİ
            </h3>

            <div className="space-y-3">
              {lowStockVariants.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-between text-xs font-mono"
                >
                  <div>
                    <h4 className="font-bold text-white uppercase line-clamp-1">
                      {item.product.name}
                    </h4>
                    <span className="text-[10px] text-neutral-400">
                      BEDEN: {item.size} // SKU: {item.sku}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-1 font-bold text-xs ${
                      item.stock === 0
                        ? "bg-red-950 text-[#e50914] border border-[#e50914]"
                        : "bg-amber-950 text-amber-400 border border-amber-500"
                    }`}
                  >
                    {item.stock === 0 ? "TÜKENDİ" : `${item.stock} ADET`}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-neutral-900">
              <Link
                href="/admin/ai-generator"
                className="w-full py-3 bg-white text-black hover:bg-neutral-200 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                YENİ DROP OLUŞTUR
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
