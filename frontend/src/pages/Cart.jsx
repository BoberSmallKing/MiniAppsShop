import { useState, useEffect } from "react";
import { getCart, clearCart, updateQuantity } from "../api/cart";
import { createOrder } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState(1); // 1 - просмотр, 2 - ввод данных
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    description: "",
  });

  const navigate = useNavigate();
  const tg = window.Telegram.WebApp;

  useEffect(() => {
    setCart(getCart());
  }, []);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const changeQty = (id, delta) => {
    updateQuantity(id, delta);
    setCart(getCart());
  };

  const onOrderSubmit = async () => {
    if (!formData.name || !formData.number) {
      tg.showAlert("Пожалуйста, заполните имя и телефон");
      return;
    }

    const payload = {
      user_id: String(tg.initDataUnsafe.user?.id || "anonymous"),
      items: cart,
      ...formData,
    };

    try {
      await createOrder(payload);
      clearCart();
      tg.showAlert("Заказ успешно оформлен!");
      navigate("/");
    } catch (e) {
      tg.showAlert("Ошибка при создании заказа");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container empty-cart">
        <header className="header">
          <h1>Корзина</h1>
        </header>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <p style={{ color: "var(--tg-hint)" }}>Тут пока ничего нет...</p>
          <button
            className="btn-add-detail"
            onClick={() => navigate("/")}
            style={{ marginTop: "20px" }}
          >
            В каталог
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <header className="header">
        {step === 2 && (
          <button className="back-arrow" onClick={() => setStep(1)}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <h1>{step === 1 ? "Корзина" : "Данные"}</h1>
      </header>

      <div className="container">
        {step === 1 ? (
          <div className="cart-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-img"
                />
                <div className="cart-item-info">
                  <div className="product-title">{item.title}</div>
                  <div className="product-price">{item.price} ₽</div>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => changeQty(item.id, -1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => changeQty(item.id, 1)}>+</button>
                </div>
              </div>
            ))}
            <div className="cart-total">
              <span>Итого:</span>
              <span>{totalPrice} ₽</span>
            </div>
            <button className="btn-add-detail w-100" onClick={() => setStep(2)}>
              Оформить заказ
            </button>
          </div>
        ) : (
          <div className="order-form">
            <div className="input-group">
              <label>Как вас зовут?</label>
              <input
                type="text"
                placeholder="Имя"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="input-group">
              <label>Телефон для связи</label>
              <input
                type="tel"
                placeholder="+7 ..."
                value={formData.number}
                onChange={(e) =>
                  setFormData({ ...formData, number: e.target.value })
                }
              />
            </div>
            <div className="input-group">
              <label>Дополнительно</label>
              <textarea
                placeholder="Размер, цвет или адрес доставки"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <button className="btn-add-detail w-100" onClick={onOrderSubmit}>
              Подтвердить за {totalPrice} ₽
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
