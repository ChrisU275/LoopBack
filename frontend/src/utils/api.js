// src/utils/api.js
import axios from "axios";
import { useEffect, useState, useCallback } from "react";

/** ---------- Base URL handling ---------- */
const baseURL = (process.env.REACT_APP_API_BASE || "").replace(/\/$/, "");
export const api = axios.create({
  baseURL: baseURL || undefined,
  withCredentials: true, // enable cookies for Flask session
});

/** ---------- Mock mode detection ---------- */
const USE_MOCK =
  !baseURL || String(process.env.REACT_APP_USE_MOCK || "").trim() === "1";

/** ---------- LocalStorage helpers for mock mode ---------- */
const LS_USERS = "loopback_users_v1";
const LS_ME = "loopback_me";
const LS_LISTINGS = "loopback_listings_v1";

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(LS_USERS) || "[]");
  } catch {
    return [];
  }
}
function writeUsers(users) {
  localStorage.setItem(LS_USERS, JSON.stringify(users));
}
function getToken() {
  const me = localStorage.getItem(LS_ME);
  return me ? `mock-${JSON.parse(me).id}` : "";
}
function setToken(token) {
  if (!token) localStorage.removeItem(LS_ME);
}

/** ---------- SEED LISTINGS (mock) ---------- */
const SEED = [
  {
    id: "1",
    title: "picture of gerard way",
    type: "exchange",
    category: "art",
    community: "penbrooke meadows",
    description: "hey! i'm looking to exchange this picture of gerard way for some cds.",
    image: "",
    swatchColor: "#F590A6",
  },
  {
    id: "2",
    title: "picture of gerard way",
    type: "donation",
    category: "art",
    community: "penbrooke meadows",
    description: "",
    image: "",
    swatchColor: "#FFC86B",
  },
];

function ensureSeed() {
  const raw = localStorage.getItem(LS_LISTINGS);
  if (!raw) localStorage.setItem(LS_LISTINGS, JSON.stringify(SEED));
}
function readLocalListings() {
  ensureSeed();
  try {
    const arr = JSON.parse(localStorage.getItem(LS_LISTINGS) || "[]");
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}
function writeLocalListing(item) {
  const cur = readLocalListings();
  const id = String(Date.now());
  const next = [{ ...item, id }, ...cur];
  localStorage.setItem(LS_LISTINGS, JSON.stringify(next));
  return { ...item, id };
}

/** ---------- LISTINGS HOOK/APIs ---------- */
export function useListings(filters = {}) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const reload = useCallback(async () => {
    setLoading(true);
    setErr("");
    try {
      if (!USE_MOCK) {
        const params = {};
        if (filters.query) params.query = filters.query;
        if (filters.type && filters.type !== "All") params.type = filters.type;
        if (filters.category && filters.category !== "All") params.category = filters.category;
        if (filters.radiusKm) params.radiusKm = filters.radiusKm;

        const { data } = await api.get("/api/listings", { params });
        setListings(Array.isArray(data) ? data : data.items || []);
      } else {
        let data = readLocalListings();
        if (filters.query) {
          const q = String(filters.query).toLowerCase();
          data = data.filter(
            (x) =>
              x.title?.toLowerCase().includes(q) ||
              x.description?.toLowerCase().includes(q) ||
              x.category?.toLowerCase().includes(q) ||
              x.community?.toLowerCase().includes(q)
          );
        }
        if (filters.type && filters.type !== "All") {
          data = data.filter((x) => x.type.toLowerCase() === filters.type.toLowerCase());
        }
        if (filters.category && filters.category !== "All") {
          data = data.filter((x) => x.category.toLowerCase() === filters.category.toLowerCase());
        }
        setListings(data);
      }
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Failed to load listings");
    } finally {
      setLoading(false);
    }
  }, [filters.query, filters.type, filters.category, filters.radiusKm]);

  useEffect(() => {
    ensureSeed();
    reload();
  }, [reload]);

  return { listings, loading, err, reload, setListings };
}

export async function addListing(payload) {
  if (USE_MOCK) return writeLocalListing(payload);
  const { data } = await api.post("/api/listings", payload);
  return data;
}
export async function getListing(id) {
  if (USE_MOCK) {
    const arr = JSON.parse(localStorage.getItem(LS_LISTINGS) || "[]");
    return arr.find((x) => String(x.id) === String(id)) || null;
  }
  const { data } = await api.get(`/api/listings/${id}`);
  return data;
}

/** ---------- AUTH APIs ---------- */
export const isLoggedIn = () => !!getToken();

export async function register({ name, email, password, postalCode }) {
  if (USE_MOCK) {
    const users = readUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase()))
      throw new Error("Email already exists.");
    const user = {
      id: String(Date.now()),
      name,
      email,
      password,
      postalCode,
      points: 0,
    };
    users.push(user);
    writeUsers(users);
    localStorage.setItem(LS_ME, JSON.stringify(user));
    setToken(`mock-${user.id}`);
    return { user };
  }

  const { data } = await api.post("/api/auth/signup", { name, email, password, postalCode });
  return data;
}

export async function login({ email, password }) {
  if (USE_MOCK) {
    const users = readUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user || user.password !== password) throw new Error("Invalid credentials");
    localStorage.setItem(LS_ME, JSON.stringify(user));
    setToken(`mock-${user.id}`);
    return { user };
  }

  const { data } = await api.post("/api/auth/signin", { email, password });
  return data;
}

export async function logout() {
  if (USE_MOCK) {
    localStorage.removeItem(LS_ME);
    setToken("");
    return;
  }
  await api.post("/api/auth/logout");
}

export async function getMe() {
  if (USE_MOCK) {
    const raw = localStorage.getItem(LS_ME);
    return raw ? JSON.parse(raw) : null;
  }
  const { data } = await api.get("/api/auth/me");
  return data;
}

export async function updateMe(patch) {
  if (USE_MOCK) {
    const me = await getMe();
    if (!me) throw new Error("Not signed in");
    const next = { ...me, ...patch };
    localStorage.setItem(LS_ME, JSON.stringify(next));
    const users = readUsers();
    const idx = users.findIndex((u) => u.id === me.id);
    if (idx >= 0) {
      users[idx] = { ...users[idx], ...patch };
      writeUsers(users);
    }
    return next;
  }
  const { data } = await api.put("/api/auth/me", patch);
  return data;
}
