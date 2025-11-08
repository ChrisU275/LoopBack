// Login/register + user listings
import React, { useState } from "react";
export default function Profile() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      {loggedIn ? (
        <div>
          <h2>Welcome, User!</h2>
          <p>Your listings:</p>
          {/* Placeholder for user listings */}
        </div>
      ) : (
        <div>
          <h2>Login / Register</h2>
          <button onClick={() => setLoggedIn(true)}>Mock Login</button>
        </div>
      )}
    </div>
  );
}