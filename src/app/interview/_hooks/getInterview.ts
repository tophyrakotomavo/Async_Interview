import { db } from "@/server/db"
import { interviewQuestionResponse } from "@/server/db/schema"

export const getInterview = async () => {
  const listInterview = await db.select({
    iterview_id: interviewQuestionResponse.interviewId, 
    question_id: interviewQuestionResponse.questionId})
    .from(interviewQuestionResponse);

    return listInterview;
}