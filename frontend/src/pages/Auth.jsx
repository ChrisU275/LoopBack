import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMe, login, register } from "../utils/api";

/**
 * Props:
 *  - inline?: boolean        -> render compact (used inside /profile)
 *  - defaultMode?: "signin" | "signup"
 *  - redirectTo?: string     -> where to go after success (default "/profile")
 *  - onSuccess?: () => void  -> optional callback after success
 */
export default function Auth({
  inline = false,
  defaultMode = "signup",
  redirectTo = "/profile",
  onSuccess
}) {
  const nav = useNavigate();
  const { search } = useLocation();
  const modeFromURL = new URLSearchParams(search).get("mode") || defaultMode;

  const [mode, setMode] = useState(modeFromURL);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [postal, setPostal] = useState("");
  const [err, setErr] = useState("");

  // If already logged in and we're on the standalone /auth page, bounce to profile
  useEffect(() => {
    (async () => {
      const me = await getMe();
      if (me && !inline) nav("/profile", { replace: true });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => setMode(modeFromURL), [modeFromURL]);

  const title = useMemo(
    () => (mode === "signin" ? "Sign in" : "Create your account"),
    [mode]
  );

  const switchText =
    mode === "signin" ? (
      <>
        Don’t have an account?{" "}
        <button
          className="link"
          onClick={() =>
            inline ? setMode("signup") : nav("/auth?mode=signup")
          }
        >
          Create one
        </button>
      </>
    ) : (
      <>
        Already have an account?{" "}
        <button
          className="link"
          onClick={() =>
            inline ? setMode("signin") : nav("/auth?mode=signin")
          }
        >
          Sign in
        </button>
      </>
    );

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      if (mode === "signin") {
        await login({ email, password: pwd });
      } else {
        await register({ name, email, password: pwd, postalCode: postal });
      }
      if (onSuccess) onSuccess();
      if (!inline) nav(redirectTo, { replace: true });
    } catch (ex) {
      setErr(ex?.message || "Something went wrong.");
    }
  }

  const Wrapper = ({ children }) =>
    inline ? (
      <div className="auth-card">{children}</div>
    ) : (
      <div
        className="container"
        style={{ display: "grid", placeItems: "center", minHeight: "70vh" }}
      >
        <div className="auth-card">{children}</div>
      </div>
    );

  return (
    <Wrapper>
      <div className="auth-title">{title}</div>
      {err ? <div className="auth-error">{err}</div> : null}

      <form className="auth-form" onSubmit={onSubmit}>
        {mode === "signup" && (
          <>
            <label className="label">Full name</label>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </>
        )}

        <label className="label">Email</label>
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="label">Password</label>
        <input
          className="input"
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          required
        />

        {mode === "signup" && (
          <>
            <label className="label">Postal code (optional)</label>
            <input
              className="input"
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
            />
          </>
        )}

        <button className="btn" type="submit" style={{ marginTop: 10 }}>
          {mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      <div className="auth-switch">{switchText}</div>
    </Wrapper>
  );
}
