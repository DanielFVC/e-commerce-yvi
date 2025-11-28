"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/entities/cart";
import type { Product } from "@/entities/product";

type ContextShape = {
  items: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
};

const CartContext = createContext<ContextShape | null>(null);

export const useCartContext = () => {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCartContext must be used within CartProvider");
  return c;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("cart_items") : null;
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart_items", JSON.stringify(items));
    } catch {}
  }, [items]);

  const addToCart = (product: Product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((it) => it.id === product.id);
      if (found) return prev.map((it) => (it.id === product.id ? { ...it, quantity: it.quantity + qty } : it));
      return [...prev, { id: product.id, product, quantity: qty }];
    });
  };

  const removeFromCart = (id: string) => setItems((prev) => prev.filter((it) => it.id !== id));

  const clearCart = () => setItems([]);

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return removeFromCart(id);
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, quantity } : it)));
  };

  const subtotal = useMemo(() => items.reduce((s, it) => s + it.product.price * it.quantity, 0), [items]);

  const value = useMemo(
    () => ({ items, addToCart, removeFromCart, updateQuantity, clearCart, subtotal }),
    [items, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
