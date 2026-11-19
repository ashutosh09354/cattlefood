import { Link } from "react-router-dom";

export default function PromoBanner() {
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="promo">
        <div><h2>Premium Quality Feeds</h2><p>Support your herd and poultry every day with our scientifically formulated feeds.</p></div>
        <Link className="btn" to="/shop">Explore All Feeds</Link>
      </div>
    </section>
  );
}
