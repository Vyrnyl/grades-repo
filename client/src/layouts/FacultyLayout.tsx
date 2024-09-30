import { Outlet } from "react-router-dom"
import SideBar from "../components/shared/SideBar"
import SideBarLink from '../components/shared/components/SideBarLink'
import LayoutContainer from "../components/shared/LayoutContainer"
import AdminProfile from "../components/shared/components/AdminProfile"
const FacultyLayout = () => {
  return (
    <LayoutContainer>
      <SideBar role='faculty'>
        <SideBarLink path='/' label='Dashboard'/>
        <SideBarLink path='/account' label='Account'/>
        <SideBarLink path='/course-management' label='Course Management'/>
        <SideBarLink path='/grade-entry' label='Grade Entry'/>
        <li>Sign out</li>
      </SideBar>
      <Outlet/>
    </LayoutContainer>
  )
}

export default FacultyLayout