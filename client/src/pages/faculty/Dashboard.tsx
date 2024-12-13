
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActivityContainer from "../../components/shared/components/ActivityContainer"
import useUserStore from "../../store/useUserStore"
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {

  const { userInfo } = useUserStore();

  return (
    <div className='bg-slat-100 h-[100%] flex flex-col justify-center flex-[80%]'>
      <div className='bg-cya-200 flex-[.3] flex justify-between'>
        <h1 className="text-[2rem] font-mono font-semibold text-slate-800 pt-[3rem]">Welcome {userInfo?.firstName}!</h1>
        <div className="bg-gree-200 pt-[1rem]">
          <div className="bg-slate-300 h-[5rem] w-[5rem] grid place-content-center rounded-full">
            <FontAwesomeIcon className=" text-[3rem] text-slate-600" icon={faUser}/>
          </div>
          <p className="text-[1.1rem] text-slate-700 font-bold">{`${userInfo?.firstName || ''} ${userInfo?.lastName || ''}`}</p>
        </div>
      </div>
      <div className='bg-re-200 flex-[.7]'>
        <ActivityContainer>
          <div></div>
        </ActivityContainer>
      </div>
    </div>
  )
}

export default Dashboard