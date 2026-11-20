import Icon from "./Icon.jsx";
import Reveal from "./Reveal.jsx";

const items = [
  {
    icon: "shieldCheck",
    title: "Quality Ingredients",
    desc: "Carefully sourced, tested raw materials for safe and nutritious feed.",
  },
  {
    icon: "shieldCheck",
    title: "Balanced Nutrition",
    desc: "Scientifically formulated to support better growth, health and milk yield.",
  },
  {
    icon: "truckSpeed",
    title: "Reliable Supply",
    desc: "Consistent stock availability with timely and safe delivery to your farm.",
  },
  {
    icon: "farmerHat",
    title: "Farmer-First Support",
    desc: "Expert guidance and ongoing support for the right feed and better results.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="trust-section" aria-labelledby="why-farmers-trust-us">
      <Reveal variant="fade-up">
        <div className="trust-eyebrow">
          <span>Why Farmers Trust Us</span>
        </div>
        <h2 id="why-farmers-trust-us" className="trust-heading">
          Nutrition you can trust.{" "}
          <span className="trust-underline-wrap">
            Results you can see.
            <svg className="trust-curved-line" viewBox="0 0 240 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M3 13C65 2 175 2 237 13" stroke="#FF6500" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>
        </h2>
      </Reveal>

      <div className="trust-cards">
        {items.map((item, i) => (
          <Reveal key={item.title} variant="fade-up" delay={`${i * 100}ms`}>
            <div className="trust-card">
              <div className="trust-icon-box">
                <Icon name={item.icon} size={22} />
              </div>
              <h3 className="trust-card-title">{item.title}</h3>
              <p className="trust-card-desc">{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
