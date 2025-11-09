const CATS = ['All','Electronics','Furniture','Clothing','Books','Other'];

export default function SearchFilterBar({query,setQuery,radiusKm,setRadiusKm,category,setCategory}){
  return (
    <div className="card" style={{display:'flex',gap:12,alignItems:'center',flexWrap:'wrap'}}>
      <input
        value={query}
        onChange={e=>setQuery(e.target.value)}
        placeholder="Search titles…"
        style={{flex:'1 1 240px',padding:'10px 12px',borderRadius:12,border:'1px solid #ccc'}}
      />
      <select value={category} onChange={e=>setCategory(e.target.value)} style={{padding:'10px 12px',borderRadius:12}}>
        {CATS.map(c=><option key={c} value={c}>{c}</option>)}
      </select>
      <label>
        radius&nbsp;
        <input type="number" min="1" value={radiusKm} onChange={e=>setRadiusKm(+e.target.value)} style={{width:80,padding:'8px 10px',borderRadius:12,border:'1px solid #ccc'}}/>
        &nbsp;km
      </label>
      <a href="/create" className="btn">Create post</a>
    </div>
  );
}
