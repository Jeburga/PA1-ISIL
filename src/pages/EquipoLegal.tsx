import { useMemo, useState } from "react";
import equipoData from "../data/equipolegal.json";
import nofoto from "../assets/img/nofoto.jpg";

type Miembro = {
  id: string;
  nombre: string;
  especialidad: string;
  foto?: string;
  tags?: string[];
};

const miembros: Miembro[] = equipoData as Miembro[];

const EquipoLegal = () => {
  // Estados
  const [ordenarPor, setOrdenarPor] = useState<"nombre" | "especialidad">("nombre");
  const [direccion, setDireccion] = useState<"asc" | "desc">("asc");
  const [pagina, setPagina] = useState(1);
  const porPagina = 5;

  // Ordenamiento
  const miembrosOrdenados = useMemo(() => {
    const sorted = [...miembros].sort((a, b) => {
      const valA = a[ordenarPor].toLowerCase();
      const valB = b[ordenarPor].toLowerCase();
      if (valA < valB) return direccion === "asc" ? -1 : 1;
      if (valA > valB) return direccion === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [ordenarPor, direccion]);

  // Paginación
  const totalPaginas = Math.ceil(miembrosOrdenados.length / porPagina);
  const miembrosPagina = miembrosOrdenados.slice((pagina - 1) * porPagina, pagina * porPagina);

  const cambiarOrden = (campo: "nombre" | "especialidad") => {
    if (ordenarPor === campo) {
      setDireccion(direccion === "asc" ? "desc" : "asc");
    } else {
      setOrdenarPor(campo);
      setDireccion("asc");
    }
  };

  return (
    <>
      {/* Header */}
      <header className="px-4 py-10" style={{ background: "var(--color-principal)", color: "var(--color-blanco)" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Nuestro Equipo Legal</h1>
          <p className="opacity-90">Conoce a nuestros abogados y sus especialidades.</p>
        </div>
      </header>

      {/* Contenido */}
      <section className="py-10" style={{ background: "var(--color-humo)" }}>
        <div className="max-w-7xl mx-auto px-3">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "var(--color-blanco)",
              border: "1px solid var(--color-negro-desvanecido)",
              boxShadow: "0 10px 24px var(--color-negro-desvanecido)",
            }}
          >
            <table className="w-full">
              <thead>
                <tr style={{ background: "var(--color-humo)" }}>
                  <th className="text-left px-4 py-3 w-20">Foto</th>
                  <th
                    className="text-left px-4 py-3 cursor-pointer select-none"
                    onClick={() => cambiarOrden("nombre")}
                    title="Ordenar por nombre"
                  >
                    Nombre {ordenarPor === "nombre" && (direccion === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="text-left px-4 py-3 cursor-pointer select-none"
                    onClick={() => cambiarOrden("especialidad")}
                    title="Ordenar por especialidad"
                  >
                    Especialidad {ordenarPor === "especialidad" && (direccion === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="text-left px-4 py-3">Tags</th>
                </tr>
              </thead>
              <tbody>
                {miembrosPagina.map((m) => (
                  <tr key={m.id} className="border-t" style={{ borderColor: "var(--color-negro-desvanecido)" }}>
                    <td className="px-4 py-3">
                      <img
                        src={m.foto ? `/images/${m.foto}.jpg` : nofoto}
                        alt={m.nombre}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    </td>
                    <td className="px-4 py-3 font-semibold" style={{ color: "var(--color-principal)" }}>
                      {m.nombre}
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--color-accent)" }}>
                      {m.especialidad}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {m.tags?.slice(0, 3).map((t, i) => (
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              disabled={pagina === 1}
              onClick={() => setPagina((p) => p - 1)}
              className="px-3 py-1 rounded-xl font-medium disabled:opacity-50"
              style={{ background: "var(--color-verde-claro)" }}
            >
              ← Anterior
            </button>
            <span style={{ color: "var(--color-accent)" }}>
              Página {pagina} de {totalPaginas}
            </span>
            <button
              disabled={pagina === totalPaginas}
              onClick={() => setPagina((p) => p + 1)}
              className="px-3 py-1 rounded-xl font-medium disabled:opacity-50"
              style={{ background: "var(--color-verde-claro)" }}
            >
              Siguiente →
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default EquipoLegal;
