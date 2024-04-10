

const Interview = async () => {
  const { Interview: InterviewComp } = await import('@/app/interview/_components')

  return (
    <div>
      <InterviewComp />
    </div>
  )
};

export default Interview;