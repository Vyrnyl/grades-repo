import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import StudentRoutes from "./routes/StudentRoutes"
import FacultyRoutes from "./routes/FacultyRoutes"
import './App.css'

function App() {

  return (
    <>
      {/* <h1 className=''>MAIN PAGE</h1> */}
      
      <Router>
        <Routes>
          <Route path='/*' element={<FacultyRoutes/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App