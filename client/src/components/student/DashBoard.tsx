
import SearchBar from '../shared/components/SearchBar'
import Profile from '../shared/components/Profile'
import NotificationBell from '../shared/components/NotificationBell'
import ActivityContainer from '../shared/components/ActivityContainer'

const DashBoard = () => {
  return (
    <div className='bg-slat-100 h-[100%] flex flex-col justify-center flex-[.8]'>
      <div className='bg-cya-200 flex-[.4] flex '>
        <div className='bg-blu-200 h-[8rem] w-[50%] flex justify-start  items-end'>
          <SearchBar/>
        </div>
        <div className='bg-green200 h-[8rem] w-[50%] flex items-end justify-end'>
          <Profile/>
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

