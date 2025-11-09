import { logout, getMe, updateMe } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Profile(){
  const nav = useNavigate();
  const [me, setMe] = useState(null);
  useEffect(() => { (async ()=> setMe(await getMe()))(); }, []);

  const onSignOut = () => {
    logout();
    nav("/profile", { replace:true }); // returns to gate → shows Auth inline
  };

  if (!me) return null;

  return (
    <div className="container">
      {/* ... your profile UI ... */}
      <div style={{marginTop:16, display:"flex", gap:12}}>
        <button className="btn" onClick={()=>{/* save via updateMe(mePatch) */}}>
          save
        </button>
        <button className="btn" style={{ background:"#f46c97" }} onClick={onSignOut}>
          sign out
        </button>
      </div>
    </div>
  );
}
