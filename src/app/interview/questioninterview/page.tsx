'use client'

import { CreateQuestions, ReadQuestions } from '@/app/interview/_components';
import { useSession } from "@/app/_hooks/useSession";

const Questioninterview = () =>{
  useSession('/auth');
 
  return(
    <>
    <CreateQuestions/>
    <ReadQuestions/>
    </>
  );
};

export default Questioninterview;
