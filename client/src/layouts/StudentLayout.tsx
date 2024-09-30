import { Outlet } from "react-router-dom"
import SideBar from "../components/shared/SideBar"
import SideBarLink from "../components/shared/components/SideBarLink"
import LayoutContainer from "../components/shared/LayoutContainer"

const StudentLayout = () => {
  return (
    <LayoutContainer>
      <SideBar role="student">
        <SideBarLink path='/' label='Dashboard'/>
        <SideBarLink path='/account' label='Account'/>
        <SideBarLink path='/notification' label='Notifications'/>
        <SideBarLink path='/gwastatus' label='GWA Status'/>
        <li>Sign out</li>
      </SideBar>
      <Outlet/>
    </LayoutContainer>
  )
}

export default StudentLayout