export default function ImpactHero({ impact = 1087236918 }) {
  const num = new Intl.NumberFormat().format(impact);

  return (
    <div className="hero hero-center">
      <div className="round-banner">thanks for saving the environment!</div>

      {/* Sticker-style LOOPBACK – per-letter colors + tiny rotations */}
      <div className="logo-word" aria-label="LoopBack">
        <span className="sticker s1" style={{color:'#2c0f2a'}}>L</span>
        <span className="sticker s2" style={{color:'#9a86df'}}>o</span>
        <span className="sticker s3" style={{color:'#7b6cc6'}}>o</span>
        <span className="sticker s4" style={{color:'#2b2232'}}>p</span>
        <span className="sticker s5" style={{color:'#f1b247'}}>B</span>
        <span className="sticker s6" style={{color:'#8bd77d'}}>a</span>
        <span className="sticker s7" style={{color:'#7ae083'}}>c</span>
        <span className="sticker s8" style={{color:'#2b2232'}}>k</span>
      </div>

      <div className="impact-wrap">
        <div className="impact-label">our impact:</div>
        <h2 className="impact-number">{num}</h2>
        <div className="impact-sub">items given new life</div>
      </div>
    </div>
  );
}
