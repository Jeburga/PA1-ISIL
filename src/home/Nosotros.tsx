import equipo from "./../assets/img/equipo.jpg";

function Nosotros() {
  return (
    <section id="nosotros" className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* CONTENEDOR VERDE */}
        <div className="rounded-[32px] bg-[var(--color-principal)] text-white shadow-xl ring-1 ring-black/10 overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-8 p-6 sm:p-8 lg:p-12">
            
            {/* IMAGEN CON ESQUINAS REDONDEADAS */}
            <figure className="w-full md:w-2/5 rounded-2xl overflow-hidden">
              <img
                src={equipo}
                alt="Nuestro equipo"
                className="w-full h-64 md:h-[320px] lg:h-[360px] object-cover"
                loading="lazy"
              />
            </figure>

            {/* TEXTO */}
            <div className="w-full md:w-3/5">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/80 mb-2">
                Nosotros
              </p>
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                Cubrimos el espectro completo de servicios legales
              </h3>
              <p className="text-white/90 leading-relaxed">
                En Estudio Sauls trabajamos con equipos multidisciplinarios que
                combinan experiencia legal con criterios financieros, contables y
                operativos. Así, cada caso se analiza desde todos los ángulos:
                laboral, civil, corporativo, consumidor, propiedad intelectual y
                más. Nos enfocamos en entender tu realidad —no solo tu expediente—
                para proponerte rutas de acción viables, cronogramas transparentes
                y comunicación directa con tu abogado responsable. Creemos en la
                prevención, la negociación inteligente y, cuando corresponde, en
                una litigación estratégica basada en evidencia.
              </p>

              {/* Botón tipo “pill”, como en la referencia */}
              <div className="mt-6">
                <a
                  href="#contacto"
                  className="rounded-full button2"
                >
                  Conocer más
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Nosotros;
