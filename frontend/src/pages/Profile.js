import React, { useState } from "react";

export default function Profile() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("monkey monkey");
  const [postalCode, setPostalCode] = useState("T2A 4C9");
  const [email, setEmail] = useState("monkeymonkey@gmail.com");
  const [points, setPoints] = useState(1058);
  
  // Derive community from postal code (mock implementation)
  const community = "penbrooke meadows";

  const handleSave = () => {
    alert("Profile saved!");
  };

  const handleDiscard = () => {
    setName("monkey monkey");
    setPostalCode("T2A 4C9");
    setEmail("monkeymonkey@gmail.com");
  };

  // Login screen if not logged in
  if (!loggedIn) {
    return (
      <div style={{ maxWidth: "500px", margin: "80px auto", padding: "24px" }}>
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "48px 32px",
            textAlign: "center",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              fontFamily: "'Winkle', cursive",
              fontSize: "48px",
              margin: "0 0 32px",
              fontWeight: "900",
              color: "#2b2232",
            }}
          >
            Login / Register
          </h2>
          <button
            onClick={() => setLoggedIn(true)}
            style={{
              background: "#8d5fbf",
              color: "white",
              border: 0,
              borderRadius: "16px",
              padding: "16px 40px",
              fontSize: "20px",
              fontFamily: "'Winkle', cursive",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
            }}
          >
            Mock Login
          </button>
        </div>
      </div>
    );
  }

  // Profile page when logged in
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Left Column - Form */}
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
              fontFamily: "'Winkle', cursive",
              color: "#49213D",
            }}
          >
            your profile
          </h2>

          {/* Name Field */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "700",
                marginBottom: "6px",
                color: "#f46c97",
              }}
            >
              name
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#ded6e1",
                borderRadius: "12px",
                padding: "10px 14px",
              }}
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: 0,
                  outline: 0,
                  fontSize: "15px",
                  fontFamily: "'Coolvetica', sans-serif",
                  color: "#49213D",
                  fontWeight: "600",
                }}
              />
              <span style={{ fontSize: "18px", cursor: "pointer" }}>✏️</span>
            </div>
          </div>

          {/* Postal Code Field */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "700",
                marginBottom: "6px",
                color: "#f2a33d",
              }}
            >
              postal code
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#ded6e1",
                borderRadius: "12px",
                padding: "10px 14px",
              }}
            >
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: 0,
                  outline: 0,
                  fontSize: "15px",
                  fontFamily: "'Coolvetica', sans-serif",
                  color: "#49213D",
                  fontWeight: "600",
                }}
              />
              <span style={{ fontSize: "18px", cursor: "pointer" }}>✏️</span>
            </div>
          </div>

          {/* Community Display */}
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "700",
                marginBottom: "6px",
                color: "#7ad37b",
              }}
            >
              community
            </label>
            <div
              style={{
                background: "#ded6e1",
                borderRadius: "12px",
                padding: "10px 14px",
                fontSize: "15px",
                color: "#49213D",
                fontWeight: "600",
                fontFamily: "'Coolvetica', sans-serif",
              }}
            >
              {community}
            </div>
            <p
              style={{
                fontSize: "12px",
                color: "#999",
                margin: "6px 0 0",
                fontStyle: "italic",
              }}
            >
              community is derived from postal code
            </p>
          </div>

          {/* Settings Section */}
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

          {/* Email Field */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "700",
                marginBottom: "6px",
                color: "#6aa9ff",
              }}
            >
              email
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#ded6e1",
                borderRadius: "12px",
                padding: "10px 14px",
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: 0,
                  outline: 0,
                  fontSize: "15px",
                  color: "#49213D",
                  fontFamily: "'Coolvetica', sans-serif",
                  fontWeight: "600",
                }}
              />
              <span style={{ fontSize: "18px", cursor: "pointer" }}>✏️</span>
            </div>
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "700",
                marginBottom: "6px",
                color: "#8d5fbf",
              }}
            >
              pwd
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#ded6e1",
                borderRadius: "12px",
                padding: "10px 14px",
              }}
            >
              <input
                type="password"
                value="••••••••••••"
                readOnly
                style={{
                  flex: 1,
                  background: "transparent",
                  border: 0,
                  fontFamily: "'Coolvetica', sans-serif",
                  outline: 0,
                  fontSize: "15px",
                  color: "#49213D",
                  fontWeight: "600",
                }}
              />
              <span style={{ fontSize: "18px", cursor: "pointer" }}>✏️</span>
            </div>
          </div>
        </div>

        {/* Right Column - Profile Card & Buttons */}
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
            {/* Avatar Circle */}
            <div
              style={{
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                background: "#ccc",
                margin: "0 auto 20px",
              }}
            />

            {/* Name */}
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

            {/* Community */}
            <p
              style={{
                fontSize: "18px",
                color: "#7ad37b",
                margin: "0 0 4px",
                fontFamily: "'Coolvetica', sans-serif",
                fontWeight: "600",
              }}
            >
              {community}
            </p>

            {/* Points */}
            <p
              style={{
                fontSize: "24px",
                color: "#f46c97",
                margin: "0",
                fontWeight: "700",
              }}
            >
              {points} points!
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={handleSave}
              style={{
                flex: 1,
                background: "#7ad37b",
                color: "white",
                border: 0,
                borderRadius: "16px",
                padding: "14px 20px",
                fontSize: "24px",
                fontFamily: "'Winkle', cursive",
                fontWeight: "900",
                cursor: "pointer",
                boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
              }}
            >
              save
            </button>
            <button
              onClick={handleDiscard}
              style={{
                flex: 1,
                background: "#f46c97",
                color: "white",
                border: 0,
                borderRadius: "16px",
                padding: "14px 20px",
                fontSize: "24px",
                fontFamily: "'Winkle', cursive",
                fontWeight: "900",
                cursor: "pointer",
                boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
              }}
            >
              discard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}