import { useEffect, useState } from "react";
import UserRow from "../../components/admin/UserRow"
import useFetch from "../../hooks/useFetch";
import { User } from "../../types/studentTypes";

const UserManagement = () => {

  const { data } = useFetch('user/get-users', 'GET');
  const [users, setUsers] = useState<User[] | []>([]);

  useEffect(() => {
    if(Array.isArray(data)) {
        const list = data.filter((d) => d.role !== 'admin');
        setUsers(list);
    }
  }, [data]);

  return (
    <div className='bg-cya-100 h-[98%] flex flex-col flex-[80%] rounded-lg px-10 py-6 shadow-pageComponentShadow relative'>
      
      <div className="bg-gree-300 flex flex-[18%]">
        <h1 className="text-[1.5rem] font-bold text-slate-700 self-center">USER LIST</h1>
      </div>

      <div className="bg-re-300 flex-[82%] mb-[1rem] overflow-y-scroll">
        <table className="w-full font-semibold text-white">
          <thead className="bg-blue-500 sticky top-0 z-10">
              <tr>
                  <th className="px-4 py-4 text-center min-w-[5rem]">ID</th>
                  <th className="px-4 py-4 text-center min-w-[8rem]">Name</th>
                  <th className="px-4 py-4 text-center min-w-[12rem]">Email</th>
                  <th className="px-4 py-4 text-center min-w-[5rem]">Role</th>
                  <th className="px-4 py-4 text-center min-w-[5rem]">Gender</th>
                  <th className="px-4 py-4 text-center min-w-[5rem]">Status</th>
                  <th className="px-4 py-4 text-center min-w-[5rem]">Action</th>
              </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.map((user, i) => {
              return <UserRow 
                key={i}
                user={user}
                setUsers={setUsers}
              />
            })}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default UserManagement