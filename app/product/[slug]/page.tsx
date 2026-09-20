import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import { Metadata } from "next";

export const dynamicParams = true;

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { images: { orderBy: { order: "asc" } } },
  });

  if (!product) {
    return { title: "Ürün Bulunamadı // UTOPIA LDN" };
  }

  const primaryImage = product.images[0]?.url || "/images/hero_campaign.jpg";

  return {
    title: `${product.name} | UTOPIA LDN`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} // UTOPIA LDN`,
      description: product.description.slice(0, 160),
      images: [{ url: primaryImage, width: 1200, height: 630, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} // UTOPIA LDN`,
      description: product.description.slice(0, 160),
      images: [primaryImage],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { order: "asc" } },
      variants: { orderBy: { createdAt: "asc" } },
      collection: { select: { title: true, slug: true } },
    },
  });

  if (!product || product.status !== "ACTIVE") {
    notFound();
  }

  return (
    <div className="pt-20 min-h-screen bg-background text-foreground">
      <ProductDetailView product={product} />
    </div>
  );
}
