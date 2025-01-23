
import { Routes, Route } from "react-router-dom"
import StudentLayout from '../layouts/StudentLayout'
import DashBoard from '../pages/student/DashBoard'
import Account from '../pages/student/Account'
import GWAStatus from "../pages/student/GWAStatus"
import NotFound from "./NotFound"
import ViewGrade from "../pages/student/ViewGrade"

const StudentRoutes = () => {
  
  return (
    <Routes>
        <Route element={<StudentLayout/>}>
            <Route path='/' element={<DashBoard/>}/>
            <Route path='/account' element={<Account/>}/>
            {/* <Route path='/notification' element={<Notification/>}/> */}
            <Route path='/view-grade' element={<ViewGrade/>}/>
            <Route path='/gwastatus' element={<GWAStatus className=""/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default StudentRoutes