'use client'

import { InterviewComp } from '@/app/interview/_components';

const Interview = ({ params }: { params: { interview: string} }) => {


  return (
    <div>
      <InterviewComp />
    </div>
  );
};

export default Interview;
