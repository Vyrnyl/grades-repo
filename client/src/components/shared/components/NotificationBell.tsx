import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell } from "@fortawesome/free-regular-svg-icons"
import { useNavigate } from "react-router-dom";

const NotificationBell = () => {

  
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate('/notification')} className="bg-re-400 text-[1.2rem] outline outline-2 outline-slate-600 
    rounded-full h-[2.2rem] w-[2.2rem] grid place-items-center mb-1">
        <FontAwesomeIcon icon={faBell} />
    </div>
  )
}

export default NotificationBell