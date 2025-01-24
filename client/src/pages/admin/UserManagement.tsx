
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { User } from '../../types/studentTypes';
import UserMngRow from '../../components/admin/UserMngRow';
const UserManagement = () => {

  const { data } = useFetch('user/get-users', 'GET');

  const [users, setUsers] = useState<User[]>([]);
  
  //Set Users
  useEffect(() => {
    if(Array.isArray(data)) {
      let users: User[] = data;
      setUsers(users.filter(user => user.role !== 'admin'));
    }
  }, [data]);



  //Edit Form
  // const [isAddOpen, setIsAddOpen] = useState(false);
  // const [error, setError] = useState('');

  return (
      <div className='bg-cya-100 h-[98%] flex flex-col flex-[80%] 
      rounded-lg px-10 py-6 shadow-pageComponentShadow relative'>
        <div className="bg-gree-300 flex flex-[18%]">
        <h1 className="text-[1.7rem] font-semibold text-slate-800 self-center">User Management</h1>
        </div>

        <div className="bg-re-300 flex-[82%] mb-[1rem] overflow-y-scroll">
          <table className="w-full font-semibold text-white">
            <thead className="bg-blue-500 sticky top-0 z-10">
                <tr>
                    <th className="px-4 py-4 text-center min-w-[5rem] border-l-2 border-blue-500">ID</th>
                    <th className="px-4 py-4 text-center min-w-[8rem]">Name</th>
                    <th className="px-4 py-4 text-center min-w-[12rem]">Email</th>
                    <th className="px-4 py-4 text-center min-w-[5rem]">Gender</th>
                    <th className="px-4 py-4 text-center min-w-[5rem]">Role</th>
                    <th className="px-4 py-4 text-center min-w-[5rem]">Status</th>
                    <th className="px-4 py-4 text-center min-w-[5rem]">Joined On</th>
                    <th className="px-4 py-4 text-center min-w-[5rem] border-r-2 border-blue-500">Action</th>
                </tr>
            </thead>
            <tbody className="text-gray-700">
              {users.map((user => {
                return <UserMngRow key={user.id} user={user} setUsers={setUsers}/>
              }))}
            </tbody>
          </table>
        </div>
      </div>
  )
}

export default UserManagement