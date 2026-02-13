import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getProductDetail } from "../api/api";
import { addToCart } from "../api/cart";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!product);

  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (!product) {
      getProductDetail(id)
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Ошибка загрузки товара:", err);
          setLoading(false);
        });
    }
  }, [id, product]);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  if (loading) return <div className="container">Загрузка...</div>;
  if (!product) return <div className="container">Товар не найден</div>;

  return (
    <div className="product-detail-page">
      <header className="header">
        <button className="back-arrow" onClick={() => navigate(-1)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1>{product.title}</h1>
      </header>

      <div className="container">
        <div className="detail-image-container">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="detail-info">
          <div className="detail-price-row">
            <span className="detail-price">{product.price} ₽</span>

            {/* Динамическая кнопка */}
            {!isAdded ? (
              <button className="btn-add-detail" onClick={handleAddToCart}>
                Добавить в корзину
              </button>
            ) : (
              <button className="btn-add-detail added-flash">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginRight: "8px" }}
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Добавлено
              </button>
            )}
          </div>

          <div className="detail-description-section">
            <h3 className="description-label">Описание</h3>
            <p className="description-text">
              {product.description || "Классная вещь для каратэ"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
