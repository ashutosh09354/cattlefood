import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import ProductThumb from "../components/ProductThumb.jsx";
import { products } from "../data/products.js";
import { inr, deliveryFee } from "../utils/currency.js";
import { useStore } from "../context/StoreContext.jsx";

export default function Cart() {
  const { cart, changeQty, remove, clearCart, coupon, applyCoupon, sub, disc } = useStore();
  const [code, setCode] = useState(coupon);
  if (!cart.length) return (
    <section style={{ textAlign: "center" }}>
      <SEO title="Cart" />
      <h2>Your cart is empty</h2><p className="sub">Add some feed to get started.</p>
      <Link className="btn" to="/shop">Browse Products</Link>
    </section>
  );
  const del = deliveryFee(sub - disc);
  return (
    <section>
      <SEO title="Shopping Cart" />
      <h2>Shopping Cart</h2>
      <p className="sub"><button onClick={clearCart} style={{ border: 0, background: "none", color: "var(--orange)", padding: 0 }}>Clear cart</button></p>
      <div className="cart">
        <div>
          {cart.map((c) => {
            const p = products.find((x) => x.id === c.id);
            if (!p) return null;
            return (
              <div className="row" key={c.id}>
                <ProductThumb p={p} />
                <div className="n"><b>{p.name}</b><br /><small>{p.w}</small></div>
                <div className="qty"><button onClick={() => changeQty(c.id, -1)}>−</button> {c.q} <button onClick={() => changeQty(c.id, 1)}>+</button></div>
                <b>{inr(p.price * c.q)}</b>
                <button onClick={() => remove(c.id)} style={{ border: 0, background: "none", color: "var(--orange)" }}>Remove</button>
              </div>
            );
          })}
        </div>
        <div className="sum">
          <h3 style={{ marginTop: 0 }}>Order Summary</h3>
          <div style={{ display: "flex", gap: 6 }}>
            <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Coupon (try CATTLE10)" aria-label="Coupon code" />
            <button className="btn" style={{ padding: "6px 12px", borderRadius: 0 }} onClick={() => applyCoupon(code)}>Apply</button>
          </div>
          <p><span>Subtotal</span>{inr(sub)}</p>
          <p><span>Discount</span>−{inr(disc)}</p>
          <p><span>Delivery</span>{del ? inr(del) : "Free"}</p>
          <p><b>Total</b><b>{inr(sub - disc + del)}</b></p>
          <Link className="btn" to="/checkout" style={{ display: "block", textAlign: "center", marginTop: 12, borderRadius: 30 }}>Proceed to Checkout →</Link>
        </div>
      </div>
    </section>
  );
}
