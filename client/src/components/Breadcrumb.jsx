import { Link } from "react-router-dom";

function Breadcrumb({ items }) {
  const last = items.length - 1;
  return (
    <div className="bc-wrap">
      {items.map((it, i) => (
        <span key={it.label} className={i === last ? "bc-current" : ""}>
          {it.to && i !== last ? (
            <Link to={it.to} className="bc-link">
              {it.label}
            </Link>
          ) : (
            it.label
          )}
          {i !== last && <span className="bc-sep"> › </span>}
        </span>
      ))}
    </div>
  );
}
export default Breadcrumb;