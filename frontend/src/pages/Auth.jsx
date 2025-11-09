import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMe, login, register } from "../utils/api";

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function Auth() {
  const nav = useNavigate();
  const q = useQuery();
  const modeFromURL = q.get("mode") || "signup";      // default: signup
  const next = q.get("next") || "/profile";           // go to profile after auth

  const [mode, setMode] = useState(modeFromURL);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [postal, setPostal] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => { (async () => { const me = await getMe(); if (me) nav("/profile", { replace:true }); })(); }, [nav]);
  useEffect(() => setMode(modeFromURL), [modeFromURL]);

  const title = useMemo(() => mode === "signin" ? "Sign in" : "Create your account", [mode]);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      if (mode === "signin") {
        await login({ email, password: pwd });
      } else {
        await register({ name, email, password: pwd, postalCode: postal });
      }
      nav(next, { replace:true });
    } catch (ex) {
      setErr(ex?.message || "Something went wrong.");
    }
  }

  return (
    <div className="container" style={{ display:"grid", placeItems:"center", minHeight:"70vh" }}>
      <div className="auth-card">
        <div className="auth-title">{title}</div>
        {err ? <div className="auth-error">{err}</div> : null}
        <form className="auth-form" onSubmit={onSubmit}>
          {mode === "signup" && (<>
            <label className="label">Full name</label>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} required />
          </>)}

          <label className="label">Email</label>
          <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />

          <label className="label">Password</label>
          <input className="input" type="password" value={pwd} onChange={e=>setPwd(e.target.value)} required />

          {mode === "signup" && (<>
            <label className="label">Postal code (optional)</label>
            <input className="input" value={postal} onChange={e=>setPostal(e.target.value)} />
          </>)}

          <button className="btn" type="submit" style={{ marginTop:10 }}>
            {mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <div className="auth-switch">
          {mode === "signin" ? (
            <>Don’t have an account? <button className="link" onClick={()=>nav("/auth?mode=signup")}>Create one</button></>
          ) : (
            <>Already have an account? <button className="link" onClick={()=>nav("/auth?mode=signin")}>Sign in</button></>
          )}
        </div>
      </div>
    </div>
  );
}
