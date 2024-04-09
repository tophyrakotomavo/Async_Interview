import { publicProcedure, createTRPCRouter } from "../trpc";
import { getQuestions } from "@/app/interview/_hooks/getQuestions";

export const questionRouter = createTRPCRouter({
  getAll: publicProcedure.query(getQuestions)
});