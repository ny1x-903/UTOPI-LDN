import { notFound } from "next/navigation";
import Link from "next/link";
import { FileText, ArrowLeft, ShieldCheck } from "lucide-react";
import { Metadata } from "next";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { slug: "kvkk" },
    { slug: "privacy-policy" },
    { slug: "distance-sales" },
    { slug: "return-policy" },
    { slug: "shipping-policy" },
  ];
}
interface LegalData {
  title: string;
  category: string;
  content: string;
}

const LEGAL_DOCS: { [key: string]: LegalData } = {
  kvkk: {
    title: "KVKK AYDINLATMA METNİ",
    category: "6698 SAYILI KANUN KAPSAMINDA BİLGİLENDİRME",
    content: `6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, UTOPIA LDN ("Şirket") olarak, veri sorumlusu sıfatıyla, kişisel verilerinizi kanuna uygun şekilde toplamakta, işlemekte ve korumaktayız.

1. Kişisel Verilerin Toplanma Amacı:
Kişisel verileriniz (ad, soyad, telefon numarası, e-posta adresi, teslimat ve fatura adresi), siparişlerinizin oluşturulması, ürünlerin Yurtiçi Kargo güvencesiyle tarafınıza sevk edilmesi, fatura düzenlenmesi ve yasal bildirimlerin gerçekleştirilmesi amacıyla işlenmektedir.

2. Verilerin Aktarılması:
Kişisel verileriniz, yalnızca yasal zorunluluk hallerinde yetkili kamu kurum ve kuruluşları ile siparişinizin teslimi için kargo ve lojistik iş ortaklarımıza aktarılmaktadır. Kredi kartı ve ödeme verileriniz sistemlerimizde kesinlikle saklanmamakta olup doğrudan BDDK lisanslı ödeme kuruluşuna (PayTR / iyzico) 256-bit SSL şifreleme ile iletilmektedir.

3. Haklarınız:
KVKK'nın 11. maddesi uyarınca veri sahipleri; verilerinin işlenip işlenmediğini öğrenme, düzeltilmesini talep etme ve silinmesini isteme hakkına sahiptir. Başvurularınızı privacy@utopialdn.com adresine iletebilirsiniz.`,
  },
  "privacy-policy": {
    title: "GİZLİLİK VE ÇEREZ POLİTİKASI",
    category: "BİLGİ GÜVENLİĞİ VE GİZLİLİK TAAHHÜDÜ",
    content: `UTOPIA LDN olarak, platformumuzu ziyaret eden tüm kullanıcılarımızın ve müşterilerimizin mahremiyetine en üst düzeyde saygı duyuyoruz.

1. Bilgi Toplama ve Kullanım:
Sitemizi ziyaret ettiğinizde, deneyiminizi iyileştirmek, sepet durumunuzu hatırlamak ve sipariş işlemlerini tamamlayabilmek için teknik çerezler (cookies) kullanılmaktadır. Bu çerezler kişisel kimlik tespitine yol açmaz.

2. Ödeme Güvenliği:
Sipariş aşamasında girdiğiniz kredi kartı bilgileri, 256-Bit SSL sertifikası ile şifrelenir ve doğrudan banka pos sistemine iletilir. Sunucularımızda hiçbir kredi kartı numarası, son kullanma tarihi veya CVV kodu tutulmaz.

3. Üçüncü Taraflarla Paylaşım:
Müşteri verileri asla pazarlama amacıyla üçüncü şahıslara veya kurumlara satılmaz ya da kiralanmaz.`,
  },
  "distance-sales": {
    title: "MESAFELİ SATIŞ SÖZLEŞMESİ",
    category: "6502 SAYILI TÜKETİCİNİN KORUNMASI HAKKINDA KANUN",
    content: `MADDE 1 - TARAFLAR
SATICI: UTOPIA LDN Tekstil ve Dizayn A.Ş. (İstanbul / Türkiye)
ALICI: www.utopialdn.com internet sitesinden sipariş veren gerçek veya tüzel kişi.

MADDE 2 - SÖZLEŞMENİN KONUSU
İşbu sözleşmenin konusu, ALICI'nın SATICI'ya ait internet sitesinden elektronik ortamda siparişini yaptığı ürünlerin satışı ve teslimi ile ilgili olarak 6502 sayılı Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.

MADDE 3 - TESLİMAT VE KARGO
Sipariş konusu ürünler, sipariş onayından itibaren en geç 30 günlük yasal süreyi aşmamak koşulu ile ALICI'nın bildirdiği adrese teslim edilir. Normal şartlarda Türkiye içi siparişler 24-48 saat içinde kargoya verilir.

MADDE 4 - CAYMA HAKKI
ALICI, sözleşme konusu ürünün kendisine veya gösterdiği adresteki kişi/kuruluşa tesliminden itibaren 14 (on dört) gün içinde herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin sözleşmeden cayma hakkına sahiptir.`,
  },
  "return-policy": {
    title: "İADE VE DEĞİŞİM KOŞULLARI",
    category: "MÜŞTERİ MEMNUNİYETİ VE GARANTİ",
    content: `UTOPIA LDN parçasını teslim aldığınız tarihten itibaren 14 gün içerisinde koşulsuz iade veya beden değişimi talep edebilirsiniz.

İade Şartları:
• Ürünün orijinal etiketi koparılmamış olmalıdır.
• Ürün yıkanmamış, kullanılmamış ve yeniden satılabilir formunu kaybetmemiş olmalıdır.
• Özel hologramlı arşiv kutusu ve aksesuarları ile birlikte eksiksiz gönderilmelidir.
• Balaklava ve kişisel hijyen parçalarında ambalaj açılmamış olmalıdır.

İade Süreci:
1. Sipariş numaranızla birlikte support@utopialdn.com adresine iade talebinizi yazınız.
2. Size iletilen Yurtiçi Kargo ücretsiz iade kodu ile paketi en yakın şubeye teslim ediniz.
3. Paket merkezimize ulaştıktan sonra kalite kontrolü yapılır ve 3 iş günü içinde kartınıza tutar iadesi yansıtılır.`,
  },
  "shipping-policy": {
    title: "TESLİMAT VE KARGO POLİTİKASI",
    category: "SEVKİYAT VE LOJİSTİK PROTOKOLÜ",
    content: `1. Sevkiyat Süresi:
Siparişleriniz onaylandıktan sonra 24 ila 48 saat içerisinde İstanbul merkez depomuzdan sigortalı olarak sevk edilir. Hafta sonu ve resmi tatillerde verilen siparişler takip eden ilk iş günü işleme alınır.

2. Kargo Ücreti:
2.000 ₺ ve üzerindeki tüm siparişlerde kargo ÜCRETSİZDİR. Bu tutarın altındaki siparişlerde standart Yurtiçi Kargo ücreti sepet ve ödeme adımında şeffaf şekilde gösterilir (120 ₺).

3. Takip Kodu:
Siparişiniz kargoya verildiğinde sistem tarafından üretilen UTP-TR-XXXXXX formatındaki kargo takip numarası hem SMS hem e-posta ile tarafınıza iletilir.`,
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = LEGAL_DOCS[slug];
  return {
    title: doc ? `${doc.title} // UTOPIA LDN` : "Yasal Bilgilendirme // UTOPIA LDN",
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = LEGAL_DOCS[slug];

  if (!doc) {
    notFound();
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#050505] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          ANA SAYFAYA DÖN
        </Link>

        <div className="border-b border-neutral-900 pb-6">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#e50914] block mb-1">
            {doc.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-sans">
            {doc.title}
          </h1>
          <p className="text-xs font-mono text-neutral-500 mt-2">
            SON GÜNCELLEME: 2026 // UTOPIA LDN HUKUK VE REGÜLASYON DİREKTÖRLÜĞÜ
          </p>
        </div>

        <div className="p-8 bg-neutral-950 border border-neutral-900 text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed uppercase whitespace-pre-wrap space-y-4">
          {doc.content}
        </div>

        <div className="p-6 bg-neutral-900/40 border border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>TÜKETİCİ HAKLARI VE KVKK UYUMLU SÖZLEŞME</span>
          </div>
          <span className="text-[11px] text-neutral-500">REV. 2026.1</span>
        </div>
      </div>
    </div>
  );
}
