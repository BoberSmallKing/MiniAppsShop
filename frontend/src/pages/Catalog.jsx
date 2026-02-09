import { useEffect, useState } from "react";
import { getProducts } from "../api/api";
import { addToCart } from "../api/cart";

export default function Catalog() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div>
      <h2>Каталог</h2>
      {products.map((p) => (
        <div key={p.id}>
          <h3>{p.title}</h3>
          <p>{p.price} ₽</p>
          <button onClick={() => addToCart(p)}>В корзину</button>
        </div>
      ))}
    </div>
  );
}
