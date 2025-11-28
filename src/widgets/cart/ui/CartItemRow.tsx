"use client";

import React from 'react';
import type { CartItem } from '@/entities/cart';

type Props = {
  item: CartItem;
  onRemove: (id: string) => void;
  onChangeQty: (id: string, qty: number) => void;
};

export const CartItemRow: React.FC<Props> = ({ item, onRemove, onChangeQty }) => {
  const { product, quantity } = item;

  return (
    <div className="border border-black p-4 mb-6 rounded-md flex items-center gap-6">
      <div className="w-32">
        {product.image ? (
          <img src={product.image} alt={product.title} className="max-h-24 object-contain" />
        ) : (
          <div className="h-24 bg-gray-100 flex items-center justify-center">No image</div>
        )}
      </div>

      <div className="flex-1">
        <div className="text-xs text-gray-500 uppercase">{product.brand}</div>
        <div className="font-bold underline mt-1">{product.title}</div>
      </div>

      <div className="w-32 text-center font-semibold">${product.price}</div>

      <div className="w-40 flex items-center justify-center">
        <button className="px-3 py-1 border" onClick={() => onChangeQty(item.id, quantity - 1)}>-</button>
        <div className="px-4">{quantity}</div>
        <button className="px-3 py-1 border" onClick={() => onChangeQty(item.id, quantity + 1)}>+</button>
      </div>

      <div className="w-32 text-center font-semibold">${product.price * quantity}</div>

      <div>
        <button className="text-sm text-red-600" onClick={() => onRemove(item.id)}>Eliminar</button>
      </div>
    </div>
  );
};

export default CartItemRow;
