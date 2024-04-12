import { db } from "@/server/db";
import { questions } from "@/server/db/schema";
import { eq, ilike } from "drizzle-orm";

export const getQuestion = async (searchQuestion:string) => {
  const foundQuestionObject = await db.select({value: questions.value}).from(questions).where(ilike(questions.value, `%${searchQuestion}%`))

  
  return foundQuestionObject;

};
