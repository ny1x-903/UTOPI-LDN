"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  CreditCard,
  Building2,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

const TURKISH_CITIES = [
  "İstanbul",
  "Ankara",
  "İzmir",
  "Bursa",
  "Antalya",
  "Adana",
  "Konya",
  "Gaziantep",
  "Kocaeli",
  "Mersin",
  "Diyarbakır",
  "Eskişehir",
  "Samsun",
  "Denizli",
  "Trabzon",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shippingFee, discountAmount, discountCode, total, clearCart } =
    useCart();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    city: "İstanbul",
    district: "",
    address: "",
    postalCode: "",
    orderNotes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"CREDIT_CARD" | "BANK_TRANSFER">(
    "CREDIT_CARD"
  );
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [show3DSModal, setShow3DSModal] = useState(false);
  const [smsCode, setSmsCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !loading && !show3DSModal) {
      // Allow time for client hydration
      const timeout = setTimeout(() => {
        if (items.length === 0) router.push("/shop");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [items, router, loading, show3DSModal]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  };

  const handleInitiateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name || !formData.surname || !formData.email || !formData.phone || !formData.address || !formData.district) {
      setErrorMsg("Lütfen tüm zorunlu teslimat alanlarını eksiksiz doldurunuz.");
      return;
    }

    if (paymentMethod === "CREDIT_CARD") {
      const cleanNum = cardData.number.replace(/\s/g, "");
      if (cleanNum.length < 15 || cardData.expiry.length < 4 || cardData.cvv.length < 3) {
        setErrorMsg("Lütfen geçerli bir kart numarası, son kullanma tarihi ve CVV giriniz.");
        return;
      }
      // Open 3D Secure Verification Simulation
      setShow3DSModal(true);
    } else {
      finalizeOrder();
    }
  };

  const finalizeOrder = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.name,
          customerSurname: formData.surname,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          city: formData.city,
          district: formData.district,
          address: formData.address,
          postalCode: formData.postalCode,
          orderNotes: formData.orderNotes,
          discountCode,
          items,
          paymentMethod,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        clearCart();
        router.push(`/order-confirmation/${data.orderId}`);
      } else {
        setErrorMsg(data.error || "Sipariş işlenirken bir sorun oluştu.");
        setShow3DSModal(false);
      }
    } catch {
      setErrorMsg("Bağlantı hatası oluştu. Lütfen tekrar deneyiniz.");
      setShow3DSModal(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#1c1c1c] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Header */}
        <div className="border-b border-neutral-900 pb-6 mb-8 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#e50914] block">
              GÜVENLİ ÖDEME ALTYAPISI // 256-BIT SSL
            </span>
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight font-sans">
              SİPARİŞİ TAMAMLA
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">ŞİFRELENMİŞ BAĞLANTI</span>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-950/40 border border-[#e50914] text-xs font-mono text-red-200 flex items-center gap-3">
            <AlertCircle className="w-4 h-4 text-[#e50914] flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleInitiateOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Delivery and Payment Form */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Contact Info */}
            <div className="p-6 bg-neutral-950 border border-neutral-900 space-y-4">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#e50914] flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#e50914] text-black flex items-center justify-center text-[10px]">
                  1
                </span>
                İLETİŞİM BİLGİLERİ
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <label className="block text-neutral-400 mb-1">AD *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Adınız"
                    className="w-full bg-[#111] border border-neutral-800 p-3 text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">SOYAD *</label>
                  <input
                    type="text"
                    name="surname"
                    required
                    value={formData.surname}
                    onChange={handleInputChange}
                    placeholder="Soyadınız"
                    className="w-full bg-[#111] border border-neutral-800 p-3 text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">E-POSTA *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ornek@utopialdn.com"
                    className="w-full bg-[#111] border border-neutral-800 p-3 text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">TELEFON (+90) *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="0532 123 45 67"
                    className="w-full bg-[#111] border border-neutral-800 p-3 text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="p-6 bg-neutral-950 border border-neutral-900 space-y-4">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#e50914] flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#e50914] text-black flex items-center justify-center text-[10px]">
                  2
                </span>
                TESLİMAT ADRESİ (YURTİÇİ KARGO)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <label className="block text-neutral-400 mb-1">İL *</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-[#111] border border-neutral-800 p-3 text-white focus:outline-none focus:border-white"
                  >
                    {TURKISH_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">İLÇE *</label>
                  <input
                    type="text"
                    name="district"
                    required
                    value={formData.district}
                    onChange={handleInputChange}
                    placeholder="Kadıköy, Beşiktaş, Çankaya..."
                    className="w-full bg-[#111] border border-neutral-800 p-3 text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-neutral-400 mb-1">AÇIK TESLİMAT ADRESİ *</label>
                  <textarea
                    name="address"
                    required
                    rows={2}
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Cadde, Mahalle, Sokak, Bina No, Daire..."
                    className="w-full bg-[#111] border border-neutral-800 p-3 text-white focus:outline-none focus:border-white resize-none"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">POSTA KODU</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="34710"
                    className="w-full bg-[#111] border border-neutral-800 p-3 text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">SİPARİŞ NOTU (OPSİYONEL)</label>
                  <input
                    type="text"
                    name="orderNotes"
                    value={formData.orderNotes}
                    onChange={handleInputChange}
                    placeholder="Kurye için kapı notu..."
                    className="w-full bg-[#111] border border-neutral-800 p-3 text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="p-6 bg-neutral-950 border border-neutral-900 space-y-4">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#e50914] flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#e50914] text-black flex items-center justify-center text-[10px]">
                  3
                </span>
                ÖDEME YÖNTEMİ
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("CREDIT_CARD")}
                  className={`p-4 border text-left flex items-start gap-3 transition-colors ${
                    paymentMethod === "CREDIT_CARD"
                      ? "bg-neutral-900 border-white text-white"
                      : "bg-[#111] border-neutral-800 text-neutral-400 hover:border-neutral-600"
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#e50914] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold font-mono uppercase">
                      KREDİ / BANKA KARTI
                    </div>
                    <div className="text-[10px] font-mono text-neutral-500 mt-1">
                      PayTR / iyzico 3D Secure Altyapısı
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("BANK_TRANSFER")}
                  className={`p-4 border text-left flex items-start gap-3 transition-colors ${
                    paymentMethod === "BANK_TRANSFER"
                      ? "bg-neutral-900 border-white text-white"
                      : "bg-[#111] border-neutral-800 text-neutral-400 hover:border-neutral-600"
                  }`}
                >
                  <Building2 className="w-5 h-5 text-[#e50914] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold font-mono uppercase">HAVALE / EFT</div>
                    <div className="text-[10px] font-mono text-neutral-500 mt-1">
                      Garanti BBVA / Enpara / QNB
                    </div>
                  </div>
                </button>
              </div>

              {/* Credit Card Fields */}
              {paymentMethod === "CREDIT_CARD" ? (
                <div className="mt-4 p-4 bg-[#181818] border border-neutral-800/80 space-y-3 text-xs font-mono">
                  <div>
                    <label className="block text-neutral-400 mb-1">KART ÜZERİNDEKİ İSİM</label>
                    <input
                      type="text"
                      placeholder="AD SOYAD"
                      value={cardData.name}
                      onChange={(e) =>
                        setCardData((prev) => ({ ...prev, name: e.target.value.toUpperCase() }))
                      }
                      className="w-full bg-[#111] border border-neutral-800 p-3 text-white focus:outline-none focus:border-white uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">KART NUMARASI</label>
                    <input
                      type="text"
                      maxLength={19}
                      placeholder="0000 0000 0000 0000"
                      value={cardData.number}
                      onChange={(e) =>
                        setCardData((prev) => ({
                          ...prev,
                          number: formatCardNumber(e.target.value),
                        }))
                      }
                      className="w-full bg-[#111] border border-neutral-800 p-3 text-white focus:outline-none focus:border-white font-mono tracking-widest"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-neutral-400 mb-1">SON KULLANMA</label>
                      <input
                        type="text"
                        maxLength={5}
                        placeholder="AA/YY"
                        value={cardData.expiry}
                        onChange={(e) =>
                          setCardData((prev) => ({
                            ...prev,
                            expiry: formatExpiry(e.target.value),
                          }))
                        }
                        className="w-full bg-[#111] border border-neutral-800 p-3 text-white focus:outline-none focus:border-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1">CVV / GÜVENLİK</label>
                      <input
                        type="password"
                        maxLength={3}
                        placeholder="•••"
                        value={cardData.cvv}
                        onChange={(e) =>
                          setCardData((prev) => ({
                            ...prev,
                            cvv: e.target.value.replace(/\D/g, "").slice(0, 3),
                          }))
                        }
                        className="w-full bg-[#111] border border-neutral-800 p-3 text-white focus:outline-none focus:border-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-[#181818] border border-neutral-800 text-xs font-mono space-y-2 text-neutral-300">
                  <p className="font-bold text-white uppercase">GARANTİ BBVA HESAP BİLGİLERİ:</p>
                  <p>ALICI: UTOPIA LDN TEKSTİL VE DİZAYN A.Ş.</p>
                  <p className="tracking-widest text-[#e50914]">
                    IBAN: TR34 0006 2000 0001 2345 6789 01
                  </p>
                  <p className="text-[10px] text-neutral-500">
                    Açıklama alanına ad-soyadınızı yazınız. Sipariş onaylandıktan sonra havale dekontu otomatik taranır.
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-white hover:bg-neutral-200 text-black text-xs font-extrabold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-2xl disabled:opacity-50"
            >
              {loading ? (
                <span>SİPARİŞ İŞLENİYOR...</span>
              ) : (
                <>
                  <span>ÖDEMEYİ ONAYLA VE SİPARİŞİ BİTİR</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-neutral-950 border border-neutral-900 space-y-6 lg:sticky lg:top-28">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-white border-b border-neutral-900 pb-4">
                SİPARİŞ ÖZETİ ({items.reduce((acc, i) => acc + i.quantity, 0)} PARÇA)
              </h2>

              {/* Items List */}
              <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1 custom-scroll divide-y divide-neutral-900">
                {items.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex gap-3">
                    <div className="relative w-16 h-20 bg-neutral-900 flex-shrink-0 overflow-hidden border border-neutral-800">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between text-xs font-mono">
                      <div>
                        <h4 className="font-bold text-white uppercase line-clamp-1">{item.name}</h4>
                        <p className="text-neutral-500 text-[10px] mt-0.5">
                          BEDEN: {item.size} // ADET: {item.quantity}
                        </p>
                      </div>
                      <span className="text-white font-bold">
                        {(item.price * item.quantity).toLocaleString("tr-TR")} ₺
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals Calculation */}
              <div className="border-t border-neutral-900 pt-4 space-y-2 text-xs font-mono text-neutral-400">
                <div className="flex justify-between">
                  <span>ARA TOPLAM</span>
                  <span className="text-white">{subtotal.toLocaleString("tr-TR")} ₺</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>İNDİRİM ({discountCode})</span>
                    <span>-{discountAmount.toLocaleString("tr-TR")} ₺</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>SİGORTALI KARGO</span>
                  <span className="text-white">
                    {shippingFee === 0 ? "ÜCRETSİZ" : `${shippingFee} ₺`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-3 border-t border-neutral-800">
                  <span className="font-mono">ÖDENECEK TUTAR</span>
                  <span className="text-base text-glow-white">
                    {total.toLocaleString("tr-TR")} ₺
                  </span>
                </div>
              </div>

              <div className="pt-2 text-[10px] font-mono text-neutral-500 space-y-1">
                <p className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                  BDDK VE TCMB MEVZUATINA UYGUN ÖDEME ALTYAPISI
                </p>
                <p>Kart bilgileriniz kesinlikle saklanmaz.</p>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* 3D Secure Simulation Modal */}
      {show3DSModal && (
        <div className="fixed inset-0 z-[999999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e0e0e] border border-neutral-800 max-w-md w-full p-6 text-white space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#e50914] animate-ping" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  BKM 3D SECURE GÜVENLİK DOĞRULAMASI
                </span>
              </div>
              <Lock className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="space-y-2 text-xs font-mono text-neutral-300">
              <p>
                Sayın Müşterimiz, <strong>{total.toLocaleString("tr-TR")} ₺</strong> tutarındaki
                UTOPIA LDN alışverişiniz için cep telefonunuza SMS doğrulama kodu gönderilmiştir.
              </p>
              <p className="text-[11px] text-neutral-500">
                (Simülasyon test kodu: <strong>123456</strong> veya rastgele 6 hane)
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono text-neutral-400 uppercase">
                SMS ONAY KODU:
              </label>
              <input
                type="text"
                maxLength={6}
                value={smsCode}
                onChange={(e) => setSmsCode(e.target.value)}
                placeholder="6 haneli kod"
                className="w-full bg-black border border-neutral-700 p-3 text-center text-xl font-mono tracking-widest text-white outline-none focus:border-[#e50914]"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShow3DSModal(false)}
                className="flex-1 py-3 border border-neutral-800 text-xs font-mono uppercase text-neutral-400 hover:text-white"
              >
                İPTAL
              </button>
              <button
                type="button"
                onClick={finalizeOrder}
                disabled={loading || smsCode.length < 4}
                className="flex-1 py-3 bg-white text-black text-xs font-extrabold font-mono uppercase tracking-widest hover:bg-neutral-200 disabled:opacity-40"
              >
                {loading ? "ONAYLANIYOR..." : "ONAYLA & BİTİR"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
