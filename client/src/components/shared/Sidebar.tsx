import { Link } from 'react-router-dom'
import Logo from './components/Logo'
import SidebarLinks from './components/SidebarLinks'
const Sidebar = () => {
  return (

    <div className="bg-primary h-[100%] flex flex-col flex-[.2] rounded-r-md">
      <Logo/>
      <SidebarLinks>
        <li><Link to='/'>Dashboard</Link></li>
        <li className='focus:text-red-500'><Link to='/account'>Account</Link></li>
        <li>Notifications</li>
        <li>GWA Status</li>
        <li>Sign out</li>
      </SidebarLinks>
    </div>
  )
}

export default Sidebar