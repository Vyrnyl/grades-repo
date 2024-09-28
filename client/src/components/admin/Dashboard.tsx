import ActivityContainer from "../shared/components/ActivityContainer"
import SearchBar from "../shared/components/SearchBar"
import DashboardCard from "../shared/components/DashboardCard"
import { faUser, faChartColumn } from "@fortawesome/free-solid-svg-icons"

const Dashboard = () => {
  return (
    <div className='bg-cya-100 h-[100%] flex-[80%] flex flex-col justify-center'>
      <div className="bg-blu-200 flex-[.2] pt-[1.5rem]">
        <SearchBar/>
      </div>
      <div className="bg-gree-200 flex-[.3] flex justify-between">
        <DashboardCard label="Courses" icon={faChartColumn}/>
        <DashboardCard label="Students" icon={faUser}/>
        <DashboardCard label="Faculty" icon={faUser}/>
      </div>
      <div className="bg-re-200 flex-[.5]">
        <ActivityContainer>
          <div></div>
        </ActivityContainer>
      </div>
    </div>
  )
}

export default Dashboard