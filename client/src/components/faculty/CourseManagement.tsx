import ClassSched from '../shared/components/ClassSched'
import PageContainer from '../shared/components/PageContainer'

const CourseManagement = () => {
  return (
    <PageContainer>
        <div className='bg-blue-200 flex h-[100%]'>
            <div className='bg-cyan-200 flex-grow flex flex-col mx-[2.5rem] pb-4'>
                <div className='bg-slate-400 h-[20%] flex items-center px-5'>
                    <h1 className='text-[2rem] font-medium'>Classes</h1>
                </div>
                <div className='bg-green-300 grid grid-cols-3 gap-[1rem] place-items-center overflow-y-scroll scrollbar-hide'>
                    <ClassSched 
                        courseCode='CC106' 
                        day='Tuesday & Friday' 
                        time='1:00PM - 3:00PM' 
                        room='Computer Lab 3'
                    />
                    <ClassSched 
                        courseCode='CC106' 
                        day='Tuesday & Friday' 
                        time='1:00PM - 3:00PM' 
                        room='Computer Lab 3'
                    />
                    <ClassSched 
                        courseCode='CC106' 
                        day='Tuesday & Friday' 
                        time='1:00PM - 3:00PM' 
                        room='Computer Lab 3'
                    />
                    <ClassSched 
                        courseCode='CC106' 
                        day='Tuesday & Friday' 
                        time='1:00PM - 3:00PM' 
                        room='Computer Lab 3'
                    />
                </div>
            </div>
            <div className='bg-green-200 w-[30%]'>
                <form>
                    h
                </form>
            </div>
        </div>
    </PageContainer>
  )
}

export default CourseManagement