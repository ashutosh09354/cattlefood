import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";

export default function Footer() {
  return (
    <footer className="ft-root">
      <div className="ft-inner">
        <div className="ft-cols">

          {/* Col 1 — Brand */}
          <div className="ft-brand">
            <Link to="/" className="ft-brand-logo">
              <span className="ft-brand-name">Cattle <em>Feed</em></span>
            </Link>
            <p className="ft-brand-tag">Premium animal nutrition<br />for Indian farmers.</p>
          </div>

          <div className="ft-divider-col" aria-hidden="true" />

          {/* Col 2 — Quick Links */}
          <div className="ft-nav">
            <h4 className="ft-col-head">Quick Links</h4>
            <ul>
              <li><Link to="/shop"><span>&rsaquo;</span>Shop</Link></li>
              <li><Link to="/about"><span>&rsaquo;</span>About Us</Link></li>
              <li><Link to="/shop"><span>&rsaquo;</span>Products</Link></li>
              <li><Link to="/contact"><span>&rsaquo;</span>Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 3 — Support */}
          <div className="ft-nav">
            <h4 className="ft-col-head">Support</h4>
            <ul>
              <li><a href="#faq"><span>&rsaquo;</span>FAQs</a></li>
              <li><Link to="/contact"><span>&rsaquo;</span>Shipping &amp; Delivery</Link></li>
              <li><Link to="/contact"><span>&rsaquo;</span>Returns &amp; Refunds</Link></li>
              <li><Link to="/about"><span>&rsaquo;</span>Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Col 4 — Get in Touch */}
          <div className="ft-contact">
            <h4 className="ft-col-head">Get in Touch</h4>
            <a href="tel:+910000000000" className="ft-contact-row">
              <Icon name="phone" size={15} />
              <span>+91 00000 00000</span>
            </a>
            <a href="mailto:care@cattlefeed.example" className="ft-contact-row">
              <Icon name="mail" size={15} />
              <span>care@cattlefeed.example</span>
            </a>
            <div className="ft-contact-row">
              <Icon name="mapPin" size={15} />
              <span>India</span>
            </div>
          </div>

          {/* Col 5 — Follow Us */}
          <div className="ft-social">
            <h4 className="ft-col-head">Follow Us</h4>
            <div className="ft-social-row">
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Icon name="youtube" size={17} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Icon name="instagram" size={17} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Icon name="facebook" size={17} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Icon name="linkedin" size={17} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="ft-bottom">
          <p>© 2026 Cattle Feed. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
