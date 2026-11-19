import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import Icon from "../components/Icon.jsx";
import ProductThumb from "../components/ProductThumb.jsx";
import { products } from "../data/products.js";
import { inr } from "../utils/currency.js";
import { useStore } from "../context/StoreContext.jsx";

export default function OrderSuccess() {
  const { orders } = useStore();
  const o = orders[orders.length - 1];
  if (!o) return (<section style={{ textAlign: "center" }}><SEO title="Order" /><h2>No recent order</h2><Link className="btn" to="/shop">Shop now</Link></section>);
  const a = o.addr, days = o.ship === "exp" ? [1, 2] : [3, 5];
  const dt = (n) => { const d = new Date(o.at); d.setDate(d.getDate() + n); return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }); };
  return (
    <section className="ck">
      <SEO title="Order confirmed" />
      <div className="steps2"><span>1 Cart</span><span>2 Checkout</span><span className="on">3 Confirmation</span></div>
      <div className="pnl" style={{ textAlign: "center" }}>
        <div className="tick"><Icon name="check" size={34} /></div>
        <h2 style={{ margin: 0 }}>Order confirmed{a?.n ? `, ${a.n.split(" ")[0]}` : ""}!</h2>
        <p className="sub" style={{ margin: "6px 0 0" }}>Order ID <b>{o.id}</b> · {new Date(o.at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</p>
        <div className="trk"><div className="d">Order confirmed</div><div>Packed</div><div>Shipped</div><div>Delivered</div></div>
        <p style={{ margin: 0 }}>Expected delivery: <b>{dt(days[0])} – {dt(days[1])}</b></p>
      </div>
      <div className="ckgrid">
        <div className="pnl">
          <h3>Items Ordered</h3>
          {o.items.map((c) => { const p = products[c.id - 1]; return (
            <div className="ci" key={c.id}><ProductThumb p={p} /><div><b>{p.name}</b><small>{p.w} × {c.q}</small></div><b>{inr(p.price * c.q)}</b></div>
          ); })}
          <p className="r"><span>Subtotal</span><span>{inr(o.sub)}</span></p>
          <p className="r"><span>Discount</span><span>−{inr(o.disc)}</span></p>
          <p className="r"><span>Delivery</span><span>{o.del ? inr(o.del) : "Free"}</span></p>
          <p className="r" style={{ fontSize: 18, fontWeight: 800, borderTop: "1px solid var(--line)", paddingTop: 10 }}><span>Total</span><span>{inr(o.total)}</span></p>
        </div>
        <div>
          <div className="pnl"><h3>Delivery Address</h3>
            <p style={{ margin: 0, lineHeight: 1.6 }}><b>{a.n}</b><br />{a.ad}<br />{a.city}, {a.st} – {a.pin}<br />Mobile: {a.ph}</p></div>
          <div className="pnl"><h3>Payment</h3>
            <p style={{ margin: 0 }}>{o.pay}<br /><b style={{ color: "var(--orange)" }}>{o.paid ? "Paid" : "Pay on delivery"}</b></p></div>
        </div>
      </div>
      <div style={{ textAlign: "center" }}><Link className="btn" to="/shop">Continue Shopping</Link><Link className="btn o" to="/account">View My Orders</Link></div>
    </section>
  );
}
