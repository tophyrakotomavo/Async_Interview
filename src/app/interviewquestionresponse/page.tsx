'use client'

import { api } from "@/trpc/react";
import { useSession } from "../_hooks/useSession";

 const Interviewquestionresponse = () =>{
   const {session} = useSession();
  
   const { data } = api.interviewquestionresponse.getAll.useQuery();
  

  return(
    <div>
      {data?.map((qst) => (
       <li>{qst.Questions?.value}</li>
      ))}
    </div>
  );
};

export default Interviewquestionresponse;
