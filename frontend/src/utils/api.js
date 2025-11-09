// src/utils/api.js
import axios from "axios";
import { useEffect, useState, useCallback } from "react";

/** ---------- Base URL handling ---------- */
const baseURL = (process.env.REACT_APP_API_BASE || "").replace(/\/$/, "");
export const api = axios.create({
  baseURL: baseURL || undefined,
  withCredentials: false,
});

/** ---------- Auth helpers (optional) ---------- */
const LS_TOKEN = "loopback_token_v1";
export const getToken = () => localStorage.getItem(LS_TOKEN) || "";
export const setToken = (t) =>
  t ? localStorage.setItem(LS_TOKEN, t) : localStorage.removeItem(LS_TOKEN);

api.interceptors.request.use((cfg) => {
  const token = getToken();
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

/** ---------- Mock mode helpers ---------- */
const LS_LISTINGS = "loopback_listings_v1";
const USE_MOCK =
  !baseURL || String(process.env.REACT_APP_USE_MOCK || "").trim() === "1";

const SEED = [
  {
    id: "1",
    title: "picture of gerard way",
    type: "exchange",
    category: "art",
    community: "penbrooke meadows",
    description: "",
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

/** ---------- Listings ---------- */
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

      // Try real API first…
      if (!USE_MOCK) {
        const { data } = await api.get("/api/listings", { params });
        setListings(Array.isArray(data) ? data : data.items || []);
      } else {
        // Mock mode: filter locally
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
      // If API fails in dev, fall back to local seed
      const data = readLocalListings();
      setListings(data);
      setErr(e?.response?.data?.message || e.message || "Failed to load listings");
    } finally {
      setLoading(false);
    }
  }, [filters.query, filters.type, filters.category, filters.radiusKm]);

  useEffect(() => {
    // Always ensure seed exists for the no-backend path
    ensureSeed();
    reload();
  }, [reload]);

  return { listings, loading, err, reload, setListings };
}

// Create listing: writes to API if available, otherwise to localStorage
export async function addListing(payload) {
  const isFD =
    typeof FormData !== "undefined" && payload instanceof FormData;
  if (USE_MOCK) {
    // normalize to plain object
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

/** ---------- Profile/Auth stubs unchanged ---------- */
export async function getMe() {
  if (USE_MOCK) return { id: "me", name: "Demo User" };
  const { data } = await api.get("/api/me");
  return data;
}
export async function updateMe(patch) {
  if (USE_MOCK) return { ok: true, ...patch };
  const { data } = await api.patch("/api/me", patch);
  return data;
}
export async function login({ email, password }) {
  if (USE_MOCK) {
    const token = "mock-token";
    setToken(token);
    return { token };
  }
  const { data } = await api.post("/api/auth/login", { email, password });
  if (data?.token) setToken(data.token);
  return data;
}
export function logout() {
  setToken("");
}
export async function changePassword({ currentPassword, newPassword }) {
  if (USE_MOCK) return { ok: true };
  const { data } = await api.post("/api/auth/change-password", {
    currentPassword,
    newPassword,
  });
  return data;
}

// ---- Single listing helper ----
export async function getListing(id) {
  try {
    if (api.defaults.baseURL) {
      const { data } = await api.get(`/api/listings/${id}`);
      return data;
    }
  } catch (_) {} // fall through to local

  // mock/local fallback
  const arr = JSON.parse(localStorage.getItem("loopback_listings_v1") || "[]");
  return arr.find((x) => String(x.id) === String(id)) || null;
}

