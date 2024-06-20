import React from 'react'
import HomePageComponent from './Components/HomePageComponent/HomePageComponent'
import UserLoginComponent from './Components/UserLoginComponent/UserLoginComponent'
import UserLogoutComponent from './Components/UserLogoutComponent/UserLogoutComponent'
import AdminLoginComponent from './Components/AdminLoginComponent/AdminLoginComponent'
import AdminLogoutComponent from './Components/AdminLogoutComponent/AdminLogoutComponent'
import { Link, Route, BrowserRouter as  Router, Routes } from 'react-router-dom'
import UserSignupComponent from './Components/UserSignupComponent/UserSignupComponent'

const App = () => {
  return (
    <Router>
      <Routes>
      <Route exact path='/' element={<UserLoginComponent />}></Route>
        <Route exact path='/moviesPage' element={<HomePageComponent />}></Route>
        <Route exact path='/userLogout' element={<UserLogoutComponent />}></Route>
        <Route exact path='/adminLogin' element={<AdminLoginComponent />}></Route>
        <Route exact path='/adminLogout' element={<AdminLogoutComponent />}></Route>
        <Route exact path='/userSignup' element={<UserSignupComponent />}></Route>
      </Routes>
    </Router>
  )
}

export default App