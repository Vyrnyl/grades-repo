
type CourseNotExistPromptProps = {
    setIsNotExist: React.Dispatch<React.SetStateAction<boolean>>,
    courseCode: string
}

const CourseNotExistPrompt = ({ setIsNotExist, courseCode } : CourseNotExistPromptProps) => {
    

    return <div className='bg-slate-300 z-10 absolute px-4 py-4 left-[50%] top-[50%] 
    translate-y-[-50%] translate-x-[-50%] flex flex-col gap-4 rounded-lg border-2 border-slate-400'>
      <h1 className='text-red-500 font-semibold text-[1rem] text-center'>Course Subject {courseCode} does not exist!</h1>
      <div className='bg-cya-300 flex gap-4 justify-center'>
        <button className='bg-blue-500 text-white px-2 py-[.2rem] rounded-md font-semibold' 
        onClick={() => setIsNotExist(false)}>Okay</button>
      </div>
    </div>
}

export default CourseNotExistPrompt;