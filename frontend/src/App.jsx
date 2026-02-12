import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail"; // Создадим ниже
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import "./styles/index.css";

export default function App() {
  return (
    <Router>
      <div className="app">
        <div className="content">
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/category/:slug" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </Router>
  );
}

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname.startsWith("/product/")) return null;

  return (
    <nav className="bottom-nav">
      <TabButton
        active={location.pathname === "/"}
        onClick={() => navigate("/")}
        icon={
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        }
      />
      <TabButton
        active={location.pathname === "/cart"}
        onClick={() => navigate("/cart")}
        icon={
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        }
      />
      <TabButton
        active={location.pathname === "/orders"}
        onClick={() => navigate("/orders")}
        icon={
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        }
      />
    </nav>
  );
}

function TabButton({ active, icon, onClick }) {
  return (
    <button className={`tab-btn ${active ? "active" : ""}`} onClick={onClick}>
      <span className="tab-icon">{icon}</span>
    </button>
  );
}
