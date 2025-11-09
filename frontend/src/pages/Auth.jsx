// src/pages/Auth.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getMe, login, register } from "../utils/api";

export default function Auth(){
  const nav = useNavigate();
  const [sp, setSp] = useSearchParams();
  const mode = useMemo(() => (sp.get("mode")==="signup" ? "signup" : "signin"), [sp]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");

  // if already signed in, go to profile
  useEffect(() => {
    (async () => {
      const me = await getMe();
      if (me) nav("/profile", { replace:true });
    })();
  }, [nav]);

  const switchMode = () => setSp({ mode: mode === "signin" ? "signup" : "signin" });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      if (mode === "signin") {
        await login({ email, password: pwd });
      } else {
        await register({ name, email, password: pwd });
      }
      nav("/profile", { replace:true });
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Auth failed");
    }
  };

  return (
    <div className="container" style={{display:"grid", placeItems:"center"}}>
      <div className="auth-card">
        <div className="tabbar">
          <button
            className={"tab " + (mode==="signin"?"active":"")}
            onClick={() => setSp({ mode:"signin" })}
          >
            sign in
          </button>
          <button
            className={"tab " + (mode==="signup"?"active":"")}
            onClick={() => setSp({ mode:"signup" })}
          >
            create account
          </button>
        </div>

        <h2 className="auth-title">
          {mode === "signin" ? "Welcome back" : "Create your account"}
        </h2>

        {err && <div className="auth-error">{err}</div>}

        <form className="auth-form" onSubmit={onSubmit}>
          {mode === "signup" && (
            <>
              <div className="label">name</div>
              <input className="input" value={name} onChange={e=>setName(e.target.value)} required />
            </>
          )}

          <div className="label">email</div>
          <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />

          <div className="label">password</div>
          <input className="input" type="password" value={pwd} onChange={e=>setPwd(e.target.value)} required />

          <button className="btn" type="submit" style={{marginTop:10}}>
            {mode === "signin" ? "sign in" : "create account"}
          </button>
        </form>

        <div className="auth-switch">
          {mode === "signin" ? (
            <>Don’t have an account? <button className="link" onClick={switchMode}>Create one</button></>
          ) : (
            <>Already have an account? <button className="link" onClick={switchMode}>Sign in</button></>
          )}
        </div>
      </div>
    </div>
  );
}
