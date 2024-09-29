import ClassSched from '../shared/components/ClassSched'
import PageContainer from '../shared/components/PageContainer'
import InputFieldWrapper from '../shared/components/InputFieldWrapper'
import ClassInput from '../shared/components/ClassInput'

const CourseManagement = () => {

    

    return (
        <PageContainer>
            <div className='bg-blu-200 flex h-[100%] pr-4'>
                <div className='bg-cya-200 flex-grow flex flex-col mx-[2.5rem] pb-4'>
                    <div className='bg-slat-400 h-[20%] flex items-center px-5'>
                        <h1 className='text-[2rem] font-medium'>Classes</h1>
                    </div>
                    <div className='bg-gree-300 grid grid-cols-3 gap-[1rem] pb-4 place-items-center overflow-y-scroll scrollbar-hide'>
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
                <div className='bg-gree-200 w-[28%] flex flex-col justify-center items-center px-2 pb-[4rem] overflow-hidden'>
                    <button className='bg-blue-400 text-white text-[1.1rem] font-medium p-2 rounded-md'>Add Class</button>
                    <form className='bg-re-200 flex flex-col items-center gap-4 class-shadow w-[100%] px-[.8rem] rounded-md'>
                        <h1 className='text-[1.3rem] font-medium self-start mt-6'>Create</h1>
                        <InputFieldWrapper label="Course Subject">
                            <ClassInput type="text"/>
                        </InputFieldWrapper>
                        <InputFieldWrapper label="Day">
                            <ClassInput type="text"/>
                        </InputFieldWrapper>
                        <InputFieldWrapper label="Time">
                            <ClassInput type="text"/>
                        </InputFieldWrapper>
                        <InputFieldWrapper label="Room">
                            <ClassInput type="text"/>   
                        </InputFieldWrapper>
                        <div className='bg-cya-300 w-[17rem] h-[5rem] flex items-center justify-end'>
                            <button className='bg-blue-400 font-medium p-2 rounded-md 
                            w-[4rem] h-[2rem] flex justify-center items-center'>Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </PageContainer>
    )
}

export default CourseManagement