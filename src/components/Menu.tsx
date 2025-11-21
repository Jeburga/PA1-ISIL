import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// PALETA DE COLORES
const colores = {
  principal: "#1C4B42",
  verdeClaro: "#B4E717",
  verdeIntermedio: "#92C200",
  blanco: "#FFFFFF",
  humo: "#F6F5F2",
  negro: "#000000", 
  negroDesvanecido: "rgba(0, 0, 0, 0.1)",
  accent: "#7E7E7E"
};

export const Menu = () => {
  const { estaAutenticado, usuario, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    // Recarga la página para redirigir al home
    window.location.href = "/";
  };

  return (
    <nav style={{ backgroundColor: colores.principal }} className="text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg" style={{ backgroundColor: colores.verdeClaro, color: colores.principal }}>
              ES
            </div>
            <span className="font-bold text-xl">Estudio Sauls</span>
          </Link>

          {/* Menú */}
          <div className="flex items-center space-x-6">
            {/* SIEMPRE VISIBLES (sin sesión) */}
            <Link 
              to="/" 
              className={`hover:opacity-80 transition-opacity ${location.pathname === "/" ? "opacity-100" : "opacity-90"}`}
            >
              Inicio
            </Link>
            
            <Link 
              to="/te-contactamos" 
              className={`hover:opacity-80 transition-opacity ${location.pathname === "/te-contactamos" ? "opacity-100" : "opacity-90"}`}
            >
              Te contactamos
            </Link>
            
            <Link 
              to="/nuestros-cursos" 
              className={`hover:opacity-80 transition-opacity ${location.pathname === "/nuestros-cursos" ? "opacity-100" : "opacity-90"}`}
            >
              Nuestros cursos
            </Link>

            {/* VISIBLES SOLO CON SESIÓN ✅ */}
            {estaAutenticado && (
              <>
                <Link 
                  to="/fundadores-crud" 
                  className={`hover:opacity-80 transition-opacity ${location.pathname === "/fundadores-crud" ? "opacity-100" : "opacity-90"}`}
                >
                  Gestión de Fundadores
                </Link>
                
                <Link 
                  to="/equipo" 
                  className={`hover:opacity-80 transition-opacity ${location.pathname === "/equipo" ? "opacity-100" : "opacity-90"}`}
                >
                  Equipo
                </Link>
              </>
            )}

            {/* VISIBLES SOLO SIN SESIÓN ❌ */}
            {!estaAutenticado && (
              <Link 
                to="/staff" 
                className={`hover:opacity-80 transition-opacity ${location.pathname === "/staff" ? "opacity-100" : "opacity-90"}`}
              >
                Staff
              </Link>
            )}
          </div>

          {/* Usuario y Logout */}
          <div className="flex items-center space-x-4">
            {estaAutenticado ? (
              <>
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: colores.verdeClaro, color: colores.principal }}
                  >
                    {usuario?.nombre.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium">{usuario?.nombre}</span>
                  <span 
                    className="text-xs px-2 py-1 rounded"
                    style={{ 
                      backgroundColor: colores.verdeClaro,
                      color: colores.principal
                    }}
                  >
                    {usuario?.rol}
                  </span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg font-bold transition-colors"
                  style={{ backgroundColor: colores.verdeClaro, color: colores.principal }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colores.verdeIntermedio}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colores.verdeClaro}
                >
                  Salir
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="px-4 py-2 rounded-lg font-bold transition-colors"
                style={{ backgroundColor: colores.verdeClaro, color: colores.principal }}
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};