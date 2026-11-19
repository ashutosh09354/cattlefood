import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import { IM } from "../data/images.js";
import { inr } from "../utils/currency.js";
import { useStore } from "../context/StoreContext.jsx";

export default function ProductCard({ p }) {
  const { add, wish, toggleWish } = useStore();
  const d = Math.round((1 - p.price / p.orig) * 100);
  const isBestseller = p.pop > 250;
  const isWishlisted = wish.includes(p.id);
  const src = (IM.product && IM.product[p.name]) || IM.p[p.cat] || IM.p["Cattle Feed"];

  return (
    <article className="card">
      {/* Top Media Showcase */}
      <div className="card-media">
        {/* Floating Badges */}
        <div className="card-badges">
          {isBestseller && <span className="card-badge bestseller">Bestseller</span>}
          {p.isNew && !isBestseller && <span className="card-badge new">New</span>}
          {d > 0 && <span className="card-badge discount">-{d}%</span>}
          {!p.stock && <span className="card-badge out-of-stock">Sold Out</span>}
        </div>

        {/* Floating Circular Wishlist Button */}
        <button
          type="button"
          className={`card-wish-btn ${isWishlisted ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            toggleWish(p.id);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Icon name="heart" size={17} />
        </button>

        {/* Product Image Link */}
        <Link to={`/product/${p.id}`} className="card-img-link" tabIndex={-1}>
          <img
            src={src}
            alt={`${p.name} pack`}
            className="card-img"
            loading="lazy"
          />
        </Link>
      </div>

      {/* Card Content Body */}
      <div className="card-body">
        {/* Category & Pack Size */}
        <div className="card-meta-row">
          <span className="card-cat">{p.cat}</span>
          <span className="card-weight-tag">{p.w}</span>
        </div>

        {/* Product Title */}
        <h3 className="card-title">
          <Link to={`/product/${p.id}`}>{p.name}</Link>
        </h3>

        {/* Price & Add to Cart Footer */}
        <div className="card-footer-wrap">
          <div className="card-pricing">
            <span className="card-price-now">{inr(p.price)}</span>
            {d > 0 && <span className="card-price-orig">{inr(p.orig)}</span>}
          </div>

          <button
            type="button"
            className={`btn card-btn ${!p.stock ? "disabled" : ""}`}
            disabled={!p.stock}
            onClick={() => add(p.id)}
          >
            <Icon name="cart" size={15} />
            <span>{p.stock ? "Add to Cart" : "Out of Stock"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
