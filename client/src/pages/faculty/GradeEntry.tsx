import PageContainer from '../../components/shared/components/PageContainer'
import StudentTableData from '../../components/shared/components/StudentTableData'

const GradeEntry = () => {
  return (
    <PageContainer>
        <div className='bg-re-200 h-[100%] flex flex-col p-[1.5rem]'>
          <div className='bg-cya-200 flex-[20%] flex flex-col gap-4'>
            <h1 className='font-medium'>Course Subjects: FINANCIAL MANAGEMENT</h1>
            <select name="gender" className='bg-re-300 h-[2.2rem] w-[10rem] focus:outline-none
            border-[.1rem] border-slate-300 rounded-md px-2'>
              <option>Semester</option>
              <option value="1">1st Semester</option>
              <option value="2">2nd Semester</option>
            </select>
          </div>
          <div className='bg-gree-200 flex-[80%] pl-[6rem]'>
            <div className='bg-cya-200 w-[40rem]'>
              <div className='flex font-semibold text-[rem] pb-[1rem]'>
                <div className='w-[15rem]'>Name</div>
                <div className='flex-[8%]'>Student ID</div>  
                <div className='flex-[8%] '>Year/Block</div>
                <div className='flex-[8%]'>Grade</div>
              </div>
              <StudentTableData name='Richard Sorreda' studentId='703704' yearBlock='2B' grade={2.9}/>
              <StudentTableData name='Juan Raulo' studentId='703704' yearBlock='2B' grade={2.9}/>
              <StudentTableData name='Jett' studentId='703704' yearBlock='2B' grade={2.9}/>
              <StudentTableData name='Remon Semento' studentId='703704' yearBlock='2B' grade={2.9}/>
            </div>
          </div>
        </div>
    </PageContainer>
  )
}

export default GradeEntry