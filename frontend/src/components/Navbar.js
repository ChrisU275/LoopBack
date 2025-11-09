import { NavLink } from "react-router-dom";

export default function Navbar(){
  return (
    <div className="nav" style={{ padding: '12px 0', height: '70px' }}>
  <div className="container" style={{display:'flex',gap:50,alignItems:'center',justifyContent:'left', height: '100%'}}>
    <nav style={{ fontSize: '30px', fontFamily: 'Coolvetica, sans-serif' }}>
      <NavLink to="/marketplace" className={({isActive})=>isActive?'active':''}>marketplace</NavLink>
      <NavLink to="/profile" className={({isActive})=>isActive?'active':''}>profile</NavLink>
      <NavLink to="/about" className={({isActive})=>isActive?'active':''}>about</NavLink>
    </nav>
  </div>
</div>
  );
}