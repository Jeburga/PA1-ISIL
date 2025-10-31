import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import cursosData from "../data/cursos.json";
import { addToCart } from "../utils/cart";

type Curso = {
  id: string;
  nombre: string;
  docente: string;
  horasLectivas: number;
  categoria: string;
  imagen?: string;
  tags?: string[];
};

const CursoDetalles = () => {
  const { idcurso } = useParams<{ idcurso: string }>();

  const cursoSeleccionado = useMemo<Curso | undefined>(() => {
    return (cursosData as unknown as Curso[]).find((c) => c.id === idcurso);
  }, [idcurso]);

  return (
    <>
      {/* Header simple */}
      <header
        className="px-4 py-10"
        style={{ background: "var(--color-principal)", color: "var(--color-blanco)" }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-sm opacity-90">
            <Link to="/cursos" style={{ textDecoration: "underline", color: "var(--color-verde-claro)" }}>
              ← Volver a cursos
            </Link>
          </p>
          <h1 className="text-3xl font-bold mt-2">
            {cursoSeleccionado ? cursoSeleccionado.nombre : "Curso no encontrado"}
          </h1>
          {cursoSeleccionado && (
            <p className="opacity-90 mt-1">{cursoSeleccionado.categoria}</p>
          )}
        </div>
      </header>

      {/* Contenido */}
      <section className="py-10" style={{ background: "var(--color-humo)" }}>
        <div className="max-w-7xl mx-auto px-3">
          {!cursoSeleccionado ? (
            <div
              className="rounded-2xl p-6"
              style={{
                background: "var(--color-blanco)",
                border: "1px solid var(--color-negro-desvanecido)",
                boxShadow: "0 10px 24px var(--color-negro-desvanecido)",
              }}
            >
              <p style={{ color: "var(--color-accent)" }}>
                No encontramos el curso solicitado. Verifica el enlace o regresa al listado.
              </p>
              <div className="mt-4">
                <Link
                  to="/cursos"
                  className="inline-block px-4 py-2 rounded-xl font-medium"
                  style={{ background: "var(--color-verde-intermedio)", color: "var(--color-negro)" }}
                >
                  Volver al listado
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex -mx-3">
              {/* Imagen */}
              <div className="w-full md:w-1/2 px-3">
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "var(--color-blanco)",
                    border: "1px solid var(--color-negro-desvanecido)",
                    boxShadow: "0 10px 24px var(--color-negro-desvanecido)",
                  }}
                >
                  <img
                    src={cursoSeleccionado.imagen || "/images/placeholder.jpg"}
                    alt={cursoSeleccionado.nombre}
                    className="w-full object-cover px-4 pt-4 transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    style={{ height: 380 }}
                  />
                </div>
              </div>

              {/* Detalles */}
              <div className="w-full md:w-1/2 px-3 mt-6 md:mt-0">
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: "var(--color-blanco)",
                    border: "1px solid var(--color-negro-desvanecido)",
                    boxShadow: "0 10px 24px var(--color-negro-desvanecido)",
                  }}
                >
                  <table className="tabla-detalle-curso w-full">
                    <tbody>
                      <tr>
                        <th className="text-left">Docente</th>
                        <td>{cursoSeleccionado.docente}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Categoría</th>
                        <td>{cursoSeleccionado.categoria}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Horas lectivas</th>
                        <td>{cursoSeleccionado.horasLectivas}</td>
                      </tr>
                      <tr>
                        <th className="text-left align-top">Tags</th>
                        <td>
                          {cursoSeleccionado.tags && cursoSeleccionado.tags.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {cursoSeleccionado.tags.map((t, i) => (
                                <span
                                  key={i}
                                  className="text-xs px-2 py-1 rounded-full"
                                  style={{
                                    background: "var(--color-humo)",
                                    border: "1px solid var(--color-negro-desvanecido)",
                                    color: "var(--color-accent)",
                                  }}
                                >
                                  #{t}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span style={{ color: "var(--color-accent)" }}>—</span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th className="text-left align-top">Descripción</th>
                        <td style={{ color: "var(--color-accent)" }}>
                          Próximamente: sílabo, competencias, resultados de aprendizaje y bibliografía.
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Acciones */}
                  <div className="mt-6 flex items-center gap-3">
                    <button
                      className="px-4 py-2 rounded-xl font-medium"
                      style={{ background: "var(--color-verde-intermedio)", color: "var(--color-negro)" }}
                      onClick={() => {
                        addToCart({
                            id: cursoSeleccionado.id,
                            nombre: cursoSeleccionado.nombre,
                            docente: cursoSeleccionado.docente,
                            categoria: cursoSeleccionado.categoria,
                            imagen: cursoSeleccionado.imagen,
                            cantidad: 1,
                          });
                        alert("Curso añadido al carrito.");
                      }}
                    >
                      Añadir al carrito
                    </button>

                    <Link
                      to="/carrito"
                      className="px-4 py-2 rounded-xl font-medium"
                      style={{ background: "var(--color-verde-claro)", color: "var(--color-negro)" }}
                    >
                      Ir al carrito
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CursoDetalles;
