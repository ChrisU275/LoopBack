import ImpactHero from "../components/ImpactHero";

export default function Home(){
  return (
    <>
      <ImpactHero/>
      <div className="container" style={{marginTop:24}}>
        {/* teaser widgets you can flesh out later */}
        <div className="grid">
          <div className="card">
            <h3 style={{marginTop:0}}>quick actions</h3>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              <a className="btn" href="/create">Post an item</a>
              <a className="btn" href="/marketplace">Explore listings</a>
              <a className="btn" href="/leaderboard">See leaderboard</a>
            </div>
          </div>
          <div className="card">
            <h3 style={{marginTop:0}}>impact widget</h3>
            <p>track items reused, CO₂ saved (mock now, real calc later).</p>
          </div>
        </div>
      </div>
    </>
  );
}
