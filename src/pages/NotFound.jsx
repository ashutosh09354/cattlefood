import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";

export default function NotFound() {
  return (
    <section style={{ textAlign: "center" }}>
      <SEO title="Page not found" />
      <h2>Page not found</h2><p className="sub">The page you are looking for does not exist.</p>
      <Link className="btn" to="/">Back to Home</Link>
    </section>
  );
}
