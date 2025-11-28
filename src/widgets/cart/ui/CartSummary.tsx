"use client";

import React from 'react';
import Link from 'next/link';

type Props = {
  subtotal: number;
  onCheckout?: () => void;
};

export const CartSummary: React.FC<Props> = ({ subtotal, onCheckout }) => {
  return (
    <aside className="w-full md:w-96 bg-white p-6 border border-gray-200 rounded-md">
      <h4 className="text-lg font-semibold mb-4">RESUMEN DEL PEDIDO</h4>

      <div className="flex items-center justify-between py-2 border-b">
        <div className="text-sm text-gray-600">SUBTOTAL</div>
        <div className="font-bold">${subtotal}</div>
      </div>

      <div className="mt-4">
        <label className="block text-sm text-gray-600 mb-2">Código promocional</label>
        <input className="w-full border rounded px-3 py-2 text-sm" placeholder="Introduce el código de cupón" />
        <p className="text-xs text-gray-400 mt-2">El código de cupón se aplicará en la página de pago.</p>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">TOTAL</div>
          <div className="font-bold">${subtotal}</div>
        </div>

        <button className="mt-6 w-full bg-black text-white py-2 rounded" onClick={onCheckout}>PAGAR</button>
        <Link href="/pagina-principal">
          <button className="mt-3 w-full border border-black py-2 rounded">SEGUIR COMPRANDO</button>
        </Link>
      </div>
    </aside>
  );
};

export default CartSummary;
