import { useEffect, useState } from "react";
import { getOrders } from "../api/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const tg = window.Telegram.WebApp;

  useEffect(() => {
    getOrders(tg.initDataUnsafe.user?.id).then(setOrders);
  }, []);

  return (
    <div>
      <h2>Мои заказы</h2>
      {orders.map((o) => (
        <div key={o.id}>
          Заказ #{o.id} — {o.status}
        </div>
      ))}
    </div>
  );
}
