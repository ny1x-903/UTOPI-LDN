import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerSurname,
      customerEmail,
      customerPhone,
      address,
      city,
      district,
      postalCode,
      orderNotes,
      discountCode,
      items,
      paymentMethod,
    } = body;

    // Basic Validation
    if (
      !customerName ||
      !customerSurname ||
      !customerEmail ||
      !customerPhone ||
      !address ||
      !city ||
      !district ||
      !items ||
      items.length === 0
    ) {
      return NextResponse.json(
        { error: "Lütfen zorunlu tüm teslimat ve iletişim alanlarını doldurunuz." },
        { status: 400 }
      );
    }

    // SERVER-SIDE PRICE & STOCK VALIDATION (Never trust client prices)
    let calculatedSubtotal = 0;
    const verifiedItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        include: { variants: true, images: { take: 1 } },
      });

      if (!product) {
        return NextResponse.json(
          { error: `Ürün bulunamadı: ${item.name}` },
          { status: 400 }
        );
      }

      // Check variant stock
      const variant = product.variants.find((v) => v.size === item.size);
      if (!variant || variant.stock < item.quantity) {
        return NextResponse.json(
          {
            error: `${product.name} (${item.size}) için yeterli stok bulunmuyor. Kalan: ${
              variant?.stock || 0
            }`,
          },
          { status: 400 }
        );
      }

      const itemTotalPrice = product.price * item.quantity;
      calculatedSubtotal += itemTotalPrice;

      verifiedItems.push({
        productId: product.id,
        productName: product.name,
        productSlug: product.slug,
        size: item.size,
        quantity: item.quantity,
        unitPrice: product.price,
        imageUrl: product.images[0]?.url || item.image,
      });
    }

    // Server-side discount coupon calculation
    let calculatedDiscount = 0;
    if (discountCode) {
      const discount = await prisma.discount.findUnique({
        where: { code: discountCode.trim().toUpperCase() },
      });

      if (discount && discount.isActive) {
        if (discount.minSpend && calculatedSubtotal >= discount.minSpend) {
          if (discount.percentage) {
            calculatedDiscount = (calculatedSubtotal * discount.percentage) / 100;
          } else if (discount.fixedAmount) {
            calculatedDiscount = Math.min(calculatedSubtotal, discount.fixedAmount);
          }
        }
      }
    }

    // Shipping calculation
    const freeShippingThreshold = 2000;
    const shippingFee = calculatedSubtotal >= freeShippingThreshold ? 0 : 120;
    const finalTotal = Math.max(0, calculatedSubtotal - calculatedDiscount + shippingFee);

    // Generate unique order numbers
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `UTP-${randomSuffix}`;
    const trackingNumber = `UTP-TR-${Math.floor(100000 + Math.random() * 900000)}`;

    // Create Order and Items in transaction
    const newOrder = await prisma.order.create({
      data: {
        orderNumber,
        trackingNumber,
        customerName: `${customerName} ${customerSurname}`.trim(),
        customerEmail,
        customerPhone,
        shippingAddress: address,
        city,
        district,
        postalCode: postalCode || "",
        country: "Turkey",
        subtotal: calculatedSubtotal,
        shippingFee,
        discountTotal: calculatedDiscount,
        totalAmount: finalTotal,
        status: "PROCESSING",
        paymentStatus: "PAID",
        paymentMethod: paymentMethod || "CREDIT_CARD",
        orderNotes: orderNotes || "",
        items: {
          create: verifiedItems.map((it) => ({
            productId: it.productId,
            productName: it.productName,
            productSlug: it.productSlug,
            size: it.size,
            quantity: it.quantity,
            unitPrice: it.unitPrice,
            imageUrl: it.imageUrl,
          })),
        },
      },
    });

    // Update variant stocks and piecesSold for products
    for (const item of items) {
      await prisma.productVariant.updateMany({
        where: { productId: item.productId, size: item.size },
        data: { stock: { decrement: item.quantity } },
      });

      await prisma.product.update({
        where: { id: item.productId },
        data: { piecesSold: { increment: item.quantity } },
      });
    }

    return NextResponse.json({
      success: true,
      orderId: newOrder.id,
      orderNumber: newOrder.orderNumber,
      trackingNumber: newOrder.trackingNumber,
    });
  } catch (error) {
    console.error("Checkout processing error:", error);
    return NextResponse.json(
      { error: "Sipariş işlenirken bir sunucu hatası oluştu." },
      { status: 500 }
    );
  }
}
