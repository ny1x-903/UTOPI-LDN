"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  id: string; // unique cart item id: `${productId}-${size}`
  productId: string;
  name: string;
  slug: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
  color?: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  discountCode: string | null;
  discountAmount: number;
  applyDiscount: (code: string) => Promise<{ success: boolean; message: string }>;
  removeDiscount: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [discountFixed, setDiscountFixed] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const freeShippingThreshold = 2000;

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("utopia_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
      const savedDiscount = localStorage.getItem("utopia_discount");
      if (savedDiscount) {
        const parsed = JSON.parse(savedDiscount);
        setDiscountCode(parsed.code);
        setDiscountPercent(parsed.percent || 0);
        setDiscountFixed(parsed.fixed || 0);
      }
    } catch {
      // fallback
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("utopia_cart", JSON.stringify(items));
    } catch {
      // fallback
    }
  }, [items, isLoaded]);

  const addItem = (itemData: Omit<CartItem, "id">) => {
    const id = `${itemData.productId}-${itemData.size}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + itemData.quantity } : i
        );
      }
      return [...prev, { ...itemData, id }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
    setDiscountCode(null);
    setDiscountPercent(0);
    setDiscountFixed(0);
    localStorage.removeItem("utopia_cart");
    localStorage.removeItem("utopia_discount");
  };

  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 120;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotal);

  let discountAmount = 0;
  if (discountPercent > 0) {
    discountAmount = (subtotal * discountPercent) / 100;
  } else if (discountFixed > 0) {
    discountAmount = Math.min(subtotal, discountFixed);
  }

  const total = Math.max(0, subtotal - discountAmount + shippingFee);
  const itemCount = items.reduce((acc, i) => acc + i.quantity, 0);

  const applyDiscount = async (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "UTOPIA10") {
      setDiscountCode("UTOPIA10");
      setDiscountPercent(10);
      setDiscountFixed(0);
      localStorage.setItem(
        "utopia_discount",
        JSON.stringify({ code: "UTOPIA10", percent: 10, fixed: 0 })
      );
      return { success: true, message: "%10 VIP İndirim Kodu Uygulandı." };
    }
    if (cleanCode === "VIPGUEST") {
      if (subtotal < 3000) {
        return { success: false, message: "VIPGUEST kodu minimum 3.000₺ sipariş gerektirir." };
      }
      setDiscountCode("VIPGUEST");
      setDiscountPercent(15);
      setDiscountFixed(0);
      localStorage.setItem(
        "utopia_discount",
        JSON.stringify({ code: "VIPGUEST", percent: 15, fixed: 0 })
      );
      return { success: true, message: "%15 VIP Misafir İndirimi Uygulandı." };
    }
    if (cleanCode === "DRILL34") {
      if (subtotal < 2000) {
        return { success: false, message: "DRILL34 kodu minimum 2.000₺ sipariş gerektirir." };
      }
      setDiscountCode("DRILL34");
      setDiscountPercent(0);
      setDiscountFixed(350);
      localStorage.setItem(
        "utopia_discount",
        JSON.stringify({ code: "DRILL34", percent: 0, fixed: 350 })
      );
      return { success: true, message: "350₺ Özel Drop İndirimi Uygulandı." };
    }
    return { success: false, message: "Geçersiz veya süresi dolmuş kupon kodu." };
  };

  const removeDiscount = () => {
    setDiscountCode(null);
    setDiscountPercent(0);
    setDiscountFixed(0);
    localStorage.removeItem("utopia_discount");
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        shippingFee,
        freeShippingThreshold,
        freeShippingRemaining,
        discountCode,
        discountAmount,
        applyDiscount,
        removeDiscount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
