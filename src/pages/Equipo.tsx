import data from "./../data/equipolegal.json";
import f1 from "./../assets/img/miembro1.jpg";
import f2 from "./../assets/img/miembro2.jpg";
import f3 from "./../assets/img/miembro3.jpg";
import f4 from "./../assets/img/miembro4.jpg";
import f5 from "./../assets/img/miembro5.jpg";
import f6 from "./../assets/img/miembro6.jpg";

type Miembro = {
  id: string;
  nombre: string;
  especialidad: string;
  foto: string;
  tags?: string[];
};


const fotos: Record<string, string> = {
  miembro1: f1,
  miembro2: f2,
  miembro3: f3,
  miembro4: f4,
  miembro5: f5,
  miembro6: f6,
};

function Equipo() {
  const miembros = data as Miembro[];

  return (
    <>
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <header className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700/80">
              Nuestro equipo
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-emerald-900">
              Equipo legal multidisciplinario
            </h1>
            <p className="mt-2 text-zinc-600">
              Conoce a las abogadas y abogados que lideran cada especialidad.
            </p>
          </header>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {miembros.map((m) => (
              <article
                key={m.id}
                className="bg-white rounded-2xl shadow-md ring-1 ring-black/5 overflow-hidden hover:shadow-lg transition"
              >
                <figure className="h-48 w-full overflow-hidden">
                  <img
                    src={fotos[m.foto]}
                    alt={m.nombre}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </figure>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-emerald-900">
                    {m.nombre}
                  </h3>
                  <p className="text-sm text-zinc-500">{m.especialidad}</p>

                  {m.tags && m.tags.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {m.tags.map((t, i) => (
                        <li
                          key={`${m.id}-tag-${i}`}
                          className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}

export default Equipo;
