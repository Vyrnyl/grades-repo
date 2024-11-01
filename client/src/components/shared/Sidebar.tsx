import Logo from './components/Logo'
import SidebarLinks from './components/SidebarLinks'
import AdminProfile from './components/AdminProfile'
import { ReactNode, useEffect, useState } from 'react'
import useUserStore from '../../store/useUserStore'

type SideBarProps = {
  children: ReactNode,
  role: 'admin' | 'faculty' | 'student'
}

const SideBar = ({ children, role }: SideBarProps) => {

  const { userInfo } = useUserStore();
  const [firstName, setFirstName] = useState('');

  if(userInfo) {
    useEffect(() => {
      setFirstName(userInfo.firstName);
    }, [userInfo]);
  } else useEffect(() => {
      setFirstName('');
  }, [userInfo]);

  return (
    <div className="bg-primary h-[100%] flex flex-col flex-[20%] rounded-r-md">
      <Logo/>
      {role !== 'student' && <AdminProfile name={firstName}/>}
      <SidebarLinks>{children}</SidebarLinks>
    </div>
  )
}

export default SideBar