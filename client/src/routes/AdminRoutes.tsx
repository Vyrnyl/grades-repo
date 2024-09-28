import { Routes, Route } from "react-router-dom"
import AdminLayout from "../layouts/AdminLayout"
import Dashboard from "../components/admin/Dashboard"

const AdminRoutes = () => {
  return (
    <Routes>
        <Route element={<AdminLayout/>}>
            <Route path='/' element={<Dashboard/>}/>
        </Route>
    </Routes>
  )
}

export default AdminRoutes