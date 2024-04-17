'use client'

import { InterviewComp } from '@/app/interview/_components';
import { ReadQuestionInterview } from '@/app/interview/_components';

const Interview = ({ params }: { params: { interview: string} }) => {


  return (
    <div>
      
      <ReadQuestionInterview/>
      <InterviewComp />
    </div>
  );
};

export default Interview;
