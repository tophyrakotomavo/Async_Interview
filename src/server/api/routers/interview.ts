import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../trpc";
import { getInterview } from "@/app/interview/_hooks/getInterview";
import { getQuestion } from "@/app/interview/_hooks/getQuestion";

export const interviewRouter = createTRPCRouter({
  getAll: publicProcedure.query(getInterview),
  getOneQuestion: publicProcedure
  .input(z.object({ searchQuestion: z.string() }))
  .query(({ input }) => getQuestion(input.searchQuestion)),

});