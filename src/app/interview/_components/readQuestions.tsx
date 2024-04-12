'use client'

import { api } from "@/trpc/react";

export const ReadQuestions = () => {

  const { data } = api.questions.getAll.useQuery();

  return(
    <div>
      <h1>Questions</h1>
      {data?.map((qst) => (
        <li key={qst.value}>
          {qst.value}
        </li>
      ))}
    </div>
  )
};
