import { supabase } from "@/lib";
import { publicProcedure, createTRPCRouter } from "../trpc";

export const sessionRouter = createTRPCRouter({
  session: publicProcedure.query( async () => {
    const res = await supabase.auth.getUser();
    console.log(res);
    return res.data.user;
  })
});