import { Outlet } from "react-router-dom"
import SideBar from "../components/shared/SideBar"
import SideBarLink from '../components/shared/components/SideBarLink'
import LayoutContainer from "../components/shared/LayoutContainer"
import useUserStore from "../store/useUserStore"
import useFetch from "../hooks/useFetch"
import { useEffect } from "react"
import { User } from "../types/studentTypes"
const FacultyLayout = () => {

  const { setUserInfo } = useUserStore();
  const {  error, data } = useFetch('user/get-user', 'GET');
  
  useEffect(() => {
    if (!error && data) {
      setUserInfo(data as User);
    }
  }, [data]);;

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