
import SearchBar from '../../components/shared/components/SearchBar'
import Profile from '../../components/shared/components/Profile'
import NotificationBell from '../../components/shared/components/NotificationBell'
import ActivityContainer from '../../components/shared/components/ActivityContainer'
import useUserStore from '../../store/useUserStore'

const DashBoard = () => {
  
  const { userInfo } = useUserStore();
  // const { data } = useFetch('users/get-users', 'GET');
  // console.log(data);

  
  return (
    <div className='bg-slat-100 h-[100%] w-[80%] flex flex-col justify-center'>
      <div className='bg-cya-200 flex-[.4] flex '>
        <div className='bg-blu-200 h-[8rem] w-[50%] flex justify-start  items-end'>
          <SearchBar/>
        </div>
        <div className='bg-green200 h-[8rem] w-[50%] flex items-end justify-end'>
          <Profile firstName={userInfo?.firstName} lastName={userInfo?.lastName} yearLevel={userInfo?.yearLevel}/>
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

export default DashBoard

