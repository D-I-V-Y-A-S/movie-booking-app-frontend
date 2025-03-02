import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './UserLoginComponent.css'
import axios from 'axios'
import backgroundImage from './movie.jpg';
import { BE_URL } from '../../info';

const UserLoginComponent = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailHandler = (event) => {
    setEmail(event.target.value)
  }

  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    console.log(`${BE_URL}`)
  })

  const passwordHandler = (event) => {
    setPassword(event.target.value)
  }

  const formSubmitHandler = (event) => {
    event.preventDefault()
   
    axios
      .post(`${BE_URL}/userLogin`, { userEmail: email, userPassword: password })
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
          <p style={{ fontWeight: "bolder", color: "white", fontSize: "35px", textAlign: "center" }}><b>LOGIN</b></p>
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
          <span style={{ color: "white" }} >Are u an admin, </span><Link to='/adminLogin' style={{ color: "skyblue" }}>login here!</Link>
          <p><span style={{ color: "white" }} >Don't have user account, </span><Link to='/userSignup' style={{ color: "skyblue" }}>SignUp here!</Link></p>
        </form>
      </div>
    </React.Fragment>
  )
}

export default UserLoginComponent


//username:divyacprime@gmail.com
//Password:Divya