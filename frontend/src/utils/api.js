// src/utils/api.js
import axios from "axios";
import { useEffect, useState, useCallback } from "react";

/** ---------- Base URL handling ---------- */
const baseURL = (process.env.REACT_APP_API_BASE || "").replace(/\/$/, "");
// If no REACT_APP_API_BASE is set, we rely on CRA proxy and use relative URLs.
export const api = axios.create({
  baseURL: baseURL || undefined, // undefined -> relative -> proxy will forward
  withCredentials: false,
});

/** ---------- Auth helpers (optional) ---------- */
const LS_TOKEN = "loopback_token_v1";
export const getToken = () => localStorage.getItem(LS_TOKEN) || "";
export const setToken = (t) => (t ? localStorage.setItem(LS_TOKEN, t) : localStorage.removeItem(LS_TOKEN));

api.interceptors.request.use((cfg) => {
  const token = getToken();
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

/** ---------- Listings ---------- */
// Hook: fetch listings with optional filters
export function useListings(filters = {}) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const reload = useCallback(async () => {
    try {
      setLoading(true);
      setErr("");
      const params = {};
      if (filters.query) params.query = filters.query;
      if (filters.type && filters.type !== "All") params.type = String(filters.type).toLowerCase();
      if (filters.category && filters.category !== "All") params.category = filters.category;
      if (filters.radiusKm) params.radiusKm = String(filters.radiusKm);

      const { data } = await api.get("/api/listings", { params });
      setListings(Array.isArray(data) ? data : data.items || []);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Failed to load listings");
    } finally {
      setLoading(false);
    }
  }, [filters.query, filters.type, filters.category, filters.radiusKm]);

  useEffect(() => { reload(); }, [reload]);

  return { listings, loading, err, reload, setListings };
}

// Create listing (accepts JSON or FormData for image upload)
export async function addListing(payload) {
  const isFD = typeof FormData !== "undefined" && payload instanceof FormData;
  const headers = isFD ? {} : { "Content-Type": "application/json" };
  const body = isFD ? payload : JSON.stringify(payload);
  const { data } = await api.post("/api/listings", body, { headers });
  return data;
}

/** ---------- Profile ---------- */
export async function getMe() {
  const { data } = await api.get("/api/me");
  return data;
}
export async function updateMe(patch) {
  const { data } = await api.patch("/api/me", patch);
  return data;
}

/** ---------- Auth (optional) ---------- */
export async function login({ email, password }) {
  const { data } = await api.post("/api/auth/login", { email, password });
  if (data?.token) setToken(data.token);
  return data;
}
export function logout() { setToken(""); }
export async function changePassword({ currentPassword, newPassword }) {
  const { data } = await api.post("/api/auth/change-password", { currentPassword, newPassword });
  return data;
}
