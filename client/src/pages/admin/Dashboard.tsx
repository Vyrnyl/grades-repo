import { faUser, faChartColumn, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

import ActivityContainer from "../../components/shared/components/ActivityContainer"
import SearchBar from "../../components/shared/components/SearchBar"
import DashboardCard from "../../components/shared/components/DashboardCard"
import Courses from "../../components/admin/Courses"


const Dashboard = () => {


  //STYLE
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenCourses = () => {
    setIsOpen(!isOpen);
  }
  console.log(isOpen)

  return (
    <div className='bg-cya-100 h-[100%] flex-[80%] relative'>
      <div className="bg-gree-300 h-[100%] flex flex-col justify-center">
        <div className="bg-blu-200 flex-[.2] pt-[1.5rem]">
          <SearchBar/>
        </div>
        <div className="bg-gree-200 flex-[.3] flex justify-between flex-wrap">
          <DashboardCard label="Courses" icon={faChartColumn} onClick={handleOpenCourses}/>
          <DashboardCard label="Students" icon={faUser}/>
          <DashboardCard label="Faculty" icon={faUser}/>
        </div>
        <div className="bg-re-200 flex-[.5]">
          <ActivityContainer>
            <div></div>
          </ActivityContainer>
        </div>
      </div>

      {isOpen && <Courses className={`${isOpen ? 'scale-1 transform transition-transform duration-200' : 
        'scale-0 transform transition-transform duration-200'}`} isOpen={isOpen} handleOpenCard={handleOpenCourses}/>}

    </div>
  )
}

export default Dashboard