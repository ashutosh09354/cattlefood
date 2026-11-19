import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { products } from "../data/products.js";
import { NUT, ING, DEF_ING } from "../data/nutrition.js";
import { IM } from "../data/images.js";
import { inr, stars } from "../utils/currency.js";
import { useStore } from "../context/StoreContext.jsx";

const views = ["Product Pack", "Livestock", "Pellet Texture"];
const tabs = [["desc", "Description"], ["nut", "Nutritional Information"], ["ing", "Ingredients"], ["rev", "Reviews"]];

export default function ProductDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const { add, wish, toggleWish } = useStore();
  const [tab, setTab] = useState("desc");
  const [qty, setQty] = useState(1);
  const [gi, setGi] = useState(0);
  useEffect(() => { setTab("desc"); setQty(1); setGi(0); }, [id]);
  const p = products[Number(id) - 1];

  if (!p) return (<section><SEO title="Product not found" /><h2>Product not found</h2><Link className="btn" to="/shop">Back to shop</Link></section>);

  const d = Math.round((1 - p.price / p.orig) * 100);
  const rel = products.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 4);
  const nu = NUT[p.cat] || NUT["Cattle Feed"];
  const rows = []; for (let i = 0; i < nu.length; i += 2) rows.push([nu[i], nu[i + 1]]);
  const [t1, t2] = p.name.split(" – ");
  const content = {
    desc: <p>{p.desc} Designed as part of a balanced daily ration. Always follow the feeding guidance on the pack and consult a veterinarian or nutritionist for your herd.</p>,
    nut: <><table><tbody>{rows.map(([a, b]) => (<tr key={a}><td>{a}</td><td><b>{b}</b></td></tr>))}</tbody></table><p className="sub">Guaranteed laboratory parameters; refer to the pack label for batch analysis.</p></>,
    ing: <p>{ING[p.cat] || DEF_ING}</p>,
    rev: <><p><span className="star">{stars(p.rating)}</span> {p.rating} from {p.rev} verified customer ratings.</p><p>“Animals took to this feed readily within days. Visible increase in milk fat and solid content.” — Ramesh Yadav, Karnal, Haryana</p></>,
  }[tab];

  const gallery = [
    IM.p[p.cat] || IM.p["Cattle Feed"],
    "/assets/images/category-0.jpg",
    "/assets/images/category-1.jpg",
  ];

  return (
    <section>
      <SEO title={p.name} description={p.desc} />
      <p className="sub"><Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {p.cat}</p>
      <div className="pd">
        <div className="gal">
          <div className="pimg big"><img src={gallery[gi]} alt={`${p.name} - ${views[gi]}`} /></div>
          <div className="th">{views.map((t, i) => (<button key={t} className={gi === i ? "on" : ""} onClick={() => setGi(i)}>{t}</button>))}</div>
        </div>
        <div>
          <h2>{p.name}</h2>
          <div className="star">{stars(p.rating)} <span style={{ color: "var(--muted)" }}>{p.rating} ({p.rev} reviews)</span></div>
          <p className="price"><b style={{ fontSize: 28 }}>{inr(p.price)}</b>{d > 0 && <><s>{inr(p.orig)}</s> <span className="dis" style={{ position: "static", display: "inline-block" }}>{d}% OFF</span></>}</p>
          <p>{p.stock ? "In stock" : "Out of stock"}</p>
          <p>Pack size: <span className="chip">{p.w}</span></p>
          <div className="qty" style={{ margin: "12px 0" }}>
            <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button> {qty} <button onClick={() => setQty(qty + 1)}>+</button>
          </div>
          <button className="btn" disabled={!p.stock} onClick={() => add(p.id, qty)}>Add to Cart</button>{" "}
          <button className="btn o" disabled={!p.stock} onClick={() => { add(p.id, qty); nav("/checkout"); }}>Buy Now</button>{" "}
          <button className="btn o" onClick={() => toggleWish(p.id)}>{wish.includes(p.id) ? "♥ Wishlisted" : "♡ Wishlist"}</button>
        </div>
      </div>
      <div className="tabs" style={{ marginTop: 28 }}>
        {tabs.map(([k, l]) => (<button key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{l}</button>))}
      </div>
      {content}
      <h2 style={{ marginTop: 36 }}>Related Products</h2>
      <div className="grid">{rel.map((x) => (<ProductCard key={x.id} p={x} />))}</div>
    </section>
  );
}
