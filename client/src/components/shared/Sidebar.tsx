import Logo from './components/Logo'
import SidebarLinks from './components/SidebarLinks'
import SideBarLink from './components/SideBarLink'
import { ReactNode } from 'react'

type SideBarProps = {
  children: ReactNode
}

const SideBar = ({ children }: SideBarProps) => {
  return (
    <div className="bg-primary h-[100%] flex flex-col flex-[.2] rounded-r-md">
      <Logo/>
      <SidebarLinks>{children}</SidebarLinks>
    </div>
  )
}

export default SideBar