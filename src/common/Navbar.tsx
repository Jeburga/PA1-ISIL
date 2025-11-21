import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "./../assets/img/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {  getCartCount } from "../utils/cart";

const navigation = [
  { name: "Inicio", url: "/" },
  { name: "Login", url: "/login" },
  { name: "Nuestros cursos", url: "/cursos" },
  { name: "Equipo", url: "/equipo" },
  { name: "Staff", url: "/equipolegal"}
];

function classNames(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function MainHeader() {
  const location = useLocation();
  console.log(location.pathname);

  const [count, setCount] = useState<number>( getCartCount());

  useEffect(() => {
    const onUpdate = () => setCount( getCartCount());
    window.addEventListener("cartUpdated", onUpdate as EventListener);
    // también actualiza al cargar / cambiar de ruta
    onUpdate();
    return () =>
      window.removeEventListener("cartUpdated", onUpdate as EventListener);
  }, [location.pathname]);

  return (
    <Disclosure
      as="nav"
      className="relative bg-[var(--color-verde-intermedio)]/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to="/perfil">
                <img alt="Your Company" src={logo} className="h-8 w-auto" />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => {
                  return (
                    <Link
                      key={item.name}
                      to={item.url}
                      aria-current={
                        item.url == location.pathname ? "page" : undefined
                      }
                      className={classNames(
                        item.url == location.pathname
                          ? "bg-[var(--color-accent)] text-white"
                          : "text-gray-700 hover:bg-white/5 hover:text-black",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                {/* Carrito (desktop) */}
                <Link
                  to="/carrito"
                  className="relative ml-4"
                  title="Ver carrito"
                  aria-label="Ver carrito"
                >
                  {/* Ícono simple en SVG para evitar dependencias */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ color: "var(--color-principal)" }}
                  >
                    <path
                      d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10
             0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 14h9.45c.75 0
             1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0011.5 6H6.21l-.94-2H2v2h2l3.6 7.59-.95
             1.72A1.99 1.99 0 007.16 18H19v-2H7.42l.74-2z"
                    />
                  </svg>

                  {count > 0 && (
                    <span
                      className="absolute -top-2 -right-2 text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: "var(--color-verde-intermedio)",
                        color: "var(--color-negro)",
                      }}
                    >
                      {count}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.url}
              aria-current={item.url == location.pathname ? "page" : undefined}
              className={classNames(
                item.url == location.pathname
                  ? "bg-[var(--color-accent)]/50 text-white"
                  : "text-gray-700 hover:bg-white/5 hover:text-black",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </Link>
          ))}

          <Link
            to="/carrito"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-white/5 hover:text-black"
          >
            Carrito {count > 0 ? `(${count})` : ""}
          </Link>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
