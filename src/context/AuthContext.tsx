import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: "admin" | "usuario";
}

interface AuthContextType {
  usuario: Usuario | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  estaAutenticado: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // CREDENCIALES DE PRUEBA (para tu actividad)
    const credenciales = [
      { email: "admin@estudiosauls.com", password: "admin123", nombre: "Administrador", rol: "admin" as const },
      { email: "abogado@estudiosauls.com", password: "abogado123", nombre: "Abogado", rol: "usuario" as const },
      { email: "prueba@prueba.com", password: "123456", nombre: "Usuario Prueba", rol: "usuario" as const },
    ];

    const usuarioValido = credenciales.find(
      u => u.email === email && u.password === password
    );

    if (usuarioValido) {
      const usuarioConId = {
        id: Date.now(),
        nombre: usuarioValido.nombre,
        email: usuarioValido.email,
        rol: usuarioValido.rol,
      };
      setUsuario(usuarioConId);
      localStorage.setItem("usuario", JSON.stringify(usuarioConId));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ 
      usuario, 
      login, 
      logout, 
      estaAutenticado: !!usuario 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ FIX: Desactiva la regla ESLint para esta exportación
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};