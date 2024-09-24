
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import StudentLayout from '../layouts/StudentLayout'
import DashBoard from '../components/student/DashBoard'
import Account from '../components/student/Account'
import Notification from "../components/student/Notification"
import GWAStatus from "../components/student/GWAStatus"

const StudentRoutes = () => {
  return (
    <Routes>
        <Route element={<StudentLayout/>}>
            <Route path='/' element={<DashBoard/>}/>
            <Route path='/account' element={<Account/>}/>
            <Route path='/notification' element={<Notification/>}/>
            <Route path='/gwastatus' element={<GWAStatus/>}/>
        </Route>
    </Routes>
  )
}

export default StudentRoutes