// navigation bar at the top
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#f0f0f0" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
      <Link to="/marketplace" style={{ marginRight: "10px" }}>Marketplace</Link>
      <Link to="/about" style={{ marginRight: "10px" }}>About</Link>
      <Link to="/profile" style={{ marginRight: "10px" }}>Profile</Link>
    </nav>
  );
}
