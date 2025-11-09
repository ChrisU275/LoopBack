import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useListings, getListing } from "../utils/api";

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { listings } = useListings(); // to enable prev/next
  const [item, setItem] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => setItem(await getListing(id)))();
  }, [id]);

  const idx = useMemo(
    () => listings.findIndex((x) => String(x.id) === String(id)),
    [listings, id]
  );
  const prevId = idx > 0 ? listings[idx - 1]?.id : null;
  const nextId = idx >= 0 && idx < listings.length - 1 ? listings[idx + 1]?.id : null;

  if (!item) return <div style={{maxWidth:900, margin:"40px auto", padding:"0 20px"}}>Loading…</div>;

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 20px" }}>
      <h1 style={{ fontSize: 32, marginBottom: 12 }}>loopback</h1>

      {/* big image/swatch with rounded top corners */}
      <div style={{ position: "relative" }}>
        {/* arrows */}
        {prevId && (
          <button
            onClick={() => navigate(`/listing/${prevId}`)}
            aria-label="Previous"
            style={arrowBtn("left")}
          >
            ‹
          </button>
        )}
        {nextId && (
          <button
            onClick={() => navigate(`/listing/${nextId}`)}
            aria-label="Next"
            style={arrowBtn("right")}
          >
            ›
          </button>
        )}

        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            style={{
              width: "100%",
              height: 280,
              objectFit: "cover",
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: 280,
              background: item.swatchColor || "#F590A6",
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
            }}
          />
        )}

        {/* info strip (white rounded bottom card) */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #eee",
            borderTop: "none",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            padding: "16px 18px",
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: 16,
            marginTop: -4,
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{item.title}</div>
            <div style={{ color: "#7a6ea8", fontSize: 14 }}>{item.community}</div>
            <div style={{ color: "#f08aa6", fontSize: 13, marginTop: 6, textTransform: "lowercase" }}>
              ———— {item.type || "exchange"}
            </div>
          </div>
          <div style={{ color: "#444", fontSize: 14, lineHeight: 1.5 }}>
            {item.description || "hey! i'm looking to exchange this picture of gerard way for some cds. message me and let me know what you have! im not picky :)"}
          </div>

          {/* message bar */}
          <div style={{ gridColumn: "1 / span 2", display: "flex", gap: 12 }}>
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="hey! is this still available?"
              style={{
                flex: 1,
                height: 40,
                borderRadius: 20,
                border: "1px solid #ddd",
                padding: "0 14px",
                background: "#f2f2f2",
                outline: "none",
              }}
            />
            <button
              onClick={() => alert(msg || "Message sent!")}
              style={{
                height: 40,
                padding: "0 18px",
                borderRadius: 20,
                background: "#8d6ccf",
                color: "#fff",
                border: "none",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              message user
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function arrowBtn(side) {
  return {
    position: "absolute",
    top: "50%",
    [side]: 8,
    transform: "translateY(-50%)",
    width: 36,
    height: 36,
    borderRadius: "999px",
    border: "none",
    background: "rgba(255,255,255,0.85)",
    boxShadow: "0 1px 6px rgba(0,0,0,0.15)",
    fontSize: 24,
    lineHeight: "36px",
    cursor: "pointer",
  };
}
