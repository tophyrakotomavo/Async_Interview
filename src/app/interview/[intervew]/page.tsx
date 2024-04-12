'use client'

import { InterviewComp } from '@/app/interview/_components';

const Interview = ({ params }: { params: { interview_id: string } }) => {

  return (
    <div>
      {params.interview_id}
      <InterviewComp />
    </div>
  );
};

export default Interview;
