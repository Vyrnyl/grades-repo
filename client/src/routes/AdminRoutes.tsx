import { Routes, Route } from "react-router-dom"
import AdminLayout from "../layouts/AdminLayout"
import Dashboard from "../components/admin/Dashboard"
import ActivityTracking from "../components/admin/ActivityTracking"
import UserManagement from "../components/admin/UserManagement"

const AdminRoutes = () => {
  return (
    <Routes>
        <Route element={<AdminLayout/>}>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/activity-tracking' element={<ActivityTracking/>}/>
            <Route path='/user-management' element={<UserManagement/>}/>
        </Route>
    </Routes>
  )
}

export default AdminRoutes