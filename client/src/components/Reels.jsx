import { useEffect, useRef, useState } from "react";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { reels } from "../data/reels";
import "./Reels.css";

const SPEED = 45;

function Reels() {
  const items = reels.items;
  const rowRef = useRef(null);
  const inView = useRef(false);
  const hovering = useRef(false);
  const modalOpen = useRef(false);
  const pausedUntil = useRef(0);
  const [openIndex, setOpenIndex] = useState(null);
  const current = openIndex === null ? null : items[openIndex];

  const close = () => setOpenIndex(null);
  const step = (d) =>
    setOpenIndex((i) => (i + d + items.length) % items.length);

  const openReel = (i) => {
    const item = items[i];
    if (!item.src && item.link) {
      window.open(item.link, "_blank", "noopener");
      return;
    }
    setOpenIndex(i);
  };

  useEffect(() => {
    modalOpen.current = openIndex !== null;
  }, [openIndex]);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
      },
      { threshold: 0.35 }
    );
    io.observe(row);

    const pause = () => {
      pausedUntil.current = performance.now() + 2500;
    };
    const enter = (e) => {
      if (e.pointerType === "mouse") hovering.current = true;
    };
    const leave = () => {
      hovering.current = false;
    };

    row.addEventListener("wheel", pause, { passive: true });
    row.addEventListener("touchstart", pause, { passive: true });
    row.addEventListener("touchmove", pause, { passive: true });
    row.addEventListener("pointerenter", enter);
    row.addEventListener("pointerleave", leave);

    let pos = row.scrollLeft;
    let last = performance.now();
    let raf;

    const tick = (now) => {
      const dt = Math.min(now - last, 64);
      last = now;
      const cards = row.querySelectorAll(".reel-card");
      const canRun =
        !reduce &&
        inView.current &&
        !hovering.current &&
        !modalOpen.current &&
        now > pausedUntil.current &&
        cards.length > items.length;

      if (canRun) {
        if (Math.abs(row.scrollLeft - pos) > 2) pos = row.scrollLeft;
        const loop = cards[items.length].offsetLeft - cards[0].offsetLeft;
        pos += (SPEED * dt) / 1000;
        if (pos >= loop) pos -= loop;
        row.scrollLeft = pos;
      } else {
        pos = row.scrollLeft;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      row.removeEventListener("wheel", pause);
      row.removeEventListener("touchstart", pause);
      row.removeEventListener("touchmove", pause);
      row.removeEventListener("pointerenter", enter);
      row.removeEventListener("pointerleave", leave);
    };
  }, [items.length]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [openIndex]);

  const loopItems = [...items, ...items];

  return (
    <section id="reels" className="reel-section">
      <div className="reel-head">
        <p className="reel-eyebrow">{reels.eyebrow}</p>
        <h2 className="reel-title">{reels.title}</h2>
      </div>

      <div className="reel-row" ref={rowRef}>
        {loopItems.map((item, n) => {
          const i = n % items.length;
          const copy = n >= items.length;
          return (
            <article
              key={`${item.id}-${copy ? "b" : "a"}`}
              className={`reel-card reel-card--${item.tone}`}
              role="button"
              tabIndex={copy ? -1 : 0}
              aria-hidden={copy ? "true" : undefined}
              onClick={() => openReel(i)}
              onKeyDown={(e) => e.key === "Enter" && openReel(i)}
            >
              {item.poster && (
                <img
                  className="reel-poster"
                  src={item.poster}
                  alt={item.title}
                />
              )}
              <span className="reel-time">{item.duration}</span>
              <span className="reel-play">
                <Play size={22} fill="currentColor" />
              </span>
              <div className="reel-caption">
                {item.by && <span className="reel-by">{item.by}</span>}
                <span className="reel-name">{item.title}</span>
              </div>
            </article>
          );
        })}
      </div>

      <p className="reel-foot">{reels.footnote}</p>

      {current && (
        <div className="reel-modal" onClick={close}>
          <div className="reel-box" onClick={(e) => e.stopPropagation()}>
            {current.src ? (
              <video
                key={current.id}
                className="reel-video"
                src={current.src}
                poster={current.poster || undefined}
                controls
                autoPlay
                playsInline
              />
            ) : (
              <div className="reel-empty">
                <Play size={36} />
                <p>Video coming soon</p>
              </div>
            )}
            <div className="reel-box-title">
              {current.by && <span>{current.by}</span>}
              <strong>{current.title}</strong>
            </div>
          </div>

          <button className="reel-close" onClick={close} aria-label="Close">
            <X size={22} />
          </button>
          {items.length > 1 && (
            <>
              <button
                className="reel-nav reel-nav--prev"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="reel-nav reel-nav--next"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
}
export default Reels;