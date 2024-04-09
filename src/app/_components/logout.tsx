'use client'

import { useLogout } from "@/app/_hooks/useLogout";

export const LogoutButton = () => {
  const logout = useLogout();

  return <button onClick={logout}> Logout </button>;
};
