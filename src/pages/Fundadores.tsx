import { useEffect, useState } from "react";

interface Fundador {
  id: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  foto: string;
}

// DATOS LOCALES INTEGRADOS (Funcionan sin backend)
const FUNDADORES_LOCAL: Fundador[] = [
  {
    id: 1,
    nombre: "Roberto",
    apellido: "Hernández",
    especialidad: "Derecho Penal",
    foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    nombre: "Carmen",
    apellido: "Villalobos",
    especialidad: "Derecho Corporativo",
    foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    nombre: "Andrés",
    apellido: "Morales",
    especialidad: "Derecho Laboral",
    foto: "https://images.unsplash.com/photo-1623944889288-2131479d4455?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    nombre: "Valentina",
    apellido: "Soto",
    especialidad: "Derecho de Familia",
    foto: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    nombre: "Fernando",
    apellido: "Cruz",
    especialidad: "Derecho Civil",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    nombre: "Isabella",
    apellido: "Rojas",
    especialidad: "Propiedad Intelectual",
    foto: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop",
  },
];

// PALETA DE COLORES (CSS Custom Properties)
const colores = {
  principal: "#1C4B42",
  verdeClaro: "#B4E717",
  verdeIntermedio: "#92C200",
  blanco: "#FFFFFF",
  humo: "#F6F5F2",
  negro: "#000000",
  negroDesvanecido: "#0000001A",
  accent: "#7E7E7E",
};

export const Fundadores = () => {
  const [listaFundadores, setListaFundadores] = useState<Fundador[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // ✅ CARGA INMEDIATA DE DATOS LOCALES (sin fetch)
    const cargarDatos = async () => {
      setCargando(true);
      // Simula un pequeño delay para ver el skeleton
      await new Promise((resolve) => setTimeout(resolve, 800));
      setListaFundadores(FUNDADORES_LOCAL);
      setCargando(false);
    };

    cargarDatos();
  }, []);

  // Skeleton Loading
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-64 bg-gray-300"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-6"></div>
        <div className="h-10 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );

  if (cargando) {
    return (
      <main style={{ backgroundColor: colores.humo }}>
        <header
          style={{ backgroundColor: colores.principal, color: colores.blanco }}
          className="py-16 px-4"
        >
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Conoce a nuestros{" "}
              <span style={{ color: colores.verdeClaro }}>Fundadores</span>
            </h1>
          </div>
        </header>

        <section className="py-20 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: colores.humo }}>
      {/* Header Hero */}
      <header
        style={{ backgroundColor: colores.principal, color: colores.blanco }}
        className="py-16 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Conoce a nuestros{" "}
            <span style={{ color: colores.verdeClaro }}>Fundadores</span>
          </h1>
          <p
            className="text-lg opacity-90 max-w-2xl mx-auto"
            style={{ color: colores.humo }}
          >
            Profesionales con más de 20 años de experiencia al servicio de la
            justicia
          </p>
        </div>
      </header>

      {/* Sección de Fundadores */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: colores.principal }}
            >
              Nuestro Equipo Directivo
            </h2>
            <div
              className="w-24 h-1 mx-auto"
              style={{ backgroundColor: colores.verdeClaro }}
            ></div>
          </div>

          {/* Grid de Tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listaFundadores.map((fundador) => (
              <article
                key={fundador.id}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                style={{
                  borderTop: "4px solid transparent",
                  transition: "border-color 0.3s ease",
                }}
              >
                {/* Imagen con efecto hover */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={fundador.foto}
                    alt={`${fundador.nombre} ${fundador.apellido}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback si la imagen no carga
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${fundador.nombre}+${fundador.apellido}&background=1C4B42&color=FFFFFF`;
                    }}
                  />
                  <div
                    className="absolute inset-0 transition-all duration-300 group-hover:bg-opacity-20"
                    style={{ backgroundColor: `${colores.principal}00` }}
                  ></div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: colores.verdeIntermedio }}
                    ></div>
                    <span
                      className="text-sm font-bold tracking-wider"
                      style={{ color: colores.accent }}
                    >
                      FUNDADOR
                    </span>
                  </div>

                  <h3
                    className="text-2xl font-bold mb-1"
                    style={{ color: colores.principal }}
                  >
                    {fundador.nombre} {fundador.apellido}
                  </h3>

                  <p
                    className="font-semibold text-lg mb-4 flex items-center"
                    style={{ color: colores.verdeIntermedio }}
                  >
                    <span
                      className="mr-2"
                      style={{ color: colores.verdeClaro }}
                    >
                      •
                    </span>
                    {fundador.especialidad}
                  </p>

                  <div
                    className="pt-4 border-t"
                    style={{ borderColor: colores.negroDesvanecido }}
                  >
                    <button
                      className="w-full text-white py-2 rounded-lg font-medium transition-colors duration-200"
                      style={{ backgroundColor: colores.principal }}
                      onClick={() =>
                        alert(
                          `Perfil de ${fundador.nombre} ${fundador.apellido}\n\nPróximamente disponible`
                        )
                      }
                    >
                      Ver Perfil Completo
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        style={{ backgroundColor: colores.principal }}
        className="py-16 px-4 mt-20"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
          <div>
            <div
              className="text-5xl font-bold mb-2"
              style={{ color: colores.verdeClaro }}
            >
              20+
            </div>
            <p style={{ color: colores.humo }}>Años de experiencia</p>
          </div>
          <div>
            <div
              className="text-5xl font-bold mb-2"
              style={{ color: colores.verdeClaro }}
            >
              500+
            </div>
            <p style={{ color: colores.humo }}>Casos ganados</p>
          </div>
          <div>
            <div
              className="text-5xl font-bold mb-2"
              style={{ color: colores.verdeClaro }}
            >
              98%
            </div>
            <p style={{ color: colores.humo }}>Tasa de éxito</p>
          </div>
        </div>
      </section>

      {/* Footer decorativo */}
      <div
        className="h-2"
        style={{
          background: `linear-gradient(to right, ${colores.principal}, ${colores.verdeIntermedio}, ${colores.principal})`,
        }}
      ></div>
    </main>
  );
};

export default Fundadores;
