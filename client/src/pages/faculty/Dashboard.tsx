import useFetch from "../../hooks/useFetch"

import SearchBar from "../../components/shared/components/SearchBar"
import NotificationBell from "../../components/shared/components/NotificationBell"
import ActivityContainer from "../../components/shared/components/ActivityContainer"

const Dashboard = () => {

  const { data } = useFetch('users/get-users', 'GET');

  console.log(data);
  return (
    <div className='bg-slat-100 h-[100%] flex flex-col justify-center flex-[80%]'>
      <div className='bg-cya-200 flex-[.4] flex justify-end'>
        <div className='bg-blu-200 h-[8rem] w-[50%] flex justify-start items-end'>
          <SearchBar/>
        </div>
        <div className='bg-gree-200 h-[8rem]  flex items-end justify-end'>
          <NotificationBell/>
        </div>
      </div>
      <div className='bg-re-200 flex-[.6]'>
        <ActivityContainer>
          <div></div>
        </ActivityContainer>
      </div>
    </div>
  )
}

export default Dashboard