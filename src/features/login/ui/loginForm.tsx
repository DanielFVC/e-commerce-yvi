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
    <div className="w-full">
      <div className="max-w-[720px] mx-auto -mt-12 px-4 lg:px-0">

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-7">
          <div className="w-full">
            <label className="block text-center text-[25px] font-extrabold mb-4">
              USUARIO
            </label>
            <input
              type="email"
              aria-label="usuario"
              className="block w-full h-14 border-4 border-black px-4 outline-none mx-auto"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="w-full">
            <label className="block text-center text-[25px] font-extrabold uppercase mb-4">
              CONTRASEÑA
            </label>
            <input
              type="password"
              aria-label="contraseña"
              className="block w-full h-14 border-4 border-black px-4 outline-none mx-auto"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-6 bg-black text-white py-2 px-6 font-bold hover:bg-gray-800 transition rounded"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};