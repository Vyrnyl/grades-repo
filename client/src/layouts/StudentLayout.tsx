import { Outlet } from "react-router-dom"
import Sidebar from "../components/shared/Sidebar"

const StudentLayout = () => {
  return (
    <div className="bg-slate-200 h-[100vh] flex items-center gap-[4rem] p-2 pr-8">
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export default StudentLayout