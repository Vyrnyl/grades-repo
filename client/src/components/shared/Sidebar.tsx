
import Logo from './components/Logo'
import SidebarLinks from './components/SidebarLinks'
import SideBarLink from './components/SideBarLink'
const Sidebar = () => {
  return (

    <div className="bg-primary h-[100%] flex flex-col flex-[.2] rounded-r-md">
      <Logo/>
      <SidebarLinks>
        <SideBarLink path='/' label='Dashboard'/>
        <SideBarLink path='/account' label='Account'/>
        <SideBarLink path='/notification' label='Notifications'/>
        <SideBarLink path='/gwastatus' label='GWA Status'/>
        <li>Sign out</li>
      </SidebarLinks>
    </div>
  )
}

export default Sidebar