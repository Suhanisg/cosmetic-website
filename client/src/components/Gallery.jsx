import { useState } from "react";

function Gallery() {
  const [active, setActive] = useState(0);

  return (
    <section className="gal-wrap">
      <div className="gal-hero">
        <p>
          Product photo
          <br />
          (the one from the Instagram ad)
        </p>
        <div className="gal-sticker">SMALL BATCH</div>
      </div>

      <div className="gal-thumbs">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            className={`gal-thumb ${active === i ? "gal-thumb--active" : ""}`}
            onClick={() => setActive(i)}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
export default Gallery;