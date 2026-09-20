"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronRight,
  Zap,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { SearchModal } from "@/components/search/SearchModal";

interface MegaMenuItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
  badgeColor?: string;
}

interface MegaMenuSection {
  title: string;
  items: MegaMenuItem[];
}

const MEGA_MENU_DATA: Record<string, MegaMenuSection[]> = {
  KOLEKSİYON: [
    {
      title: "KATEGORİ",
      items: [
        { title: "HOODIES", href: "/shop?category=HOODIES", description: "480 GSM Heavyweight" },
        { title: "CARGOS", href: "/shop?category=CARGOS", description: "Taktik Silüetler" },
        { title: "T-SHIRTS", href: "/shop?category=T-SHIRTS", description: "Ağır Gramaj Süprem" },
        { title: "JACKETS", href: "/shop?category=JACKETS", description: "Endüstriyel Donanım" },
        { title: "ACCESSORIES", href: "/shop?category=ACCESSORIES", description: "Tamamlayıcı Parçalar" },
      ],
    },
    {
      title: "ÖZEL SERİLER",
      items: [
        {
          title: "LİMİTED DROPS",
          href: "/shop?category=LIMITED",
          description: "Sınırlı Üretim Parçaları",
          badge: "CANLI",
          badgeColor: "bg-[#e50914]",
        },
        { title: "YENİ GELENLER", href: "/shop?sort=newest", description: "Son Eklenenler" },
        { title: "EN ÇOK SATANLAR", href: "/shop?sort=popular", description: "Topluluk Favorileri" },
        { title: "ARŞİV", href: "/collections/limited-archive", description: "Tükenmiş Parçalar" },
      ],
    },
  ],
  DROPS: [
    {
      title: "AKTİF DROPLAR",
      items: [
        {
          title: "DROP 01 — AFTER DARK",
          href: "/collections/drop-01-after-dark",
          description: "Karanlık sokak silüetleri",
          badge: "LIVE",
          badgeColor: "bg-[#e50914]",
        },
        {
          title: "DROP 02 — NO SIGNAL",
          href: "/collections/drop-02-no-signal",
          description: "Distopik metropol geceleri",
          badge: "YAKINDA",
          badgeColor: "bg-amber-600",
        },
      ],
    },
    {
      title: "GELECEK DROPLAR",
      items: [
        { title: "DROP 03 — UNDERGROUND", href: "/collections/drop-03-underground", description: "Yer altı enerjisi" },
        { title: "DROP 04 — 34", href: "/collections/drop-04-34", description: "Plaka ruhu" },
      ],
    },
  ],
};

export function Navbar() {
  const pathname = usePathname();
  const { setIsOpen: setCartOpen, itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleMegaMenuEnter = (label: string) => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    setActiveMegaMenu(label);
  };

  const handleMegaMenuLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  const navLinks = [
    { href: "/shop", label: "KOLEKSİYON", hasMega: true },
    { href: "/collections", label: "DROPS", hasMega: true },
    { href: "/about", label: "MANIFESTO", hasMega: false },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[9990] transition-all duration-500 ${
          scrolled
            ? "bg-[#050505]/95 backdrop-blur-xl border-b border-neutral-900/80 py-3"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-neutral-400 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Desktop Left Nav Links with Mega Menu */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.hasMega && handleMegaMenuEnter(link.label)}
                onMouseLeave={handleMegaMenuLeave}
              >
                <Link
                  href={link.href}
                  className={`text-xs font-mono tracking-widest uppercase transition-colors py-2 inline-flex items-center gap-1 hover:text-white ${
                    pathname === link.href
                      ? "text-white font-bold"
                      : "text-neutral-400"
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#e50914]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* Center Brand Typographic Wordmark */}
          <div className="text-center">
            <Link
              href="/"
              className="text-lg md:text-2xl font-black tracking-[-0.08em] uppercase text-white hover:opacity-85 transition-opacity inline-flex items-center gap-1.5"
            >
              <span>UTOPIA</span>
              <span className="text-[#e50914] text-xs font-mono font-bold tracking-widest px-1.5 py-0.5 border border-[#e50914]/40 bg-[#e50914]/10">
                LDN
              </span>
            </Link>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-1.5 text-neutral-300 hover:text-white transition-colors"
              aria-label="Search archive"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="p-1.5 text-neutral-300 hover:text-white transition-colors relative hidden sm:block"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#e50914] text-[9px] font-mono text-white flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account / Admin Link */}
            <Link
              href="/account"
              className="p-1.5 text-neutral-300 hover:text-white transition-colors hidden sm:block"
              aria-label="Account"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setCartOpen(true)}
              className="p-1.5 text-white hover:text-neutral-300 transition-colors relative flex items-center gap-2 group"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-105 transition-transform" />
              <span className="text-xs font-mono tracking-widest font-bold">
                [{itemCount}]
              </span>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#e50914] animate-pulse-red" />
              )}
            </button>
          </div>
        </div>

        {/* ============================
            DESKTOP MEGA MENU DROPDOWN
           ============================ */}
        <AnimatePresence>
          {activeMegaMenu && MEGA_MENU_DATA[activeMegaMenu] && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="hidden lg:block absolute top-full left-0 w-full bg-[#0a0a0a]/98 backdrop-blur-xl border-b border-neutral-800 shadow-2xl"
              onMouseEnter={() => handleMegaMenuEnter(activeMegaMenu)}
              onMouseLeave={handleMegaMenuLeave}
            >
              <div className="max-w-7xl mx-auto px-8 py-8">
                <div className="grid grid-cols-12 gap-8">
                  {/* Menu Sections */}
                  <div className="col-span-8 grid grid-cols-2 gap-8">
                    {MEGA_MENU_DATA[activeMegaMenu].map((section) => (
                      <div key={section.title}>
                        <h3 className="text-[10px] font-mono tracking-[0.3em] text-[#e50914] uppercase mb-4">
                          {section.title}
                        </h3>
                        <div className="space-y-1">
                          {section.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-center justify-between p-2.5 hover:bg-neutral-900/80 transition-colors group"
                            >
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold text-white group-hover:text-[#e50914] transition-colors uppercase tracking-wide">
                                    {item.title}
                                  </span>
                                  {item.badge && (
                                    <span
                                      className={`text-[9px] font-mono font-bold text-white px-1.5 py-0.5 ${item.badgeColor}`}
                                    >
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                {item.description && (
                                  <span className="text-[11px] font-mono text-neutral-500 block mt-0.5">
                                    {item.description}
                                  </span>
                                )}
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-neutral-700 group-hover:text-white transition-colors" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Featured Preview Card */}
                  <div className="col-span-4">
                    <div className="relative aspect-[4/3] bg-neutral-950 border border-neutral-800 overflow-hidden group">
                      <Image
                        src="/images/hero_campaign.jpg"
                        alt="Featured Drop"
                        fill
                        className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                        sizes="300px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-[9px] font-mono text-[#e50914] tracking-widest flex items-center gap-1 mb-1">
                          <Zap className="w-3 h-3" />
                          AKTİF DROP
                        </span>
                        <h4 className="text-sm font-bold uppercase text-white">
                          DROP 01 — AFTER DARK
                        </h4>
                        <Link
                          href="/collections/drop-01-after-dark"
                          className="mt-2 inline-flex items-center gap-1 text-xs font-mono text-white hover:text-[#e50914] transition-colors"
                        >
                          KEŞFET <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ============================
          FULL-SCREEN MOBILE MENU
         ============================ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9989] bg-[#050505] lg:hidden overflow-y-auto"
          >
            {/* Mobile Menu Header Spacer */}
            <div className="h-16" />

            <div className="px-6 py-8">
              {/* Main Nav Links */}
              <nav className="space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center justify-between py-4 border-b border-neutral-900 group"
                    >
                      <span className="text-2xl font-black tracking-tight uppercase text-white group-hover:text-[#e50914] transition-colors">
                        {link.label}
                      </span>
                      <ChevronRight className="w-5 h-5 text-neutral-600 group-hover:text-white transition-colors" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="mt-8 space-y-3"
              >
                <span className="text-[10px] font-mono text-[#e50914] tracking-[0.3em] uppercase block mb-3">
                  HIZLI ERİŞİM
                </span>

                <Link
                  href="/wishlist"
                  className="flex items-center justify-between py-3 text-sm font-mono tracking-widest uppercase text-neutral-300 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Heart className="w-4 h-4" />
                    FAVORİLER
                  </span>
                  <span className="text-neutral-600">[{wishlistCount}]</span>
                </Link>

                <Link
                  href="/account"
                  className="flex items-center justify-between py-3 text-sm font-mono tracking-widest uppercase text-neutral-300 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <User className="w-4 h-4" />
                    HESABIM
                  </span>
                </Link>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCartOpen(true);
                  }}
                  className="flex items-center justify-between py-3 text-sm font-mono tracking-widest uppercase text-neutral-300 hover:text-white transition-colors w-full text-left"
                >
                  <span className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4" />
                    SEPET
                  </span>
                  <span className="text-neutral-600">[{itemCount}]</span>
                </button>
              </motion.div>

              {/* Admin Access */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="mt-8 pt-6 border-t border-neutral-900"
              >
                <Link
                  href="/admin"
                  className="text-xs font-mono tracking-widest uppercase text-[#e50914] hover:underline"
                >
                  CREATIVE DIRECTOR PANELİ
                </Link>
              </motion.div>

              {/* Brand Footer in Mobile Menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="mt-12 text-center"
              >
                <p className="text-3xl font-black uppercase tracking-tighter text-neutral-900">
                  BUILT FOR THE SHADOWS.
                </p>
                <p className="text-[10px] font-mono text-neutral-600 mt-2">
                  © 2026 UTOPIA LDN LTD.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Real-time search modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
