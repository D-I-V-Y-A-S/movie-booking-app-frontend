import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './UserLoginComponent.css'
import axios from 'axios'

const UserLoginComponent = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailHandler = (event) => {
    setEmail(event.target.value)
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value)
  }

  const formSubmitHandler = (event) => {
    event.preventDefault()
    axios
      .post(`http://localhost:3500/api/v1/movie/userLogin`, { userEmail: email, userPassword: password })
      .then(response => {
        alert(`Welcome ${response.data.firstName} ${response.data.lastName}`)
        window.localStorage.setItem('token', response.data.token)
        window.location.href = "/moviesPage"
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
          <Link to='/' style={{ color: "white" }}>Login</Link>
          <Link to='/userSignup' style={{ color: "white" }}>Signup</Link>
        </div>

        <div className="menu-btn">
          <i className="fa-solid fa-bars"></i>
        </div>
      </nav>

      <div className='form-login'>
        <form onSubmit={formSubmitHandler} className='box'>
          <p style={{ fontWeight: "bolder", fontSize: "35px", textAlign: "center" }}><b>LOGIN</b></p>
          <label><b>UserName</b></label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder='Enter your email'
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}"
            onChange={emailHandler}
            required
          />
          <label><b>Password</b></label>
          <input
            type="password"
            name="password"
            value={password}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            placeholder='Enter Your Password'
            title="Password must contain at least one number, one uppercase and lowercase letter, and be at least 8 characters long"
            onChange={passwordHandler}
            required
          />
          <div className='submit'>
            <button type="submit">Login</button>
          </div>
          Don't have an account, <Link to='/userSignup'>SignUp here!</Link>
        </form>
      </div>
    </React.Fragment>
  )
}

export default UserLoginComponent