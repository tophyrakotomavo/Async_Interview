'use client'

import { api } from "@/trpc/react";

export const ReadQuestionInterview = () =>{
  
  const { data } = api.interviewquestionresponse.getAll.useQuery();

  return(
    <div>
      {data?.map((qst) => (
        <li key={qst.Questions.id}>{qst.Questions?.value}</li>
      ))}
    </div>
  );
};
