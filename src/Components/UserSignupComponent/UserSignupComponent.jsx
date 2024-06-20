import React, { useState } from 'react'
import './UserSignupComponent.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const UserSignupComponent = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  const { firstName, lastName, email, password } = userData

  const inputHandler = (event) => {
    const { name, value } = event.target
    setUserData({ ...userData, [name]: value })
  }

  const formSubmitHandler = (event) => {
    event.preventDefault()
    axios
      .post(`http://localhost:3500/api/v1/movie/userSignUp`, { data: userData })
      .then(response => {
        alert(`Successfully created account for ${response.data.firstName} ${response.data.lastName}`)
        window.location.href = '/'
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

      <div className='form'>
        <form onSubmit={formSubmitHandler} className='box'>
          <p style={{ fontWeight: "bolder", fontSize: "35px", textAlign: "center" }}><b>SIGNUP</b></p>
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
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}"
            onChange={inputHandler}
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
            onChange={inputHandler}
            required
          />
          <div className='submit'>
            <button type="submit">Signup</button>
          </div>
          Already have an account,<Link to='/'>Login here!</Link>
        </form>
      </div>
    </React.Fragment>
  )
}

export default UserSignupComponent