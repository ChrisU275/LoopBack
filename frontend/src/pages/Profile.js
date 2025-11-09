// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getMe, updateMe, logout } from "../utils/api";

export default function Profile() {
  const nav = useNavigate();
  const loc = useLocation();
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  // local editable fields
  const [name, setName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [email, setEmail] = useState("");
  const [points, setPoints] = useState(0);

  // derive community from postal for now (mock)
  const community = "penbrooke meadows";

  useEffect(() => {
    (async () => {
      const user = await getMe();
      if (!user) {
        // not signed in → go to auth under profile
        const next = encodeURIComponent("/profile");
        nav(`/auth?mode=signin&next=${next}`, { replace: true, state: { from: loc } });
        return;
      }
      setMe(user);
      setName(user.name || "");
      setPostalCode(user.postalCode || "");
      setEmail(user.email || "");
      setPoints(user.points ?? 1058);
      setLoading(false);
    })();
  }, [nav, loc]);

  const handleSave = async () => {
    const updated = await updateMe({ name, postalCode, email });
    setMe(updated);
    alert("Profile saved!");
  };

  const handleDiscard = () => {
    if (!me) return;
    setName(me.name || "");
    setPostalCode(me.postalCode || "");
    setEmail(me.email || "");
  };

  const handleSignOut = () => {
    logout();
    const next = encodeURIComponent("/profile");
    nav(`/auth?mode=signin&next=${next}`, { replace: true });
  };

  if (loading) return null; // or a spinner

  // ---- UI (same look you had, minus mock login) ----
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Left column: form */}
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "32px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              fontFamily: "'Winkle', cursive",
              fontSize: "42px",
              margin: "0 0 24px",
              fontWeight: "900",
              color: "#49213D",
            }}
          >
            your profile
          </h2>

          {/* name */}
          <Field label="name" color="#f46c97">
            <Input value={name} onChange={setName} />
          </Field>

          {/* postal code */}
          <Field label="postal code" color="#f2a33d">
            <Input value={postalCode} onChange={setPostalCode} />
          </Field>

          {/* community (derived) */}
          <Field label="community" color="#7ad37b">
            <div
              style={{
                background: "#ded6e1",
                borderRadius: "12px",
                padding: "10px 14px",
                fontSize: "15px",
                color: "#49213D",
                fontWeight: 600,
                fontFamily: "'Coolvetica', sans-serif",
              }}
            >
              {community}
            </div>
            <p style={{ fontSize: 12, color: "#999", margin: "6px 0 0", fontStyle: "italic" }}>
              community is derived from postal code
            </p>
          </Field>

          <h3
            style={{
              fontFamily: "'Winkle', cursive",
              fontSize: "42px",
              margin: "32px 0 20px",
              fontWeight: "900",
              color: "#49213D",
            }}
          >
            settings
          </h3>

          {/* email */}
          <Field label="email" color="#6aa9ff">
            <Input value={email} onChange={setEmail} type="email" />
          </Field>

          {/* password (placeholder readonly) */}
          <Field label="pwd" color="#8d5fbf">
            <input
              type="password"
              value="••••••••••••"
              readOnly
              style={inputStyle}
            />
          </Field>
        </div>

        {/* Right column: card + actions */}
        <div>
          <div
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "32px",
              textAlign: "center",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: 180,
                height: 180,
                borderRadius: "50%",
                background: "#ccc",
                margin: "0 auto 20px",
              }}
            />
            <h3
              style={{
                fontFamily: "'Winkle', cursive",
                fontSize: "36px",
                margin: "0 0 8px",
                fontWeight: "900",
                color: "#49213D",
              }}
            >
              {name}
            </h3>
            <p
              style={{
                fontSize: 18,
                color: "#7ad37b",
                margin: "0 0 4px",
                fontFamily: "'Coolvetica', sans-serif",
                fontWeight: 600,
              }}
            >
              {community}
            </p>
            <p
              style={{
                fontSize: 24,
                color: "#f46c97",
                margin: 0,
                fontWeight: 700,
              }}
            >
              {points} points!
            </p>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={handleSave}
              style={btnGreen}
            >
              save
            </button>
            <button
              onClick={handleDiscard}
              style={btnPink}
            >
              discard
            </button>
          </div>

          {/* SIGN OUT */}
          <div style={{ marginTop: 12 }}>
            <button className="btn" onClick={handleSignOut} style={{ background: "#8d5fbf" }}>
              sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- tiny helpers (same look as yours) ---------- */

function Field({ label, color, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label
        style={{
          display: "block",
          fontSize: 14,
          fontWeight: 700,
          marginBottom: 6,
          color,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function Input({ value, onChange, type = "text" }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#ded6e1",
        borderRadius: 12,
        padding: "10px 14px",
      }}
    >
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle}
      />
      <span style={{ fontSize: 18, cursor: "pointer" }}>✏️</span>
    </div>
  );
}

const inputStyle = {
  flex: 1,
  background: "transparent",
  border: 0,
  outline: 0,
  fontSize: 15,
  color: "#49213D",
  fontFamily: "'Coolvetica', sans-serif",
  fontWeight: 600,
};

const btnGreen = {
  flex: 1,
  background: "#7ad37b",
  color: "white",
  border: 0,
  borderRadius: 16,
  padding: "14px 20px",
  fontSize: 24,
  fontFamily: "'Winkle', cursive",
  fontWeight: 900,
  cursor: "pointer",
  boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
};
const btnPink = {
  ...btnGreen,
  background: "#f46c97",
};
