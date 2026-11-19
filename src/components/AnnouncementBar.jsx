import Icon from "./Icon.jsx";

const items = [
  ["truck", "Free Delivery on Orders Above ₹5,000"],
  ["shield", "Trusted by 10,000+ Farmers"],
  ["award", "High-Quality Animal Nutrition"],
  ["phone", "+91 00000 00000"],
];

export default function AnnouncementBar() {
  return (
    <div className="ann">
      {items.map(([i, t]) => (<span key={i}><Icon name={i} size={16} />{t}</span>))}
    </div>
  );
}
