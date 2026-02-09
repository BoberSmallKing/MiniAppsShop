import { getCart, clearCart } from "../api/cart";
import { createOrder } from "../api/api";

export default function Cart() {
  const cart = getCart();
  const tg = window.Telegram.WebApp;

  const order = async () => {
    const data = {
      user_id: tg.initDataUnsafe.user?.id,
      items: cart,
    };
    await createOrder(data);
    clearCart();
    alert("Заказ отправлен!");
  };

  return (
    <div>
      <h2>Корзина</h2>
      {cart.map((p, i) => (
        <div key={i}>{p.title}</div>
      ))}
      <button onClick={order}>Оформить заказ</button>
    </div>
  );
}
