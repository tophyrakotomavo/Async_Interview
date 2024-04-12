'use client'

import { InterviewComp } from '@/app/interview/_components';


const Interview = ({ params }: { params: { id: number } }) => {

  return (
    <div>
      {params.id}
      <InterviewComp />
    </div>
  );
};

export default Interview;
 