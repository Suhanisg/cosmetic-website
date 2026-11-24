import { useState } from "react";
import { Heart, Star, Share2 } from "lucide-react";
import { product } from "../data/product";

function ProductInfo() {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [wished, setWished] = useState(false);

  const size = product.sizes[sizeIndex];
  const off = Math.round(((size.mrp - size.price) / size.mrp) * 100);

  return (
    <section className="pinfo-wrap">
      <div className="pinfo-top">
        <div>
          <p className="pinfo-tag">{product.tag}</p>
          <h1 className="pinfo-name">{product.name}</h1>
        </div>
        <button
          className={`pinfo-wish ${wished ? "pinfo-wish--on" : ""}`}
          onClick={() => setWished(!wished)}
          aria-label="Add to wishlist"
        >
          <Heart size={22} fill={wished ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="pinfo-rating">
        <div className="pinfo-stars">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star key={n} size={15} fill="currentColor" />
          ))}
        </div>
        <span className="pinfo-rating-text">
          {product.rating} · {product.reviews} reviews
        </span>
        <button className="pinfo-share">
          <Share2 size={15} /> Share
        </button>
      </div>

      <div className="pinfo-price-row">
        <span className="pinfo-price">₹{size.price}</span>
        <span className="pinfo-mrp">₹{size.mrp}</span>
        <span className="pinfo-off">{off}% off</span>
      </div>
      <p className="pinfo-tax">Inclusive of all taxes</p>

      <p className="pinfo-size-title">Size</p>
      <div className="pinfo-sizes">
        {product.sizes.map((s, i) => (
          <button
            key={s.label}
            className={`pinfo-size ${
              sizeIndex === i ? "pinfo-size--selected" : ""
            }`}
            onClick={() => setSizeIndex(i)}
          >
            <span className="pinfo-size-label">{s.label}</span>
            <span className="pinfo-size-price">₹{s.price}</span>
          </button>
        ))}
      </div>

      <p className="pinfo-desc">{product.description}</p>

      <div className="pinfo-ctas">
        <button className="yo-btn yo-btn--outline">Add to cart</button>
        <button className="yo-btn yo-btn--primary">Buy now</button>
      </div>
    </section>
  );
}
export default ProductInfo;