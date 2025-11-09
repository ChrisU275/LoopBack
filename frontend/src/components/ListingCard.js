export default function ListingCard({item}){
  return (
    <div className="card">
      <img src={item.image || 'https://picsum.photos/400/240'} alt="" style={{width:'100%',height:160,objectFit:'cover',borderRadius:12}}/>
      <h3 style={{margin:'10px 0 4px'}}>{item.title}</h3>
      <div style={{opacity:.7,fontSize:14}}>{item.category} • {item.community}</div>
      <div style={{marginTop:8,display:'flex',gap:8,flexWrap:'wrap'}}>
        {item.type==='donate' && <button className="btn">Request Item</button>}
        {item.type==='trade'  && <button className="btn">Offer Item</button>}
        {item.type==='repair' && <button className="btn">Offer Help</button>}
      </div>
    </div>
  );
}
