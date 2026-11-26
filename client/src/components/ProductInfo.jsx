import { useState } from "react";
import {
  Heart,
  Star,
  Share2,
  Check,
  Minus,
  Plus,
  Tag,
  Truck,
} from "lucide-react";

function ProductInfo({ product, shade, onShadeChange }) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [wished, setWished] = useState(false);
  const [qty, setQty] = useState(1);
  const [pin, setPin] = useState("");
  const [pinMsg, setPinMsg] = useState("");

  const sel = product.sizes
    ? product.sizes[sizeIndex]
    : { price: product.price, mrp: product.mrp };
  const off = Math.round(((sel.mrp - sel.price) / sel.mrp) * 100);
  const save = sel.mrp - sel.price;

  const checkPin = () => {
    setPinMsg(
      /^\d{6}$/.test(pin)
        ? "✓ Delivery available at this pincode"
        : "Please enter a valid 6-digit pincode"
    );
  };

  return (
    <section className="pinfo-wrap">
      <div className="pinfo-rating">
        <div className="pinfo-stars">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star key={n} size={15} fill="currentColor" />
          ))}
        </div>
        <span className="pinfo-rating-text">
          {product.rating} ({product.reviews} reviews)
        </span>
        <span className="pinfo-badge">{product.badge}</span>
      </div>

      <div className="pinfo-top">
        <h1 className="pinfo-name">{product.name}</h1>
        <div className="pinfo-top-actions">
          <button
            className={`pinfo-round ${wished ? "pinfo-round--on" : ""}`}
            onClick={() => setWished(!wished)}
            aria-label="Add to wishlist"
          >
            <Heart size={20} fill={wished ? "currentColor" : "none"} />
          </button>
          <button className="pinfo-round" aria-label="Share">
            <Share2 size={18} />
          </button>
        </div>
      </div>
      <p className="pinfo-subtitle">{shade?.subtitle ?? product.subtitle}</p>

      <div className="pinfo-price-row">
        <span className="pinfo-price">₹{sel.price}</span>
        <span className="pinfo-mrp">MRP ₹{sel.mrp}</span>
        <span className="pinfo-off">
          ({off}% OFF) Save ₹{save}
        </span>
      </div>
      <p className="pinfo-tax">Inclusive of all taxes</p>

      {product.offer && (
        <div className="pinfo-offer">
          <Tag size={16} />
          <p>
            <strong>Special offer:</strong> {product.offer.text}. Use code{" "}
            <strong className="pinfo-code">{product.offer.code}</strong>
          </p>
        </div>
      )}

      <ul className="pinfo-list">
        {product.highlights.map((h) => (
          <li key={h}>
            <Check size={16} />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {/* Pack ke andar kya hai (sirf combos mein) */}
      {product.includes && (
        <>
          <p className="pinfo-label">What's in this pack</p>
          <ul className="pinfo-inbox">
            {product.includes.map((it, i) => (
              <li key={i}>
                <span
                  className="pinfo-inbox-dot"
                  style={{ background: it.hex }}
                />
                <span>
                  <strong>{it.name}</strong> · {it.note}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Shades (sirf jahan shades hain) */}
      {product.shades && (
        <>
          <p className="pinfo-label">
            Available shades:{" "}
            <span className="pinfo-shade-name">{shade.note}</span>
          </p>
          <div className="pinfo-shades" role="radiogroup" aria-label="Shade">
            {product.shades.map((s) => (
              <button
                key={s.id}
                role="radio"
                aria-checked={shade.id === s.id}
                className={`pinfo-shade ${
                  shade.id === s.id ? "pinfo-shade--selected" : ""
                }`}
                style={{ "--swatch": s.hex }}
                onClick={() => onShadeChange(s.id)}
              >
                <span className="pinfo-shade-ring">
                  <span className="pinfo-shade-dot" />
                </span>
                <span className="pinfo-shade-text">{s.name}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Sizes (sirf jahan sizes hain) */}
      {product.sizes && (
        <>
          <p className="pinfo-label">Size</p>
          <div className="pinfo-sizes" role="radiogroup" aria-label="Size">
            {product.sizes.map((s, i) => (
              <button
                key={s.label}
                role="radio"
                aria-checked={sizeIndex === i}
                className={`pinfo-size ${
                  sizeIndex === i ? "pinfo-size--selected" : ""
                }`}
                onClick={() => setSizeIndex(i)}
              >
                <span className="pinfo-size-dot" />
                <span className="pinfo-size-label">{s.label}</span>
                <span className="pinfo-size-price">₹{s.price}</span>
              </button>
            ))}
          </div>
        </>
      )}

      <div className="pinfo-qty-row">
        <span className="pinfo-label pinfo-label--inline">Quantity:</span>
        <div className="pinfo-qty">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            aria-label="Decrease"
          >
            <Minus size={16} />
          </button>
          <span>{qty}</span>
          <button onClick={() => setQty(qty + 1)} aria-label="Increase">
            <Plus size={16} />
          </button>
        </div>
        <span className="pinfo-stock">
          <span className="pinfo-stock-dot" /> {product.stock}
        </span>
      </div>

      <div className="pinfo-ctas">
        <button className="yo-btn yo-btn--primary">Buy now</button>
        <button className="yo-btn yo-btn--gold">Add to cart</button>
      </div>

      <div className="pinfo-delivery">
        <Truck size={18} />
        <span className="pinfo-delivery-title">Delivery</span>
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="Enter Pincode"
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
        />
        <button className="pinfo-check" onClick={checkPin}>
          Check
        </button>
        <p className="pinfo-delivery-note">{pinMsg || product.deliveryNote}</p>
      </div>
    </section>
  );
}
export default ProductInfo;