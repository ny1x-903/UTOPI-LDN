"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { SearchModal } from "@/components/search/SearchModal";

export function Navbar() {
  const pathname = usePathname();
  const { setIsOpen: setCartOpen, itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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
  }, [pathname]);

  const navLinks = [
    { href: "/shop", label: "KOLEKSİYON" },
    { href: "/collections/drop-01-after-dark", label: "NEW DROP" },
    { href: "/collections", label: "DROPS" },
    { href: "/about", label: "MANIFESTO" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[9990] transition-all duration-300 ${
          scrolled
            ? "bg-[#050505]/90 backdrop-blur-md border-b border-neutral-900/90 py-3.5"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
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
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Left Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-mono tracking-widest uppercase transition-colors hover:text-white ${
                  pathname === link.href ? "text-white font-bold underline underline-offset-4 decoration-[#e50914]" : "text-neutral-400"
                }`}
              >
                {link.label}
              </Link>
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
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#050505] border-b border-neutral-800 px-6 py-8 space-y-6 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-bold tracking-widest uppercase text-white hover:text-[#e50914] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-neutral-900 flex flex-col space-y-3">
                <Link
                  href="/wishlist"
                  className="text-xs font-mono tracking-widest uppercase text-neutral-400 flex items-center justify-between"
                >
                  <span>FAVORİLER</span>
                  <span>[{wishlistCount}]</span>
                </Link>
                <Link
                  href="/account"
                  className="text-xs font-mono tracking-widest uppercase text-neutral-400"
                >
                  HESABIM & SİPARİŞ TAKİBİ
                </Link>
                <Link
                  href="/admin"
                  className="text-xs font-mono tracking-widest uppercase text-[#e50914]"
                >
                  CREATIVE DIRECTOR PANELİ (ADMIN)
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Real-time search modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
