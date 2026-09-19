import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { CheckCircle2, Truck, Package, ArrowRight, ShieldCheck } from "lucide-react";

export const revalidate = 0;

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#050505] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header Card */}
        <div className="p-8 md:p-12 bg-neutral-950 border border-neutral-900 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#e50914]/10 border border-[#e50914] text-[#e50914] mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-[10px] font-mono tracking-[0.25em] text-[#e50914] uppercase block">
            SİPARİŞİNİZ BAŞARIYLA OLUŞTURULDU
          </span>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-sans">
            TEŞEKKÜRLER, {order.customerName.split(" ")[0]}
          </h1>

          <p className="text-xs font-mono text-neutral-400 max-w-md mx-auto uppercase leading-relaxed">
            Sipariş onayınız ve kargo takip bilgileriniz <strong>{order.customerEmail}</strong> adresine iletildi.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <div className="px-4 py-2 bg-neutral-900 border border-neutral-800">
              <span className="text-neutral-500 block text-[10px]">SİPARİŞ NUMARASI:</span>
              <span className="font-bold text-white text-sm">{order.orderNumber}</span>
            </div>
            <div className="px-4 py-2 bg-neutral-900 border border-neutral-800">
              <span className="text-neutral-500 block text-[10px]">YURTİÇİ KARGO TAKİP KODU:</span>
              <span className="font-bold text-[#e50914] text-sm">{order.trackingNumber}</span>
            </div>
          </div>
        </div>

        {/* Live Delivery Timeline */}
        <div className="mt-8 p-6 md:p-8 bg-neutral-950 border border-neutral-900">
          <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6 flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#e50914]" />
            SİPARİŞ SEVKİYAT DURUMU (CANLI TAKİP)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 bg-neutral-900 border-l-2 border-[#e50914]">
              <span className="text-[10px] text-[#e50914] block">ADIM 1</span>
              <strong className="text-white">SİPARİŞ ALINDI</strong>
              <p className="text-[10px] text-neutral-500 mt-1">Ödeme doğrulandı</p>
            </div>
            <div className="p-3 bg-neutral-900 border-l-2 border-[#e50914]">
              <span className="text-[10px] text-[#e50914] block">ADIM 2</span>
              <strong className="text-white">ARŞİV KUTULAMA</strong>
              <p className="text-[10px] text-neutral-500 mt-1">Kalite kontrol yapılıyor</p>
            </div>
            <div className="p-3 bg-neutral-900/40 border-l-2 border-neutral-700">
              <span className="text-[10px] text-neutral-500 block">ADIM 3</span>
              <span className="text-neutral-400">YURTİÇİ KARGO</span>
              <p className="text-[10px] text-neutral-600 mt-1">24-48 saatte çıkış</p>
            </div>
            <div className="p-3 bg-neutral-900/40 border-l-2 border-neutral-700">
              <span className="text-[10px] text-neutral-500 block">ADIM 4</span>
              <span className="text-neutral-400">TESLİM EDİLDİ</span>
              <p className="text-[10px] text-neutral-600 mt-1">Adrese teslim</p>
            </div>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Purchased Items */}
          <div className="p-6 bg-neutral-950 border border-neutral-900 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white border-b border-neutral-900 pb-3 flex items-center gap-2">
              <Package className="w-4 h-4 text-[#e50914]" />
              SİPARİŞ EDİLEN PARÇALAR
            </h3>

            <div className="divide-y divide-neutral-900 space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex gap-3">
                  <div className="relative w-14 h-18 bg-neutral-900 flex-shrink-0 overflow-hidden border border-neutral-800">
                    <Image
                      src={item.imageUrl || "/images/products/shadow_hoodie_front.jpg"}
                      alt={item.productName}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="flex-1 text-xs font-mono">
                    <h4 className="font-bold text-white uppercase">{item.productName}</h4>
                    <p className="text-[10px] text-neutral-500 mt-0.5">
                      BEDEN: {item.size} // ADET: {item.quantity}
                    </p>
                    <span className="text-white font-bold block mt-1">
                      {(item.unitPrice * item.quantity).toLocaleString("tr-TR")} ₺
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-900 pt-3 space-y-1 text-xs font-mono text-neutral-400">
              <div className="flex justify-between">
                <span>ARA TOPLAM</span>
                <span className="text-white">{order.subtotal.toLocaleString("tr-TR")} ₺</span>
              </div>
              {order.discountTotal > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>İNDİRİM</span>
                  <span>-{order.discountTotal.toLocaleString("tr-TR")} ₺</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>KARGO ÜCRETİ</span>
                <span className="text-white">
                  {order.shippingFee === 0 ? "ÜCRETSİZ" : `${order.shippingFee} ₺`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-neutral-800">
                <span>ÖDENEN TOPLAM</span>
                <span className="text-base text-glow-white">
                  {order.totalAmount.toLocaleString("tr-TR")} ₺
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Address & Security Note */}
          <div className="p-6 bg-neutral-950 border border-neutral-900 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white border-b border-neutral-900 pb-3">
                TESLİMAT ADRESİ
              </h3>
              <div className="text-xs font-mono text-neutral-300 space-y-1">
                <p className="font-bold text-white uppercase">{order.customerName}</p>
                <p>{order.customerPhone}</p>
                <p className="text-neutral-400">{order.shippingAddress}</p>
                <p className="text-neutral-400 uppercase">
                  {order.district} / {order.city} {order.postalCode}
                </p>
                {order.orderNotes && (
                  <p className="text-[11px] text-neutral-500 pt-2 border-t border-neutral-900">
                    NOT: {order.orderNotes}
                  </p>
                )}
              </div>
            </div>

            <div className="p-4 bg-neutral-900/60 border border-neutral-800 text-[11px] font-mono text-neutral-400 space-y-2">
              <p className="flex items-center gap-1.5 text-white font-bold uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-[#e50914]" />
                ORİJİNAL GARANTİ SERTİFİKASI
              </p>
              <p>
                Kutunuz açıldığında numaralandırılmış holografik NFC güvenlik kartı bulunmaktadır.
              </p>
            </div>

            <Link
              href="/shop"
              className="w-full py-4 bg-white hover:bg-neutral-200 text-black text-xs font-extrabold uppercase tracking-widest text-center flex items-center justify-center gap-2 transition-colors"
            >
              ALIŞVERİŞE DEVAM ET
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
