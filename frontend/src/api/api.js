const API = "https://vw244bj9-8000.euw.devtunnels.ms/api";

export const getProducts = (categorySlug = "") =>
  fetch(`${API}/products/?category=${categorySlug}`).then((res) => res.json());

export const getProductDetail = (id) =>
  fetch(`${API}/products/${id}/`).then((res) => res.json());

export const getCategories = () =>
  fetch(`${API}/categories/`).then((res) => res.json());

export const createOrder = (data) =>
  fetch(`${API}/orders/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const getOrders = (userId) =>
  fetch(`${API}/orders/?user_id=${userId}`).then((res) => res.json());
