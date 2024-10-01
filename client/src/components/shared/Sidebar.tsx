import Logo from './components/Logo'
import SidebarLinks from './components/SidebarLinks'
import AdminProfile from './components/AdminProfile'
import { ReactNode } from 'react'

type SideBarProps = {
  children: ReactNode,
  role: 'admin' | 'faculty' | 'student'
}

const SideBar = ({ children, role }: SideBarProps) => {

  return (
    <div className="bg-primary h-[100%] flex flex-col flex-[20%] rounded-r-md">
      <Logo/>
      {role !== 'student' && <AdminProfile name='Vernel'/>}
      <SidebarLinks>{children}</SidebarLinks>
    </div>
  )
}

export default SideBar