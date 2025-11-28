import { useState } from "react";
import { LoginCredentials, LoginResponse, LoginState } from "@/entities/login/model/login.types";

/** Hook para manejar el proceso de autenticación contra la API */
export const useLogin = () => {
  const [loginState, setLoginState] = useState<LoginState>({
    isLoading: false,
    isAuthenticated: false,
  });

  /** Autenticación contra /api/login */
  const login = async (credentials: LoginCredentials): Promise<LoginResponse | null> => {
    setLoginState({ ...loginState, isLoading: true });

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        const error = await res.json();
        const message = error.error || 'Credenciales inválidas';
        setLoginState({
          isLoading: false,
          isAuthenticated: false,
          error: message,
        });
        return null;
      }

      const response: LoginResponse = await res.json();
      const user = response.user;

      setLoginState({
        isLoading: false,
        isAuthenticated: true,
        user,
      });

      // Optionally store token in localStorage or sessionStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('auth_user', JSON.stringify(user));
      }

      return response;
    } catch (err) {
      console.error('Login error:', err);
      setLoginState({
        isLoading: false,
        isAuthenticated: false,
        error: 'Error al conectar con el servidor',
      });
      return null;
    }
  };

  /** Cerrar sesión */
  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
    setLoginState({
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return { loginState, login, logout };
};