import { Outlet, useLocation, useNavigate } from "react-router-dom"
import SideBar from "../components/shared/SideBar"
import SideBarLink from "../components/shared/components/SideBarLink"
import LayoutContainer from "../components/shared/LayoutContainer"
import useFetch from "../hooks/useFetch"
import useUserStore from "../store/useUserStore"
import { useEffect, useRef, useState } from "react"
import { User } from "../types/studentTypes"
import { faCaretDown, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const AdminLayout = () => {
  
  const loc = useLocation();
  const navigate = useNavigate();
  const { setUserInfo } = useUserStore();
  const {  error, data } = useFetch('user/get-user', 'GET');
  
  //Set UserInfo
  useEffect(() => {
    if (!error && data) {
      setUserInfo(data as User);
    }
  }, [data]);


  //Style
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isUserClicked, setIsUserClicked] = useState(false);

  const handleClick = () => {
    setIsSelectOpen(prev => !prev);
    // setIsUserClicked(true);
  }


   //Click Outside
   const selectRef = useRef<HTMLDivElement>(null);
   const handleOutsideClick = (event: MouseEvent) => {
       if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          const target = event.target as HTMLElement;
          if(target.textContent !== "User Management") setIsSelectOpen(false);
       }
   };

   useEffect(() => {
       document.addEventListener('click', handleOutsideClick);
       return () => {
           document.removeEventListener('click', handleOutsideClick);
       };
   }, []);

  return (
    <LayoutContainer>
      <SideBar role='admin'>
        <SideBarLink path='/' label='Dashboard'/>
        <SideBarLink path='/course-subjects' label='Course Subjects'/>
        <SideBarLink path='/activity-tracking' label='Activity Tracking'/>
        <li className={`${(loc.pathname == '/faculty-user-management' || loc.pathname == '/student-user-management') && 'text-blue-300'} 
        bg-gree-200 relative cursor-pointer ${isUserClicked && 'text-blue-300'}`} onClick={handleClick}>
          <p className="flex gap-4">User Management 
            <span><FontAwesomeIcon className="active:text-white scale-y-[70%]" icon={faCaretDown}/></span></p>
          {isSelectOpen && 
            <div ref={selectRef} className="bg-white flex flex-col text-[1rem] text-slate-700 py-2 px-8 absolute right-[-4rem] top-[1.5rem] 
            rounded-sm border-[1px] border-slate-600">
              <span className="active:text-blue-300" onClick={() => navigate('/faculty-user-management')}>Faculty</span><hr />
              <span className="active:text-blue-300" onClick={() => navigate('/student-user-management')}>Student</span>
            </div>
          }
        </li>
      </SideBar>
      <Outlet/>
    </LayoutContainer>
  )
}

export default AdminLayout