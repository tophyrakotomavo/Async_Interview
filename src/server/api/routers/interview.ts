import { publicProcedure, createTRPCRouter } from "../trpc";
import { getInterview } from "@/app/interview/_hooks/getInterview";

export const interviewRouter = createTRPCRouter({
  getAll: publicProcedure.query(getInterview)
});