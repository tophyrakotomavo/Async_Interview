import { useRouter } from "next/navigation";
import { supabase } from "@/lib";

export const useLogout = (redirectUrl?: string) => {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut()
    void router.push(redirectUrl ?? '/auth');
  };

  return handleLogout;
}