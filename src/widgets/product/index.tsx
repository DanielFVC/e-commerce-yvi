import React from 'react';
import type { Product } from '@/entities/product';
import ProductCard from './ui/ProductCard';

type Props = {
  products: Product[];
};

export const ProductGrid: React.FC<Props> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductGrid;
