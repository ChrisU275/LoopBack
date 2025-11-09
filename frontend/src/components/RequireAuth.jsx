import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getMe } from "../utils/api";

export default function RequireAuth({ children }) {
  const [state, setState] = useState({ loading: true, me: null });

  useEffect(() => {
    (async () => {
      const me = await getMe();  // reads localStorage in mock mode
      setState({ loading: false, me });
    })();
  }, []);

  if (state.loading) return null;            // no redirect while checking
  if (!state.me) return <Navigate to="/auth?mode=signin" replace />;
  return children;
}
