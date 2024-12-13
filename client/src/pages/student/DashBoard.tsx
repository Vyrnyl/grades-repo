import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Profile from '../../components/shared/components/Profile'
import useUserStore from '../../store/useUserStore'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const DashBoard = () => {
  
  const { userInfo } = useUserStore();
  const [programCode, setProgramCode] = useState('');

  //Set program
  useEffect(() => {
    if(userInfo?.program) setProgramCode(userInfo.program.programCode);
  }, [userInfo]);

  return (
    <div className='bg-slat-100 h-[100%] w-[80%] flex flex-col justify-center'>
      <div className='bg-cya-200 flex-[.2] flex justify-between pl-16'>
        <h1 className="text-[2rem] font-mono font-semibold text-slate-800 pt-[3rem]">Welcome, {userInfo?.firstName.slice(1)}!</h1>
        <div className='bg-gree-200 h-[8rem] w-[50%] flex items-end justify-end'>
          <Profile className='mb-8' firstName={userInfo?.firstName} lastName={userInfo?.lastName} yearLevel={userInfo?.yearLevel}/>
        </div>
      </div>
      
      <div className='bg-re-200 flex-[.8] flex'>
        <div className='flex-[.5] flex flex-col'>
          <h1 className='font-sans text-[2rem] text-center pr-20'>Academic Remarks</h1>
          <div className='bg-gree-200 flex flex-col items-center pt-10'>
            <div className="bg-slate-300 h-[18rem] w-[18rem] grid place-content-center rounded-full mb-2">
              <FontAwesomeIcon className=" text-[8rem] text-slate-600" icon={faUser}/>
            </div>
            <p className='font-sans text-[1.45rem] font-semibold text-slate-700'>
              {`${userInfo?.lastName.toUpperCase() || ''}, ${userInfo?.firstName.toUpperCase() || ''}`}
            </p>
            <p className='font-sans text-[1.1rem]'>{programCode}</p>
          </div>
        </div>

        <div className='bg-purpl-200 flex-[.5]'>

        </div>
      </div>
    </div>
  )
}

export default DashBoard

