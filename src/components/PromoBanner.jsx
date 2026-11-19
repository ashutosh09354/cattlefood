import { Link } from "react-router-dom";

export default function PromoBanner() {
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="promo">
        <div><h2>Complete Mineral Nutrition</h2><p>Support your herd every day with our balanced mineral mixtures.</p></div>
        <Link className="btn" to="/shop?cat=Mineral%20Mixture">Shop Minerals</Link>
      </div>
    </section>
  );
}
