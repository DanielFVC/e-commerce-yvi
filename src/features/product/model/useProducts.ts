"use client";

import { useEffect, useState } from 'react';
import type { Product } from '@/entities/product';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // intenta obtener desde la API que sirve MongoDB; si falla, deja array vacío
    fetch('/api/productos')
      .then((res) => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then((data) => {
        // Asegurar que data es un array
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.warn('API response is not an array:', data);
          setProducts([]);
        }
      })
      .catch((err) => {
        console.warn('useProducts fetch failed, falling back to empty', err);
        setProducts([]);
      });
  }, []);

  return { products };
};

export default useProducts;
