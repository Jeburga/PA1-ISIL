import { useEffect, useState, useMemo } from "react";
import { safeReadCart, removeFromCart, clearCart } from "../utils/cart";
import type { CartItem } from "../utils/cart";

const Carrito = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Carga inicial
  useEffect(() => {
    setItems(safeReadCart());
  }, []);

  // Re-suscribirse a cambios externos (por si agregan desde otra página)
  useEffect(() => {
    const onUpdate = () => setItems(safeReadCart());
    window.addEventListener("cartUpdated", onUpdate as EventListener);
    return () => window.removeEventListener("cartUpdated", onUpdate as EventListener);
  }, []);

  const eliminar = (id: string) => {
    removeFromCart(id);
    setItems(safeReadCart());
  };

  const vaciar = () => {
    if (!confirm("¿Deseas vaciar el carrito?")) return;
    clearCart();
    setItems([]);
  };

  // (Opcional) total/cantidades (no requerido)
  const totalItems = useMemo(
    () => items.reduce((acc, it) => acc + (Number(it.cantidad) || 0), 0),
    [items]
  );

  return (
    <>
      <header className="px-4 py-10"
        style={{ background: "var(--color-principal)", color: "var(--color-blanco)" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Carrito</h1>
          <p className="opacity-90">Gestiona los cursos añadidos.</p>
        </div>
      </header>

      <section className="py-10" style={{ background: "var(--color-humo)" }}>
        <div className="max-w-7xl mx-auto px-3">
          <div className="flex -mx-3 gap-6">
            <div className="w-full md:w-3/4 px-3">
              {items.length === 0 ? (
                <div className="p-6 bg-white rounded-2xl text-center"
                     style={{ border: "1px solid var(--color-negro-desvanecido)",
                              boxShadow: "0 10px 24px var(--color-negro-desvanecido)" }}>
                  <p style={{ color: "var(--color-accent)" }}>
                    Tu carrito está vacío.
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl overflow-hidden"
                     style={{ background: "var(--color-blanco)",
                              border: "1px solid var(--color-negro-desvanecido)",
                              boxShadow: "0 10px 24px var(--color-negro-desvanecido)" }}>
                  <table className="w-full">
                    <thead>
                      <tr style={{ background: "var(--color-humo)" }}>
                        <th className="text-left px-4 py-3">Curso</th>
                        <th className="text-left px-4 py-3 hidden md:table-cell">Docente</th>
                        <th className="text-left px-4 py-3 hidden md:table-cell">Categoría</th>
                        <th className="text-center px-4 py-3">Cantidad</th>
                        <th className="px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((it) => (
                        <tr key={it.id} className="border-t"
                            style={{ borderColor: "var(--color-negro-desvanecido)" }}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={it.imagen || "/images/placeholder.jpg"}
                                alt={it.nombre}
                                className="w-14 h-14 object-cover rounded-lg"
                              />
                              <div>
                                <div className="font-semibold" style={{ color: "var(--color-principal)" }}>
                                  {it.nombre}
                                </div>
                                <div className="text-xs" style={{ color: "var(--color-accent)" }}>
                                  ID: {it.id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">{it.docente || "—"}</td>
                          <td className="px-4 py-3 hidden md:table-cell">{it.categoria || "—"}</td>
                          <td className="px-4 py-3 text-center">{it.cantidad}</td>
                          <td className="px-4 py-3 text-right">
                            <button
                              className="px-3 py-1.5 rounded-lg text-sm"
                              style={{ background: "crimson", color: "white" }}
                              onClick={() => eliminar(it.id)}
                              title="Eliminar del carrito"
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {items.length > 0 && (
                <button className="mt-4 px-4 py-2 rounded-xl font-medium"
                        style={{ background: "var(--color-verde-claro)", color: "var(--color-negro)" }}
                        onClick={vaciar}>
                  Vaciar carrito
                </button>
              )}
            </div>

            {/* Panel derecho opcional */}
            <div className="w-full md:w-1/4 px-3">
              <div className="p-5 rounded-2xl"
                   style={{ background: "var(--color-blanco)",
                            border: "1px solid var(--color-negro-desvanecido)",
                            boxShadow: "0 10px 24px var(--color-negro-desvanecido)" }}>
                <h3 className="font-semibold mb-2" style={{ color: "var(--color-principal)" }}>
                  Resumen
                </h3>
                <p className="text-sm" style={{ color: "var(--color-accent)" }}>
                  {totalItems} ítem(s) en el carrito
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Carrito;
