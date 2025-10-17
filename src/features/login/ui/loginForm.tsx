"use client";
import { useState } from "react";
import { LoginCredentials } from "@/entities/login/model/login.types";

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-2xl mt-20 px-6 lg:px-0">

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8">
          <div className="w-full">
            <label className="block text-center text-30px font-extrabold uppercase mb-4">
              USUARIO
            </label>
            <input
              type="email"
              aria-label="usuario"
              className="mx-auto block w-auto md:w-3/4 lg:w-10px h-7 border-2 border-black px-4 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="w-full">
            <label className="block text-center text-30px font-extrabold uppercase mb-4">
              CONTRASEÑA
            </label>
            <input
              type="password"
              aria-label="contraseña"
              className="mx-auto block w-auto md:w-3/4 lg:w-10px h-7 border-2 border-black px-4 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-black text-white py-2 px-6 font-bold hover:bg-gray-800 transition rounded"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};