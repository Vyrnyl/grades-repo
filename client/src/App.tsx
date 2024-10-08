import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { jwtDecode, JwtPayload} from 'jwt-decode'

import './App.css'
import AdminRoutes from "./routes/AdminRoutes";
import FacultyRoutes from "./routes/FacultyRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import LoginPage from "./components/shared/LoginPage"

function App() {

  const token = localStorage.getItem('atoken') || '';
  const userInfo: { role: string } = jwtDecode(token);

  const role = (userRole: string) => {
      switch(userRole) {
        case 'admin':
            return <Route path='/*' element={<AdminRoutes/>}/>;
        case 'student':
            return <Route path='/*' element={<StudentRoutes/>}/>;
        case 'faculty':
            return <Route path='/*' element={<FacultyRoutes/>}/>;
        default: <Navigate to='/login'/>
      };
  }

  return (
    <>
      {/* <h1 className=''>MAIN PAGE</h1> */}
      <Router>
        <Routes>
          {role(userInfo.role)}
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App