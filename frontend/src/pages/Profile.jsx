// at top
import { logout, getMe, updateMe } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Profile(){
  const nav = useNavigate();
  const [me, setMe] = useState(null);

  useEffect(() => { (async ()=> setMe(await getMe()))(); }, []);

  const onSignOut = () => {
    logout();                // clears token + me
    nav("/auth?mode=signin", { replace:true });
  };

  if (!me) return null;

  return (
    <div className="container">
      {/* ...your existing profile UI... */}
      <div style={{marginTop:16, display:"flex", gap:12}}>
        <button className="btn" onClick={()=>{/* save logic here via updateMe */}}>
          save
        </button>
        <button
          className="btn"
          style={{ background:"#f46c97" }}
          onClick={onSignOut}
        >
          sign out
        </button>
      </div>
    </div>
  );
}
