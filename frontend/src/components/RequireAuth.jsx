// src/components/RequireAuth.jsx
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getMe } from "../utils/api";

export default function RequireAuth({ children }) {
  const [state, setState] = useState({ loading: true, me: null });
  const loc = useLocation();

  useEffect(() => {
    (async () => setState({ loading: false, me: await getMe() }))();
  }, []);

  if (state.loading) return null;
  if (!state.me) {
    const next = encodeURIComponent(loc.pathname + loc.search);
    return <Navigate to={`/auth?mode=signin&next=${next}`} replace />;
  }
  return children;
}
