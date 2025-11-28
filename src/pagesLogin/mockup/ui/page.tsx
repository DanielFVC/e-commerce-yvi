"use client";

import React from 'react';
import Image from 'next/image';
import ProductGrid from '@/widgets/product';
import useProducts from '@/features/product/model/useProducts';

const MockupPage: React.FC = () => {
  const { products } = useProducts();

  return (
    <main className="px-6 md:px-12 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Banner similar to LoginWidget using user's public images */}
        <header className="w-full h-48 md:h-56 lg:h-64 bg-center bg-cover mb-8 rounded-lg overflow-hidden" style={{ backgroundImage: "url('/fondo-perfumeria.jpg')" }}>
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex items-center gap-1 text-white text-4xl md:text-6xl font-black">
              <Image
                src="/YVI_2_-removebg-preview.png"
                alt="YVI"
                width={350}
                height={200}
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
          </div>
        </header>

        <div className="flex items-center justify-center mb-6">
          <h3 className="text-xl tracking-widest">DESTACADOS</h3>
        </div>

        <section className="mb-12">
          <ProductGrid products={products} />
        </section>
      </div>
    </main>
  );
};

export default MockupPage;
