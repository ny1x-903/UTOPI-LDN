import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Cleaning existing database...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.discount.deleteMany();
  await prisma.siteSettings.deleteMany();
  await prisma.user.deleteMany();

  console.log("Seeding Collections...");
  const drop01 = await prisma.collection.create({
    data: {
      slug: "drop-01-after-dark",
      title: "DROP 01 — AFTER DARK",
      dropNumber: "01",
      manifesto:
        "Doğduğu sokakların karanlığından beslenen, kural tanımayan silüetler. Sınırlı sayıda üretilmiş 480 GSM Fransız havlu kumaşları, su geçirmez donanım ve endüstriyel detaylar.",
      heroImage: "/images/hero_campaign.jpg",
      releaseDate: new Date("2026-03-01T00:00:00Z"),
      isFeatured: true,
    },
  });

  const drop02 = await prisma.collection.create({
    data: {
      slug: "drop-02-no-signal",
      title: "DROP 02 — NO SIGNAL",
      dropNumber: "02",
      manifesto:
        "Sinyalin kesildiği, distopik metropol geceleri için tasarlandı. Yansıtıcı detaylar, modüler cepler ve ultra-hafif teknik kumaşlar.",
      heroImage: "/images/hero_campaign.jpg",
      releaseDate: new Date("2026-04-15T00:00:00Z"),
      isFeatured: true,
    },
  });

  const drop03 = await prisma.collection.create({
    data: {
      slug: "drop-03-underground",
      title: "DROP 03 — UNDERGROUND",
      dropNumber: "03",
      manifesto:
        "İstanbul ve Londra metrosunun yer altı enerjisi. Ağır gramajlı kumaşlar, ham dikişler ve karanlık brutalist tipografi.",
      heroImage: "/images/hero_campaign.jpg",
      releaseDate: new Date("2026-05-10T00:00:00Z"),
      isFeatured: false,
    },
  });

  const drop04 = await prisma.collection.create({
    data: {
      slug: "drop-04-34",
      title: "DROP 04 — 34",
      dropNumber: "34",
      manifesto:
        "34 plakasının ham sokak ruhu. Asfalt yansımaları, gece vardiyaları ve ödün vermeyen duruş.",
      heroImage: "/images/hero_campaign.jpg",
      releaseDate: new Date("2026-06-01T00:00:00Z"),
      isFeatured: false,
    },
  });

  const archive = await prisma.collection.create({
    data: {
      slug: "limited-archive",
      title: "LIMITED ARCHIVE",
      dropNumber: "ARC",
      manifesto:
        "Bir kez üretilen ve asla tekrarlanmayan özel arşiv parçaları. Her parça numaralandırılmış sertifikayla teslim edilir.",
      heroImage: "/images/hero_campaign.jpg",
      releaseDate: new Date("2026-01-01T00:00:00Z"),
      isFeatured: true,
    },
  });

  console.log("Seeding Products...");
  const productsData = [
    {
      slug: "utopia-shadow-division-hoodie",
      name: "UTOPIA Shadow Division Hoodie",
      subtitle: "480 GSM Heavy French Terry // Limited Edition",
      description:
        "Yüksek gramajlı 480 GSM Fransız havlu pamuklu kumaştan üretilen Shadow Division Hoodie, sokak silüetini yeniden tanımlıyor. Göğüste kabartmalı ton sür ton UTOPIA tipografisi, arkada İstanbul-Londra koordinat baskısı (41.0082° N, 28.9784° E), özel gravürlü mat siyah metal bağcık uçları ve kırmızı kilit dikiş detayları.",
      price: 3450,
      compareAtPrice: 4200,
      category: "HOODIES",
      collectionId: drop01.id,
      fit: "Oversized Heavyweight",
      material: "100% Organik Pamuk (480 GSM Heavy French Terry)",
      color: "Matte Black",
      colorHex: "#0a0a0a",
      isLimited: true,
      totalPieces: 100,
      piecesSold: 87,
      isFeatured: true,
      isNewDrop: true,
      tags: "hoodie,oversized,drill,heavyweight,limited,black",
      metaTitle: "UTOPIA Shadow Division Hoodie | UTOPIA LDN",
      metaDesc:
        "480 GSM Fransız havlu pamuk, ton sür ton kabartma tipografi ve özel mat siyah donanım. Sadece 100 adetle sınırlı.",
      images: [
        { url: "/images/products/shadow_hoodie_front.jpg", alt: "UTOPIA Shadow Division Hoodie Ön Görünüm", type: "FRONT", order: 1 },
        { url: "/images/products/shadow_hoodie_back.jpg", alt: "UTOPIA Shadow Division Hoodie Arka Görünüm", type: "BACK", order: 2 },
        { url: "/images/products/shadow_hoodie_detail.jpg", alt: "UTOPIA Shadow Division Kumaş ve Metal Uç Detayı", type: "DETAIL", order: 3 },
        { url: "/images/hero_campaign.jpg", alt: "UTOPIA Shadow Division Model Üzerinde Kampanya Çekimi", type: "MODEL", order: 4 },
      ],
      stock: { XS: 0, S: 2, M: 4, L: 5, XL: 2, XXL: 0, "3XL": 0 },
    },
    {
      slug: "utopia-district-heavyweight-cargo",
      name: "UTOPIA District Heavyweight Cargo",
      subtitle: "Asymmetric 3D Tactical Pockets // Bungee Toggle Hem",
      description:
        "Maksimum dayanıklılık ve hareket serbestliği sağlayan teknik pamuk dokuma. Asimetrik 3D körüklü kargo cepleri, mat siyah su geçirmez fermuarlar, mafsallı diz panelleri ve bilekte ayarlanabilir kordon stoperleri.",
      price: 3200,
      compareAtPrice: 3800,
      category: "CARGOS",
      collectionId: drop01.id,
      fit: "Relaxed Tapered",
      material: "%97 Teknik Pamuk, %3 Elastan (340 GSM Ripstop)",
      color: "Carbon Black",
      colorHex: "#121212",
      isLimited: true,
      totalPieces: 80,
      piecesSold: 64,
      isFeatured: true,
      isNewDrop: true,
      tags: "cargo,pants,tactical,drill,pockets,waterproof",
      metaTitle: "UTOPIA District Heavyweight Cargo | UTOPIA LDN",
      metaDesc:
        "Asimetrik 3D cepler, mat fermuarlar ve ayarlanabilir kordon sistemi ile UTOPIA District Cargo.",
      images: [
        { url: "/images/products/district_cargo_front.jpg", alt: "UTOPIA District Heavyweight Cargo", type: "FRONT", order: 1 },
        { url: "/images/hero_campaign.jpg", alt: "UTOPIA District Cargo Kampanya Çekimi", type: "MODEL", order: 2 },
        { url: "/images/products/shadow_hoodie_detail.jpg", alt: "Dikiş ve Malzeme Detayı", type: "DETAIL", order: 3 },
      ],
      stock: { XS: 3, S: 5, M: 8, L: 6, XL: 4, XXL: 1, "3XL": 0 },
    },
    {
      slug: "utopia-34-nocturne-oversized-tee",
      name: "UTOPIA 34 Nocturne Oversized Tee",
      subtitle: "280 GSM Compact Jersey // Vintage Carbon Wash",
      description:
        "Özel karbon yıkama tekniğiyle vintage hissi kazandırılmış 280 GSM penye süprem. Göğüste brutalist UTOPIA 34 tipografisi, düşük omuz kesimi ve deforme olmayan çift katlı yaka ribanası.",
      price: 1850,
      compareAtPrice: 2200,
      category: "T-SHIRTS",
      collectionId: drop04.id,
      fit: "Boxy Oversized",
      material: "%100 Penye Kompakt Pamuk (280 GSM)",
      color: "Washed Carbon",
      colorHex: "#1c1c1c",
      isLimited: false,
      totalPieces: null,
      piecesSold: 142,
      isFeatured: true,
      isNewDrop: true,
      tags: "tshirt,oversized,34,nocturne,heavyweight,washed",
      metaTitle: "UTOPIA 34 Nocturne Oversized Tee | UTOPIA LDN",
      metaDesc: "280 GSM kompakt penye, kutu kesim ve brutalist tipografi.",
      images: [
        { url: "/images/products/shadow_hoodie_front.jpg", alt: "UTOPIA 34 Nocturne Tee", type: "FRONT", order: 1 },
        { url: "/images/products/shadow_hoodie_back.jpg", alt: "UTOPIA 34 Nocturne Tee Arka Baskı", type: "BACK", order: 2 },
        { url: "/images/hero_campaign.jpg", alt: "UTOPIA 34 Nocturne Kampanya Çekimi", type: "CAMPAIGN", order: 3 },
      ],
      stock: { XS: 4, S: 10, M: 15, L: 12, XL: 8, XXL: 4, "3XL": 2 },
    },
    {
      slug: "utopia-signal-technical-shell-parka",
      name: "UTOPIA Signal Technical Shell Parka",
      subtitle: "3-Layer Waterproof Membrane // Magnetic Storm Flap",
      description:
        "Zorlu hava koşullarına meydan okuyan 3 katmanlı su ve rüzgar geçirmez membran. Isıl işlemle bantlanmış dikişler, manyetik fırtına kanadı, yüksek huni yaka ve gizli iç kordon ayarları.",
      price: 5800,
      compareAtPrice: 6900,
      category: "JACKETS",
      collectionId: drop02.id,
      fit: "Engineered Oversized Shell",
      material: "3-Ply Technical Ripstop (15.000mm Su Geçirmezlik)",
      color: "Stealth Black",
      colorHex: "#070707",
      isLimited: true,
      totalPieces: 50,
      piecesSold: 39,
      isFeatured: true,
      isNewDrop: false,
      tags: "jacket,parka,shell,waterproof,storm,outerwear",
      metaTitle: "UTOPIA Signal Technical Shell Parka | UTOPIA LDN",
      metaDesc: "3 katmanlı su geçirmez membran, manyetik kapama ve gizli teknik detaylar.",
      images: [
        { url: "/images/hero_campaign.jpg", alt: "UTOPIA Signal Shell Parka Ön", type: "FRONT", order: 1 },
        { url: "/images/products/shadow_hoodie_detail.jpg", alt: "Teknik Bantlı Dikiş Detayı", type: "DETAIL", order: 2 },
      ],
      stock: { XS: 1, S: 3, M: 5, L: 4, XL: 2, XXL: 0, "3XL": 0 },
    },
    {
      slug: "utopia-after-dark-heavy-tracksuit",
      name: "UTOPIA After Dark Heavy Tracksuit",
      subtitle: "Two-Piece Modular Set // 450 GSM Brushed Fleece",
      description:
        "Üst fermuarlı dik yaka sweat ve eşleşen daralan paça eşofman altından oluşan 2 parçalı lüks takım. Fırçalanmış içi polarlı 450 GSM pamuk, derin fermuarlı cepler ve metal kordon donanımı.",
      price: 4950,
      compareAtPrice: 5800,
      category: "TRACKSUITS",
      collectionId: drop01.id,
      fit: "Structured Athletic Fit",
      material: "%100 Ağır Gramaj Şardonlu Pamuk (450 GSM)",
      color: "Jet Black",
      colorHex: "#050505",
      isLimited: false,
      totalPieces: null,
      piecesSold: 98,
      isFeatured: false,
      isNewDrop: true,
      tags: "tracksuit,set,after-dark,drill,heavyweight",
      metaTitle: "UTOPIA After Dark Heavy Tracksuit | UTOPIA LDN",
      metaDesc: "450 GSM şardonlu pamuk, 2 parçalı lüks sokak takımı.",
      images: [
        { url: "/images/products/shadow_hoodie_front.jpg", alt: "UTOPIA After Dark Tracksuit", type: "FRONT", order: 1 },
        { url: "/images/hero_campaign.jpg", alt: "After Dark Kampanya", type: "MODEL", order: 2 },
      ],
      stock: { XS: 2, S: 6, M: 10, L: 8, XL: 4, XXL: 2, "3XL": 0 },
    },
    {
      slug: "utopia-syndicate-tactical-balaclava",
      name: "UTOPIA Syndicate Tactical Balaclava",
      subtitle: "Thermal Breathable Knit // Laser-Cut Breathable Eye Ports",
      description:
        "Soğuk metropol geceleri için tasarlanmış termal nefes alabilen dikişsiz örgü balaklava. Lazer kesim nefes alma portları, arkada yansıtıcı UTOPIA logosu ve kask/kapüşon uyumlu ergonomik profil.",
      price: 950,
      compareAtPrice: null,
      category: "ACCESSORIES",
      collectionId: drop01.id,
      fit: "Form-Fitting Stretch",
      material: "Termal Poliamid & Elastan Karışımı",
      color: "Matte Black",
      colorHex: "#090909",
      isLimited: false,
      totalPieces: null,
      piecesSold: 215,
      isFeatured: false,
      isNewDrop: true,
      tags: "accessory,balaclava,mask,thermal,drill",
      metaTitle: "UTOPIA Syndicate Tactical Balaclava | UTOPIA LDN",
      metaDesc: "Termal nefes alabilen dikişsiz örgü balaklava.",
      images: [
        { url: "/images/hero_campaign.jpg", alt: "UTOPIA Syndicate Balaclava", type: "FRONT", order: 1 },
        { url: "/images/products/shadow_hoodie_detail.jpg", alt: "Örgü Detayı", type: "DETAIL", order: 2 },
      ],
      stock: { XS: 0, S: 20, M: 40, L: 35, XL: 0, XXL: 0, "3XL": 0 },
    },
    {
      slug: "utopia-34-core-heavy-sweatpants",
      name: "UTOPIA 34 Core Heavy Sweatpants",
      subtitle: "450 GSM French Terry // Deep Concealed Pockets",
      description:
        "Geniş paçalı rahat kesim, ekstra derin gizli fermuarlı yan cepler, kalın elastik bel bandı ve kalın pamuk kordonlar.",
      price: 2650,
      compareAtPrice: 3100,
      category: "SWEATPANTS",
      collectionId: drop04.id,
      fit: "Relaxed Straight Leg",
      material: "%100 Organik Pamuk (450 GSM French Terry)",
      color: "Charcoal Grey",
      colorHex: "#181818",
      isLimited: false,
      totalPieces: null,
      piecesSold: 74,
      isFeatured: false,
      isNewDrop: false,
      tags: "sweatpants,heavyweight,34,cotton,comfort",
      metaTitle: "UTOPIA 34 Core Heavy Sweatpants | UTOPIA LDN",
      metaDesc: "450 GSM Fransız havlu pamuk eşofman altı.",
      images: [
        { url: "/images/products/district_cargo_front.jpg", alt: "UTOPIA 34 Sweatpants", type: "FRONT", order: 1 },
        { url: "/images/hero_campaign.jpg", alt: "Model Çekimi", type: "MODEL", order: 2 },
      ],
      stock: { XS: 2, S: 8, M: 12, L: 10, XL: 5, XXL: 2, "3XL": 0 },
    },
    {
      slug: "utopia-archival-low-profile-cap",
      name: "UTOPIA Archival Low-Profile Cap",
      subtitle: "Unstructured 6-Panel // Custom Metal Slider",
      description:
        "Yıkanmış dayanıklı dimi pamuk, desteksiz 6 panelli retro sokak formu, önde kabartmalı UTOPIA monogramı ve arkada eskitme pirinç metal ayar tokası.",
      price: 1250,
      compareAtPrice: null,
      category: "ACCESSORIES",
      collectionId: archive.id,
      fit: "Adjustable One-Size",
      material: "%100 Ağır Dimi Pamuk (Washed Cotton Twill)",
      color: "Faded Black",
      colorHex: "#1a1a1a",
      isLimited: true,
      totalPieces: 150,
      piecesSold: 112,
      isFeatured: false,
      isNewDrop: false,
      tags: "cap,hat,archival,monogram,cotton",
      metaTitle: "UTOPIA Archival Low-Profile Cap | UTOPIA LDN",
      metaDesc: "Desteksiz 6 panelli yıkanmış pamuk şapka.",
      images: [
        { url: "/images/products/shadow_hoodie_detail.jpg", alt: "UTOPIA Archival Cap", type: "FRONT", order: 1 },
      ],
      stock: { XS: 0, S: 0, M: 25, L: 0, XL: 0, XXL: 0, "3XL": 0 },
    },
  ];

  for (const item of productsData) {
    const { images, stock, ...prodData } = item;
    const createdProduct = await prisma.product.create({
      data: prodData,
    });

    // Images
    for (const img of images) {
      await prisma.productImage.create({
        data: {
          productId: createdProduct.id,
          url: img.url,
          alt: img.alt,
          type: img.type,
          order: img.order,
        },
      });
    }

    // Variants
    const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];
    for (const s of sizes) {
      const stockQty = stock[s as keyof typeof stock] ?? 5;
      await prisma.productVariant.create({
        data: {
          productId: createdProduct.id,
          size: s,
          stock: stockQty,
          sku: `UTP-${createdProduct.slug.replace(/utopia-/g, "").toUpperCase().slice(0, 8)}-${s}-${createdProduct.id.slice(0, 4).toUpperCase()}`,
        },
      });
    }
  }

  console.log("Seeding Discounts...");
  await prisma.discount.createMany({
    data: [
      {
        code: "UTOPIA10",
        percentage: 10,
        minSpend: 0,
        maxUses: 500,
        usedCount: 38,
        isActive: true,
      },
      {
        code: "VIPGUEST",
        percentage: 15,
        minSpend: 3000,
        maxUses: 100,
        usedCount: 14,
        isActive: true,
      },
      {
        code: "DRILL34",
        fixedAmount: 350,
        minSpend: 2000,
        maxUses: 200,
        usedCount: 62,
        isActive: true,
      },
    ],
  });

  console.log("Seeding Admin User...");
  await prisma.user.create({
    data: {
      email: "admin@utopialdn.com",
      name: "UTOPIA Creative Director",
      role: "ADMIN",
      phone: "+90 532 000 34 00",
    },
  });

  console.log("Seeding Site Settings...");
  await prisma.siteSettings.create({
    data: {
      id: "default",
      storeName: "UTOPIA LDN",
      slogan: "BUILT FOR THE SHADOWS.",
      currency: "TRY",
      currencySymbol: "₺",
      freeShippingThreshold: 2000,
      announcementText: "DROP 01 — AFTER DARK ŞİMDİ YAYINDA // 2000₺ ÜZERİ ÜCRETSİZ KARGO",
      kvkkPolicy: `6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, UTOPIA LDN olarak, veri sorumlusu sıfatıyla, kişisel verilerinizi kanuna uygun şekilde toplamakta, işlemekte ve korumaktayız. Sipariş süreçleri, fatura tanzimi ve kargo teslimatı amacıyla ad, soyad, telefon numarası ve teslimat adresi bilgileriniz şifrelenmiş sunucularımızda saklanmaktadır.`,
      privacyPolicy: `UTOPIA LDN web sitesini ziyaret eden tüm kullanıcılarımızın gizliliğine en üst düzeyde saygı gösteriyoruz. Kredi kartı ve ödeme bilgileriniz sistemlerimizde ASLA saklanmaz; 256-bit SSL şifreleme ile doğrudan BDDK lisanslı banka ve ödeme altyapılarına aktarılır.`,
      termsConditions: `Bu internet sitesine erişerek veya sipariş vererek, UTOPIA LDN Satış ve Kullanım Şartlarını kabul etmiş sayılırsınız. Sınırlı sayıda üretilen parçalarda sipariş sırası esastır. Sistem kötüye kullanımlarında UTOPIA LDN siparişi iptal etme hakkını saklı tutar.`,
      distanceSalesAgreement: `İşbu Mesafeli Satış Sözleşmesi, ALICI'nın SATICI'ya ait www.utopialdn.com internet sitesinden elektronik ortamda siparişini yaptığı ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerini düzenler.`,
      returnPolicy: `Teslimat tarihinden itibaren 14 gün içerisinde, ürün etiketleri sökülmemiş, orijinal ambalajı bozulmamış ve yeniden satılabilirliği kaybolmamış ürünleri ücretsiz kargo kodu ile iade edebilir veya beden değişimi talep edebilirsiniz. Arşiv ve kişiselleştirilmiş sınırlı üretim parçalarda hijyen kuralları gereği özel koşullar geçerlidir.`,
      shippingPolicy: `Siparişleriniz 24-48 saat içerisinde İstanbul merkez depomuzdan sigortalı olarak Yurtiçi Kargo güvencesiyle sevk edilir. Türkiye içi teslimatlar ortalama 1-3 iş günüdür. 2000₺ ve üzeri tüm siparişlerde kargo ücretsizdir.`,
    },
  });

  console.log("Seeding Completed Successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
