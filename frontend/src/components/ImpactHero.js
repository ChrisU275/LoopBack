export default function ImpactHero({ impact = 1087236918 }) {
  const num = new Intl.NumberFormat().format(impact);

  return (
    <div className="hero hero-center" style={{ 
      padding: '60px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '40px',
      maxWidth: '900px',
      margin: '0 auto'
    }}>

      {/* LoopBack Logo Image */}
      <div className="logo-word" aria-label="LoopBack" style={{
        width: '110%',
        maxWidth: '1000px',
        margin: '40px 0'
      }}>
        <img 
          src="/images/loopbackheader.png" 
          alt="LoopBack" 
          style={{ 
            width: '100%', 
            height: 'auto',
            display: 'block'
          }}
        />
      </div>

      {/* Impact Section */}
      <div className="impact-wrap" style={{
        marginTop: '20px',
        textAlign: 'center'
      }}>
        <div className="impact-label" style={{
          fontSize: '48px',
          marginBottom: '10px'
        }}>
        </div>
        <h2 className="impact-number" style={{
          fontSize: '96px',
          color: '#8093CA',
          margin: '-110px 0',
          lineHeight: '1',
          fontFamily: 'Real Brush, cursive'
        }}>
          {num}
        </h2>
        <div className="impact-sub" style={{
          fontSize: '36px',
          color: '#4C223E',
          marginTop: '110px',
          WebkitTextStroke: '1px #4C223E',
          stroke: '10px #4C223E'
        }}>
          items given new life
        </div>
      </div>
    </div>
  );
}