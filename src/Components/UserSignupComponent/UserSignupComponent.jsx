import React, { useEffect, useState } from 'react'
import './UserSignupComponent.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import backgroundImage from './movie.jpg';

const UserSignupComponent = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })


  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
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
      <div className='signUp'>
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
            <p style={{ fontWeight: "bolder", fontSize: "30px", textAlign: "center" }}><b>SIGNUP</b></p>
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
            <span style={{ color: "white" }} >Are u an admin, </span><Link to='/adminSignup' style={{ color: "skyblue" }}>SignUp here!</Link>
            <p><span style={{ color: "white" }} >Already have user account,</span><Link to='/' style={{ color: "skyblue" }}>Login here!</Link></p>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

export default UserSignupComponent