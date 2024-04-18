import { publicProcedure, createTRPCRouter } from "../trpc";
import { getInterviewQuestionResponse } from "@/app/interview/questioninterview/_hooks/getInterviewQuestionResponse";

export const interviewquestionresponseRouter = createTRPCRouter({
  getAll: publicProcedure.query(getInterviewQuestionResponse),
 
});
