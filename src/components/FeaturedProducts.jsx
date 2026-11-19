import { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard.jsx";
import { products } from "../data/products.js";

const tabs = [["best", "Best Sellers"], ["new", "New Arrivals"], ["off", "Special Offers"]];
const pick = {
  best: () => [...products].sort((a, b) => b.pop - a.pop),
  new: () => products.filter((p) => p.isNew),
  off: () => [...products].sort((a, b) => 1 - b.price / b.orig - (1 - a.price / a.orig)),
};

export default function FeaturedProducts() {
  const [tab, setTab] = useState("best");
  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: 8 }}>
        <div><h2>Featured Products</h2><p className="sub">Trusted by farmers across India.</p></div>
        <Link className="btn o" to="/shop" style={{ margin: 0 }}>View All</Link>
      </div>
      <div className="tabs">
        {tabs.map(([k, l]) => (<button key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{l}</button>))}
      </div>
      <div className="grid">{pick[tab]().slice(0, 8).map((p) => (<ProductCard key={p.id} p={p} />))}</div>
    </section>
  );
}
