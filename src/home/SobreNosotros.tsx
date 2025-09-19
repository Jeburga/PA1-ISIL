// src/components/StatCards.jsx
import { UserGroupIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import profesional1 from "./../assets/img/profesional1.jpg";
import profesional2 from "./../assets/img/profesional2.jpg";
import profesional3 from "./../assets/img/profesional3.jpg";
import corporativo from "./../assets/img/card-corporativo.jpg";

export default function SobreNosotros() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold">
          Información que nos <span>respalda</span>
        </h2>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:justify-between">
          {/* CARD 1 */}
          <div className="md:w-[40%] rounded-[22px] ring-1 ring-black/5 p-6 md:p-8 flex items-center justify-between shadow-lg">
            <div className="flex items-start gap-4">
              <div className="size-10 grid place-content-center rounded-full bg-emerald-50 text-emerald-700">
                <UserGroupIcon className="size-9" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Profesionales</p>
                <p className="text-2xl font-semibold text-emerald-800">120+</p>
              </div>
            </div>

            <div className="flex -space-x-3">
              <img src={profesional1} alt="Profesional 1" className="size-10 rounded-full object-cover ring-2 ring-white" loading="lazy" />
              <img src={profesional2} alt="Profesional 2" className="size-10 rounded-full object-cover ring-2 ring-white" loading="lazy" />
              <img src={profesional3} alt="Profesional 3" className="size-10 rounded-full object-cover ring-2 ring-white" loading="lazy" />
            </div>
          </div>

          {/* CARD 2 */}
          <div className="md:w-[40%] relative overflow-hidden rounded-[28px] h-56 lg:h-64">
            
            <img
              src={corporativo}
              alt="Equipo corporativo"
              className="absolute inset-0 h-full w-full object-cover"
            />
            
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/20" />

            
            <div className="relative p-3">
              <div className="rounded-[22px] p-6 md:p-8 bg-white/20 backdrop-blur-xl ring-1 ring-white/30 shadow-[0_10px_40px_rgba(0,0,0,.15)]">
                <div className="flex items-start gap-4">
                  <div className="size-10 grid place-content-center rounded-full bg-emerald-50 text-emerald-700">
                    <ChartBarIcon className="size-6" />
                  </div>
                  <div>
                    <p className="text-sm text-white/90 drop-shadow">
                      Ganando la confianza de nuestros clientes desde
                    </p>
                    <p className="text-3xl font-semibold text-white drop-shadow">1997</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
