import { Navigate, Outlet } from "react-router-dom"
import SideBar from "../components/shared/SideBar"
import SideBarLink from '../components/shared/components/SideBarLink'
import LayoutContainer from "../components/shared/LayoutContainer"
const FacultyLayout = () => {

  const isAuthenticated = true;

  return (
    <LayoutContainer>
      <SideBar role='faculty'>
        <SideBarLink path='/' label='Dashboard'/>
        <SideBarLink path='/account' label='Account'/>
        <SideBarLink path='/course-management' label='Course Management'/>
        <SideBarLink path='/grade-entry' label='Grade Entry'/>
      </SideBar>
      <Outlet/>
    </LayoutContainer>
  )
}

export default FacultyLayout