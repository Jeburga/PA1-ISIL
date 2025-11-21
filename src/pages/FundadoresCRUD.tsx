import { useEffect, useState } from "react";

interface Fundador {
  id: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  foto: string;
}

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

// DATOS LOCALES INICIALES
const DATOS_INICIALES: Fundador[] = [
  {
    id: 1,
    nombre: "Roberto",
    apellido: "Hernández",
    especialidad: "Derecho Penal",
    foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
  },
  {
    id: 2,
    nombre: "Carmen",
    apellido: "Villalobos",
    especialidad: "Derecho Corporativo",
    foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
  },
  {
    id: 3,
    nombre: "Andrés",
    apellido: "Morales",
    especialidad: "Derecho Laboral",
    foto: "https://images.unsplash.com/photo-1623944889288-2131479d4455?w=400&h=400&fit=crop"
  },
  {
    id: 4,
    nombre: "Valentina",
    apellido: "Soto",
    especialidad: "Derecho de Familia",
    foto: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop"
  },
  {
    id: 5,
    nombre: "Fernando",
    apellido: "Cruz",
    especialidad: "Derecho Civil",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  },
  {
    id: 6,
    nombre: "Isabella",
    apellido: "Rojas",
    especialidad: "Propiedad Intelectual",
    foto: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop"
  }
];

export const FundadoresCRUD = () => {
  // ESTADO PRINCIPAL
  const [fundadores, setFundadores] = useState<Fundador[]>([]);
  const [cargando, setCargando] = useState(true);
  const [modo, setModo] = useState<"tabla" | "formulario">("tabla");
  const [fundadorEditando, setFundadorEditando] = useState<Fundador | null>(null);
  
  // ESTADO DEL FORMULARIO
  const [formData, setFormData] = useState<Omit<Fundador, "id">>({
    nombre: "",
    apellido: "",
    especialidad: "",
    foto: ""
  });
  
  // ESTADO DE MENSAJES
  const [mensaje, setMensaje] = useState<{ tipo: "exito" | "error"; texto: string } | null>(null);

  // CARGA INICIAL DE DATOS
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setCargando(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setFundadores(DATOS_INICIALES);
    setCargando(false);
  };

  // MANEJADORES CRUD
  const handleCrear = () => {
    setFundadorEditando(null);
    setFormData({
      nombre: "",
      apellido: "",
      especialidad: "",
      foto: ""
    });
    setModo("formulario");
    setMensaje(null);
  };

  const handleEditar = (id: number) => {
    const fundador = fundadores.find(f => f.id === id);
    if (fundador) {
      setFundadorEditando(fundador);
      setFormData({
        nombre: fundador.nombre,
        apellido: fundador.apellido,
        especialidad: fundador.especialidad,
        foto: fundador.foto
      });
      setModo("formulario");
      setMensaje(null);
    }
  };

  const handleEliminar = (id: number) => {
    if (window.confirm("¿Está seguro de eliminar este fundador?")) {
      setFundadores(prev => prev.filter(f => f.id !== id));
      setMensaje({ tipo: "exito", texto: "Fundador eliminado correctamente" });
      setTimeout(() => setMensaje(null), 3000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.apellido || !formData.especialidad) {
      setMensaje({ tipo: "error", texto: "Los campos nombre, apellido y especialidad son obligatorios" });
      return;
    }

    if (fundadorEditando) {
      // ACTUALIZAR
      setFundadores(prev => prev.map(f => 
        f.id === fundadorEditando.id 
          ? { ...f, ...formData }
          : f
      ));
      setMensaje({ tipo: "exito", texto: "Fundador actualizado correctamente" });
    } else {
      // CREAR NUEVO
      const nuevoId = Math.max(...fundadores.map(f => f.id), 0) + 1;
      setFundadores(prev => [...prev, { id: nuevoId, ...formData }]);
      setMensaje({ tipo: "exito", texto: "Fundador creado correctamente" });
    }

    setTimeout(() => setMensaje(null), 3000);
    setModo("tabla");
  };

  // SKELETON LOADING
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-6 py-4"><div className="h-4 bg-gray-300 rounded w-8"></div></td>
      <td className="px-6 py-4"><div className="h-10 w-10 bg-gray-300 rounded-full"></div></td>
      <td className="px-6 py-4"><div className="h-4 bg-gray-300 rounded w-24"></div></td>
      <td className="px-6 py-4"><div className="h-4 bg-gray-300 rounded w-32"></div></td>
      <td className="px-6 py-4"><div className="h-4 bg-gray-300 rounded w-40"></div></td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <div className="h-8 w-16 bg-gray-300 rounded"></div>
          <div className="h-8 w-16 bg-gray-300 rounded"></div>
        </div>
      </td>
    </tr>
  );

  // MODO LOADING
  if (cargando) {
    return (
      <main style={{ backgroundColor: colores.humo }} className="min-h-screen">
        <header style={{ backgroundColor: colores.principal, color: colores.blanco }} className="py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold">Gestión de Fundadores</h1>
          </div>
        </header>
        
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead style={{ backgroundColor: colores.principal, color: colores.blanco }}>
                  <tr>
                    <th className="px-6 py-3 text-left">ID</th>
                    <th className="px-6 py-3 text-left">Foto</th>
                    <th className="px-6 py-3 text-left">Nombre</th>
                    <th className="px-6 py-3 text-left">Apellido</th>
                    <th className="px-6 py-3 text-left">Especialidad</th>
                    <th className="px-6 py-3 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map(i => <SkeletonRow key={i} />)}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // MODO FORMULARIO
  if (modo === "formulario") {
    return (
      <main style={{ backgroundColor: colores.humo }} className="min-h-screen">
        <header style={{ backgroundColor: colores.principal, color: colores.blanco }} className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold">
              {fundadorEditando ? "Editar Fundador" : "Nuevo Fundador"}
            </h1>
          </div>
        </header>

        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            {mensaje && (
              <div 
                className={`mb-6 p-4 rounded-lg font-medium ${
                  mensaje.tipo === "exito" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}
              >
                {mensaje.texto}
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2" style={{ color: colores.principal }}>
                  Nombre *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none"
                  style={{ borderColor: colores.negroDesvanecido }}
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold mb-2" style={{ color: colores.principal }}>
                  Apellido *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none"
                  style={{ borderColor: colores.negroDesvanecido }}
                  value={formData.apellido}
                  onChange={(e) => setFormData({...formData, apellido: e.target.value})}
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold mb-2" style={{ color: colores.principal }}>
                  Especialidad *
                </label>
                <select
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none"
                  style={{ borderColor: colores.negroDesvanecido }}
                  value={formData.especialidad}
                  onChange={(e) => setFormData({...formData, especialidad: e.target.value})}
                  required
                >
                  <option value="">Seleccione una especialidad</option>
                  <option value="Derecho Penal">Derecho Penal</option>
                  <option value="Derecho Corporativo">Derecho Corporativo</option>
                  <option value="Derecho Laboral">Derecho Laboral</option>
                  <option value="Derecho de Familia">Derecho de Familia</option>
                  <option value="Derecho Civil">Derecho Civil</option>
                  <option value="Propiedad Intelectual">Propiedad Intelectual</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold mb-2" style={{ color: colores.principal }}>
                  URL de Foto
                </label>
                <input
                  type="url"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none"
                  style={{ borderColor: colores.negroDesvanecido }}
                  value={formData.foto}
                  onChange={(e) => setFormData({...formData, foto: e.target.value})}
                  placeholder="https://ejemplo.com/foto.jpg"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 text-white py-3 rounded-lg font-bold transition-colors"
                  style={{ backgroundColor: colores.principal }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colores.verdeIntermedio}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colores.principal}
                >
                  {fundadorEditando ? "Guardar Cambios" : "Crear Fundador"}
                </button>
                
                <button
                  type="button"
                  className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-bold hover:bg-gray-600"
                  onClick={() => {
                    setModo("tabla");
                    setMensaje(null);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    );
  }

  // MODO TABLA (LISTADO PRINCIPAL)
  return (
    <main style={{ backgroundColor: colores.humo }} className="min-h-screen">
      {/* Header */}
      <header style={{ backgroundColor: colores.principal, color: colores.blanco }} className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-4xl font-bold">Gestión de Fundadores</h1>
            
            <button
              onClick={handleCrear}
              className="bg-white px-6 py-3 rounded-lg font-bold transition-colors"
              style={{ color: colores.principal }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colores.verdeClaro;
                e.currentTarget.style.color = colores.blanco;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colores.blanco;
                e.currentTarget.style.color = colores.principal;
              }}
            >
              + Nuevo Fundador
            </button>
          </div>
        </div>
      </header>

      {/* Mensajes */}
      {mensaje && (
        <div className="max-w-7xl mx-auto px-4 -mt-10 mb-6">
          <div 
            className={`p-4 rounded-lg font-medium text-center ${
              mensaje.tipo === "exito" 
                ? "bg-green-100 text-green-800 border border-green-300" 
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {mensaje.texto}
          </div>
        </div>
      )}

      {/* Tabla */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Header de tabla */}
                <thead style={{ backgroundColor: colores.principal, color: colores.blanco }}>
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">ID</th>
                    <th className="px-6 py-4 text-left font-bold">Foto</th>
                    <th className="px-6 py-4 text-left font-bold">Nombre</th>
                    <th className="px-6 py-4 text-left font-bold">Apellido</th>
                    <th className="px-6 py-4 text-left font-bold">Especialidad</th>
                    <th className="px-6 py-4 text-left font-bold">Acciones</th>
                  </tr>
                </thead>
                
                {/* Body de tabla */}
                <tbody>
                  {fundadores.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-20 text-center text-gray-500">
                        No hay fundadores registrados
                      </td>
                    </tr>
                  ) : (
                    fundadores.map((fundador, index) => (
                      <tr 
                        key={fundador.id} 
                        className="border-b hover:bg-gray-50 transition-colors fade-in-row"
                        style={{ 
                          borderColor: colores.negroDesvanecido,
                          animationDelay: `${index * 0.1}s`
                        }}
                      >
                        {/* ID */}
                        <td className="px-6 py-4 font-mono" style={{ color: colores.accent }}>
                          #{fundador.id}
                        </td>
                        
                        {/* Foto */}
                        <td className="px-6 py-4">
                          <img 
                            src={fundador.foto}
                            alt={`${fundador.nombre} ${fundador.apellido}`}
                            className="w-12 h-12 rounded-full object-cover border-2"
                            style={{ borderColor: colores.verdeClaro }}
                            onError={(e) => {
                              e.currentTarget.src = `https://ui-avatars.com/api/?name=${fundador.nombre}+${fundador.apellido}&background=1C4B42&color=FFFFFF`;
                            }}
                          />
                        </td>
                        
                        {/* Nombre */}
                        <td className="px-6 py-4 font-semibold" style={{ color: colores.principal }}>
                          {fundador.nombre}
                        </td>
                        
                        {/* Apellido */}
                        <td className="px-6 py-4 font-semibold" style={{ color: colores.principal }}>
                          {fundador.apellido}
                        </td>
                        
                        {/* Especialidad */}
                        <td className="px-6 py-4">
                          <span 
                            className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                            style={{ 
                              backgroundColor: `${colores.verdeClaro}20`,
                              color: colores.verdeIntermedio
                            }}
                          >
                            {fundador.especialidad}
                          </span>
                        </td>
                        
                        {/* Acciones */}
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditar(fundador.id)}
                              className="px-3 py-1 rounded text-white text-sm font-medium transition-colors"
                              style={{ backgroundColor: colores.principal }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colores.verdeIntermedio}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colores.principal}
                              title="Editar"
                            >
                              ✏️ Editar
                            </button>
                            
                            <button
                              onClick={() => handleEliminar(fundador.id)}
                              className="px-3 py-1 bg-red-600 rounded text-white text-sm font-medium hover:bg-red-700 transition-colors"
                              title="Eliminar"
                            >
                              🗑️ Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Footer decorativo */}
      <div 
        className="h-2 mt-16"
        style={{ 
          background: `linear-gradient(to right, ${colores.principal}, ${colores.verdeIntermedio}, ${colores.principal})`
        }}
      ></div>
    </main>
  );
};

export default FundadoresCRUD;