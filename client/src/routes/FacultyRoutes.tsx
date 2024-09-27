import { Routes, Route } from "react-router-dom"
import FacultyLayout from "../layouts/FacultyLayout"
import Dashboard from "../components/faculty/Dashboard"
import Account from "../components/faculty/Account"
import CourseManagement from "../components/faculty/CourseManagement"
import GradeEntry from "../components/faculty/GradeEntry"

const FacultyRoutes = () => {
  return (
    <Routes>
        <Route element={<FacultyLayout/>}>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/account' element={<Account/>}/>
            <Route path='/course-management' element={<CourseManagement/>}/>
            <Route path='/grade-entry' element={<GradeEntry/>}/>
        </Route>
    </Routes>
  )
}

export default FacultyRoutes