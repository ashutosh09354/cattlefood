import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import Icon from "../components/Icon.jsx";

export default function About() {
  const stats = [
    { num: "50,000+", label: "Active Dairy & Livestock Farmers", icon: "users" },
    { num: "100%", label: "Lab-Tested, Non-Urea Ingredients", icon: "shield" },
    { num: "18+", label: "States Connected Direct-to-Farm", icon: "truck" },
    { num: "+22%", label: "Avg. Boost in Milk Fat & SNF", icon: "award" },
  ];

  const values = [
    {
      icon: "award",
      title: "Pure & Unadulterated",
      desc: "Only pristine non-GMO grains, natural oilcakes, and pure bypass proteins. We strictly reject urea, harmful chemical binders, and fillers.",
    },
    {
      icon: "shield",
      title: "Scientifically Balanced",
      desc: "Precision formulations tailored for Indian indigenous and crossbred breeds to balance Crude Protein (CP), energy (TDN), and chelated minerals.",
    },
    {
      icon: "truck",
      title: "Farm-Fresh Reliability",
      desc: "Packed in multi-layer moisture-barrier woven bags, ensuring fresh, rodent-free, crisp pellets delivered promptly to your village or farm.",
    },
    {
      icon: "users",
      title: "Farmer Prosperity First",
      desc: "Built around fair rural pricing, bulk cooperative discounts, and complimentary nutritional guidance from certified veterinary experts.",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Strict Grain Screening",
      desc: "Every batch of maize, de-oiled mustard cake, and bran undergoes mandatory testing for moisture and aflatoxins.",
    },
    {
      num: "02",
      title: "Precision Micro-Dosing",
      desc: "Automated blending of bypass fats, chelated zinc, copper, cobalt, and essential vitamins A, D3, and E.",
    },
    {
      num: "03",
      title: "Conditioned Pelletizing",
      desc: "Low-heat steam processing locks in nutrient digestibility, eliminates bacterial pathogens, and enhances feed palatability.",
    },
    {
      num: "04",
      title: "Moisture-Proof Packaging",
      desc: "Sealed in protective laminated 50kg bags to preserve freshness and nutrient potency through high-humidity seasons.",
    },
  ];

  const feedHighlights = [
    {
      img: "/assets/images/category-0.jpg",
      title: "Dairy Cattle & Crossbreeds",
      desc: "High-lactation energy formulations designed for Gir, Sahiwal, and HF cross cows to maintain peak daily yield and udder health.",
      link: "/shop?cat=Cattle%20Feed",
    },
    {
      img: "/assets/images/category-1.jpg",
      title: "Murrah & Dairy Buffaloes",
      desc: "Formulated with specialized bypass fats and amino acids to maximize milk fat percentage (7.0%+) and Solids-Not-Fat (SNF).",
      link: "/shop?cat=Buffalo%20Feed",
    },
    {
      img: "/assets/images/category-2.jpg",
      title: "Chelated Mineral Mixtures",
      desc: "Enriched with bio-available trace minerals and vitamins to reduce inter-calving periods, enhance conception rates, and strengthen hooves.",
      link: "/shop?cat=Mineral%20Mixture",
    },
    {
      img: "/assets/images/category-4.jpg",
      title: "Calf Starter & Grower",
      desc: "Early rumen development feed promoting rapid skeletal growth, immune resilience, and faster maturation into productive milkers.",
      link: "/shop?cat=Calf%20Feed",
    },
  ];

  return (
    <div className="ab-page">
      <SEO
        title="About Us - Dedicated to Farmer Prosperity & Animal Nutrition"
        description="Learn about Cattle Feed, our scientific formulation process, quality standards, and our mission to support Indian dairy and livestock farmers."
      />

      {/* Breadcrumb Navigation */}
      <nav className="ab-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span style={{ color: "var(--orange)", fontWeight: 600 }}>About Us</span>
      </nav>

      {/* Hero Section */}
      <div className="ab-hero">
        <div className="ab-badge">
          <span>Empowering Indian Dairy & Livestock Farming</span>
        </div>
        <h1>
          Nourishing Herds, <span>Empowering Farmers</span>
        </h1>
        <p className="ab-hero-sub">
          At Cattle Feed, we combine veterinary science with pure, unadulterated raw ingredients to formulate feeds that maximize milk yield, improve reproductive health, and build prosperous farm livelihoods across India.
        </p>
        <div className="ab-cta-row">
          <Link to="/shop" className="btn">
            Explore Feed Range &rarr;
          </Link>
          <Link to="/contact" className="btn o">
            Talk to a Nutrition Specialist
          </Link>
        </div>
      </div>

      {/* Key Numbers / Stats Strip */}
      <section className="ab-stats" aria-label="Key Impact Statistics">
        {stats.map((s) => (
          <div className="ab-stat-card" key={s.label}>
            <div className="ab-stat-icon">
              <Icon name={s.icon} size={22} />
            </div>
            <div className="ab-stat-num">{s.num}</div>
            <div className="ab-stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Our Story & Origin */}
      <section className="ab-story">
        <div className="ab-story-content">
          <span className="ab-story-badge">Our Story & Mission</span>
          <h2>Born in the Heartlands of Indian Dairy Farming</h2>
          <p>
            For decades, smallholder dairy farmers faced the same painful dilemmas: fluctuating milk fat percentages, frequent reproductive delays, and feed adulterated with urea or poor-quality hulls.
          </p>
          <p>
            In 2018, we set out to change the standard. Working side-by-side with leading veterinary nutritionists, dairy cooperatives, and rural livestock keepers, we engineered feeds specifically calibrated for Indian breeds—including Sahiwal, Gir, Kankrej, and high-yielding Murrah buffaloes.
          </p>
          <div className="ab-checklist">
            <div className="ab-check-item">
              <span className="ab-check-icon">
                <Icon name="check" size={14} />
              </span>
              <span><strong>100% Zero-Urea Guarantee:</strong> Natural protein sources that support gentle, natural rumen fermentation without toxic chemical spikes.</span>
            </div>
            <div className="ab-check-item">
              <span className="ab-check-icon">
                <Icon name="check" size={14} />
              </span>
              <span><strong>Chelated Organic Minerals:</strong> Up to 3x higher bio-absorption compared to conventional inorganic mineral salts.</span>
            </div>
            <div className="ab-check-item">
              <span className="ab-check-icon">
                <Icon name="check" size={14} />
              </span>
              <span><strong>Direct Farm Gate Delivery:</strong> Bypassing distributor markups so farmers receive fresher feed at fairer prices.</span>
            </div>
          </div>
        </div>
        <div className="ab-story-visual">
          <img
            src="/assets/images/hero-desktop.jpg"
            alt="Healthy cattle feeding on balanced ration"
            className="ab-story-img"
          />
          <div className="ab-floating-badge">
            <div className="ab-fb-icon">
              <Icon name="shield" size={24} />
            </div>
            <div className="ab-fb-text">
              <b>BIS Standard Compliant</b>
              <small>Formulated strictly according to national dairy nutrition benchmarks.</small>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section style={{ marginBottom: 48 }}>
        <div className="ab-sec-header">
          <span className="ab-story-badge">What Drives Us</span>
          <h2>Our Core Principles</h2>
          <p>Every pellet we manufacture represents a promise of honesty, health, and measurable prosperity for your farm.</p>
        </div>
        <div className="ab-values">
          {values.map((v) => (
            <div className="ab-value-card" key={v.title}>
              <div className="ab-vc-icon">
                <Icon name={v.icon} size={24} />
              </div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quality Process Section */}
      <section className="ab-process">
        <div className="ab-sec-header">
          <span className="ab-story-badge">Science & Standards</span>
          <h2>Our 4-Stage Quality Process</h2>
          <p>From whole grain intake to sealed 50kg sacks, we enforce rigorous laboratory oversight at every phase.</p>
        </div>
        <div className="ab-proc-grid">
          {steps.map((st) => (
            <div className="ab-proc-step" key={st.num}>
              <div className="ab-proc-num">{st.num}</div>
              <h4>{st.title}</h4>
              <p>{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Specialized Feeds by Animal Category */}
      <section style={{ marginBottom: 48 }}>
        <div className="ab-sec-header">
          <span className="ab-story-badge">Tailored Solutions</span>
          <h2>Nutrition Engineered for Every Stage</h2>
          <p>Discover specialized rations crafted to meet the exact energetic demands of your herd.</p>
        </div>
        <div className="ab-feed-types">
          {feedHighlights.map((fh) => (
            <div className="ab-feed-card" key={fh.title}>
              <img src={fh.img} alt={fh.title} loading="lazy" />
              <div className="ab-feed-body">
                <h4>{fh.title}</h4>
                <p>{fh.desc}</p>
                <Link to={fh.link} className="ab-feed-link">
                  View Formulations &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quality Guarantee & Farmer Spotlight */}
      <section className="ab-quality-banner">
        <div className="ab-qb-left">
          <span className="ab-story-badge">Assured Specifications</span>
          <h3>Guaranteed Nutritional Profile</h3>
          <p>
            We state our exact values transparently on every sack. No surprises, no dilution, and total consistency batch after batch.
          </p>
          <div className="ab-spec-chips">
            <span className="ab-spec-chip">
              <Icon name="check" size={14} /> Min. 20-22% Crude Protein
            </span>
            <span className="ab-spec-chip">
              <Icon name="check" size={14} /> Min. 70% TDN (Energy)
            </span>
            <span className="ab-spec-chip">
              <Icon name="check" size={14} /> Enriched with Chelated Minerals
            </span>
            <span className="ab-spec-chip">
              <Icon name="check" size={14} /> Zero Urea &lt; 0.0%
            </span>
            <span className="ab-spec-chip">
              <Icon name="check" size={14} /> Aflatoxins &lt; 20 ppb
            </span>
          </div>
        </div>

        <div className="ab-qb-right">
          <div style={{ color: "var(--orange)", marginBottom: 8 }}>★★★★★</div>
          <p className="ab-qb-quote">
            “Switching to Cattle Feed formulations brought my Murrah buffaloes from 6.2% milk fat to consistently over 7.4% within three weeks. The animals digest it easily, and calf conception has never been smoother.”
          </p>
          <div className="ab-qb-author">
            <div className="ab-qb-avatar">RY</div>
            <div className="ab-qb-meta">
              <b>Ramesh Yadav</b>
              <small>Dairy Farm Owner (34 Cattle) · Karnal, Haryana</small>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="ab-cta-banner">
        <h2>Ready to Elevate Your Herd's Health and Milk Yield?</h2>
        <p>
          Join more than 50,000 progressive dairy farmers across India. Experience the difference of scientifically formulated, lab-tested animal nutrition today.
        </p>
        <div className="ab-cta-row">
          <Link to="/shop" className="btn">
            Browse All Products
          </Link>
          <Link to="/contact" className="btn o">
            Get Custom Farm Feeding Advice
          </Link>
        </div>
      </section>
    </div>
  );
}
