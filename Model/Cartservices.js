import AsyncStorage from "@react-native-async-storage/async-storage";

const CART_KEY = "user_cart";

// 🔹 Obtener carrito
export async function getCart() {
  try {
    const jsonValue = await AsyncStorage.getItem(CART_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Error al obtener carrito", e);
    return [];
  }
}

// 🔹 Guardar carrito
async function saveCart(cart) {
  try {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error("Error al guardar carrito", e);
  }
}

// 🔹 Agregar ítem
export async function addItemToCart(item) {
  let cart = await getCart();

  // si ya existe el producto, aumenta cantidad
  const index = cart.findIndex((p) => p.id === item.id);
  if (index >= 0) {
    cart[index].quantity += item.quantity;
  } else {
    cart.push(item);
  }

  await saveCart(cart);
  return cart;
}

// 🔹 Eliminar ítem
export async function removeItemFromCart(itemId) {
  let cart = await getCart();
  cart = cart.filter((item) => item.id !== itemId);
  await saveCart(cart);
  return cart;
}

// 🔹 Vaciar carrito
export async function clearCart() {
  await saveCart([]);
  return [];
}

// 🔹 Calcular totales
export async function getCartTotals() {
  const cart = await getCart();
  const subtotal = cart.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );
  const delivery = 2.0; // fijo
  const service = 1.0; // fijo
  const total = subtotal + delivery + service;

  return { subtotal, delivery, service, total, cart };
};
