"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cart from '@/widgets/cart';
import useCart from '@/features/cart/model/useCart';
import CheckoutModal, { CheckoutData } from '@/widgets/cart/ui/CheckoutModal';

const CarritoPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheckout = async (data: CheckoutData) => {
    setIsProcessing(true);
    
    try {
      const envio = 5000;
      const total = subtotal + envio;

      const response = await fetch('/api/ventas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          total,
          clienteData: data,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Venta registrada:', result);
        
        // Limpiar carrito
        clearCart();
        
        // Mostrar mensaje de éxito
        setIsCheckoutOpen(false);
        setShowSuccess(true);
        
        // Redirigir después de 3 segundos
        setTimeout(() => {
          router.push('/pagina-principal');
        }, 3000);
      } else {
        alert('Error al procesar la compra. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar la compra. Inténtalo de nuevo.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="w-full">
      {/* Mensaje de éxito */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <div className="text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-2">¡Compra Exitosa!</h2>
            <p className="text-gray-600 mb-4">
              Tu pedido ha sido registrado correctamente. Recibirás un correo de confirmación.
            </p>
            <p className="text-sm text-gray-500">Redirigiendo a la página principal...</p>
          </div>
        </div>
      )}

      {/* Modal de checkout */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        subtotal={subtotal}
        onConfirm={handleCheckout}
      />

      {/* Full width banner with back button */}
      <header className="w-full h-60 md:h-72 lg:h-80 bg-center bg-cover mb-0 overflow-hidden relative" style={{ backgroundImage: "url('/fondo-perfumeria.jpg')" }}>
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
        {/* Botón de regreso - esquina superior izquierda */}
        <Link href="/pagina-principal">
          <button className="absolute top-4 left-6 px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-black transition font-semibold">
            ← Volver
          </button>
        </Link>
      </header>

      {/* Black stripe with title (TU CARRITO) */}
      <div className="w-full bg-black">
        <div className="max-w-[1200px] mx-auto py-4 text-center">
          <h2 className="text-white text-lg md:text-xl font-bold uppercase">TU CARRITO</h2>
        </div>
      </div>

      <section className="w-full py-8">
        <div className="w-full px-6">
          <div className="max-w-[1200px] mx-auto">
            {!mounted ? (
              <div className="text-center py-8">Cargando carrito...</div>
            ) : (
              <Cart 
                items={items} 
                onRemove={removeFromCart} 
                onChangeQty={updateQuantity} 
                subtotal={subtotal}
                onCheckout={() => setIsCheckoutOpen(true)}
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CarritoPage;
