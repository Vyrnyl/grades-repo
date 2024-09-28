import { Outlet } from "react-router-dom"
import SideBar from "../components/shared/SideBar"
import SideBarLink from "../components/shared/components/SideBarLink"

const AdminLayout = () => {
  return (
    <div className="bg-slate-200 h-[100vh] flex items-center gap-[4rem] p-2 pr-8">
        <SideBar>
          <SideBarLink path='/' label='Dashboard'/>
          <SideBarLink path='/activity-tracking' label='Activity Tracking'/>
          <SideBarLink path='/user-management' label='User Management'/>
          <li>Sign out</li>
        </SideBar>
        <Outlet/>
    </div>
  )
}

export default AdminLayout