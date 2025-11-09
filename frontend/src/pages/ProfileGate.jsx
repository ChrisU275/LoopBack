import { useEffect, useState } from "react";
import Profile from "./Profile";
import Auth from "./Auth";
import { getMe } from "../utils/api";

/**
 * On /profile:
 *  - if me exists → show <Profile/>
 *  - else → show <Auth inline defaultMode="signin" and redirect back to /profile on success>
 */
export default function ProfileGate() {
  const [me, setMe] = useState(undefined); // undefined = loading, null = no user

  useEffect(() => {
    (async () => setMe(await getMe()))();
  }, []);

  if (me === undefined) return null; // loading

  if (!me) {
    return (
      <Auth
        inline
        defaultMode="signin"
        redirectTo="/profile"
        onSuccess={() => setMe({ refresh: true })} // force rerender to show <Profile/>
      />
    );
  }

  return <Profile />;
}
