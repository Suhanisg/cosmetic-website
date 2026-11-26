import { useNavigate } from "react-router-dom";
import { products, cardImages, cardPrice } from "../data/products";

function SimilarProducts({
  excludeId,
  eyebrow = "SIMILAR PRODUCTS",
  title = "You may also like",
}) {
  const navigate = useNavigate();
  const list = products.filter((p) => p.id !== excludeId);

  return (
    <section id="similar" className="cmb-wrap">
      <div className="cmb-head">
        <p className="cmb-eyebrow">{eyebrow}</p>
        <h2 className="cmb-title">{title}</h2>
      </div>

      <div className="cmb-row">
        {list.map((p) => {
          const imgs = cardImages(p);
          const { price, mrp } = cardPrice(p);
          const off = Math.round(((mrp - price) / mrp) * 100);
          const open = () => navigate(`/product/${p.id}`);

          return (
            <article
              className="cmb-card"
              key={p.id}
              role="link"
              tabIndex={0}
              onClick={open}
              onKeyDown={(e) => e.key === "Enter" && open()}
            >
              <span className="cmb-tag">{p.tag}</span>

              <div className={`cmb-img cmb-img--${imgs.length}`}>
                {imgs.map((im, i) => (
                  <img
                    key={i}
                    src={im.src}
                    alt={p.name}
                    style={{ filter: im.filter }}
                  />
                ))}
              </div>

              <div className="cmb-body">
                <p className="cmb-cat">{p.category}</p>
                <h3 className="cmb-name">{p.name}</h3>
                <div className="cmb-dots">
                  {p.swatches?.map((hex, i) => (
                    <span
                      key={i}
                      className="cmb-dot"
                      style={{ background: hex }}
                    />
                  ))}
                  <span className="cmb-note">{p.cardNote}</span>
                </div>

                <div className="cmb-price-row">
                  <span className="cmb-price">₹{price}</span>
                  <span className="cmb-mrp">₹{mrp}</span>
                  <span className="cmb-off">{off}% off</span>
                </div>

                <button
                  className="cmb-add"
                  onClick={(e) => e.stopPropagation()}
                >
                  Add to cart
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
export default SimilarProducts;