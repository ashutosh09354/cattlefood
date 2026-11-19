import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { products } from "../data/products.js";
import { inr } from "../utils/currency.js";
import { useStore } from "../context/StoreContext.jsx";

export default function MyAccount() {
  const { user, orders, wish, updateName, logout, toast } = useStore();
  const nav = useNavigate();
  const [name, setName] = useState(user.n);
  const save = (e) => {
    e.preventDefault();
    if (name.trim().length < 2) return toast("Enter a name");
    updateName(name.trim()); toast("Profile updated");
  };
  const list = (wish || []).map((id) => products.find((p) => p.id === id)).filter(Boolean);
  return (
    <section>
      <SEO title="My Account" />
      <h2>Hello, {user.n}</h2><p className="sub">{user.e}</p>
      <div className="acc">
        <div><h3>Edit Profile</h3>
          <form className="af" onSubmit={save}><input value={name} onChange={(e) => setName(e.target.value)} aria-label="Name" /><button className="btn">Save</button></form></div>
        <div><h3>Session</h3><button className="btn o" style={{ margin: 0 }} onClick={() => { logout(); nav("/"); }}>Logout</button></div>
        <div className="full"><h3>My Orders</h3>
          {orders.length ? [...orders].reverse().map((o) => (
            <div className="row" key={o.id}><b>{o.id}</b>
              <span className="n">{new Date(o.at).toLocaleDateString("en-IN")} · {o.items.reduce((a, c) => a + c.q, 0)} items · Processing</span>
              <b>{inr(o.total)}</b></div>
          )) : <p>No orders yet.</p>}</div>
        <div className="full"><h3>Wishlist</h3>
          {list.length ? <div className="grid">{list.map((p) => (<ProductCard key={p.id} p={p} />))}</div> : <p>Your wishlist is empty.</p>}</div>
      </div>
    </section>
  );
}
