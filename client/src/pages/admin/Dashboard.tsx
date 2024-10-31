import { faUser, faChartColumn, faX } from "@fortawesome/free-solid-svg-icons"
import { CSSTransition } from "react-transition-group"
import { useRef, useState } from "react"

import ActivityContainer from "../../components/shared/components/ActivityContainer"
import SearchBar from "../../components/shared/components/SearchBar"
import DashboardCard from "../../components/shared/components/DashboardCard"
import CourseList from "../../components/admin/CourseList"
import StudentList from "../../components/admin/StudentList"
import FacultyList from "../../components/admin/FacultyList"


const Dashboard = () => {


  //STYLE
  const courseNodeRef = useRef(null);
  const studentNodeRef = useRef(null);
  const facultyNodeRef = useRef(null);
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [isStudentOpen, setIsStudentOpen] = useState(false);
  const [isFacultyOpen, setIsFacultyOpen] = useState(false);

  return (
    <div className='bg-cya-100 h-[100%] flex-[80%] relative'>
      <div className="bg-gree-300 h-[100%] flex flex-col justify-center">
        <div className="bg-blu-200 flex-[.2] pt-[1.5rem]">
          <SearchBar/>
        </div>
        <div className="bg-gree-200 flex-[.3] flex justify-between flex-wrap">
          <DashboardCard label="Courses" icon={faChartColumn} onClick={() => setIsCourseOpen(!isCourseOpen)}/>
          <DashboardCard label="Students" icon={faUser} onClick={() => setIsStudentOpen(!isStudentOpen)}/>
          <DashboardCard label="Faculties" icon={faUser} onClick={() => setIsFacultyOpen(!isFacultyOpen)}/>
        </div>
        <div className="bg-re-200 flex-[.5]">
          <ActivityContainer>
            <div></div>
          </ActivityContainer>
        </div>
      </div>

      <CSSTransition in={isCourseOpen} timeout={200} classNames="scale" unmountOnExit nodeRef={courseNodeRef}>
        <CourseList ref={courseNodeRef} handleOpenCard={() => setIsCourseOpen(!isCourseOpen)}/>
      </CSSTransition>
      <CSSTransition in={isStudentOpen} timeout={200} classNames="scale" unmountOnExit nodeRef={studentNodeRef}>
        <StudentList ref={studentNodeRef} handleOpenCard={() => setIsStudentOpen(!isStudentOpen)}/>
      </CSSTransition>
      <CSSTransition in={isFacultyOpen} timeout={200} classNames="scale" unmountOnExit nodeRef={facultyNodeRef}>
        <FacultyList ref={facultyNodeRef} handleOpenCard={() => setIsFacultyOpen(!isFacultyOpen)}/>
      </CSSTransition>
      
    </div>
  )
}

export default Dashboard