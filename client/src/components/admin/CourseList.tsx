import React, { useEffect, useState } from "react"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PageContainer from "../shared/components/PageContainer"
import CourseRow from "./CourseRow"
import useFetch from "../../hooks/useFetch"
import { Program } from "../../types/studentTypes"

type CoursesProps = {
    handleOpenCard: () => void;
};

const Courses = React.forwardRef<HTMLDivElement, CoursesProps>(({ handleOpenCard }, ref) => {

    const { data } = useFetch('program/get-programs', 'GET');
    const [programs, setPrograms] = useState<Program[] | []>([]);

    useEffect(() => {
        if(Array.isArray(data)) {
            setPrograms(data);
        }
    }, [data]);
    
    return (
        <PageContainer ref={ref} className={`bg-cya-300 absolute w-full top-4 flex flex-col px-[3rem]`}>
            <div className="bg-gree-200 flex h-[20%] relative">
                <h1 className="text-[2rem] font-bold text-slate-800 self-center">Courses</h1>
                <FontAwesomeIcon className="absolute text-[2rem] right-[-2rem] top-4 font-bold hover:scale-110 active:scale-100" 
                    icon={faClose} onClick={handleOpenCard}/>
            </div>
            <div className="bg-blu-200 h-[80%] mb-[1rem] overflow-y-scroll relative">
            <table className="w-full">
               <thead className="bg-blue-500 text-white text-[1.2rem] font-semibold sticky top-0">
                  <tr>
                     <th className="py-4 px-10 text-left border-2 border-blue-500">Program</th>
                     {/* <th className="py-4 px-10 text-left">Action</th> */}
                  </tr>
               </thead>
               <tbody className="text-slate-700 font-medium text-[1rem]">
                  {programs.map((program, i) => <CourseRow key={i} program={program}/>)}
               </tbody>
            </table>
            </div>
        </PageContainer>
    )
})

export default Courses