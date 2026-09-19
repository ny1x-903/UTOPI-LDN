import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";

    if (!query.trim()) {
      return NextResponse.json({ products: [] });
    }

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
          { category: { contains: query } },
          { tags: { contains: query } },
        ],
        status: "ACTIVE",
      },
      include: {
        images: {
          orderBy: { order: "asc" },
          take: 1,
        },
      },
      take: 8,
    });

    const formatted = products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      category: p.category,
      imageUrl: p.images[0]?.url || "/images/products/shadow_hoodie_front.jpg",
      isLimited: p.isLimited,
    }));

    return NextResponse.json({ products: formatted });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Failed to search" }, { status: 500 });
  }
}
