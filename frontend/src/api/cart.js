export const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];

export const addToCart = (product) => {
  const cart = getCart();
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const clearCart = () => {
  localStorage.removeItem("cart");
};
