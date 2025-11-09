import { NavLink } from "react-router-dom";

export default function Navbar(){
  return (
    <div className="nav">
      <div className="container" style={{display:'flex',gap:16,alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <img src="/src/assets/logo.png" alt="LoopBack" style={{height:28}}/>
        </div>
        <nav>
          <NavLink to="/marketplace" className={({isActive})=>isActive?'active':''}>marketplace</NavLink>
          <NavLink to="/profile" className={({isActive})=>isActive?'active':''}>profile</NavLink>
          <NavLink to="/about" className={({isActive})=>isActive?'active':''}>about</NavLink>
        </nav>
      </div>
    </div>
  );
}
