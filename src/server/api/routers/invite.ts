import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../trpc";
import { handleSendInvite } from "@/app/createinterview/_hooks/handleSendInvite";


export const inviteRouter = createTRPCRouter({
  insert: publicProcedure
    .input(z.object( {candidat: z.string().email(), user_id: z.string()} ))
    .mutation(handleSendInvite)
});
