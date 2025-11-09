// Tile that matches the mock: big rounded color block + white footer
const TYPE_COLOR = {
  donate:   "#f0b74f", // will be overridden by swatchColor if provided
  trade:    "#f27a94",
  repair:   "#8fa6d8",
};
const TYPE_LABEL = {
  donate: "donation",
  trade: "exchange",
  repair: "repair",
};

export default function ListingCard({ item }){
  const type = (item.type || "donate").toLowerCase();
  const typeLabel = TYPE_LABEL[type] || type;
  const swatch = item.swatchColor || TYPE_COLOR[type];

  return (
    <div className="tile">
      {/* top color block (use image later) */}
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
        <div className="tile-sub">
          {item.community || "penbrooke meadows"}
        </div>
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
    </div>
  );
}
