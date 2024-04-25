'use client'

import { CreateQuestions, ViewAllQuestions } from '@/app/interview/_components';
import { useSession } from "@/app/_hooks/useSession";

const Questioninterview = () =>{
  useSession('/auth');
 
  return(
    <div>
      <CreateQuestions/>
      <ViewAllQuestions/>
    </div>
  );
};

export default Questioninterview;
