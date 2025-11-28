"use client";

import React from 'react';
import type { CartItem } from '@/entities/cart';
import CartItemRow from './ui/CartItemRow';
import CartSummary from './ui/CartSummary';

type Props = {
  items: CartItem[];
  onRemove: (id: string) => void;
  onChangeQty: (id: string, qty: number) => void;
  subtotal: number;
  onCheckout?: () => void;
};

export const Cart: React.FC<Props> = ({ items, onRemove, onChangeQty, subtotal, onCheckout }) => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4">TU CARRITO</h2>

        <div className="bg-white p-6">
          <div className="hidden md:grid grid-cols-6 gap-4 items-center text-sm text-gray-500 font-semibold border-b pb-2 mb-4">
            <div className="col-span-3">PRODUCTO</div>
            <div className="">PRECIO</div>
            <div className="">CANTIDAD</div>
            <div className="">TOTAL</div>
          </div>

          {items.map((it) => (
            <CartItemRow key={it.id} item={it} onRemove={onRemove} onChangeQty={onChangeQty} />
          ))}
        </div>
      </div>

      <div className="w-full md:w-80">
        <CartSummary subtotal={subtotal} onCheckout={onCheckout} />
      </div>
    </div>
  );
};

export default Cart;
