import { Routes, Route } from "react-router-dom"
import AdminLayout from "../layouts/AdminLayout"
import Dashboard from "../pages/admin/Dashboard"
import ActivityTracking from "../pages/admin/ActivityTracking"
import NotFound from "./NotFound"
import ManageFaculty from "../pages/admin/usermanagement/ManageFaculty"
import ManageStudents from "../pages/admin/usermanagement/ManageStudents"
import CourseSubjects from "../pages/admin/CourseSubjects"
// import useAuth from "../hooks/useAuth" 

const AdminRoutes = () => {

  return (
    <Routes>
        <Route element={<AdminLayout/>}>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/course-subjects' element={<CourseSubjects/>}/>
            <Route path='/activity-tracking' element={<ActivityTracking/>}/>
            <Route path='/faculty-user-management' element={<ManageFaculty/>}/>
            <Route path='/student-user-management' element={<ManageStudents/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default AdminRoutes