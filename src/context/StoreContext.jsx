import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { ls } from "../utils/storage";
import { products } from "../data/products";

const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);

const readUser = () =>
  ls.get("cf_user", null) ||
  (() => { try { return JSON.parse(sessionStorage.getItem("cf_user")); } catch (e) { return null; } })();

// Demo-only store: everything lives in localStorage. Replace with API calls when a backend exists.
export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => ls.get("cf_cart", []));
  const [wish, setWish] = useState(() => ls.get("cf_wish", []));
  const [coupon, setCoupon] = useState(() => ls.get("cf_coupon", ""));
  const [orders, setOrders] = useState(() => ls.get("cf_orders", []));
  const [user, setUser] = useState(readUser);
  const [msg, setMsg] = useState("");

  useEffect(() => ls.set("cf_cart", cart), [cart]);
  useEffect(() => ls.set("cf_wish", wish), [wish]);
  useEffect(() => ls.set("cf_coupon", coupon), [coupon]);
  useEffect(() => ls.set("cf_orders", orders), [orders]);

  const toast = useCallback((m) => { setMsg(m); setTimeout(() => setMsg(""), 1800); }, []);
  const add = (id, q = 1) => {
    setCart((c) => (c.some((x) => x.id === id) ? c.map((x) => (x.id === id ? { ...x, q: x.q + q } : x)) : [...c, { id, q }]));
    toast("Added to cart");
  };
  const changeQty = (id, d) => setCart((c) => c.map((x) => (x.id === id ? { ...x, q: x.q + d } : x)).filter((x) => x.q > 0));
  const remove = (id) => setCart((c) => c.filter((x) => x.id !== id));
  const clearCart = () => setCart([]);
  const toggleWish = (id) => setWish((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  const applyCoupon = (code) => {
    const ok = code.trim().toUpperCase() === "CATTLE10";
    setCoupon(ok ? "CATTLE10" : "");
    toast(ok ? "Coupon applied" : "Invalid coupon");
  };
  const placeOrder = (o) => { setOrders((x) => [...x, o]); setCart([]); setCoupon(""); };

  const sub = cart.reduce((a, c) => a + products[c.id - 1].price * c.q, 0);
  const disc = coupon === "CATTLE10" ? Math.round(sub * 0.1) : 0;
  const count = cart.reduce((a, c) => a + c.q, 0);

  const persist = (u, remember) => {
    try {
      localStorage.removeItem("cf_user"); sessionStorage.removeItem("cf_user");
      if (u) (remember ? localStorage : sessionStorage).setItem("cf_user", JSON.stringify(u));
    } catch (e) {}
    setUser(u);
  };
  // Demo auth: passwords are stored unhashed in the browser. Not secure.
  const login = (email, pw, remember) => {
    const u = ls.get("cf_users", []).find((x) => x.e === email.trim().toLowerCase() && x.p === pw);
    if (!u) return "Incorrect email or password";
    persist({ n: u.n, e: u.e }, remember);
    return "";
  };
  const signup = (n, email, pw, conf) => {
    const em = email.trim().toLowerCase(), us = ls.get("cf_users", []);
    if (n.trim().length < 2) return "Enter your name";
    if (!/^\S+@\S+\.\S+$/.test(em)) return "Enter a valid email";
    if (pw.length < 6) return "Password must be at least 6 characters";
    if (pw !== conf) return "Passwords do not match";
    if (us.some((x) => x.e === em)) return "Email already registered";
    ls.set("cf_users", [...us, { n: n.trim(), e: em, p: pw }]);
    persist({ n: n.trim(), e: em }, true);
    return "";
  };
  const updateName = (n) => {
    ls.set("cf_users", ls.get("cf_users", []).map((x) => (x.e === user.e ? { ...x, n } : x)));
    persist({ n, e: user.e }, !!ls.get("cf_user", null));
  };
  const logout = () => persist(null);

  return (
    <Ctx.Provider value={{ cart, wish, coupon, orders, user, count, sub, disc, add, changeQty, remove, clearCart, toggleWish, applyCoupon, placeOrder, login, signup, updateName, logout, toast }}>
      {children}
      {msg && <div className="toast">{msg}</div>}
    </Ctx.Provider>
  );
}
