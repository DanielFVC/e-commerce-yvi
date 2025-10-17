"use client";

import LoginForm from "@/features/login/ui/loginForm";
import { LoginCredentials } from "@/entities/login/model/login.types";
import { useState } from "react";
import { useLogin } from "@/features/login/model/useLogin";
import Image from "next/image";


export const LoginWidget = () => {
  const { login, loginState } = useLogin();

  const handleLogin = async (credentials: LoginCredentials) => {
    console.log("handleLogin called", credentials);
    try {
      const res = await login(credentials);
      if (res) {
        console.log("Login successful:", res);
        // redirigir o actualizar UI según respuesta
      } else {
        console.warn("Credenciales inválidas");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Banner superior: usa gradiente como placeholder para la imagen del header */}
      <header className="w-full h-48 md:h-56 lg:h-50 bg-center bg-cover"
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
    </header>

     
      <div className="w-full bg-black">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h2 className="text-center text-white text-lg md:text-xl font-bold uppercase">
            LOGIN
          </h2>
        </div>
      </div>

 
  <main className="flex-1 flex items-start justify-center mt-[110px]">
        <div className="w-full max-w-4xl px-6">
          <div className="bg-white">
            <div className="max-w-3xl mx-auto">
              {/* El LoginForm controla sus propios estilos; lo colocamos en el centro con espacio */}
              <LoginForm onSubmit={handleLogin} />
              {/* Mensajes de depuración / feedback al usuario */}
              <div className="mt-6 text-center">
                {loginState.isLoading && (
                  <p className="text-sm text-gray-600">Procesando...</p>
                )}
                {loginState.error && (
                  <p className="text-sm text-red-600">{loginState.error}</p>
                )}
                {loginState.isAuthenticated && loginState.user && (
                  <p className="text-sm text-green-600">Bienvenido, {loginState.user.name}</p>
                )}
                {/* debug output removed */}
              </div>
            </div>
          </div>
        </div>
      </main>

      {loginState.isLoading && (
        <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded">
          Procesando...
        </div>
      )}
    </div>
  );
};