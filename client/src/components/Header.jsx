import { Heart, ShoppingBag, Search } from "lucide-react";
import { site } from "../data/site";
import { Link } from "react-router-dom";

function Header() {
  const cartCount = 1; // dummy, baad mein cart se aayega

  return (
    <header className="hdr-wrap">
      <div className="hdr-main">
       <Link to="/" className="hdr-logo">YOROMA</Link>

        <div className="hdr-search">
          <Search size={18} />
          <input type="text" placeholder={site.searchPlaceholder} />
        </div>

        <div className="hdr-actions">
          <button className="hdr-icon-btn" aria-label="Wishlist">
            <Heart size={22} />
          </button>
          <button className="hdr-icon-btn hdr-cart" aria-label="Cart">
            <ShoppingBag size={22} />
            {cartCount > 0 && <span className="hdr-badge">{cartCount}</span>}
          </button>
        </div>
      </div>

      <nav className="hdr-nav">
        {site.navLinks.map((l) => (
          <a key={l.label} href={l.href} className="hdr-nav-link">
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
export default Header;