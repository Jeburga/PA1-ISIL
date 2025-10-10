import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import cursosData from "../data/cursos.json";
import nofoto from "../assets/img/nofoto.jpg";

// Tipado local (derivado del JSON)
type Curso = {
  id: string;
  nombre: string;
  docente: string;
  horasLectivas: number;
  categoria: string;
  imagen?: string;
  tags?: string[];
};

const Cursos = () => {
  const cursos: Curso[] = cursosData as unknown as Curso[];

  // Extraer categorías únicas
  const categorias = useMemo(() => {
    const set = new Set<string>();
    cursos.forEach((c) => set.add(c.categoria));
    return Array.from(set);
  }, [cursos]);

  // Estado: categoría seleccionada (primera por defecto)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>(
    categorias[0] ?? ""
  );

  // Filtro por categoría
  const cursosDeCategoria = useMemo(
    () => cursos.filter((c) => c.categoria === categoriaSeleccionada),
    [cursos, categoriaSeleccionada]
  );

  return (
    <>
      {/* Header */}
      <header
        className="px-4 py-10"
        style={{
          background: "var(--color-principal)",
          color: "var(--color-blanco)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Cursos de Derecho</h1>
          <p className="opacity-90">
            Selecciona una categoría para ver sus cursos.
          </p>
        </div>
      </header>

      {/* Contenido */}
      <section className="py-10" style={{ background: "var(--color-humo)" }}>
        <div className="max-w-7xl mx-auto px-3">
          <div className="flex -mx-3">
            {/* Columna izquierda: Categorías */}
            <aside className="w-full md:w-1/3 lg:w-1/4 px-3">
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "var(--color-blanco)",
                  border: "1px solid var(--color-negro-desvanecido)",
                  boxShadow: "0 10px 24px var(--color-negro-desvanecido)",
                }}
              >
                <h3
                  className="text-lg font-semibold px-4 py-3"
                  style={{
                    color: "var(--color-principal)",
                    borderBottom: "1px solid var(--color-negro-desvanecido)",
                  }}
                >
                  Categorías
                </h3>
                <ul>
                  {categorias.map((cat) => {
                    const activa = cat === categoriaSeleccionada;
                    return (
                      <li
                        key={cat}
                        className="px-4 py-3 border-b cursor-pointer transition-colors select-none"
                        style={{
                          borderColor: "var(--color-negro-desvanecido)",
                          background: activa
                            ? "var(--color-principal)"
                            : "transparent",
                          color: activa
                            ? "var(--color-blanco)"
                            : "var(--color-negro)",
                        }}
                        onClick={() => setCategoriaSeleccionada(cat)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ")
                            setCategoriaSeleccionada(cat);
                        }}
                        tabIndex={0}
                        role="button"
                        title={cat}
                      >
                        <div className="font-medium">{cat}</div>
                        <div
                          className="text-xs mt-0.5"
                          style={{
                            color: activa
                              ? "var(--color-blanco)"
                              : "var(--color-accent)",
                          }}
                        >
                          {cursos.filter((c) => c.categoria === cat).length}{" "}
                          curso(s)
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>

            {/* Columna derecha: Lista de cursos */}
            <main className="w-full md:w-2/3 lg:w-3/4 px-3 mt-8 md:mt-0">
              <div className="flex items-center justify-between mb-3">
                <h2
                  className="text-2xl font-bold"
                  style={{ color: "var(--color-principal)" }}
                >
                  {categoriaSeleccionada}
                </h2>
                <span
                  className="text-sm"
                  style={{ color: "var(--color-accent)" }}
                >
                  {cursosDeCategoria.length} resultado(s)
                </span>
              </div>

              {/* Grid de cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cursosDeCategoria.map((curso) => (
                  <article
                    key={curso.id}
                    className="rounded-2xl overflow-hidden"
                    style={{
                      background: "var(--color-blanco)",
                      border: "1px solid var(--color-negro-desvanecido)",
                      boxShadow: "0 10px 24px var(--color-negro-desvanecido)",
                    }}
                  >
                    <div className="w-full h-40 overflow-hidden">
                      <img
                        src={nofoto}
                        alt={curso.nombre}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3
                        className="text-base font-semibold"
                        style={{ color: "var(--color-principal)" }}
                      >
                        {curso.nombre}
                      </h3>
                      <p
                        className="text-sm mt-1"
                        style={{ color: "var(--color-accent)" }}
                      >
                        Docente:{" "}
                        <span
                          className="font-medium"
                          style={{ color: "var(--color-negro)" }}
                        >
                          {curso.docente}
                        </span>
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "var(--color-accent)" }}
                      >
                        Horas lectivas:{" "}
                        <span
                          className="font-medium"
                          style={{ color: "var(--color-negro)" }}
                        >
                          {curso.horasLectivas}
                        </span>
                      </p>

                      {curso.tags && curso.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {curso.tags.slice(0, 3).map((t, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 rounded-full"
                              style={{
                                background: "var(--color-humo)",
                                border:
                                  "1px solid var(--color-negro-desvanecido)",
                                color: "var(--color-accent)",
                              }}
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-4">
                        <Link
                          to={`/cursos/${curso.id}`}
                          className="px-3 py-2 rounded-xl text-sm font-medium transition-transform active:scale-95"
                          style={{
                            background: "var(--color-verde-intermedio)",
                            color: "var(--color-negro)",
                          }}
                          onClick={() =>
                            alert(`(Demo) Ver detalles de: ${curso.nombre}`)
                          }
                        >
                          Ver detalles
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {cursosDeCategoria.length === 0 && (
                <p className="mt-6" style={{ color: "var(--color-accent)" }}>
                  No hay cursos en esta categoría.
                </p>
              )}
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cursos;
