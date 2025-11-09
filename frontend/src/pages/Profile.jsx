import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe, updateMe, logout } from "../utils/api";

export default function Profile() {
  const nav = useNavigate();
  const [me, setMe] = useState(null);

  useEffect(() => { (async () => setMe(await getMe()))(); }, []);

  const onSave = async () => {
    // Put your real save fields here. Example keeps name only:
    const next = await updateMe({ name: me.name });
    setMe(next);
  };

  const onSignOut = () => {
    logout();
    nav("/auth?mode=signin", { replace: true });
  };

  if (!me) return null;

  return (
    <div className="container">
      {/* your existing profile layout… */}
      <h2 style={{marginTop:0}}>your profile</h2>
      <div style={{display:"grid", gap:12, maxWidth:520}}>
        <label className="label">name</label>
        <input className="input" value={me.name || ""} onChange={e=>setMe({...me, name:e.target.value})}/>
      </div>

      <div style={{marginTop:16, display:"flex", gap:12}}>
        <button className="btn" onClick={onSave}>save</button>
        <button className="btn" style={{background:"#f46c97"}} onClick={onSignOut}>sign out</button>
      </div>
    </div>
  );
}
