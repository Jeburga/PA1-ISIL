// Tipo base de ítem en el carrito
export type CartItem = {
  id: string;
  nombre: string;
  docente?: string;
  categoria?: string;
  imagen?: string;
  cantidad: number;
};

// Clave única en localStorage
const CART_KEY = "carrito_cursos";

// --- Funciones utilitarias ---

// Leer carrito desde localStorage (seguro)
export function safeReadCart(): CartItem[] {
  try {
    const data = localStorage.getItem(CART_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    return parsed as CartItem[];
  } catch {
    return [];
  }
}

// Guardar carrito
function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
}

// Agregar curso al carrito
export function addToCart(item: CartItem) {
  const cart = safeReadCart();
  const existing = cart.find((c) => c.id === item.id);

  if (existing) {
    existing.cantidad += item.cantidad || 1;
  } else {
    cart.push({ ...item, cantidad: item.cantidad || 1 });
  }

  saveCart(cart);
}

// Eliminar curso del carrito
export function removeFromCart(id: string) {
  const cart = safeReadCart().filter((c) => c.id !== id);
  saveCart(cart);
}

// Vaciar carrito
export function clearCart() {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event("cartUpdated"));
}

// Obtener total de items (opcional)
export function getCartCount(): number {
  const cart = safeReadCart();
  return cart.reduce((acc, c) => acc + (c.cantidad || 0), 0);
}