import { Link } from "react-router-dom";

const TYPE_COLOR = { donate:"#f0b74f", trade:"#f27a94", repair:"#8fa6d8" };
const TYPE_LABEL = { donate:"donation", trade:"exchange", repair:"repair" };

export default function ListingCard({ item }) {
  const type = (item.type || "donate").toLowerCase();
  const typeLabel = TYPE_LABEL[type] || type;
  const swatch = item.swatchColor || TYPE_COLOR[type];

  return (
    <Link to={`/listing/${item.id}`} className="tile" style={{display:"block"}}>
      <div
        className="tile-top"
        style={{
          background: swatch,
          backgroundImage: item.image ? `url(${item.image})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <div className="tile-footer">
        <div className="tile-title">{item.title || "picture of gerard way"}</div>
        <div className="tile-sub">{item.community || "penbrooke meadows"}</div>
        <div
          className={
            "tile-type " +
            (type === "trade" ? "type-exchange"
              : type === "donate" ? "type-donation"
              : "type-repair")
          }
        >
          ─── {typeLabel}
        </div>
      </div>
    </Link>
  );
}
