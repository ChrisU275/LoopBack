// src/utils/api.js
import axios from "axios";
import { useEffect, useState, useCallback } from "react";

/** ---------- Base URL handling ---------- */
const baseURL = (process.env.REACT_APP_API_BASE || "").replace(/\/$/, "");
export const api = axios.create({
  baseURL: baseURL || undefined,
  withCredentials: false,
});

/** ---------- Token helpers ---------- */
const LS_TOKEN = "loopback_token_v1";
export const getToken = () => localStorage.getItem(LS_TOKEN) || "";
export const setToken = (t) =>
  t ? localStorage.setItem(LS_TOKEN, t) : localStorage.removeItem(LS_TOKEN);

api.interceptors.request.use((cfg) => {
  const token = getToken();
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

/** ---------- Mock mode detection ---------- */
const LS_LISTINGS = "loopback_listings_v1";
const USE_MOCK =
  !baseURL || String(process.env.REACT_APP_USE_MOCK || "").trim() === "1";

/** ---------- SEED LISTINGS (for no-backend path) ---------- */
const SEED = [
  {
    id: "1",
    title: "picture of gerard way",
    type: "exchange",
    category: "art",
    community: "penbrooke meadows",
    description: "hey! i'm looking to exchange this picture of gerard way for some cds.",
    image: "",
    swatchColor: "#F590A6", // pink
  },
  {
    id: "2",
    title: "picture of gerard way",
    type: "donation",
    category: "art",
    community: "penbrooke meadows",
    description: "",
    image: "",
    swatchColor: "#FFC86B", // yellow
  },
  {
    id: "3",
    title: "picture of gerard way",
    type: "donation",
    category: "art",
    community: "penbrooke meadows",
    description: "",
    image: "",
    swatchColor: "#91A4D9", // blue
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
      const params = {};
      if (filters.query) params.query = filters.query;
      if (filters.type && filters.type !== "All")
        params.type = String(filters.type).toLowerCase();
      if (filters.category && filters.category !== "All")
        params.category = filters.category;
      if (filters.radiusKm) params.radiusKm = String(filters.radiusKm);

      if (!USE_MOCK) {
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
          data = data.filter(
            (x) => String(x.type).toLowerCase() === String(filters.type).toLowerCase()
          );
        }
        if (filters.category && filters.category !== "All") {
          data = data.filter(
            (x) => String(x.category).toLowerCase() === String(filters.category).toLowerCase()
          );
        }
        setListings(data);
      }
    } catch (e) {
      const data = readLocalListings();
      setListings(data);
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
  const isFD =
    typeof FormData !== "undefined" && payload instanceof FormData;
  if (USE_MOCK) {
    let obj = payload;
    if (isFD) {
      obj = {};
      for (const [k, v] of payload.entries()) obj[k] = v;
    }
    return writeLocalListing(obj);
  }
  const headers = isFD ? {} : { "Content-Type": "application/json" };
  const body = isFD ? payload : JSON.stringify(payload);
  const { data } = await api.post("/api/listings", body, { headers });
  return data;
}

export async function getListing(id) {
  try {
    if (api.defaults.baseURL) {
      const { data } = await api.get(`/api/listings/${id}`);
      return data;
    }
  } catch (_) {}
  const arr = JSON.parse(localStorage.getItem(LS_LISTINGS) || "[]");
  return arr.find((x) => String(x.id) === String(id)) || null;
}

/** ---------- MOCK AUTH ---------- */
const LS_USERS = "loopback_users_v1";
const LS_ME = "loopback_me";

function readUsers() {
  try { return JSON.parse(localStorage.getItem(LS_USERS) || "[]"); }
  catch { return []; }
}
function writeUsers(users) {
  localStorage.setItem(LS_USERS, JSON.stringify(users));
}

export const isLoggedIn = () => !!getToken();

export async function register({ name, email, password, postalCode }) {
  if (!USE_MOCK) {
    // wire your real backend here when ready
    throw new Error("Register not implemented for real API");
  }
  const users = readUsers();
  const exists = users.some(u => u.email.toLowerCase() === String(email).toLowerCase());
  if (exists) throw new Error("An account with this email already exists.");

  const user = {
    id: String(Date.now()),
    name: name?.trim() || "new user",
    email: String(email).trim(),
    password: String(password),       // mock only
    postalCode: postalCode || "",
    community: "penbrooke meadows",
    points: 1058,
  };
  users.push(user);
  writeUsers(users);

  const token = `mock-${user.id}`;
  setToken(token);
  localStorage.setItem(LS_ME, JSON.stringify(user));
  return { token, user };
}

export async function login({ email, password }) {
  if (USE_MOCK) {
    const users = readUsers();
    const user = users.find(u => u.email.toLowerCase() === String(email).toLowerCase());
    if (!user || user.password !== String(password)) {
      throw new Error("Invalid email or password.");
    }
    const token = `mock-${user.id}`;
    setToken(token);
    localStorage.setItem(LS_ME, JSON.stringify(user));
    return { token, user };
  }
  // Real API path (kept for future)
  const { data } = await api.post("/api/auth/login", { email, password });
  if (data?.token) setToken(data.token);
  return data;
}

export function logout() {
  setToken("");
  localStorage.removeItem(LS_ME);
}

export async function getMe() {
  if (USE_MOCK) {
    const raw = localStorage.getItem(LS_ME);
    return raw ? JSON.parse(raw) : null;
  }
  const { data } = await api.get("/api/me");
  return data;
}

export async function updateMe(patch) {
  if (USE_MOCK) {
    const me = await getMe();
    if (!me) throw new Error("Not signed in");
    const next = { ...me, ...patch };
    localStorage.setItem(LS_ME, JSON.stringify(next));

    // mirror to LS_USERS so the email/password change survives
    const users = readUsers();
    const idx = users.findIndex(u => u.id === me.id);
    if (idx >= 0) { users[idx] = { ...users[idx], ...patch }; writeUsers(users); }
    return next;
  }
  const { data } = await api.patch("/api/me", patch);
  return data;
}
