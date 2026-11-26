import { ShieldCheck, Droplet, Sparkle, Heart, Leaf } from "lucide-react";
import { why } from "../data/why";
import "./WhyYoroma.css";

const icons = {
  shield: ShieldCheck,
  drop: Droplet,
  sparkle: Sparkle,
  heart: Heart,
};

function WhyYoroma() {
  return (
    <section id="promise" className="why-section">
      <p className="why-eyebrow">{why.eyebrow}</p>
      <h2 className="why-title">
        {why.titleLine1}
        <em>{why.titleLine2}</em>
      </h2>

      <div className="why-grid">
        {why.items.map((item) => {
          const Icon = icons[item.icon];
          return (
            <article
              key={item.id}
              className={`why-card why-card--${item.tone}`}
            >
              <span className="why-icon">
                <Icon size={22} strokeWidth={1.6} />
              </span>
              <h3 className="why-card-title">{item.title}</h3>
              <p className="why-card-text">{item.text}</p>
            </article>
          );
        })}
      </div>

      <div className="why-pill">
        <Leaf size={14} strokeWidth={1.6} />
        <span>{why.footnote}</span>
      </div>
    </section>
  );
}
export default WhyYoroma;