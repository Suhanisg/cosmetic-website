import { useState } from "react";

// slide = [{ src, filter }]  (1 item = ek box, 2 items = do box)
function Pic({ slide, alt }) {
  if (slide.length === 1) {
    return (
      <img
        className="gal-img"
        src={slide[0].src}
        alt={alt}
        style={{ filter: slide[0].filter }}
      />
    );
  }
  return (
    <div className="gal-pair">
      {slide.map((im, i) => (
        <img key={i} src={im.src} alt={alt} style={{ filter: im.filter }} />
      ))}
    </div>
  );
}

function Gallery({ slides, alt }) {
  const [active, setActive] = useState(0);

  return (
    <section className="gal-wrap">
      <div className="gal-hero">
        <Pic slide={slides[active]} alt={alt} />
        <div className="gal-sticker">
          100%
          <br />
          NATURAL
        </div>
      </div>

      <div className="gal-thumbs">
        {slides.map((slide, i) => (
          <button
            key={i}
            className={`gal-thumb ${active === i ? "gal-thumb--active" : ""}`}
            onClick={() => setActive(i)}
            aria-label={`Photo ${i + 1}`}
          >
            <Pic slide={slide} alt="" />
          </button>
        ))}
      </div>
    </section>
  );
}
export default Gallery;