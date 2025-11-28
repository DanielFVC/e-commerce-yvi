"use client";

import React, { useState, useEffect } from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  subtotal: number;
  onConfirm: (data: CheckoutData) => void;
}

export interface CheckoutData {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  metodoPago: 'tarjeta' | 'efectivo' | 'transferencia';
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, subtotal, onConfirm }) => {
  const [formData, setFormData] = useState<CheckoutData>({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    metodoPago: 'tarjeta',
  });

  const [errors, setErrors] = useState<Partial<CheckoutData>>({});

  // Cargar datos del usuario si está autenticado
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      const authUser = localStorage.getItem('auth_user');
      if (authUser) {
        try {
          const user = JSON.parse(authUser);
          setFormData(prev => ({
            ...prev,
            nombre: user.username || prev.nombre,
            email: user.email || prev.email,
          }));
        } catch (error) {
          console.error('Error al cargar datos del usuario:', error);
        }
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Partial<CheckoutData> = {};
    
    if (!formData.nombre.trim()) newErrors.nombre = 'Nombre requerido';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email válido requerido';
    if (!formData.telefono.trim()) newErrors.telefono = 'Teléfono requerido';
    if (!formData.direccion.trim()) newErrors.direccion = 'Dirección requerida';
    if (!formData.ciudad.trim()) newErrors.ciudad = 'Ciudad requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onConfirm(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof CheckoutData]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const envio = 5000; // Costo de envío fijo
  const total = subtotal + envio;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Finalizar Compra</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Información de contacto */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Información de Contacto</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Nombre Completo *</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Juan Pérez"
              />
              {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="ejemplo@correo.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Teléfono *</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black ${errors.telefono ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="3001234567"
              />
              {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
            </div>
          </div>

          {/* Información de envío */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Información de Envío</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Dirección *</label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black ${errors.direccion ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Calle 123 #45-67"
              />
              {errors.direccion && <p className="text-red-500 text-sm mt-1">{errors.direccion}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Ciudad *</label>
              <input
                type="text"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black ${errors.ciudad ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Bogotá"
              />
              {errors.ciudad && <p className="text-red-500 text-sm mt-1">{errors.ciudad}</p>}
            </div>
          </div>

          {/* Método de pago */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Método de Pago</h3>
            <select
              name="metodoPago"
              value={formData.metodoPago}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="tarjeta">Tarjeta de Crédito/Débito</option>
              <option value="efectivo">Efectivo Contra Entrega</option>
              <option value="transferencia">Transferencia Bancaria</option>
            </select>
          </div>

          {/* Resumen de compra */}
          <div className="mb-6 bg-gray-50 p-4 rounded">
            <h3 className="text-lg font-semibold mb-3">Resumen del Pedido</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${subtotal.toLocaleString('es-CO')}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Envío:</span>
              <span>${envio.toLocaleString('es-CO')}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total:</span>
              <span>${total.toLocaleString('es-CO')}</span>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded hover:bg-gray-50 transition font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition font-semibold"
            >
              Confirmar Compra
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
