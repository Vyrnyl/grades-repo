import ListContainer from "../../components/shared/admin/ListContainer"
import AcitvityCard from "../../components/shared/components/AcitvityCard"

const UserManagement = () => {



  return (
    <div className='bg-cyan-100 h-[100%] flex justify-end items-center px-[4rem] pb-[4rem] gap-[8rem] flex-[80%] 
    relative'>
        <AcitvityCard label='USER LISTS'/>
        <AcitvityCard label='USER DETAILS'/>
        {/* <ListContainer/> */}
    </div>
  )
}

export default UserManagement