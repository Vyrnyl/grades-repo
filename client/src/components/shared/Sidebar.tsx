import Logo from './components/Logo'
import SidebarLinks from './components/SidebarLinks'
import AdminProfile from './components/AdminProfile'
import { ReactNode } from 'react'
import useUserStore from '../../store/useUserStore'

type SideBarProps = {
  children: ReactNode,
  role: 'admin' | 'faculty' | 'student'
}

const SideBar = ({ children, role }: SideBarProps) => {

  const { userInfo } = useUserStore();
  
  return (
    <div className="bg-primary h-[100%] flex flex-col flex-[20%] rounded-r-md">
      <Logo/>
      {role !== 'student' && <AdminProfile name={userInfo?.firstName || ' '}/>}
      <SidebarLinks>{children}</SidebarLinks>
    </div>
  )
}

export default SideBar