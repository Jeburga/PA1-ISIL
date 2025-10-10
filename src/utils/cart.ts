export type CartItem = {
  id: string;
  nombre: string;
  docente?: string;
  categoria?: string;
  imagen?: string;
  cantidad: number;
};

const KEY = "carritocompras";

export function safeReadCart(): CartItem[] {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((it) => ({
      id: String(it.id),
      nombre: String(it.nombre ?? ""),
      docente: it.docente ? String(it.docente) : undefined,
      categoria: it.categoria ? String(it.categoria) : undefined,
      imagen: it.imagen ? String(it.imagen) : undefined,
      cantidad: Number(it.cantidad ?? 1),
    }));
  } catch {
    sessionStorage.removeItem(KEY);
    return [];
  }
}

function writeCart(items: CartItem[]) {
  sessionStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("cartUpdated"));
}

export function addToCart(item: Omit<CartItem, "cantidad">, qty = 1) {
  const cart = safeReadCart();
  const idx = cart.findIndex((i) => i.id === item.id);
  if (idx >= 0) cart[idx].cantidad += qty;
  else cart.push({ ...item, cantidad: qty });
  writeCart(cart);
}

export function removeFromCart(id: string) {
  const cart = safeReadCart().filter((i) => i.id !== id);
  writeCart(cart);
}

export function clearCart() {
  writeCart([]);
}

export function cartCount(): number {
  return safeReadCart().reduce((acc, it) => acc + (Number(it.cantidad) || 0), 0);
}