import Icon from "./Icon.jsx";

const items = [
  ["truck", "Fast & Reliable Delivery", "Across India"],
  ["shield", "Quality Assured", "Lab Tested & Safe"],
  ["award", "Scientifically Formulated", "Balanced Nutrition"],
  ["users", "Farmer Support", "Expert Guidance"],
];

export default function BenefitsBar() {
  return (
    <div className="ben" style={{ marginBottom: 0 }}>
      {items.map(([i, t, s]) => (
        <div key={t}><i><Icon name={i} size={44} /></i><span><b>{t}</b>{s}</span></div>
      ))}
    </div>
  );
}
