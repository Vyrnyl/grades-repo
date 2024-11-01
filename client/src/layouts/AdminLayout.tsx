import { Outlet } from "react-router-dom"
import SideBar from "../components/shared/SideBar"
import SideBarLink from "../components/shared/components/SideBarLink"
import LayoutContainer from "../components/shared/LayoutContainer"
import useFetch from "../hooks/useFetch"
import useUserStore from "../store/useUserStore"
import { useEffect } from "react"
import { User } from "../types/studentTypes"

const AdminLayout = () => {
  
  const { setUserInfo } = useUserStore();
  const {  error, data } = useFetch('user/get-user', 'GET');
  
  useEffect(() => {
    if (!error && data) {
      setUserInfo(data as User);
    }
  }, [data]);

  return (
    <LayoutContainer>
      <SideBar role='admin'>
        <SideBarLink path='/' label='Dashboard'/>
        <SideBarLink path='/activity-tracking' label='Activity Tracking'/>
        <SideBarLink path='/user-management' label='User Management'/>
      </SideBar>
      <Outlet/>
    </LayoutContainer>
  )
}

export default AdminLayout