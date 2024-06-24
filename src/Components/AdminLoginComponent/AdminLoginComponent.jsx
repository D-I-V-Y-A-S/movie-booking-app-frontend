import React, { useEffect, useState } from 'react'
import './AdminLoginComponent.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import backgroundImage from './movie.jpg'

const AdminLoginComponent = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
  })

  const emailHandler = (event) => {
    setEmail(event.target.value)
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value)
  }

  const formSubmitHandler = (event) => {
    event.preventDefault()
    axios
      .post(`https://mern-movie-booking-backend-task.vercel.app/api/v1/movie/adminLogin`, { adminEmail: email, adminPassword: password })
      .then(response => {
        alert(`Welcome ${response.data.firstName} ${response.data.lastName}`)
        window.localStorage.setItem('token', response.data.token)
        window.location.href = "/adminPage"
      })
      .catch((error) => { alert(`Status : ${error.response.status} - ${error.response.data.message}`) })
  }

  return (
    <React.Fragment>
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

      <div className='form-login'>
        <form onSubmit={formSubmitHandler} className='box'>
          <p style={{ fontWeight: "bolder", color: "white", fontSize: "35px", textAlign: "center" }}><b>ADMIN LOGIN</b></p>
          <label><b>UserName</b></label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder='Enter your email'
            onChange={emailHandler}
            required
          />
          <label><b>Password</b></label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder='Enter Your Password'
            onChange={passwordHandler}
            required
          />
          <div className='submit'>
            <button type="submit">Login</button>
          </div>
          <p> <span style={{ color: "white" }} >Are u a user, </span><Link to='/' style={{ color: "skyblue" }}>Login here!</Link></p>
          <span style={{ color: "white" }} >Don't have admin account, </span><Link to='/adminSignup' style={{ color: "skyblue" }}>SignUp here!</Link>
        </form>
      </div>
    </React.Fragment>
  )
}

export default AdminLoginComponent