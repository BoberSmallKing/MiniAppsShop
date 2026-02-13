export const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];

const notifyCartUpdate = () => {
  // Создаем событие 'cart-updated', чтобы другие компоненты его услышали
  window.dispatchEvent(new Event("cart-updated"));
};

export const addToCart = (product) => {
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  notifyCartUpdate(); // Уведомляем систему
};

export const updateQuantity = (id, delta) => {
  let cart = getCart();
  const item = cart.find((p) => p.id === id);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter((p) => p.id !== id);
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  notifyCartUpdate(); // Уведомляем систему
};

export const clearCart = () => {
  localStorage.removeItem("cart");
  notifyCartUpdate();
};
