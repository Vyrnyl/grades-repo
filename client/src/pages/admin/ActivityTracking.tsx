import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

type ActivityType = {
  id: String,
  studentId: String,
  firstName: String,
  lastName: String,
  email: String,
  role: String,
  status: String,
  createdAt: String,
  updatedAt: String
}

const ActivityTracking = () => {

  const { data } = useFetch('activity/get-login-activity', 'GET');
  const [activities, setActivities] = useState<ActivityType[] | []>([]);

  useEffect(() => {
    if(data) {
      setActivities(data as ActivityType[]);
    }
  }, [data]);
  

  return (
    <div className='bg-cya-100 h-[98%] flex flex-col flex-[80%] rounded-lg px-10 py-6 shadow-pageComponentShadow relative'>
      <div className="bg-gree-300 flex flex-[18%]">
      <h1 className="text-[1.5rem] font-bold text-slate-700 self-center">LOGIN ATTEMPTS</h1>
      </div>

      <div className="bg-re-300 flex-[82%] mb-[1rem] overflow-y-scroll">
        <table className="w-full font-semibold text-white">
          <thead className="bg-blue-500 sticky top-0 z-10">
              <tr>
                  <th className="px-4 py-4 text-center min-w-[5rem]">ID</th>
                  <th className="px-4 py-4 text-center min-w-[8rem]">Name</th>
                  <th className="px-4 py-4 text-center min-w-[12rem]">Email</th>
                  <th className="px-4 py-4 text-center min-w-[5rem]">User Type</th>
                  <th className="px-4 py-4 text-center min-w-[5rem]">Time</th>
                  <th className="px-4 py-4 text-center min-w-[5rem]">Date</th>
                  <th className="px-4 py-4 text-center min-w-[5rem]">Status</th>
              </tr>
          </thead>
          <tbody className="text-gray-700">
            {activities.map((activity, i) => {

              const dateObject = new Date(activity.createdAt.toString());

              let hours = dateObject.getUTCHours();
              const minutes = dateObject.getUTCMinutes();

              const period = hours >= 12 ? 'pm' : 'am';
              hours = hours % 12 || 12;

              const minutesStr = minutes.toString().padStart(2, '0');
              const timeFormat = `${hours}:${minutesStr}${period}`;

              return <tr key={i} className="bg-slate-100 hover:bg-slate-200">
                <td className="px-4 py-4 text-center border-2 border-slate-500">{activity.studentId}</td>
                <td className="px-4 py-4 text-center border-2 border-slate-500">{activity.firstName}</td>
                <td className="px-4 py-4 text-center border-2 border-slate-500">{activity.email}</td>
                <td className="px-4 py-4 text-center border-2 border-slate-500">{activity.role}</td>
                <td className="px-4 py-4 text-center border-2 border-slate-500">{timeFormat}</td>
                <td className="px-4 py-4 text-center border-2 border-slate-500">{activity.createdAt.split('T')[0]}</td>
                <td className="px-4 py-4 text-center border-2 border-slate-500">{activity.status}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ActivityTracking