import { useState } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import Icon from "./Icon.jsx";
import { useStore } from "../context/StoreContext.jsx";
import { CATEGORIES } from "../data/products.js";

export default function Header() {
  const { count, user } = useStore();
  const nav = useNavigate();
  const [sp] = useSearchParams();
  const [open, setOpen] = useState(false);
  const active = ({ isActive }) => (isActive ? "on" : "");
  const account = () => nav(user ? "/account" : "/login");

  return (
    <header>
      <div className="nav">
        <Link to="/"><img src="/assets/logo/logo.jpg" alt="Cattle Feed logo" /></Link>
        <nav className={`links${open ? " open" : ""}`} onClick={() => setOpen(false)}>
          <NavLink to="/" end className={active}>Home</NavLink>
          <div className="dd">
            <NavLink to="/shop" className={active}>Shop <Icon name="down" size={16} /></NavLink>
            <div className="menu">
              {CATEGORIES.map((c) => (<Link key={c} to={`/shop?cat=${encodeURIComponent(c)}`}>{c}</Link>))}
            </div>
          </div>
          <NavLink to="/about" className={active}>About Us</NavLink>
          <NavLink to="/contact" className={active}>Contact</NavLink>
        </nav>
        <div className="search">
          <span className="si"><Icon name="search" size={16} /></span>
          <input type="search" placeholder="Search for cattle feed, mineral mix, supplements..." aria-label="Search products"
            value={sp.get("q") || ""} onChange={(e) => nav(`/shop?q=${encodeURIComponent(e.target.value)}`, { replace: true })} />
        </div>
        <button className="cartbtn" onClick={account} aria-label="Account"><Icon name="user" size={22} /></button>
        <button className="cartbtn" onClick={account} aria-label="Wishlist"><Icon name="heart" size={22} /></button>
        <button className="cartbtn" onClick={() => nav("/cart")} aria-label="Cart">
          <Icon name="cart" size={22} />{count > 0 && <b>{count}</b>}
        </button>
        <button className="cartbtn mb" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
      </div>
    </header>
  );
}
