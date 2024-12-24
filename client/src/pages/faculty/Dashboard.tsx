
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActivityContainer from "../../components/shared/components/ActivityContainer"
import useUserStore from "../../store/useUserStore"
import { faUser } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";

type Activity = { 
  id: number, 
  userId: number, 
  content: string
}

const Dashboard = () => {

  const { userInfo } = useUserStore();
  const { data } = useFetch('activity/get-faculty-activity', 'GET');

  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if(data) setActivities(data as Activity[]);
  }, [data]);

  // console.log(activities)

  return (
    <div className='bg-slat-100 h-[100%] flex flex-col justify-center flex-[80%]'>
      <div className='bg-cya-200 flex-[.3] flex justify-between'>
        <h1 className="text-[2rem] font-mono font-semibold text-slate-800 pt-[3rem]">Welcome {userInfo?.firstName}!</h1>
        <div className="bg-gree-200 pt-[1rem] flex flex-col">
          <div className="bg-slate-300 h-[4rem] w-[4rem] grid place-content-center rounded-full self-center">
            <FontAwesomeIcon className=" text-[2.5rem] text-slate-600" icon={faUser}/>
          </div>
          <p className="text-[1.1rem] text-slate-700 font-bold">{`${userInfo?.firstName || ''} ${userInfo?.lastName || ''}`}</p>
        </div>
      </div>
      <div className='bg-re-200 flex-[.7]'>
        <ActivityContainer>
          <ul className="bg-pin-200 overflow-y-scroll mt-2 mb-6 font-semibold text-slate-700 mx-10 flex flex-col gap-4">
            {activities.map(activity => {
              return <li key={activity.id}>{activity.content}</li>
            })}
          </ul>
        </ActivityContainer>
      </div>
    </div>
  )
}

export default Dashboard