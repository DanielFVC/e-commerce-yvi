/** Credenciales enviadas al intentar iniciar sesión */
export interface LoginCredentials {
  email: string;
  password: string;
}

/** Respuesta simulada o real del backend al autenticar */
export interface LoginResponse {
  token: string;
  user: UserInfo;
}

/** Información básica del usuario autenticado */
export interface UserInfo {
  id: string;
  name: string;
  email: string;
}

/** Estado del proceso de login */
export interface LoginState {
  isLoading: boolean;
  isAuthenticated: boolean;
  error?: string;
  user?: UserInfo;
}

/** Posibles errores de autenticación */
export type LoginError = 
  | "INVALID_CREDENTIALS"
  | "USER_NOT_FOUND"
  | "SERVER_ERROR";