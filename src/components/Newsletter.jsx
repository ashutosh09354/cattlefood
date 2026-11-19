import { useState } from "react";
import Icon from "./Icon.jsx";
import { useStore } from "../context/StoreContext.jsx";
import Reveal from "./Reveal.jsx";

export default function Newsletter() {
  const { toast } = useStore();
  const [email, setEmail] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (/^\S+@\S+\.\S+$/.test(email)) {
      toast("Thank you for subscribing to Cattle Feed updates!");
      setEmail("");
    } else {
      toast("Please enter a valid email address");
    }
  };

  return (
    <section className="nl-wrap">
      {/* Top content area */}
      <div className="nl-body">
        <Reveal variant="fade-up">
          {/* Eyebrow */}
          <div className="nl-eyebrow">
            <span className="nl-eyebrow-line" />
            <span className="nl-eyebrow-badge">
              <Icon name="mail" size={13} />
              <span>Stay Connected</span>
            </span>
            <span className="nl-eyebrow-line" />
          </div>

          <h2 className="nl-heading">Get Farm Nutrition Tips &amp; Exclusive Offers</h2>
          <p className="nl-sub">
            Receive expert feeding advice, new product updates and special deals for your farm.
          </p>
        </Reveal>

        <Reveal variant="fade-up" delay="100ms">
          <form onSubmit={submit} className="nl-form">
            <span className="nl-form-icon">
              <Icon name="mail" size={18} />
            </span>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              required
            />
            <button type="submit" className="nl-form-btn">
              Subscribe &nbsp;→
            </button>
          </form>
        </Reveal>
      </div>

    </section>
  );
}
