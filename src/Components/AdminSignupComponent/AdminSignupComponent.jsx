import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './AdminSignupComponent.css'
import axios from 'axios'
import backgroundImage from './movie.jpg'

const AdminSignupComponent = () => {
  const [adminData, setadminData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  const { firstName, lastName, email, password } = adminData

  const inputHandler = (event) => {
    const { name, value } = event.target
    setadminData({ ...adminData, [name]: value })
  }
  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`
  })

  const formSubmitHandler = (event) => {
    console.log("HI")
    event.preventDefault()
    axios
      .post(`https://mern-movie-booking-backend-task.vercel.app/api/v1/movie/adminSignUp`, { data: adminData })
      .then(response => {
        alert(`Successfully created account for ${response.data.firstName} ${response.data.lastName}`)
        window.location.href = '/adminLogin'
      })
      .catch((error) => { alert(`Status : ${error.response.status} - ${error.response.data.message}`) })
  }

  return (
    <React.Fragment>
      <div className='signUp'>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
        <nav className="navbar">
          <div className="logo">
            <i className="bi bi-film"></i>
            <a href="#">FILM FIESTA</a>
          </div>

          <div className="menu">
            <Link to='/adminLogin' style={{ color: "white" }}>Login</Link>
            <Link to='/adminSignup' style={{ color: "white" }}>Signup</Link>
          </div>

          <div className="menu-btn">
            <i className="fa-solid fa-bars"></i>
          </div>
        </nav>

        <div className='form'>
          <form onSubmit={formSubmitHandler} className='box'>
            <p style={{ fontWeight: "bolder", fontSize: "35px", textAlign: "center" }}><b>ADMIN SIGNUP</b></p>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              placeholder='Enter your first name'
              onChange={inputHandler}
              required
            />
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder='Enter your last name'
              value={lastName}
              onChange={inputHandler}
              required
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder='Enter your email'
              pattern="[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}"
              onChange={inputHandler}
              required
            />
            <label><b>Password</b></label>
            <input
              type="password"
              name="password"
              value={password}
              pattern="(?=.*[a-z])(?=.*[A-Z]).{4,}"
              placeholder='Enter Your Password'
              title="Password must contain at least one uppercase and lowercase letter, and be at least 4 characters long"
              onChange={inputHandler}
              required
            />
            <div className='submit'>
              <button type="submit">Signup</button>
            </div>
            <span style={{ color: "white" }} >Already have admin account,</span><Link to='/adminLogin' style={{ color: "skyblue" }}>Login here!</Link>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AdminSignupComponent