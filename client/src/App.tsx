import { BrowserRouter as Router, Routes, Route, } from "react-router-dom"

import './App.css'
import AdminRoutes from "./routes/AdminRoutes";
import FacultyRoutes from "./routes/FacultyRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import LoginPage from "./components/shared/LoginPage"
import { useEffect, useState } from "react";
import LogoutRoute from "./routes/LogoutRoute";
import tokenInfo from "./utils/tokenInfo";
import SignupPage from "./components/shared/SignupPage";

function App() {

  const [userRole, setUserRole] = useState('');

  const { role } = tokenInfo();

  useEffect(() => {

    if(role) {
      setUserRole(role);
    }
    
  });
  
  const userRoutes = (userRole: string) => {
      switch(userRole) {
        case 'admin':
            return <Route path='/*' element={<AdminRoutes/>}/>;
        case 'student':
            return <Route path='/*' element={<StudentRoutes/>}/>;
        case 'faculty':
            return <Route path='/*' element={<FacultyRoutes/>}/>;
        default:
          return <Route path='/*' element={<LogoutRoute role={role}/>}/>;
      };
  }
  

  return (
    <>
      {/* <h1 className=''>MAIN PAGE</h1> */}
      <Router>
        <Routes>
          {userRoutes(userRole)}
          <Route path='/login' element={<LoginPage setUserRole={setUserRole} />}/>
          <Route path='/signup' element={<SignupPage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App