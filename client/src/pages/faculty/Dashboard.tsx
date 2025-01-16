
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActivityContainer from "../../components/shared/components/ActivityContainer"
import useUserStore from "../../store/useUserStore"
import { faUser } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import ProfilePic from "../../components/shared/components/ProfilePic";

type Activity = { 
  id: number, 
  userId: number, 
  content: string
}

const Dashboard = () => {

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('atoken');

  const { userInfo } = useUserStore();
  const { data } = useFetch('activity/get-faculty-activity', 'GET');

  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if(data) setActivities(data as Activity[]);
  }, [data]);

  

  //Profile
  const [isOpen, setIsOpen] = useState(false);


   //GET IMAGE
   const [imgSrc, setImgSrc] = useState('');
   const [isImageError, setIsImageError] = useState(false);
   const [hasPic, setHasPic] = useState(false);
 
   useEffect(() => {
     const getProfilePic = async () => {
      try {
        const res = await fetch(`${apiUrl}/image/get-image`, {
          method: 'POST',
          headers: {
            'Authorization': token ? token : '',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: userInfo?.id || 0 })
        });
        const data = await res.json();
        
        if(!res.ok && data.error) {
          setIsImageError(true);
        } else {
          const src = `data:${data.mimeType};base64,${data.image}`;
          setImgSrc(src);
          setIsImageError(false);
          setHasPic(true);
        }

      } catch(e) {
        console.log('Get error')
      }
     }
     getProfilePic();
  }, [userInfo, isOpen]);
  
  

  return (
    <div className='bg-slat-100 h-[100%] flex flex-col justify-center flex-[80%]'>
      <div className='bg-cya-200 flex-[.3] flex justify-between'>
        <h1 className="text-[2rem] font-mono font-semibold text-slate-800 pt-[3rem]">Welcome {userInfo?.firstName}!</h1>
        
        <div className="bg-gree-200 pt-[1rem] flex flex-col relative">
          <div onClick={() => setIsOpen(true)} className="bg-slate-300 h-[4rem] w-[4rem] 
          grid place-content-center rounded-full self-center">
            {hasPic ? <img src={imgSrc} alt="" className='h-[4rem] w-[4rem] rounded-full object-cover' /> :
              <FontAwesomeIcon className=" text-[2.5rem] text-slate-600" icon={faUser}/>
            }
          </div>
          <p className="text-[1.1rem] text-slate-700 font-bold">{`${userInfo?.firstName || ''} ${userInfo?.lastName || ''}`}</p>

          {isOpen && <ProfilePic className="absolute left-[-15.2rem] top-[3rem]" 
          setIsOpen={setIsOpen} hasPic={hasPic}/>}
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