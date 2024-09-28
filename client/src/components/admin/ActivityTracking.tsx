import AcitvityCard from "../shared/components/AcitvityCard"

const ActivityTracking = () => {
  return (
    <div className='bg-cya-100 h-[100%] flex justify-end items-center px-[4rem] pb-[4rem] gap-[8rem] flex-[80%]'>
        <AcitvityCard label="LOGIN TIMES" loginData={20}/>
        <AcitvityCard label="LOGIN ATTEMPTS" loginData={20}/>
    </div>
  )
}

export default ActivityTracking