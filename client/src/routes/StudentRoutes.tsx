import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import StudentLayout from '../layouts/StudentLayout'
import DashBoard from '../components/student/DashBoard'
import Account from '../components/student/Account'

const StudentRoutes = () => {
  return (
    <Routes>
        <Route element={<StudentLayout/>}>
            <Route path='/' element={<DashBoard/>}/>
            <Route path='/account' element={<Account/>}/>
        </Route>
    </Routes>
  )
}

export default StudentRoutes