import { Heart, ShoppingBag } from "lucide-react";

function Header() {
  return (
    <header className="hdr-bar">
      <div className="hdr-logo">YOROMA</div>
      <div className="hdr-actions">
        <button className="hdr-icon-btn" aria-label="Wishlist">
          <Heart size={22} />
        </button>
        <button className="hdr-icon-btn" aria-label="Cart">
          <ShoppingBag size={22} />
        </button>
      </div>
    </header>
  );
}
export default Header;