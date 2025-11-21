import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (login(email, password)) {
      // Redirige según el rol
      navigate("/fundadores-crud");
    } else {
      setError("Credenciales inválidas. Intenta con los datos de prueba.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center py-20 px-4" style={{ backgroundColor: colores.humo }}>
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2" style={{ color: colores.principal }}>
            Estudio Sauls
          </h1>
          <p className="text-lg" style={{ color: colores.accent }}>
            Sistema de Gestión
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-6" style={{ color: colores.principal }}>
            Iniciar Sesión
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2" style={{ color: colores.principal }}>
                Correo Electrónico
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none"
                style={{ borderColor: colores.negroDesvanecido }}
                placeholder="admin@estudiosauls.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold mb-2" style={{ color: colores.principal }}>
                Contraseña
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none"
                style={{ borderColor: colores.negroDesvanecido }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white py-3 rounded-lg font-bold text-lg transition-colors mb-4"
              style={{ backgroundColor: colores.principal }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colores.verdeIntermedio;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colores.principal;
              }}
            >
              Acceder al Sistema
            </button>
          </form>

          {/* Datos de prueba */}
          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: colores.humo }}>
            <p className="text-sm font-bold mb-2" style={{ color: colores.principal }}>
              📌 Credenciales de Prueba:
            </p>
            <div className="text-sm space-y-1" style={{ color: colores.accent }}>
              <p>Admin: <span className="font-mono bg-white px-2 py-1 rounded">admin@estudiosauls.com</span></p>
              <p>Pass: <span className="font-mono bg-white px-2 py-1 rounded">admin123</span></p>
              <p className="mt-2">Usuario: <span className="font-mono bg-white px-2 py-1 rounded">abogado@estudiosauls.com</span></p>
              <p>Pass: <span className="font-mono bg-white px-2 py-1 rounded">abogado123</span></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;