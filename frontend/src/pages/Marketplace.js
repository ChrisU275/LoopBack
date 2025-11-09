import { useMemo, useState, useEffect } from "react";
import ListingCard from "../components/ListingCard";
import SearchFilterBar from "../components/SearchFilterBar";
import { useListings } from "../utils/api";

const TABS = ['All','Donate','Trade','Repair'];

export default function Marketplace(){
  const { listings } = useListings(); // loads from CSV/local
  const [tab,setTab] = useState('All');
  const [query,setQuery] = useState('');
  const [radiusKm,setRadiusKm] = useState(25);
  const [category,setCategory] = useState('All');

  const filtered = useMemo(()=>{
    let arr = listings;
    if(tab!=='All') arr = arr.filter(x => x.type===tab.toLowerCase());
    if(category!=='All') arr = arr.filter(x => x.category===category);
    if(query) {
      const q = query.toLowerCase();
      arr = arr.filter(x => x.title.toLowerCase().includes(q));
    }
    return arr;
  },[listings,tab,query,category]);

  return (
    <div className="container">
      <h1 style={{margin:'8px 0'}}>Marketplace</h1>

      <div className="tabbar">
        {TABS.map(t=>(
          <button key={t} className={`tab ${tab===t?'active':''}`} onClick={()=>setTab(t)}>{t}</button>
        ))}
      </div>

      <SearchFilterBar
        query={query}
        setQuery={setQuery}
        radiusKm={radiusKm}
        setRadiusKm={setRadiusKm}
        category={category}
        setCategory={setCategory}
      />

      <div className="grid" style={{marginTop:12}}>
        {filtered.map(item => <ListingCard key={item.id} item={item}/>)}
        {filtered.length===0 && <p>No results.</p>}
      </div>
    </div>
  );
}
