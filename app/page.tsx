import { prisma } from "@/lib/prisma";
import { HeroSection } from "@/components/home/HeroSection";
import { BrandManifesto } from "@/components/home/BrandManifesto";
import { LimitedDropTracker } from "@/components/home/LimitedDropTracker";
import { CollectionSlider } from "@/components/home/CollectionSlider";
import { ProductCloseUpViewer } from "@/components/home/ProductCloseUpViewer";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { VideoShowcase } from "@/components/home/VideoShowcase";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { SocialFeed } from "@/components/home/SocialFeed";
import { LookbookEditorial } from "@/components/home/LookbookEditorial";
import { KineticTypography } from "@/components/ui/KineticTypography";


export default async function HomePage() {
  // Fetch featured products from database
  const rawProducts = await prisma.product.findMany({
    where: { status: "ACTIVE" },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
      variants: true,
    },
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  const products = rawProducts.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    subtitle: p.subtitle,
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    category: p.category,
    color: p.color,
    isLimited: p.isLimited,
    totalPieces: p.totalPieces,
    piecesSold: p.piecesSold,
    images: p.images.map((img) => ({
      url: img.url,
      alt: img.alt,
      type: img.type,
    })),
    variants: p.variants.map((v) => ({
      size: v.size,
      stock: v.stock,
    })),
  }));

  return (
    <div className="flex flex-col w-full overflow-hidden bg-[#1c1c1c]">
      {/* Cinematic Hero with Glitch Effects */}
      <HeroSection />

      {/* Kinetic Typography Scroll Effect */}
      <KineticTypography text="UTOPIA LDN // BUILT FOR THE SHADOWS" />

      {/* Section 01: Brand Philosophy & Manifesto */}
      <BrandManifesto />

      {/* Section 02 & 03: Active Limited Drop Spotlight with Real Timer & Sold Gauge */}
      <LimitedDropTracker />

      {/* Cinematic Video Showcase with Parallax */}
      <VideoShowcase />

      {/* Section 04: Drop Showcase Slider */}
      <CollectionSlider />

      {/* Section 05: Product Close-Up & Hardware Inspector */}
      <ProductCloseUpViewer />

      {/* Section 07: Curated Featured Streetwear Grid */}
      <FeaturedGrid products={products} />

      {/* Müşteri Yorumları & Sosyal Kanıt */}
      <TestimonialCarousel />

      {/* Campaign Lookbook */}
      <LookbookEditorial />

      {/* Instagram Sosyal Feed */}
      <SocialFeed />
    </div>
  );
}
