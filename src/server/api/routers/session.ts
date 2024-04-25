import { supabase } from "@/lib/supabase/client";
import { publicProcedure, createTRPCRouter } from "../trpc";

export const sessionRouter = createTRPCRouter({
  session: publicProcedure.query( async () => {
    const res = await supabase.auth.getUser();
    return res.data.user;
  })
});
