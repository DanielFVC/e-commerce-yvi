"use client";

import React from 'react';
import type { Product } from '@/entities/product';
import useCart from '@/features/cart/model/useCart';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAdd = () => addToCart(product, 1);
  return (
    <article className="w-72 rounded-[20px] overflow-hidden bg-white shadow-sm border border-gray-200">
      <div className="bg-white flex items-center justify-center h-44 p-4">
        {product.image ? (
          <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
        ) : (
          <div className="text-gray-400">No image</div>
        )}
      </div>

      <div className="bg-gray-100 p-4 rounded-b-[20px]">
        <div className="text-xs text-gray-500 uppercase tracking-wider">{product.brand}</div>
        <div className="font-bold mt-2 underline text-sm leading-tight">{product.title}</div>

        <div className="mt-3 flex items-center gap-3">
          <div className="text-sm text-gray-700 font-semibold">${product.price}</div>
          {product.discount ? (
            <span className="inline-block bg-red-500 text-white text-xs px-2 py-0.5 rounded">-{product.discount}%</span>
          ) : null}
        </div>
        <div className="mt-4">
          <button onClick={handleAdd} className="w-full bg-black text-white py-2 rounded hover:opacity-90">
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
