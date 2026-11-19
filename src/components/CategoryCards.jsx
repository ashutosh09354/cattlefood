import { Link } from "react-router-dom";
import { CATEGORIES, products } from "../data/products.js";
import { IM } from "../data/images.js";

export default function CategoryCards() {
  return (
    <section>
      <h2 className="ct">Shop by Category</h2>
      <p className="sub">Nutrition for every animal on your farm.</p>
      <div className="cats">
        {CATEGORIES.map((c, i) => (
          <Link key={c} className="cat" to={`/shop?cat=${encodeURIComponent(c)}`}>
            <img src={IM.cat[i]} alt={c} loading="lazy" />
            <b>{c}</b>
            <small>{products.filter((p) => p.cat === c).length} Products <span style={{ color: "var(--orange)", float: "right" }}>→</span></small>
          </Link>
        ))}
      </div>
    </section>
  );
}
