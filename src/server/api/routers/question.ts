import { publicProcedure, createTRPCRouter } from "../trpc";
import { getQuestions } from "@/app/interview/_hooks/getQuestions";
import { getQuestion } from "@/app/interview/_hooks/getQuestion";
import z from 'zod';

export const questionRouter = createTRPCRouter({
  getAll: publicProcedure.query(getQuestions),
  getOneQuestion: publicProcedure
  .input(z.object({ searchQuestion: z.string() }))
  .query(({ input }) => getQuestion(input.searchQuestion)),
});