import { db } from "@/server/db";
import { questions } from "@/server/db/schema";

export const getQuestion = async (searchQuestion:String) => {
  const foundQuestionObject = (await db.select({question: questions.question}).from(questions)).find(question => question.question === searchQuestion);

  // Si un objet a été trouvé, retourner la valeur de la propriété 'question'
  // Sinon, retourner null ou une valeur par défaut
  return foundQuestionObject ? foundQuestionObject.question : null;

};
