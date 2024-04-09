import { CreateQuestions, ReadQuestions } from '@/app/interview/_components';

const Interview = async () => {
  const { Interview: InterviewComp } = await import('@/app/interview/_components')

  return (
    <div>
      <InterviewComp />
      <CreateQuestions/>
      <ReadQuestions/>
    </div>
  )
};

export default Interview;