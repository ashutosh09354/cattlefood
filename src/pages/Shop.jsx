import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { products, CATEGORIES } from "../data/products.js";
import { inr } from "../utils/currency.js";

const sorters = { pop: (a, b) => b.pop - a.pop, lo: (a, b) => a.price - b.price, hi: (a, b) => b.price - a.price, new: (a, b) => Number(b.isNew) - Number(a.isNew) || b.id - a.id };
const categoryIcons = { "Cattle Feed": "🐄", "Buffalo Feed": "🐃", "Poultry Feed": "🐓" };

export default function Shop() {
  const [sp, setSp] = useSearchParams();
  const q = sp.get("q") || "", cat = sp.get("cat") || "";
const [suggestions, setSuggestions] = useState([]);
const [showSuggestions, setShowSuggestions] = useState(false);
const setQ = (value) => {
  const n = new URLSearchParams(sp);
  value ? n.set("q", value) : n.delete("q");
  setSp(n);
};
  const [max, setMax] = useState(4000);
  const [rating, setRating] = useState(0);
  const [stock, setStock] = useState(false);
  const [sort, setSort] = useState("pop");
  const [shown, setShown] = useState(12);
  const list = useMemo(() => products.filter((p) => (!cat || p.cat === cat) && p.price <= max && p.rating >= rating && (!stock || p.stock) && p.name.toLowerCase().includes(q.toLowerCase())).sort(sorters[sort]), [q, cat, max, rating, stock, sort]);
  const setCat = (c) => { const n = new URLSearchParams(sp); c ? n.set("cat", c) : n.delete("cat"); setSp(n); };
  const resetFilters = () => { setCat(""); setMax(4000); setRating(0); setStock(false); setSort("pop"); };

useEffect(() => {
  if (q.trim()) {
    const filtered = products
      .filter(p => p.name.toLowerCase().includes(q.toLowerCase()))
      .slice(0, 5);
    setSuggestions(filtered);
  } else {
    setSuggestions([]);
  }
}, [q]);

  return <section>
    <SEO title="Shop" description="Browse cattle, buffalo, and poultry feed." />
    <h2>All Products</h2>
        {/* Search Bar */}
        <div className="search-bar" style={{ marginBottom: "16px", position: "relative" }}>
          <input
            type="search"
            placeholder="Search products..."
            value={q}
            onChange={(e) => { setQ(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="search-input"
            style={{
              width: "100%",
              padding: "8px 12px",
              border: `1px solid var(--line)`,
              borderRadius: "8px",
              boxSizing: "border-box"
            }}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="search-suggestions" style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "var(--white)",
              border: `1px solid var(--line)`,
              borderRadius: "0 0 8px 8px",
              maxHeight: "150px",
              overflowY: "auto",
              zIndex: 10,
              margin: 0,
              padding: 0,
              listStyle: "none"
            }}>
              {suggestions.map((s) => (
                <li
                  key={s.id}
                  onMouseDown={() => { setQ(s.name); setShowSuggestions(false); }}
                  style={{ padding: "8px 12px", cursor: "pointer" }}
                >
                  {s.name}
                </li>
              ))}
            </ul>
          )}
        </div>

    <div className="shop">
      <aside className="side" aria-label="Product filters">
        <div className="filter-header"><svg className="filter-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h18l-7 8v6l-4 2v-8L3 4Z" /></svg><h4>Filter Products</h4></div>
        <div className="filter-section"><div className="section-header"><h5>Category</h5><button type="button" className="clear-btn" onClick={() => setCat("")}>Clear</button></div>
          <label className="category-option"><input type="radio" name="category" checked={!cat} onChange={() => setCat("")} /><span className="radio-mark" /><span className="category-icon all-icon">⊞</span><span className="category-name">All</span></label>
          {CATEGORIES.map((c) => <label key={c} className="category-option"><input type="radio" name="category" checked={cat === c} onChange={() => setCat(c)} /><span className="radio-mark" /><span className="category-icon">{categoryIcons[c]}</span><span className="category-name">{c}</span><small>({products.filter((p) => p.cat === c).length})</small></label>)}
        </div>
        <div className="filter-section filter-divider price-section"><div className="section-header price-title"><h5>Price Range</h5><span className="price-chip">Up to {inr(max)}</span></div><input aria-label="Maximum price" type="range" min="300" max="4000" step="100" value={max} onChange={(e) => setMax(+e.target.value)} /><div className="price-limits"><span>₹0</span><span>₹4,000</span></div></div>
        <div className="filter-section filter-divider control-row"><h5>Min Rating</h5><select aria-label="Minimum rating" value={rating} onChange={(e) => setRating(+e.target.value)}><option value={0}>Any Rating</option><option value={1}>1+ stars</option><option value={2}>2+ stars</option><option value={3}>3+ stars</option><option value={4}>4+ stars</option></select></div>
        <div className="filter-section filter-divider control-row availability-row"><h5>Availability</h5><label className="stock-label"><input type="checkbox" checked={stock} onChange={(e) => setStock(e.target.checked)} /><span>In stock only</span></label></div>
        <div className="filter-section filter-divider control-row"><h5>Sort By</h5><select aria-label="Sort products" value={sort} onChange={(e) => setSort(e.target.value)}><option value="pop">Popularity</option><option value="lo">Price: low to high</option><option value="hi">Price: high to low</option><option value="new">Newest</option></select></div>
        <div className="filter-actions"><button type="button" className="apply-btn"><span>✓</span> Apply Filters</button><button type="button" className="reset-btn" onClick={resetFilters}><span>↻</span> Reset</button></div>
      </aside>
      <div>{list.length ? <><div className="grid">{list.slice(0, shown).map((p) => <ProductCard key={p.id} p={p} />)}</div>{shown < list.length && <p style={{ textAlign: "center", marginTop: 20 }}><button className="btn" onClick={() => setShown(shown + 12)}>Load more</button></p>}</> : <p>No products match your filters.</p>}</div>
    </div>
  </section>;
}
