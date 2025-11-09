import { useMemo, useState } from "react";
import { useListings } from "../utils/api";
import ListingCard from "../components/ListingCard";
import { useNavigate } from "react-router-dom";

export default function Marketplace(){
  const nav = useNavigate();
  const { listings } = useListings();
  const [q, setQ] = useState("");

  const filtered = useMemo(()=>{
    if(!q) return listings;
    const s = q.toLowerCase();
    return listings.filter(x => x.title?.toLowerCase().includes(s));
  }, [q, listings]);

  return (
    <div className="market">
      <div className="market-title">loopback</div>

      <div className="search-row">
        <div className="search-pill">
          <input
            placeholder="what are you shopping for today?"
            value={q}
            onChange={(e)=>setQ(e.target.value)}
          />
          <button className="search-btn" onClick={()=>{ /* no-op for now */ }}>
            search
          </button>
        </div>
      </div>

      <div className="market-grid">
        {filtered.map(item => <ListingCard key={item.id} item={item} />)}
      </div>

      <button className="fab" onClick={()=>nav("/create")} aria-label="Create a post">+</button>
    </div>
  );
}
