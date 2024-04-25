import type { DataFormInviteUser } from "../_type";
import { supabase as supabaseServer } from "@/lib/supabase/server";
import type { cookies } from "next/headers";

export const handleSendInvite = async (cookieStore: ReturnType<typeof cookies>) => {
  const supabase = supabaseServer(cookieStore);

  const handleSend = async (data: DataFormInviteUser) => {
    const { data: { session } } = await supabase.auth.getSession();

    try {
      const { error } = await supabase.from('Interview').insert({
        user_id: session?.user.id,
        candidat: data.email
      });
      
      if (error) {
        console.error(error.message);
        return;
      }
    } 
    catch (error) {
      console.error(error);
    }
  };
  return handleSend;
}