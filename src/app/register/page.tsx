"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.username.trim()) {
      newErrors.username = 'El nombre de usuario es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 5) {
      newErrors.password = 'La contraseña debe tener al menos 5 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
    setServerError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setServerError('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registro exitoso - redirigir al login
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        router.push('/login');
      } else {
        setServerError(data.error || 'Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      setServerError('Error al conectar con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Banner superior */}
      <header className="w-full h-48 md:h-56 lg:h-50 bg-center bg-cover relative"
        style={{ backgroundImage: "url('/fondo-perfumeria.jpg')" }}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex items-center gap-1 text-white text-4xl md:text-6xl font-black tracking-wides">
            <Image
              src="/YVI__2_-removebg-preview.png"
              alt=""
              width={350}
              height={350}
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
        </div>
        {/* Botón de regreso */}
        <Link href="/pagina-principal">
          <button className="absolute top-4 left-6 px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-black transition font-semibold">
            ← Volver
          </button>
        </Link>
      </header>

      {/* Título */}
      <div className="w-full bg-black">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h2 className="text-center text-white text-lg md:text-xl font-bold uppercase">
            REGISTRO
          </h2>
        </div>
      </div>

      {/* Formulario */}
      <main className="flex-1 flex items-start justify-center mt-10 mb-10">
        <div className="w-full max-w-md px-6">
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <form onSubmit={handleSubmit}>
              {/* Nombre de usuario */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Nombre de Usuario</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.username ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Usuario123"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="usuario@ejemplo.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Contraseña */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirmar contraseña */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Confirmar Contraseña</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Error del servidor */}
              {serverError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {serverError}
                </div>
              )}

              {/* Botón de registro */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Registrando...' : 'Registrarse'}
              </button>

              {/* Link al login */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  ¿Ya tienes cuenta?{' '}
                  <Link href="/login" className="text-black font-semibold hover:underline">
                    Inicia Sesión
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
