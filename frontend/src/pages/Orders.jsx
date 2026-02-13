import { useEffect, useState } from "react";
import { getOrders } from "../api/api";
import "../styles/index.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const tg = window.Telegram.WebApp;

  useEffect(() => {
    const userId = tg.initDataUnsafe.user?.id || "test_user";
    getOrders(userId).then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="container">Загрузка...</div>;

  return (
    <div className="page-wrapper">
      <header className="header">
        <h1>Мои заказы</h1>
      </header>

      <div className="container">
        {orders.length === 0 ? (
          <div className="empty-state">
            <p>У вас пока нет активных заказов</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => {
              const totalSum = order.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              );
              const totalItems = order.items.reduce(
                (sum, item) => sum + item.quantity,
                0
              );

              return (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <span className="order-number">Заказ #{order.id}</span>
                    <span className={`order-status status-${order.status}`}>
                      {order.status === "new" ? "Новый" : order.status}
                    </span>
                  </div>

                  <div className="order-items-preview">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="preview-img-wrapper">
                        <img src={item.image} alt="" />
                        {item.quantity > 1 && (
                          <span className="item-badge">x{item.quantity}</span>
                        )}
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="more-items">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>

                  <div className="order-footer">
                    <div className="order-info">
                      <span className="order-date">
                        {new Date(order.created_at).toLocaleDateString()}
                      </span>
                      <span className="order-count">{totalItems} тов.</span>
                    </div>
                    <div className="order-total-price">{totalSum} ₽</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
