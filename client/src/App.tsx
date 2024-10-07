import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./components/shared/LoginPage"
import './App.css'
import AdminRoutes from "./routes/AdminRoutes";
import FacultyRoutes from "./routes/FacultyRoutes";
import StudentRoutes from "./routes/StudentRoutes";

function App() {
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
          {role('admin')}
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App