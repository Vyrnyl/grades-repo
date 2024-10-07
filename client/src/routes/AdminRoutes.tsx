import { Routes, Route } from "react-router-dom"
import AdminLayout from "../layouts/AdminLayout"
import Dashboard from "../pages/admin/Dashboard"
import ActivityTracking from "../pages/admin/ActivityTracking"
import UserManagement from "../pages/admin/UserManagement"
import NotFound from "./NotFound"
// import useAuth from "../hooks/useAuth" 

const AdminRoutes = () => {

  return (
    <Routes>
        <Route element={<AdminLayout/>}>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/activity-tracking' element={<ActivityTracking/>}/>
            <Route path='/user-management' element={<UserManagement/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default AdminRoutes