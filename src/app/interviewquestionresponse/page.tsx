'use client'

import { api } from "@/trpc/react";

 const Interviewquestionresponse = () =>{
  
   const { data } = api.interviewquestionresponse.getAll.useQuery();
  

  return(
    <div>
      {data?.map((qst) => (
       <li key={qst.Questions.id}>{qst.Questions?.value}</li>
      ))}
    </div>
  );
};

export default Interviewquestionresponse;
