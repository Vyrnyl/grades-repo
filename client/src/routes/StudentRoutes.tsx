
import { Routes, Route, useNavigate } from "react-router-dom"
import StudentLayout from '../layouts/StudentLayout'
import DashBoard from '../pages/student/DashBoard'
import Account from '../pages/student/Account'
import Notification from "../pages/student/Notification"
import GWAStatus from "../pages/student/GWAStatus"
import NotFound from "./NotFound"
import verifyUserRole from "../utils/verifyUserRole"

const StudentRoutes = () => {
  
  return (
    <Routes>
        <Route element={<StudentLayout/>}>
            <Route path='/' element={<DashBoard/>}/>
            <Route path='/account' element={<Account/>}/>
            <Route path='/notification' element={<Notification/>}/>
            <Route path='/gwastatus' element={<GWAStatus/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default StudentRoutes