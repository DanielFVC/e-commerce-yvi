"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProductGrid from '@/widgets/product';
import useProducts from '@/features/product/model/useProducts';
import useCart from '@/features/cart/model/useCart';
import BrandsCarousel from '@/widgets/brands/BrandsCarousel';

const PaginaPrincipal: React.FC = () => {
  const { products } = useProducts();
  const { items } = useCart();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    
    // Cargar datos del usuario si está autenticado
    if (typeof window !== 'undefined') {
      const authUser = localStorage.getItem('auth_user');
      if (authUser) {
        try {
          setUser(JSON.parse(authUser));
        } catch (error) {
          console.error('Error al cargar usuario:', error);
        }
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      setUser(null);
    }
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="w-full">
      {/* Full width banner with absolute positioned buttons */}
      <header className="w-full h-60 md:h-72 lg:h-80 bg-center bg-cover mb-0 overflow-hidden relative" style={{ backgroundImage: "url('/fondo-perfumeria.jpg')" }}>
        {/* Centered logo (absolute) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="pointer-events-none">
            <Image
              src="/YVI__2_-removebg-preview.png"
              alt="YVI"
              width={420}
              height={140}
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
        </div>

        {/* Top Navigation with Search Bar (absolute positioned over banner) */}
        <div className="absolute top-4 right-6 flex gap-4 pointer-events-auto items-center">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 pr-10 rounded border border-white bg-white/90 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 w-64"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              🔍
            </span>
          </div>

          {/* Botón de Login/Usuario */}
          {mounted && user ? (
            <div className="relative group">
              <button className="px-6 py-2 border border-white text-white rounded hover:bg-white hover:text-black transition font-semibold flex items-center gap-2">
                👤 {user.username}
              </button>
              {/* Dropdown menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          ) : (
            <Link href="/login">
              <button className="px-6 py-2 border border-white text-white rounded hover:bg-white hover:text-black transition font-semibold">
                Iniciar Sesión
              </button>
            </Link>
          )}

          <Link href="/carrito">
            <button className="px-6 py-2 bg-white text-black rounded hover:bg-gray-200 transition flex items-center gap-2 font-semibold">
              <span>🛒 Carrito</span>
              {mounted && items.length > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>
          </Link>
        </div>
      </header>

      {/* Carrusel de Marcas */}
      <BrandsCarousel />

      {/* Content area spanning full width with centered grid */}
      <section className="w-full py-8">
        <div className="w-full text-center mb-6">
          <h3 className="text-xl tracking-widest">DESTACADOS</h3>
        </div>

        <div className="w-full px-6">
          <div className="max-w-[1200px] mx-auto">
            <ProductGrid products={filteredProducts} />
            {searchQuery && filteredProducts.length === 0 && (
              <p className="text-center text-gray-500 mt-8">
                No se encontraron productos que coincidan con "{searchQuery}"
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PaginaPrincipal;
