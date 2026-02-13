import React, { useState } from "react";
import { addToCart } from "../api/cart";

function ProductCard({ product, onClick }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Чтобы не открывалась страница товара

    // 1. Вызываем функцию добавления в корзину
    addToCart(product);

    // 2. Показываем статус "Добавлено"
    setIsAdded(true);

    // 3. Через 1.5 секунды возвращаем кнопку "Добавить"
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <div className="product-card">
      <div onClick={onClick} style={{ cursor: "pointer" }}>
        <div className="product-image-container">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-card-body">
          <div className="product-title">{product.title}</div>
          <div className="product-price">{product.price} ₽</div>
        </div>
      </div>

      <div className="card-actions">
        {!isAdded ? (
          <button className="btn-add" onClick={handleAddToCart}>
            Добавить в корзину
          </button>
        ) : (
          <div className="added-label-flash">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Добавлено
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
