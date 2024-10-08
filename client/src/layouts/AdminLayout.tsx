import { Outlet, Navigate } from "react-router-dom"
import SideBar from "../components/shared/SideBar"
import SideBarLink from "../components/shared/components/SideBarLink"
import LayoutContainer from "../components/shared/LayoutContainer"

const AdminLayout = () => {

  
  
  return (
    <LayoutContainer>
      <SideBar role='admin'>
        <SideBarLink path='/' label='Dashboard'/>
        <SideBarLink path='/activity-tracking' label='Activity Tracking'/>
        <SideBarLink path='/user-management' label='User Management'/>
        <li>Sign out</li>
      </SideBar>      
      {/* {isAuthenticated ? <Outlet/> : <Navigate to='/login'/>} */}
      <Outlet/>
    </LayoutContainer>
  )
}

export default AdminLayout