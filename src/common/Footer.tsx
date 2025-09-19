import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Footer() {
  const menu = [
    "Servicios",
    "Quienes somos",
    "Reseñas",
    "Trabaja con nosotros",
    "Equipo",
    "Contáctanos",
    "FAQ",
  ];

  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Menú centrado (solo texto, sin links) */}
        <nav aria-label="Footer menu" className="flex justify-center">
          <ul className="flex flex-wrap items-center justify-center gap-x-14 gap-y-4 text-[var(--color-principal)]">
            {menu.map((label) => (
              <li key={label} className="font-medium">
                {label}
              </li>
            ))}
          </ul>
        </nav>

        {/* Separador */}
        <hr className="mt-8 border-t border-black/10" />

        {/* Fila inferior */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-[var(--color-principal)]">
          {/* Izquierda: copyright + legales (solo texto) */}
          <div className="text-sm flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <span>© 2025 Estudio Sauls. Todos los derechos reservados</span>
            <span>Política de privacidad</span>
          </div>

          {/* Derecha: redes (íconos no clicables) */}
          <div className="flex items-center gap-5 text-xl">
            <i className="fa-brands fa-x-twitter" aria-hidden="true" />
            <i className="fa-brands fa-linkedin" aria-hidden="true" />
            <i className="fa-brands fa-facebook" aria-hidden="true" />
            <i className="fa-brands fa-instagram" aria-hidden="true" />
          </div>
        </div>
      </div>
    </footer>
  );
}
