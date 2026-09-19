import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      category = "HOODIES",
      name = "UTOPIA Phantom Protocol Hoodie",
      color = "Matte Black",
      fit = "Oversized Boxy",
      material = "480 GSM Heavyweight French Terry",
      graphicStyle = "Minimalist Gothic Brutalism",
      conceptNotes = "",
      price = 3650,
      collectionSlug = "drop-01-after-dark",
      publishNow = false,
    } = body;

    // Brand Guidelines Consistency Rule (Prompt Section 32 & 33)
    const brandPrefix = "UTOPIA LDN";
    const globalAtmosphere =
      "Dark cinematic European streetwear editorial photography, luxury fashion campaign, realistic materials, dramatic side rim lighting, deep shadows, black and charcoal environment, subtle crimson red accents, photorealistic fabric texture, 85mm lens, sharp focus, no existing brand logos, completely original garment";

    // 1. Generate 5 Consistent Image Prompts
    const imagePrompts = {
      front: `Studio product photography of an original ${brandPrefix} ${name}, front-facing garment on invisible mannequin, ${color} ${material}, clean original chest graphic in ${graphicStyle}, dropped shoulder seam, thick ribbed cuffs, luxury fashion editorial studio lighting, dark charcoal background, high contrast, ${globalAtmosphere}`,
      back: `Studio product photography of the BACK view of the exact same ${brandPrefix} ${name}, clean back on invisible mannequin, dark charcoal studio background, large abstract ${graphicStyle} graphic printed across upper back in matte grey with tiny crimson red coordinates print 41.0082 N 28.9784 E, realistic fabric texture, matching front shot, ${globalAtmosphere}`,
      detail: `Macro extreme close-up product detail photography of the ${color} ${brandPrefix} garment, custom matte black hardware subtly engraved with UTOPIA, thick ${material} texture, precision double stitching, subtle crimson red bar-tack reinforcement stitch, luxury streetwear garment detail, studio lighting, shallow depth of field`,
      model: `Anonymous male fashion model wearing the original ${brandPrefix} ${name}, face in deep shadow with hood up, urban European night environment, raw concrete brutalist architecture, cinematic red and blue rim lighting, wet pavement reflections, luxury streetwear campaign, dramatic shadows, photorealistic fashion photography`,
      campaign: `Widescreen 16:9 cinematic streetwear campaign shot, anonymous model wearing full ${brandPrefix} silhouette featuring ${name}, dark industrial warehouse setting, wet concrete floor with puddles reflecting red neon, atmospheric fog and mist, 35mm film grain, editorial fashion direction`,
    };

    // 2. Editorial Copywriting
    const editorialDescription = `${material} kullanılarak üretilen ${name}, ${brandPrefix}'in sokak silüetini tavizsiz bir lüks standartla yeniden yorumluyor. ${fit} kesimi, ${color} tonu ve ${graphicStyle} grafik detayları ile distopik metropol geceleri için zırh gibi tasarlandı. Gerilme noktalarında kırmızı naylon kilit dikişler ve özel gravürlü mat siyah donanım eşlik eder.`;

    const campaignSlogan = "BORN IN THE SHADOWS. ENGINEERED TO OUTLAST.";
    const seoTitle = `${name} | ${brandPrefix}`;
    const seoDescription = `${material}, ${fit} kesim ve ${graphicStyle} grafik detayları. ${brandPrefix} sınırlı üretim sokak giyim parçası.`;
    const productTags = `${category.toLowerCase()},streetwear,drill,drip,${color.toLowerCase()},oversized,heavyweight,limited`;

    // 3. Social Media Kit
    const socialKit = {
      instagramCaption: `[ ARCHIVE ENTRY // ${name.toUpperCase()} ]\n\n${campaignSlogan}\n\n• ${material}\n• ${fit} silhouette\n• Signature ${brandPrefix} custom matte hardware\n\nSınırlı sayıda üretilmiştir. Yeniden basılmayacaktır.\nBio'daki bağlantıdan veya UTOPIALDN.COM üzerinden sipariş verebilirsiniz.\n\n#utopialdn #luxuryfashion #drillstreetwear #istanbuldrill #londonstreetwear #heavyweightcotton #undergroundfashion`,
      tiktokCaption: `480 GSM ağır gramaj zırh. ${name} şimdi yayında. #utopialdn #drilldrip #streetwear #keşfet`,
      verticalPrompt: `9:16 vertical editorial fashion photography for mobile screen, anonymous model in ${brandPrefix} ${name}, dark industrial rain, red ambient light, cinematic crop`,
      squarePrompt: `1:1 square luxury fashion product shot of ${name}, matte black studio backdrop, high contrast`,
    };

    // 4. If user requested instant publish to live store
    let publishedProduct = null;
    if (publishNow) {
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      // Find collection
      const collection = await prisma.collection.findFirst({
        where: { slug: collectionSlug },
      });

      publishedProduct = await prisma.product.create({
        data: {
          slug: `${slug}-${Math.floor(100 + Math.random() * 900)}`,
          name,
          subtitle: `${material} // AI Drop System`,
          description: editorialDescription,
          price: Number(price) || 3450,
          compareAtPrice: (Number(price) || 3450) * 1.2,
          category,
          collectionId: collection?.id || null,
          fit,
          material,
          color,
          isLimited: true,
          totalPieces: 100,
          piecesSold: 0,
          isFeatured: true,
          isNewDrop: true,
          status: "ACTIVE",
          tags: productTags,
          metaTitle: seoTitle,
          metaDesc: seoDescription,
          images: {
            create: [
              { url: "/images/products/shadow_hoodie_front.jpg", type: "FRONT", order: 1 },
              { url: "/images/products/shadow_hoodie_back.jpg", type: "BACK", order: 2 },
              { url: "/images/products/shadow_hoodie_detail.jpg", type: "DETAIL", order: 3 },
              { url: "/images/hero_campaign.jpg", type: "MODEL", order: 4 },
            ],
          },
          variants: {
            create: ["XS", "S", "M", "L", "XL", "XXL", "3XL"].map((sz) => ({
              size: sz,
              stock: sz === "XS" || sz === "3XL" ? 0 : 15,
              sku: `UTP-${slug.slice(0, 6).toUpperCase()}-${sz}-${Math.floor(100 + Math.random() * 900)}`,
            })),
          },
        },
      });

      // Log AI generation
      await prisma.aIGenerationLog.create({
        data: {
          productName: name,
          category,
          attributesJson: JSON.stringify({ color, fit, material, graphicStyle, price }),
          promptsJson: JSON.stringify(imagePrompts),
          socialKitJson: JSON.stringify(socialKit),
          status: "PUBLISHED",
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        productName: name,
        category,
        color,
        fit,
        material,
        graphicStyle,
        price,
        description: editorialDescription,
        campaignSlogan,
        seoTitle,
        seoDescription,
        tags: productTags,
        imagePrompts,
        socialKit,
        publishedProduct,
      },
    });
  } catch (error) {
    console.error("AI Drop Generator Error:", error);
    return NextResponse.json(
      { error: "AI Drop oluşturulurken sunucu hatası meydana geldi." },
      { status: 500 }
    );
  }
}
