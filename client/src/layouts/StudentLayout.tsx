import { Outlet } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import SideBar from "../components/shared/SideBar"
import SideBarLink from "../components/shared/components/SideBarLink"
import LayoutContainer from "../components/shared/LayoutContainer"
import useUserStore from "../store/useUserStore"
import { User } from "../types/studentTypes"
import { useEffect } from "react"

const StudentLayout = () => {

  const { setUserInfo } = useUserStore();
  const {  error, data } = useFetch('user/get-user', 'GET');
  
  useEffect(() => {
    if (!error && data) {
      setUserInfo(data as User);
    }
  }, [data]);
  
  return (
    <LayoutContainer>
      <SideBar role="student">
        <SideBarLink path='/' label='Dashboard'/>
        <SideBarLink path='/account' label='Account'/>
        {/* <SideBarLink path='/notification' label='Notifications'/> */}
        <SideBarLink path='/view-grade' label='View Grade'/>
        <SideBarLink path='/gwastatus' label='GWA Status'/>
      </SideBar>
      <Outlet/>
      
    </LayoutContainer>
  )
}

export default StudentLayout