import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import Icon from "../components/Icon.jsx";
import { useStore } from "../context/StoreContext.jsx";

export default function Contact() {
  const { toast } = useStore();
  const [f, setF] = useState({
    name: "",
    phone: "",
    email: "",
    inquiryType: "Feed Ration & Nutrition Advice",
    livestock: "Dairy Cattle",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const livestockTypes = ["Dairy Cattle", "Murrah Buffalo", "Calf & Heifer", "Poultry & Goat"];

  const submit = (ev) => {
    ev.preventDefault();
    if (f.name.trim().length < 2) {
      return toast("Please enter your full name.");
    }
    if (!/^\d{10}$/.test(f.phone.replace(/\D/g, ""))) {
      return toast("Please enter a valid 10-digit mobile number.");
    }
    if (!/^\S+@\S+\.\S+$/.test(f.email)) {
      return toast("Please enter a valid email address.");
    }
    if (f.message.trim().length < 6) {
      return toast("Please enter a brief message describing your query.");
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast("Thank you! Your message has been sent to our veterinary team.");
      setF({
        name: "",
        phone: "",
        email: "",
        inquiryType: "Feed Ration & Nutrition Advice",
        livestock: "Dairy Cattle",
        message: "",
      });
    }, 600);
  };

  return (
    <div className="ct-page">
      <SEO
        title="Contact Us - Cattle Feed Advisory & Farmer Support"
        description="Get in touch with Cattle Feed. Speak to certified animal nutritionists, request bulk delivery quotes, or get personalized feed ration planning for your herd."
      />

      {/* Breadcrumb Navigation */}
      <nav className="ab-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span style={{ color: "var(--orange)", fontWeight: 600 }}>Contact Us</span>
      </nav>

      {/* Hero Header */}
      <div className="ct-hero">
        <div className="ab-badge">
          <Icon name="phone" size={15} />
          <span>Farmer Helpline & Veterinary Consultation</span>
        </div>
        <h1>
          We're Here to Support <span>Your Farm's Growth</span>
        </h1>
        <p className="ct-hero-sub">
          Have questions about maximizing milk fat percentage, transitioning feed rations, or placing bulk cooperative orders? Our certified feed specialists and veterinary team are ready to assist.
        </p>
      </div>

      {/* Quick Contact Cards */}
      <section className="ct-cards" aria-label="Direct Contact Channels">
        <div className="ct-card">
          <div className="ct-card-icon">
            <Icon name="phone" size={22} />
          </div>
          <h3>Toll-Free Helpline</h3>
          <p>Direct assistance from 8:00 AM to 8:00 PM, Monday through Saturday.</p>
          <a href="tel:+910000000000">+91 00000 00000</a>
        </div>

        <div className="ct-card">
          <div className="ct-card-icon">
            <Icon name="mail" size={22} />
          </div>
          <h3>Email Advisory</h3>
          <p>Send herd details and queries. Average nutritionist reply in under 2 hours.</p>
          <a href="mailto:care@cattlefeed.example">care@cattlefeed.example</a>
        </div>

        <div className="ct-card">
          <div className="ct-card-icon">
            <Icon name="users" size={22} />
          </div>
          <h3>WhatsApp Support</h3>
          <p>Instant dispatch tracking, feed schedule charts, and bulk inquiries.</p>
          <a href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer">
            Chat on WhatsApp &rarr;
          </a>
        </div>

        <div className="ct-card">
          <div className="ct-card-icon">
            <Icon name="mapPin" size={22} />
          </div>
          <h3>Central Mill & Lab</h3>
          <p>Plot 42, Agro-Industrial Estate, GT Road, Karnal, Haryana - 132001</p>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--brown)" }}>Open Mon - Sat</span>
        </div>
      </section>

      {/* Split Form & Advisory Section */}
      <div className="ct-split">
        {/* Contact / Inquiry Form */}
        <div className="ct-form-card">
          <h2>Send Us a Message</h2>
          <p>Fill in your details below and a feed specialist will reach out shortly.</p>

          <form onSubmit={submit}>
            <div className="ct-grid-two">
              <div className="ct-field">
                <label htmlFor="ct-name">
                  Full Name <span>*</span>
                </label>
                <input
                  id="ct-name"
                  type="text"
                  placeholder="e.g. Ramesh Yadav"
                  value={f.name}
                  onChange={set("name")}
                  required
                />
              </div>

              <div className="ct-field">
                <label htmlFor="ct-phone">
                  Mobile Number <span>*</span>
                </label>
                <input
                  id="ct-phone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={f.phone}
                  onChange={set("phone")}
                  required
                />
              </div>
            </div>

            <div className="ct-field">
              <label htmlFor="ct-email">
                Email Address <span>*</span>
              </label>
              <input
                id="ct-email"
                type="email"
                placeholder="name@example.com"
                value={f.email}
                onChange={set("email")}
                required
              />
            </div>

            <div className="ct-field">
              <label htmlFor="ct-type">Inquiry Purpose</label>
              <select id="ct-type" value={f.inquiryType} onChange={set("inquiryType")}>
                <option value="Feed Ration & Nutrition Advice">Custom Feed Ration & Nutrition Advice</option>
                <option value="Bulk Farm / Cooperative Order">Bulk Farm / Cooperative Order (50+ Bags)</option>
                <option value="Product Details & Pricing">Product Details & Pricing Inquiry</option>
                <option value="Dealership & Distribution">Dealership / Rural Distributor Application</option>
                <option value="Order Tracking & Logistics">Existing Order Tracking & Logistics</option>
              </select>
            </div>

            <div className="ct-field">
              <label>Primary Livestock Focus</label>
              <div className="ct-pills">
                {livestockTypes.map((t) => (
                  <button
                    type="button"
                    key={t}
                    className={`ct-pill ${f.livestock === t ? "on" : ""}`}
                    onClick={() => setF({ ...f, livestock: t })}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="ct-field" style={{ marginTop: 12 }}>
              <label htmlFor="ct-message">
                Message / Herd Details <span>*</span>
              </label>
              <textarea
                id="ct-message"
                rows={4}
                placeholder="Share your current daily milk yield, number of animals, or any specific health or nutrition questions..."
                value={f.message}
                onChange={set("message")}
                required
              />
            </div>

            <button type="submit" className="btn ct-form-btn" disabled={submitting}>
              {submitting ? "Sending..." : "Submit Inquiry"} <Icon name="arrow" size={16} />
            </button>

            <small style={{ display: "block", textAlign: "center", color: "var(--muted)", marginTop: 14 }}>
              🔒 Your information is confidential. We will never share your details.
            </small>
          </form>
        </div>

        {/* Right Info Column */}
        <div className="ct-info-col">
          <div className="ct-info-card warm">
            <h3>
              <Icon name="shield" size={20} /> Free Veterinary Ration Planning
            </h3>
            <p>
              Unsure which feed matches your cows or buffaloes? Provide your herd size, breed, and current lactation stage. Our veterinary nutritionists will provide a personalized feeding chart to optimize input cost per liter.
            </p>
            <div style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 13, fontWeight: 700, color: "var(--orange)" }}>
              <Icon name="check" size={16} /> Tailored to regional fodder availability
            </div>
          </div>

          <div className="ct-info-card">
            <h3>
              <Icon name="truck" size={20} /> Regional Distribution Hubs
            </h3>
            <p>
              We operate strategically positioned fulfillment centers to guarantee prompt, dry, and damage-free farm gate delivery.
            </p>
            <div className="ct-hubs">
              <div className="ct-hub">
                <b>North India Hub</b>
                <small>Karnal, Haryana</small>
              </div>
              <div className="ct-hub">
                <b>Western India Hub</b>
                <small>Anand, Gujarat</small>
              </div>
              <div className="ct-hub">
                <b>Eastern India Hub</b>
                <small>Patna, Bihar</small>
              </div>
              <div className="ct-hub">
                <b>Central India Hub</b>
                <small>Indore, Madhya Pradesh</small>
              </div>
            </div>
          </div>

          <div className="ct-info-card">
            <h3>
              <Icon name="award" size={20} /> Bulk Cooperative Discounts
            </h3>
            <p>
              Orders of 50 bags (2.5 tonnes) or more qualify for tiered pricing, scheduled monthly deliveries, and direct lab test certificates per batch.
            </p>
            <Link to="/shop" style={{ fontSize: 13, fontWeight: 700, color: "var(--orange)", display: "inline-flex", alignItems: "center", gap: 4 }}>
              View Complete Product Catalogue &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <section className="ct-faq" aria-label="Frequently Asked Questions">
        <div className="ct-faq-header">
          <span className="ab-story-badge">Got Questions?</span>
          <h2>Frequently Asked Questions</h2>
          <p>Quick answers to common questions about feed ordering, transition, and delivery.</p>
        </div>

        <div className="ct-faq-grid">
          <div className="ct-faq-item">
            <h4>
              <Icon name="helpCircle" size={18} /> How quickly will my feed be delivered?
            </h4>
            <p>
              Most farm and village orders are dispatched within 24 hours from your nearest regional warehouse and arrive within 2 to 4 business days.
            </p>
          </div>

          <div className="ct-faq-item">
            <h4>
              <Icon name="helpCircle" size={18} /> How should I transition animals to this feed?
            </h4>
            <p>
              Gradually mix 25% Cattle Feed with 75% existing ration for days 1-3, 50% for days 4-6, and 100% by day 8 to allow rumen microflora to adapt smoothly.
            </p>
          </div>

          <div className="ct-faq-item">
            <h4>
              <Icon name="helpCircle" size={18} /> What payment methods are accepted?
            </h4>
            <p>
              We support Cash on Delivery (COD), UPI (Google Pay, PhonePe, Paytm), Net Banking, and Bank Transfer for bulk cooperative purchases.
            </p>
          </div>

          <div className="ct-faq-item">
            <h4>
              <Icon name="helpCircle" size={18} /> How do I become an authorized local dealer?
            </h4>
            <p>
              Select "Dealership / Rural Distributor Application" in the contact form or call our helpline directly. Our regional team will contact you within 48 hours.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
