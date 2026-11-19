import { Link } from "react-router-dom";
import { CATEGORIES, products } from "../data/products.js";

const categoryIcons = {
  "Cattle Feed": "🐄",
  "Buffalo Feed": "🐃",
  "Poultry Feed": "🐓",
};

export default function CategoryCards() {
  return (
    <section>
      <h2 className="ct">Shop by Category</h2>
      <p className="sub" style={{ textAlign: "center" }}>Nutrition for every animal on your farm.</p>
      <div className="cats">
        {CATEGORIES.map((c) => (
          <Link key={c} className="cat cat-no-img" to={`/shop?cat=${encodeURIComponent(c)}`}>
            <div className="cat-header">
              <span className="cat-emoji">{categoryIcons[c] || "🌾"}</span>
              <b>{c}</b>
            </div>
            <small>
              {products.filter((p) => p.cat === c).length} Products{" "}
              <span style={{ color: "var(--orange)", float: "right", fontWeight: 700 }}>→</span>
            </small>
          </Link>
        ))}
      </div>
    </section>
  );
}
