import { Routes, Route } from "react-router-dom"
import FacultyLayout from "../layouts/FacultyLayout"
import Dashboard from "../pages/faculty/Dashboard"
import Account from "../pages/faculty/Account"
import CourseManagement from "../pages/faculty/CourseManagement"
import GradeEntry from "../pages/faculty/GradeEntry"
import NotFound from "./NotFound"

const FacultyRoutes = () => {
  return (
    <Routes>
        <Route element={<FacultyLayout/>}>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/account' element={<Account/>}/>
            <Route path='/course-management' element={<CourseManagement/>}/>
            <Route path='/grade-entry' element={<GradeEntry/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default FacultyRoutes