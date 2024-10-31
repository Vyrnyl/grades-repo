import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PageContainer from "../../components/shared/components/PageContainer"
import CourseList from "../../components/admin/CourseList"

type CoursesType = {
    isOpen: boolean,
    handleOpenCard: () => void,
    className?: string
}

const Courses = ({ isOpen, handleOpenCard, className } : CoursesType) => {

    console.log("kek");

    return (
        <PageContainer className={`bg-cya-300 absolute w-full top-4 flex flex-col px-[3rem] 
            ${isOpen ? 'scale-1 transform transition-transform duration-200' : 
            'scale-0 transform transition-transform duration-200'}`}>
            <div className="bg-gree-200 flex h-[20%] relative">
            <h1 className="text-[2rem] font-bold text-slate-800 self-center">Courses</h1>
            <FontAwesomeIcon className="absolute text-[1.3rem] right-[-2rem] top-4 font-bold hover:scale-110 active:scale-100" 
                icon={faX} onClick={handleOpenCard}/>
            </div>
            <div className="bg-blu-200 h-[80%] mb-[1rem] overflow-y-scroll">
                <div className="bg-blue-500 py-[1rem] px-10 flex justify-between font-semibold">
                    <h1 className="text-[1.2rem] text-white">Program</h1>
                    <h1 className="text-[1.2rem] text-white">Action</h1>
                </div>
                {isOpen && 
                <ul>
                    <CourseList/>
                    <CourseList/>
                    <CourseList/>
                </ul>}
            </div>
        </PageContainer>
    )
}

export default Courses