import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import Icon from "../components/Icon.jsx";
import { useStore } from "../context/StoreContext.jsx";

export default function Signup() {
  const { signup, toast } = useStore();
  const nav = useNavigate();
  const [f, setF] = useState({ n: "", e: "", p: "", c: "" });
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (x) => {
    setF({ ...f, [k]: x.target.value });
    if (err) setErr("");
  };

  const submit = (ev) => {
    ev.preventDefault();
    setErr("");
    setLoading(true);

    setTimeout(() => {
      const m = signup(f.n, f.e, f.p, f.c);
      setLoading(false);
      if (m) {
        setErr(m);
      } else {
        toast("Account created successfully!");
        nav("/account");
      }
    }, 300);
  };

  return (
    <div className="auth-page">
      <SEO
        title="Create Account - Cattle Feed Farmer & Dealer Registration"
        description="Register for a Cattle Feed account to unlock bulk discounts, schedule repeat farm deliveries, and consult our veterinary nutritionists."
      />

      {/* Breadcrumb Navigation */}
      <nav className="ab-breadcrumb" aria-label="Breadcrumb" style={{ justifyContent: "center" }}>
        <Link to="/">Home</Link>
        <span>/</span>
        <span style={{ color: "var(--orange)", fontWeight: 600 }}>Sign Up</span>
      </nav>

      {/* Auth Card */}
      <div className="auth-card">
        <div className="auth-avatar">
          <Icon name="users" size={26} />
        </div>

        <div className="auth-header">
          <div className="ab-badge" style={{ marginBottom: 12 }}>
            <span>Join 50,000+ Dairy Farmers</span>
          </div>
          <h1>Create Farm Account</h1>
          <p>Get access to scheduled deliveries, bulk cooperative rates, and free veterinary guidance.</p>
        </div>

        {err && (
          <div className="auth-err-box" role="alert">
            <Icon name="helpCircle" size={18} />
            <span>{err}</span>
          </div>
        )}

        <form onSubmit={submit}>
          {/* Full Name */}
          <div className="auth-field">
            <label htmlFor="auth-name">Full Name</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">
                <Icon name="user" size={18} />
              </span>
              <input
                id="auth-name"
                type="text"
                placeholder="e.g. Ramesh Yadav"
                autoComplete="name"
                value={f.n}
                onChange={set("n")}
                required
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="auth-field">
            <label htmlFor="auth-su-email">Email Address</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">
                <Icon name="mail" size={18} />
              </span>
              <input
                id="auth-su-email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                value={f.e}
                onChange={set("e")}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="auth-field">
            <label htmlFor="auth-su-pw">Create Password</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">
                <Icon name="lock" size={18} />
              </span>
              <input
                id="auth-su-pw"
                type={show ? "text" : "password"}
                placeholder="At least 6 characters"
                autoComplete="new-password"
                value={f.p}
                onChange={set("p")}
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

          {/* Confirm Password */}
          <div className="auth-field">
            <label htmlFor="auth-su-conf">Confirm Password</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">
                <Icon name="check" size={18} />
              </span>
              <input
                id="auth-su-conf"
                type="password"
                placeholder="Re-enter password"
                autoComplete="new-password"
                value={f.c}
                onChange={set("c")}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn auth-btn" style={{ marginTop: 8 }} disabled={loading}>
            {loading ? "Creating Account..." : "Create Free Account"} <Icon name="arrow" size={16} />
          </button>
        </form>

        {/* Switch to Login */}
        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign In here</Link>
        </div>

        {/* Trust Badges */}
        <div className="auth-trust">
          <span>
            <Icon name="shield" size={14} /> 100% Free
          </span>
          <span>
            <Icon name="award" size={14} /> Bulk Rates
          </span>
          <span>
            <Icon name="helpCircle" size={14} /> Advisory Access
          </span>
        </div>
      </div>
    </div>
  );
}
