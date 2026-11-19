import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { products } from "../data/products.js";
import { useStore } from "../context/StoreContext.jsx";

export default function Wishlist() {
  const { wish } = useStore();
  const list = (wish || []).map((id) => products.find((p) => p.id === id)).filter(Boolean);

  return (
    <section>
      <SEO title="My Wishlist" description="View your saved cattle and poultry feeds." />
      <h2>My Wishlist {list.length > 0 && <span style={{ fontSize: 18, color: "var(--muted)", fontWeight: 400 }}>({list.length} {list.length === 1 ? "item" : "items"})</span>}</h2>
      {list.length ? (
        <div className="grid" style={{ marginTop: 24 }}>
          {list.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "48px 0" }}>
          <p className="sub">Your wishlist is currently empty.</p>
          <Link className="btn" to="/shop">Browse Products</Link>
        </div>
      )}
    </section>
  );
}
