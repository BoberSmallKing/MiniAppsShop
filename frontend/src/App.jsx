import { useState } from "react";
import Catalog from "./pages/Catalog";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

export default function App() {
  const [tab, setTab] = useState("catalog");

  return (
    <div>
      {tab === "catalog" && <Catalog />}
      {tab === "cart" && <Cart />}
      {tab === "orders" && <Orders />}

      <nav>
        <button onClick={() => setTab("catalog")}>Каталог</button>
        <button onClick={() => setTab("cart")}>Корзина</button>
        <button onClick={() => setTab("orders")}>Заказы</button>
      </nav>
    </div>
  );
}
