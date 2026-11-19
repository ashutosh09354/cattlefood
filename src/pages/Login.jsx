import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import Icon from "../components/Icon.jsx";
import { useStore } from "../context/StoreContext.jsx";

export default function Login() {
  const { login, toast } = useStore();
  const nav = useNavigate();
  const [e, setE] = useState("");
  const [p, setP] = useState("");
  const [r, setR] = useState(false);
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (ev) => {
    ev.preventDefault();
    setErr("");
    if (!e.trim() || !p) {
      setErr("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const m = login(e, p, r);
      setLoading(false);
      if (m) {
        setErr(m);
      } else {
        toast("Welcome back!");
        nav("/account");
      }
    }, 300);
  };

  const handleForgot = () => {
    toast("Password recovery will be available soon.");
  };

  return (
    <div className="auth-page">
      <SEO
        title="Login - Cattle Feed Farmer & Dealer Portal"
        description="Sign in to your Cattle Feed account to view recent orders, repeat feed shipments, and track farm deliveries."
      />

      {/* Breadcrumb Navigation */}
      <nav className="ab-breadcrumb" aria-label="Breadcrumb" style={{ justifyContent: "center" }}>
        <Link to="/">Home</Link>
        <span>/</span>
        <span style={{ color: "var(--orange)", fontWeight: 600 }}>Login</span>
      </nav>

      {/* Auth Card */}
      <div className="auth-card">
        <div className="auth-avatar">
          <Icon name="user" size={26} />
        </div>

        <div className="auth-header">
          <div className="ab-badge" style={{ marginBottom: 12 }}>
            <span>Farmer & Dealer Portal</span>
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to manage feed orders, track deliveries, and view exclusive farm rates.</p>
        </div>

        {err && (
          <div className="auth-err-box" role="alert">
            <Icon name="helpCircle" size={18} />
            <span>{err}</span>
          </div>
        )}

        <form onSubmit={submit}>
          {/* Email Address Field */}
          <div className="auth-field">
            <label htmlFor="auth-email">Email Address</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">
                <Icon name="mail" size={18} />
              </span>
              <input
                id="auth-email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                value={e}
                onChange={(x) => {
                  setE(x.target.value);
                  if (err) setErr("");
                }}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="auth-field">
            <label htmlFor="auth-password">
              Password
            </label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">
                <Icon name="lock" size={18} />
              </span>
              <input
                id="auth-password"
                type={show ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                value={p}
                onChange={(x) => {
                  setP(x.target.value);
                  if (err) setErr("");
                }}
                required
              />
              <button
                type="button"
                className="auth-eye-btn"
                onClick={() => setShow(!show)}
                title={show ? "Hide password" : "Show password"}
                aria-label={show ? "Hide password" : "Show password"}
              >
                <Icon name={show ? "eyeOff" : "eye"} size={18} />
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password Row */}
          <div className="auth-options">
            <label>
              <input type="checkbox" checked={r} onChange={(x) => setR(x.target.checked)} />
              <span>Remember me</span>
            </label>
            <button type="button" onClick={handleForgot} className="auth-forgot" style={{ background: "none", border: 0, padding: 0, cursor: "pointer", font: "inherit" }}>
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn auth-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In to Account"} <Icon name="arrow" size={16} />
          </button>
        </form>

        {/* Switch to Signup */}
        <div className="auth-footer">
          Don't have an account yet? <Link to="/signup">Create Farm Account</Link>
        </div>

        {/* Trust Badges */}
        <div className="auth-trust">
          <span>
            <Icon name="shield" size={14} /> Secure Login
          </span>
          <span>
            <Icon name="truck" size={14} /> Track Orders
          </span>
          <span>
            <Icon name="award" size={14} /> Farm Pricing
          </span>
        </div>
      </div>
    </div>
  );
}
