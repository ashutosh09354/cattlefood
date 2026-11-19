import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import FormField from "../components/FormField.jsx";
import ProductThumb from "../components/ProductThumb.jsx";
import { products } from "../data/products.js";
import { inr, deliveryFee } from "../utils/currency.js";
import { useStore } from "../context/StoreContext.jsx";

const BANKS = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Punjab National Bank", "Bank of Baroda", "Kotak Mahindra Bank"];
const SHIPPING = [["std", "Standard Delivery", "3–5 business days"], ["exp", "Express Delivery", "1–2 business days"]];
const PAYMENTS = [
  ["upi", "UPI", "Google Pay, PhonePe, Paytm, BHIM"],
  ["card", "Credit / Debit Card", "Visa, Mastercard, RuPay"],
  ["nb", "Net Banking", "All major banks"],
  ["cod", "Cash on Delivery", "Pay when your order arrives"],
];

const cardBrand = (d) => (/^4/.test(d) ? "Visa" : /^(5[1-5]|2[2-7])/.test(d) ? "Mastercard" : /^(60|65|81|82|508)/.test(d) ? "RuPay" : "");

export default function Checkout() {
  const { cart, sub, disc, coupon, applyCoupon, user, placeOrder } = useStore();
  const nav = useNavigate();
  const [f, setF] = useState({ n: user?.n || "", ph: "", em: user?.e || "", ad: "", city: "", st: "", pin: "", upi: "", cn: "", cname: "", exp: "", cvv: "", bank: "" });
  const [errs, setErrs] = useState({});
  const [ship, setShip] = useState("std");
  const [pay, setPay] = useState("upi");
  const [busy, setBusy] = useState(false);
  const [code, setCode] = useState(coupon);

  if (!cart.length && !busy) return (
    <section style={{ textAlign: "center" }}>
      <SEO title="Checkout" />
      <h2>Your cart is empty</h2><p className="sub">Add some feed before checking out.</p>
      <Link className="btn" to="/shop">Browse Products</Link>
    </section>
  );

  const net = sub - disc, del = deliveryFee(net, ship), total = net + del;
  const upd = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const fld = (k, label, props = {}) => (
    <FormField name={k} label={label} value={f[k]} error={errs[k]} onChange={(e) => upd(k, e.target.value)} {...props} />
  );

  const validate = () => {
    const e = {}, v = (k) => f[k].trim();
    if (v("n").length < 2) e.n = "Enter your full name";
    if (!/^[6-9]\d{9}$/.test(v("ph"))) e.ph = "Enter a valid 10-digit mobile number";
    if (!/^\S+@\S+\.\S+$/.test(v("em"))) e.em = "Enter a valid email address";
    if (v("ad").length < 8) e.ad = "Enter your full address";
    if (v("city").length < 2) e.city = "Enter your city";
    if (v("st").length < 2) e.st = "Enter your state";
    if (!/^\d{6}$/.test(v("pin"))) e.pin = "Enter a valid 6-digit PIN";
    if (pay === "upi" && !/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(v("upi"))) e.upi = "Enter a valid UPI ID, e.g. name@okaxis";
    if (pay === "card") {
      const d = f.cn.replace(/\s/g, ""), m = v("exp").match(/^(\d\d)\/(\d\d)$/);
      if (!/^\d{16}$/.test(d)) e.cn = "Enter a 16-digit card number";
      if (v("cname").length < 2) e.cname = "Enter the name on card";
      if (!m || +m[1] < 1 || +m[1] > 12 || new Date(2000 + +m[2], +m[1], 1) <= new Date()) e.exp = "Enter a valid expiry";
      if (!/^\d{3,4}$/.test(v("cvv"))) e.cvv = "Invalid CVV";
    }
    if (pay === "nb" && !f.bank) e.bank = "Select your bank";
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrs(e);
    const keys = Object.keys(e);
    if (keys.length) { document.querySelector(`[name="${keys[0]}"]`)?.focus(); return; }
    const label = { upi: `UPI · ${f.upi.trim()}`, card: `Card ending ${f.cn.replace(/\s/g, "").slice(-4)}`, nb: `Net Banking · ${f.bank}`, cod: "Cash on Delivery" }[pay];
    const paymentLabel = label;
    const order = {
      id: "CF" + Date.now().toString().slice(-7), items: cart, sub, disc, del, total, ship, pay: paymentLabel, paid: pay !== "cod",
      addr: { n: f.n.trim(), ph: f.ph, em: f.em, ad: f.ad.trim(), city: f.city.trim(), st: f.st.trim(), pin: f.pin },
      at: new Date().toISOString(),
    };
    setBusy(true);
    setTimeout(() => { placeOrder(order); nav("/order-success", { replace: true }); }, 2200);
  };

  const fmtCard = (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const fmtExp = (v) => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d; };

  return (
    <section className="ck">
      <SEO title="Checkout" />
      <div className="steps2"><Link to="/cart">1 Cart</Link><span className="on">2 Checkout</span><span>3 Confirmation</span></div>
      <form className="ckgrid" onSubmit={submit} noValidate autoComplete="off">
        <div>
          <div className="pnl">
            <h3><b>1</b> Contact Information</h3>
            <div className="two">
              {fld("n", "Full name", { placeholder: "As on your ID", autoComplete: "name" })}
              {fld("ph", "Mobile number", { placeholder: "10-digit number", inputMode: "numeric", maxLength: 10, autoComplete: "tel" })}
            </div>
            {fld("em", "Email address", { type: "email", placeholder: "you@example.com", autoComplete: "email" })}
          </div>
          <div className="pnl">
            <h3><b>2</b> Delivery Address</h3>
            {fld("ad", "Address", { placeholder: "House no., street, village / area", autoComplete: "street-address" })}
            <div className="two">{fld("city", "Town / City", { placeholder: "City" })}{fld("st", "State", { placeholder: "State" })}</div>
            {fld("pin", "PIN code", { placeholder: "6-digit PIN", inputMode: "numeric", maxLength: 6 })}
          </div>
          <div className="pnl">
            <h3><b>3</b> Shipping Method</h3>
            {SHIPPING.map(([k, t, s]) => (
              <label className="opt" key={k}>
                <input type="radio" name="ship" checked={ship === k} onChange={() => setShip(k)} />
                <span><b>{t}</b><small>{s}</small></span>
                <strong>{inr(deliveryFee(net, k)) === "₹0" ? "Free" : inr(deliveryFee(net, k))}</strong>
              </label>
            ))}
          </div>
          <div className="pnl">
            <h3><b>4</b> Payment Method</h3>
            {PAYMENTS.map(([k, t, s]) => (
              <label className="opt" key={k}>
                <input type="radio" name="pay" checked={pay === k} onChange={() => setPay(k)} />
                <span><b>{t}</b><small>{s}</small></span>
              </label>
            ))}
            <div className="pp" style={{ display: "block" }}>
              {pay === "upi" && (<>
                {fld("upi", "UPI ID", { placeholder: "name@bank", autoComplete: "off" })}
                <div className="chips">{["@okaxis", "@ybl", "@paytm", "@oksbi"].map((s) => (
                  <button type="button" key={s} onClick={() => upd("upi", (f.upi.split("@")[0] || "yourname") + s)}>{s}</button>
                ))}</div>
              </>)}
              {pay === "card" && (<>
                {fld("cn", "Card number", { placeholder: "1234 5678 9012 3456", inputMode: "numeric", autoComplete: "off", maxLength: 19, onChange: (e) => upd("cn", fmtCard(e.target.value)) })}
                <span className="brand">{cardBrand(f.cn.replace(/\s/g, ""))}</span>
                {fld("cname", "Name on card", { placeholder: "As printed on card", autoComplete: "off" })}
                <div className="two">
                  {fld("exp", "Expiry", { placeholder: "MM/YY", inputMode: "numeric", maxLength: 5, autoComplete: "off", onChange: (e) => upd("exp", fmtExp(e.target.value)) })}
                  {fld("cvv", "CVV", { placeholder: "3 digits", inputMode: "numeric", maxLength: 4, type: "password", autoComplete: "off" })}
                </div>
              </>)}
              {pay === "nb" && (
                <label className="fl"><span>Select your bank</span>
                  <select name="bank" value={f.bank} onChange={(e) => upd("bank", e.target.value)}>
                    <option value="">Choose a bank</option>{BANKS.map((b) => (<option key={b}>{b}</option>))}
                  </select><em className="fe">{errs.bank}</em>
                </label>
              )}
              {pay === "cod" && <p style={{ margin: 0 }}>Pay in cash to the delivery partner. Please keep the exact amount ready.</p>}
            </div>
          </div>
        </div>
        <aside className="pnl sumc">
          <h3>Order Summary</h3>
          {cart.map((c) => { const p = products[c.id - 1]; return (
            <div className="ci" key={c.id}><ProductThumb p={p} /><div><b>{p.name}</b><small>{p.w} × {c.q}</small></div><b>{inr(p.price * c.q)}</b></div>
          ); })}
          <div className="cpn">
            <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Coupon code (CATTLE10)" aria-label="Coupon code" />
            <button type="button" onClick={() => applyCoupon(code)}>Apply</button>
          </div>
          <p><span>Subtotal</span><span>{inr(sub)}</span></p>
          <p><span>Discount</span><span>−{inr(disc)}</span></p>
          <p><span>Delivery</span><span>{del ? inr(del) : "Free"}</span></p>
          <p className="tot"><span>Total</span><span>{inr(total)}</span></p>
          <button className="btn" style={{ width: "100%", fontSize: 16, padding: 14 }}>{pay === "cod" ? `Place Order · ${inr(total)}` : `Pay ${inr(total)}`}</button>
          <p className="sub" style={{ textAlign: "center", margin: "10px 0 0", fontSize: 12 }}>By placing your order you agree to our Terms &amp; Privacy Policy.</p>
        </aside>
      </form>
      {busy && (
        <div className="ov"><div className="mod"><div className="spin" />
          <h3 style={{ margin: "0 0 6px" }}>{pay === "cod" ? "Placing your order" : "Processing payment"}</h3>
          <p style={{ margin: "0 0 8px" }}>{pay === "upi" ? "Approve the request in your UPI app…" : pay === "cod" ? "Just a moment…" : "Please do not refresh or close this page."}</p>
        </div></div>
      )}
    </section>
  );
}
