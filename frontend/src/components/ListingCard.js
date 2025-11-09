// src/components/ListingCard.js
import { useNavigate } from "react-router-dom";

/** palette + label helpers (internal canonical keys) */
const TYPE_COLOR = {
  donate: "#f0b74f",  // yellow
  trade:  "#f27a94",  // pink
  repair: "#8fa6d8",  // blue
};
const TYPE_LABEL = {
  donate: "donation",
  trade:  "exchange",
  repair: "repair",
};

// map external values to our canonical keys
function normalizeType(t = "") {
  const v = String(t).toLowerCase().trim();
  if (v === "donation" || v === "donate") return "donate";
  if (v === "exchange" || v === "trade")  return "trade";
  if (v === "repair")                      return "repair";
  return "donate";
}

export default function ListingCard({ item = {} }) {
  const nav = useNavigate();

  const typeKey   = normalizeType(item.type);
  const typeLabel = TYPE_LABEL[typeKey];
  const swatch    = item.swatchColor || TYPE_COLOR[typeKey];
  const title     = item.title || "picture of gerard way";
  const community = item.community || "penbrooke meadows";

  const go = () => {
    if (item.id != null) nav(`/listing/${item.id}`);
  };

  return (
    <button
      className="tile"
      onClick={go}
      aria-label={`Open ${title}`}
      style={{
        // reset default button styles so it looks like a card
        border: "none",
        padding: 0,
        background: "transparent",
        textAlign: "left",
        cursor: item.id ? "pointer" : "default",
      }}
    >
      {/* top color block (or image background) */}
      <div
        className="tile-top"
        style={{
          background: swatch,
          backgroundImage: item.image ? `url(${item.image})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 150,
          borderRadius: 22,
        }}
        role={item.image ? "img" : undefined}
        aria-label={item.image ? title : undefined}
      />

      {/* white footer strip */}
      <div className="tile-footer">
        <div className="tile-title">{title}</div>
        <div className="tile-sub">{community}</div>
        <div
          className={
            "tile-type " +
            (typeKey === "trade"
              ? "type-exchange"
              : typeKey === "donate"
              ? "type-donation"
              : "type-repair")
          }
        >
          ─── {typeLabel}
        </div>
      </div>
    </button>
  );
}
