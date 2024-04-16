import { db } from "@/server/db";
import { interviewQuestionResponse } from "@/server/db/schema";
import { questions } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const getInterviewQuestionResponse = async () =>{

  
  const result = await db.select().from(interviewQuestionResponse).innerJoin(questions, eq(interviewQuestionResponse.questionId, questions.id));
 

  return result;
  
};
