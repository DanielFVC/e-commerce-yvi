import { useState } from "react";
import { LoginCredentials, LoginResponse, LoginState } from "@/entities/login/model/login.types";

/** Hook para manejar el proceso de autenticación */
export const useLogin = () => {
  const [loginState, setLoginState] = useState<LoginState>({
    isLoading: false,
    isAuthenticated: false,
  });

  /** Simulación de autenticación */
  const login = async (credentials: LoginCredentials): Promise<LoginResponse | null> => {
    setLoginState({ ...loginState, isLoading: true });

    return new Promise((resolve) => {
      setTimeout(() => {
        if (credentials.email === "admin@yvi.com" && credentials.password === "12345") {
          const user = {
            id: "1",
            name: "Administrador YVI",
            email: credentials.email,
          };

          const response: LoginResponse = {
            token: "fake-token-12345",
            user,
          };

          setLoginState({
            isLoading: false,
            isAuthenticated: true,
            user,
          });

          resolve(response);
        } else {
          setLoginState({
            isLoading: false,
            isAuthenticated: false,
            error: "Credenciales inválidas",
          });
          resolve(null);
        }
      }, 1000);
    });
  };

  /** Cerrar sesión */
  const logout = () => {
    setLoginState({
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return { loginState, login, logout };
};