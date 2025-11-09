import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import CreateListing from "./pages/CreateListing";
import About from "./pages/About";
import Messages from "./pages/Messages";
import LookingFor from "./pages/LookingFor";
import Leaderboard from "./pages/Leaderboard";
import Auth from "./pages/Auth";
import Navbar from "./components/Navbar";
import ListingDetail from "./pages/ListingDetail";
import ProfileGate from "./pages/ProfileGate";
import "./index.css";

export default function App(){
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/marketplace" element={<Marketplace/>} />
        <Route path="/create" element={<CreateListing/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/messages" element={<Messages/>} />
        <Route path="/looking-for" element={<LookingFor/>} />
        <Route path="/leaderboard" element={<Leaderboard/>} />
        <Route path="/listing/:id" element={<ListingDetail/>} />

        {/* Standalone auth page (optional to keep) */}
        <Route path="/auth" element={<Auth />} />

        {/* Single entry: /profile handles both auth and profile */}
        <Route path="/profile" element={<ProfileGate/>} />
      </Routes>
    </BrowserRouter>
  );
}
