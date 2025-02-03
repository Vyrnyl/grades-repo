import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Profile from '../../components/shared/components/Profile'
import useUserStore from '../../store/useUserStore'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import GWAStatus from './GWAStatus';
import ProfilePic from '../../components/shared/components/ProfilePic';
import useSemStore from '../../store/useSemStore';
import useGwaListStore from '../../store/useGwaListStore';

type GwaList = { 
  semester: number, 
  yearLevel: number,
  gwa: number, 
  status: string 
};

const DashBoard = () => {
  
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('atoken');

  const { userInfo } = useUserStore();
  const [programCode, setProgramCode] = useState('');
  const [yearLevel, setYearLevel] = useState<number>(0);
  const { gwaList } = useGwaListStore();
  const { semester } = useSemStore();

  const [lastSemGwa, setLastSemGwa] = useState<GwaList | null>(null);
  
  //Set program
  useEffect(() => {
    if(userInfo?.program) {
      setProgramCode(userInfo.program.programCode);
      setYearLevel(userInfo.yearLevel);
    }
  }, [userInfo]);

  useEffect(() => {
    if(gwaList.length > 0) {

      const list = gwaList.filter(item => item);
      
      let lastSem = list.filter(item => item.yearLevel === (semester === 1 ? yearLevel - 1 : yearLevel) && 
      item.semester === (semester === 2 ? 1 : 2));

      setLastSemGwa(lastSem[0]);
    }
  }, [gwaList]);


  console.log(lastSemGwa)


  //Style
  const [isOpen, setIsOpen] = useState(false);

  //ProfilePic
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
    <div className='bg-slat-100 h-[100%] w-[80%] flex flex-col justify-center'>

      <GWAStatus className='hidden'/>

      <div className='bg-cya-200 flex-[.2] flex justify-between pl-16'>
        <h1 className="text-[2rem] font-mono font-semibold text-slate-800 pt-[3rem]">Welcome, {userInfo?.firstName}!</h1>
        <div className='bg-gree-200 h-[8rem] w-[50%] flex items-end justify-end relative'>
          <Profile onClick={() => setIsOpen(true)} 
          className='bg-cya-200 mb-8' 
          firstName={userInfo?.firstName} 
          lastName={userInfo?.lastName} 
          yearLevel={userInfo?.yearLevel}
          imgSrc={imgSrc} isImageError={isImageError}/>
          
          {isOpen && <ProfilePic setIsOpen={setIsOpen} className='absolute bottom-[-15rem] right-[7rem]' hasPic={hasPic}/>}
        </div>
      </div>
      
      <div className='bg-re-200 flex-[.8] flex'>
        <div className='flex-[.5] flex flex-col'>
          <h1 className='font-sans text-[2rem] text-center pr-20'>Academic Remarks</h1>
          <div className='bg-gree-200 flex flex-col items-center pt-10'>
            <div className="bg-slate-300 h-[18rem] w-[18rem] grid place-content-center rounded-full mb-2">
              {!isImageError ? 
                <img src={imgSrc} alt="" className='h-[18rem] w-[18] rounded-full object-cover'/> :
                <FontAwesomeIcon className=" text-[8rem] text-slate-600" icon={faUser}/>
              }
              
            </div>
            <p className='font-sans text-[1.45rem] font-semibold text-slate-700'> 
              {`${userInfo?.lastName.toUpperCase() || ''}, ${userInfo?.firstName.charAt(0) == '@' ? 
                userInfo.firstName.slice(1).toUpperCase() : userInfo?.firstName.toUpperCase() || ''}`}
            </p>
            <p className='font-semibold text-slate-700 text-[1.1rem]'>{programCode}</p>
          </div>
        </div>
        
        {(lastSemGwa && lastSemGwa.gwa <= 1.5) &&
          <div className='bg-purpl-200 flex-[.5]'>
            <div className='bg-cya-200 text-center mt-10'>
              <h1 className='font-bold text-[2.4rem] text-slate-800 italic'>Congratulations!</h1>
              <p className='font-semibold text-[1.7rem] text-slate-800'>You Made the {lastSemGwa.status}</p>
              <span className='text-[1.4rem] text-slate-800'>Last Semester</span>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default DashBoard

