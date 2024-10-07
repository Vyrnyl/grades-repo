import { Outlet, Navigate } from "react-router-dom"
import SideBar from "../components/shared/SideBar"
import SideBarLink from "../components/shared/components/SideBarLink"
import LayoutContainer from "../components/shared/LayoutContainer"

const StudentLayout = () => {

  const isAuthenticated = true;

  return (
    <LayoutContainer>
      <SideBar role="student">
        <SideBarLink path='/' label='Dashboard'/>
        <SideBarLink path='/account' label='Account'/>
        <SideBarLink path='/notification' label='Notifications'/>
        <SideBarLink path='/gwastatus' label='GWA Status'/>
        <li>Sign out</li>
      </SideBar>
      {isAuthenticated ? <Outlet/> : <Navigate to='/login'/>}
    </LayoutContainer>
  )
}

export default StudentLayout