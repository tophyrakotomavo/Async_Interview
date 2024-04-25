import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import type { Credentials } from "@/app/auth/_type";

export const useLogin = (redirectUrl?: string) => {
  const router = useRouter();

  const signIn = async (data: Credentials) => {
    try {
      const { error  } = await supabase.auth.signInWithPassword(data)
      if (error) {
        console.error('Error signing up:', error.message);
        return;
      }
      console.log('User signed up successfully:', data.email);
      void router.push(redirectUrl ?? '/');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return signIn;
}