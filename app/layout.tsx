import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { CCTVSurveillanceHUD } from "@/components/ui/CCTVSurveillanceHUD";
import { DropTerminalModal } from "@/components/ui/DropTerminalModal";
import { DrillRadio } from "@/components/ui/DrillRadio";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://utopialdn.com"),
  title: "UTOPIA LDN // Original Underground Luxury Drill & Streetwear",
  description:
    "An original underground luxury streetwear brand born in the streets of Istanbul & London. 480 GSM French Terry, limited drops, tactical silhouettes, and brutalist high-fashion design.",
  keywords: [
    "UTOPIA LDN",
    "streetwear",
    "drill giyim",
    "drip",
    "oversized hoodie",
    "tactical cargo",
    "luxury streetwear",
    "istanbul drill",
  ],
  authors: [{ name: "UTOPIA LDN Creative Studio" }],
  openGraph: {
    title: "UTOPIA LDN // BUILT FOR THE SHADOWS",
    description:
      "Original underground luxury drill & streetwear. Limited drops, heavyweight garments, and uncompromising design.",
    url: "https://utopialdn.com",
    siteName: "UTOPIA LDN",
    images: [
      {
        url: "/images/hero_campaign.jpg",
        width: 1200,
        height: 630,
        alt: "UTOPIA LDN Streetwear Campaign",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UTOPIA LDN // BUILT FOR THE SHADOWS",
    description: "Original underground luxury drill & streetwear.",
    images: ["/images/hero_campaign.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-background text-foreground min-h-screen flex flex-col font-sans antialiased selection:bg-[#FF5500] selection:text-white">
        {/* Luxury Custom Pointer on Desktop */}
        <CustomCursor />

        {/* Smooth Scroll Utility */}
        <SmoothScroll />

        {/* Concept Feature 1: CCTV Surveillance & Police Strobe HUD */}
        <CCTVSurveillanceHUD />

        {/* Concept Feature 2: Secret Underground Drop Terminal */}
        <DropTerminalModal />

        {/* Concept Feature 3: UTOPIA 104.2 FM Ambient Drill Radio */}
        <DrillRadio />

        <CartProvider>
          <WishlistProvider>
            {/* Top Announcement Ticker Bar */}
            <AnnouncementBar />

            {/* Global Navbar with Mega Menu */}
            <Navbar />

            {/* Slide-out Cart Drawer */}
            <CartDrawer />

            <main className="flex-1 w-full">{children}</main>

            {/* Global Brutalist Footer */}
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
