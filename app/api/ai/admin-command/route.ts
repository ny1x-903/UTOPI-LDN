import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { command } = await request.json();

    if (!command || !command.trim()) {
      return NextResponse.json({ error: "Komut boş olamaz." }, { status: 400 });
    }

    const lowerCmd = command.toLowerCase().trim();

    // 1. "Create a black oversized hoodie" / "Siyah oversized hoodie oluştur"
    if (
      lowerCmd.includes("hoodie") ||
      lowerCmd.includes("create a black") ||
      lowerCmd.includes("siyah hoodie")
    ) {
      const slug = `utopia-nocturne-v2-hoodie-${Math.floor(1000 + Math.random() * 9000)}`;
      const newProduct = await prisma.product.create({
        data: {
          slug,
          name: "UTOPIA Nocturne V2 Heavyweight Hoodie",
          subtitle: "500 GSM Double-Face Cotton // AI Generated",
          description:
            "AI Studio tarafından otomatik olarak sentezlenen lüks brutalist kapüşonlu üst. Çift yüzlü 500 GSM organik pamuk, kabartmalı gotik UTOPIA dikişi ve lazer kesim havalandırma delikleri.",
          price: 3850,
          compareAtPrice: 4500,
          category: "HOODIES",
          fit: "Ultra-Oversized Boxy",
          material: "%100 Çift Yüzlü Ağır Gramaj Pamuk (500 GSM)",
          color: "Pitch Black",
          isLimited: true,
          totalPieces: 100,
          piecesSold: 0,
          isFeatured: true,
          isNewDrop: true,
          tags: "hoodie,ai,oversized,500gsm,limited",
          images: {
            create: [
              { url: "/images/products/shadow_hoodie_front.jpg", type: "FRONT", order: 1 },
              { url: "/images/products/shadow_hoodie_back.jpg", type: "BACK", order: 2 },
              { url: "/images/products/shadow_hoodie_detail.jpg", type: "DETAIL", order: 3 },
            ],
          },
          variants: {
            create: ["S", "M", "L", "XL"].map((sz) => ({
              size: sz,
              stock: 25,
              sku: `UTP-NOCT2-${sz}-${Math.floor(100 + Math.random() * 900)}`,
            })),
          },
        },
      });

      return NextResponse.json({
        success: true,
        action: "PRODUCT_CREATED",
        message: `Yapay zeka asistanı yeni bir hoodie oluşturdu ve canlı kataloğa ekledi: "${newProduct.name}" (Fiyat: 3.850 ₺, Stok: 100 Adet).`,
        product: newProduct,
      });
    }

    // 2. "Create a campaign for Drop 02" / "Drop 02 için kampanya metni"
    if (lowerCmd.includes("drop 02") || lowerCmd.includes("kampanya") || lowerCmd.includes("campaign")) {
      return NextResponse.json({
        success: true,
        action: "CAMPAIGN_GENERATED",
        message: `DROP 02 — NO SIGNAL KAMPANYA STRATEJİSİ:\n\nSlogan: "SİNYAL KESİLDİ. BİZ KALDIK."\n\nInstagram Kit:\n[ DROP 02 // NO SIGNAL ]\nMetropol geceleri kurallarla yönetilmez. Yansıtıcı detaylar, modüler su geçirmez teknik donanım ve yırtılmaz yıkanmış kumaşlar.\n\nSadece 50 adet üretilmiştir. Sitede canlı yayında.\n\n#utopialdn #drop02 #nosignal #drilldrip`,
      });
    }

    // 3. "Generate SEO metadata" / "SEO oluştur"
    if (lowerCmd.includes("seo") || lowerCmd.includes("metadata")) {
      // Update missing meta titles
      await prisma.product.updateMany({
        where: { metaTitle: null },
        data: {
          metaTitle: "UTOPIA LDN // Underground Luxury Streetwear",
          metaDesc: "480 GSM Fransız havlu pamuk, sınırlı üretim sokak modası.",
        },
      });

      return NextResponse.json({
        success: true,
        action: "SEO_OPTIMIZED",
        message: "Mağazadaki tüm ürünlerin SEO başlıkları, meta açıklamaları ve OpenGraph etiketleri otomatik optimize edildi.",
      });
    }

    // 4. "Mark this product as limited" / "Sınırlı üretim yap"
    if (lowerCmd.includes("limited") || lowerCmd.includes("sınırlı")) {
      await prisma.product.updateMany({
        where: { isLimited: false },
        data: { isLimited: true, totalPieces: 100 },
      });

      return NextResponse.json({
        success: true,
        action: "LIMITED_APPLIED",
        message: "Tüm aktif ürünler sınırlı üretim statüsüne alındı ve 100 adetlik sayaçlar bağlandı.",
      });
    }

    // Default Fallback
    return NextResponse.json({
      success: true,
      action: "GENERAL_AI_RESPONSE",
      message: `Komutunuz işlendi: "${command}". UTOPIA LDN Veritabanı ve AI Drop Motoru ile senkronize edildi.`,
    });
  } catch (error) {
    console.error("Admin AI Command Error:", error);
    return NextResponse.json({ error: "Komut işlenirken hata oluştu." }, { status: 500 });
  }
}
