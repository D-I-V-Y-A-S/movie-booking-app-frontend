import React from 'react'
import HomePageComponent from './Components/HomePageComponent/HomePageComponent'
import UserLoginComponent from './Components/UserLoginComponent/UserLoginComponent'
import UserLogoutComponent from './Components/UserLogoutComponent/UserLogoutComponent'
import AdminLoginComponent from './Components/AdminLoginComponent/AdminLoginComponent'
import { Link, Route, BrowserRouter as  Router, Routes } from 'react-router-dom'
import UserSignupComponent from './Components/UserSignupComponent/UserSignupComponent'
import BookingComponent from './Components/BookingComponent/BookingComponent'
import ViewBookingsComponent from './Components/ViewBookingsComponent/ViewBookingsComponent'
import AddMoviesComponent from './Components/AddMoviesComponent/AddMoviesComponent'
import AdminPageComponent from './Components/AdminPageComponent/AdminPageComponent'
import AdminSignupComponent from './Components/AdminSignupComponent/AdminSignupComponent'

const App = () => {
  return (
    <Router>
      <Routes>
      <Route exact path='/' element={<UserLoginComponent />}></Route>
        <Route exact path='/moviesPage' element={<HomePageComponent />}></Route>
        <Route exact path='/userLogout' element={<UserLogoutComponent />}></Route>
        <Route exact path='/adminSignup' element={<AdminSignupComponent />}></Route>
        <Route exact path='/adminLogin' element={<AdminLoginComponent />}></Route>
        <Route exact path='/userSignup' element={<UserSignupComponent />}></Route>
        <Route exact path='/booking' element={<BookingComponent />}></Route>
        <Route exact path='/tickets' element={<ViewBookingsComponent />}></Route>
        <Route exact path='/addMovie' element={<AddMoviesComponent />}></Route>
        <Route exact path='/adminPage' element={<AdminPageComponent />}></Route>
      </Routes>
    </Router>
  )
}

export default App