import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts, getCategories } from "../api/api";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import "../styles/index.css";

export default function Catalog() {
  const { slug } = useParams(); // Получаем slug из URL (/category/kimono)
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
      if (slug) {
        const found = data.find((c) => c.slug === slug);
        setCurrentCategory(found);
      }
    });
  }, [slug]);

  useEffect(() => {
    if (slug) {
      getProducts(slug).then(setProducts);
    } else {
      setProducts([]);
      setCurrentCategory(null);
    }
  }, [slug]);

  return (
    <div className="page-wrapper">
      <header className="header">
        {slug && (
          <button className="back-arrow" onClick={() => navigate("/")}>
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
        <h1>{currentCategory ? currentCategory.title : "Магазин"}</h1>
      </header>
      <div className="container">
        {!slug ? (
          <div className="categories-grid">
            {categories.map((c) => (
              <CategoryCard
                key={c.id}
                category={c}
                onClick={() => navigate(`/category/${c.slug}`)}
              />
            ))}
          </div>
        ) : (
          <div className="products-grid">
            {products.map((p) => (
              <ProductCard
                onClick={() =>
                  navigate(`/product/${p.id}`, { state: { product: p } })
                }
                key={p.id}
                product={p}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
