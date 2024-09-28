import AcitvityCard from "../shared/components/AcitvityCard"

const UserManagement = () => {
  return (
    <div className='bg-cya-100 h-[100%] flex justify-end items-center px-[4rem] pb-[4rem] gap-[8rem] flex-[80%]'>
        <AcitvityCard label='USER LISTS'/>
        <AcitvityCard label='USER DETAILS'/>
    </div>
  )
}

export default UserManagement