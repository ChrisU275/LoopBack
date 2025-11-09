// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import CreateListing from "./pages/CreateListing";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Messages from "./pages/Messages";
import LookingFor from "./pages/LookingFor";
import Leaderboard from "./pages/Leaderboard";
import Auth from "./pages/Auth";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import ListingDetail from "./pages/ListingDetail";
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

        {/* NEW auth route */}
        <Route path="/auth" element={<Auth/>} />

        {/* Guarded profile */}
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile/>
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
