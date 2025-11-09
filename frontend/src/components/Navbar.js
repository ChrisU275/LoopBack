import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMe, logout } from "../utils/api";

export default function Navbar(){
  const nav = useNavigate();
  const [me, setMe] = useState(null);

  useEffect(() => { (async () => setMe(await getMe()))(); }, []);

  function onSignOut() {
    logout();
    setMe(null);
    nav("/auth?mode=signin", { replace:true });
  }

  return (
    <div className="nav" style={{ padding: '12px 0', height: '70px' }}>
      <div className="container" style={{display:'flex',gap:50,alignItems:'center',justifyContent:'left', height: '100%'}}>
        <nav style={{ fontSize: '30px', fontFamily: 'Coolvetica, sans-serif', display:"flex", gap:24, alignItems:"center" }}>
          <NavLink to="/marketplace" className={({isActive})=>isActive?'active':''}
            style={({isActive}) => ({ color: isActive ? '#F8BF65' : 'inherit' })}>
            marketplace
          </NavLink>

          <NavLink to="/profile" className={({isActive})=>isActive?'active':''}
            style={({isActive}) => ({ color: isActive ? '#E9708F' : 'inherit' })}>
            profile
          </NavLink>

          <NavLink to="/about" className={({isActive})=>isActive?'active':''}
            style={({isActive}) => ({ color: isActive ? '#8093CA' : 'inherit' })}>
            about
          </NavLink>

          {/* right side actions */}
          <div style={{marginLeft:"auto", display:"flex", alignItems:"center", gap:12}}>
            {!me ? (
              <button className="btn" onClick={() => nav("/auth?mode=signin")}>sign in</button>
            ) : (
              <button className="btn" style={{background:"#f46c97"}} onClick={onSignOut}>sign out</button>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
