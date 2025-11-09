import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getListing } from "../utils/api";

export default function ListingDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [item, setItem] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getListing(id);
        if (!data) setErr("Listing not found");
        setItem(data);
      } catch (e) {
        setErr(e.message || "Failed to load listing");
      }
    })();
  }, [id]);

  if (err) {
    return (
      <div className="container">
        <button className="btn" onClick={() => nav(-1)}>&larr; back</button>
        <p style={{marginTop:12}}>{err}</p>
      </div>
    );
  }
  if (!item) return null;

  const badge =
    item.type?.toLowerCase() === "exchange" ? "exchange" :
    item.type?.toLowerCase() === "trade"    ? "exchange" :
    item.type?.toLowerCase() === "donation" ? "donation" : item.type;

  return (
    <div className="container">
      <button className="btn" onClick={() => nav(-1)}>&larr; back</button>

      <div className="detail-card">
        <div
          className="detail-hero"
          style={{
            background: item.swatchColor || "#f590a6",
            backgroundImage: item.image ? `url(${item.image})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />

        <div className="detail-meta">
          <div>
            <h2 className="detail-title">{item.title}</h2>
            <div className="detail-sub">{item.community}</div>
            <div className="detail-type">──── {badge}</div>
          </div>
          <div className="detail-desc">
            {item.description || "no description provided."}
          </div>
        </div>

        <div className="detail-actions">
          <input
            className="detail-input"
            placeholder="hey! is this still available?"
          />
          <button className="detail-msg">message user</button>
        </div>
      </div>
    </div>
  );
}
