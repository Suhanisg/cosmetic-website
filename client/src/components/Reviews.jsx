import { useEffect, useState } from "react";
import {
  Star,
  BadgeCheck,
  MousePointerClick,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { reviews } from "../data/reviews";
import "./Reviews.css";

const tones = ["white", "sage", "gold", "sand", "rose"];
const MAX_THUMBS = 3;

function Stars({ value, size = 14 }) {
  return (
    <div className="rev-stars" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          fill={n <= Math.round(value) ? "currentColor" : "none"}
          strokeWidth={1.6}
        />
      ))}
    </div>
  );
}

function Reviews({ productName = "Premium Sindoor" }) {
  const items = reviews.items;
  const count = items.length;
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const levels = [5, 4, 3, 2, 1];
  const total = levels.reduce((sum, n) => sum + reviews.counts[n], 0);
  const average =
    levels.reduce((sum, n) => sum + n * reviews.counts[n], 0) / total;

  const next = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => {
      setActive((a) => (a + 1) % count);
      setLeaving(false);
    }, 380);
  };

  const closeBox = () => setLightbox(null);
  const stepBox = (d) =>
    setLightbox((lb) => ({
      ...lb,
      i: (lb.i + d + lb.list.length) % lb.list.length,
    }));

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeBox();
      if (e.key === "ArrowRight") stepBox(1);
      if (e.key === "ArrowLeft") stepBox(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <section id="reviews" className="rev-section">
      <div className="rev-inner">
        <p className="rev-eyebrow">{reviews.eyebrow}</p>
        <h2 className="rev-title">
          {reviews.titleLine1}
          <em>{reviews.titleLine2}</em>
        </h2>

        <div className="rev-layout">
          <aside className="rev-summary">
            <span className="rev-for">
              Reviews for <strong>{productName}</strong>
            </span>

            <div className="rev-score">
              <span className="rev-score-num">{average.toFixed(1)}</span>
              <div className="rev-score-meta">
                <Stars value={average} size={18} />
                <span className="rev-score-count">{total} reviews</span>
              </div>
            </div>

            <ul className="rev-bars">
              {levels.map((n) => {
                const pct = (reviews.counts[n] / total) * 100;
                return (
                  <li key={n} className="rev-bar-row">
                    <span className="rev-bar-label">{n}</span>
                    <span className="rev-bar-track">
                      <span
                        className="rev-bar-fill"
                        style={{ width: `${pct}%` }}
                      />
                    </span>
                    <span className="rev-bar-count">{reviews.counts[n]}</span>
                  </li>
                );
              })}
            </ul>
          </aside>

          <div className="rev-right">
            <div
              className="rev-stack"
              role="button"
              tabIndex={0}
              aria-label="Show next review"
              onClick={next}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  next();
                }
              }}
            >
              {items.map((r, i) => {
                const pos = (i - active + count) % count;
                const eff = leaving && pos > 0 ? pos - 1 : pos;
                const out = leaving && pos === 0;
                const photos = r.photos || [];
                const shown = photos.slice(0, MAX_THUMBS);
                const extra = photos.length - MAX_THUMBS;

                return (
                  <article
                    key={r.id}
                    className={`rev-card rev-card--${tones[i % tones.length]} rev-card--p${Math.min(
                      eff,
                      3
                    )} ${out ? "rev-card--out" : ""}`}
                    aria-hidden={pos === 0 ? undefined : "true"}
                  >
                    <div className="rev-card-top">
                      <span className="rev-avatar">{r.name.charAt(0)}</span>
                      <div className="rev-who">
                        <strong>{r.name}</strong>
                        <span className="rev-verified">
                          <BadgeCheck size={13} />
                          Verified buyer · {r.city}
                        </span>
                      </div>
                      <Stars value={r.stars} size={13} />
                    </div>

                    <p
                      className={`rev-text ${
                        photos.length ? "rev-text--short" : ""
                      }`}
                    >
                      {r.text}
                    </p>

                    {photos.length > 0 && (
                      <div className="rev-photos">
                        {shown.map((src, k) => (
                          <button
                            key={k}
                            className="rev-photo"
                            tabIndex={pos === 0 ? 0 : -1}
                            aria-label={`Open photo ${k + 1}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setLightbox({ list: photos, i: k });
                            }}
                            onKeyDown={(e) => e.stopPropagation()}
                          >
                            <img src={src} alt="" />
                            {k === MAX_THUMBS - 1 && extra > 0 && (
                              <span className="rev-photo-more">+{extra}</span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}

                    <span className="rev-product">{r.product}</span>
                  </article>
                );
              })}
            </div>

            <div className="rev-controls">
              <span className="rev-hint">
                <MousePointerClick size={14} />
                Tap the card for next
              </span>
              <div className="rev-dots" aria-hidden="true">
                {items.map((r, i) => (
                  <span
                    key={r.id}
                    className={`rev-dot ${i === active ? "rev-dot--on" : ""}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {lightbox && (
        <div className="rev-lightbox" onClick={closeBox}>
          <img
            className="rev-lightbox-img"
            src={lightbox.list[lightbox.i]}
            alt=""
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="rev-lb-btn rev-lb-close"
            onClick={closeBox}
            aria-label="Close"
          >
            <X size={22} />
          </button>
          {lightbox.list.length > 1 && (
            <>
              <button
                className="rev-lb-btn rev-lb-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  stepBox(-1);
                }}
                aria-label="Previous photo"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="rev-lb-btn rev-lb-next"
                onClick={(e) => {
                  e.stopPropagation();
                  stepBox(1);
                }}
                aria-label="Next photo"
              >
                <ChevronRight size={24} />
              </button>
              <span className="rev-lb-count">
                {lightbox.i + 1} / {lightbox.list.length}
              </span>
            </>
          )}
        </div>
      )}
    </section>
  );
}
export default Reviews;