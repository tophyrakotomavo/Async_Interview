import { db } from "@/server/db";
import { questions } from "@/server/db/schema";

export const getQuestions = async () =>{

  const listQuestions = await db.select({question: questions.question}).from(questions);

  return listQuestions;
  
};
