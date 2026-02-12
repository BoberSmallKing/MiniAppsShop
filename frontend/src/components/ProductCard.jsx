function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-card-body">
        <div className="product-title">{product.title}</div>
        <div className="product-price">{product.price} ₽</div>
        <button className="btn-add" onClick={() => addToCart(product)}>
          Добавить в корзину
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
