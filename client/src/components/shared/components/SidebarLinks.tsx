import { ReactNode } from "react"
import { useNavigate } from "react-router-dom"

type SidebarLinksProps = {
  children: ReactNode
}

const SidebarLinks = ({ children }: SidebarLinksProps) => {

  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const logOut = async () => {

    localStorage.removeItem('atoken');
    navigate('/login');

    await fetch(`${apiUrl}/auth/logout`, {
      method: 'POST'
    });
    window.location.reload();
  }

  return (
    <div className='bg-cya-500 text-lg text-white flex justify-end font-[500] py-10 h-[70%]'>
      <nav className='bg-cya-200 w-[70%] pt-5 pl-2'>
        <ul className='bg-re-200 flex flex-col gap-10 break-all items-start'>
          {children}
          <li className="active:text-slate-700 cursor-pointer" onClick={logOut}>Sign out</li>
        </ul>
      </nav>
    </div>
  )
}

export default SidebarLinks