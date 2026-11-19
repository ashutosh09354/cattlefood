import Icon from "./Icon.jsx";
import Reveal from "./Reveal.jsx";

const steps = [
  { num: 1, icon: "laptopCow", title: "Explore Products" },
  { num: 2, icon: "feedBag", title: "Choose Your Feed" },
  { num: 3, icon: "cartPlus", title: "Add to Cart" },
  { num: 4, icon: "orderClipboard", title: "Place Your Order" },
  { num: 5, icon: "truckCow", title: "Delivered to Farm" },
];

export default function HowItWorks() {
  return (
    <section id="how" className="how-section" aria-labelledby="how-it-works-title">
      <Reveal variant="fade-up">
        <h2 id="how-it-works-title" className="how-eyebrow">
          <span>How It Works</span>
        </h2>
      </Reveal>

      <div className="how-timeline-container">
        <div className="how-connecting-line" aria-hidden="true" />
        <div className="how-steps-grid">
          {steps.map((s, i) => (
            <Reveal key={s.title} variant="fade-up" delay={`${i * 90}ms`}>
              <div className="how-step-item">
                <div className="how-step-badge">{s.num}</div>
                <div className="how-step-icon">
                  <Icon name={s.icon} size={44} />
                </div>
                <h3 className="how-step-title">{s.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
