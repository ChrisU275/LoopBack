import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import CreateListing from "./pages/CreateListing";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Messages from "./pages/Messages";
import LookingFor from "./pages/LookingFor";
import Leaderboard from "./pages/Leaderboard";
import Navbar from "./components/Navbar";
import "./index.css";

export default function App(){
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/marketplace" element={<Marketplace/>} />
        <Route path="/create" element={<CreateListing/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/messages" element={<Messages/>} />
        <Route path="/looking-for" element={<LookingFor/>} />
        <Route path="/leaderboard" element={<Leaderboard/>} />
      </Routes>
    </BrowserRouter>
  );
}
