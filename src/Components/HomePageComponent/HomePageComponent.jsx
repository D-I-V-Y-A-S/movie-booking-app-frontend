import React, { useEffect, useState } from 'react'
import './HomePageComponent.css'
import DisplayComponent from './DisplayComponent'
import axios from 'axios'
import { Link, Route } from 'react-router-dom'
import UserLoginComponent from '../UserLoginComponent/UserLoginComponent'

const HomePageComponent = () => {
  const [movieData, setMovieData] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [filteredMovies, setFilteredMovies] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3500/api/v1/movie')
      .then(response => {
        setMovieData(response.data)
        console.log(response.data)
      })
      .catch((error) => { alert(`Status : ${error.response.status} - ${error.response.data.message}`) })
  }, [])

  const searchHandler = (event) => {
    setSearchInput(event.target.value)
    axios.get(`http://localhost:3500/api/v1/movie/${searchInput}`)
      .then(response=>setFilteredMovies(response.data))
      .catch((error) => { alert(`Status : ${error.response.status} - ${error.response.data.message}`)})
  }

  return (
    <div className='movies'>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
      <nav className="navbar">
        <div className="logo">
          <i className="bi bi-film"></i>
          <a href="#">FILM FIESTA</a>
        </div>


        <input
          type="text"
          name="searchInput"
          placeholder="search by movieName"
          value={searchInput}
          onChange={searchHandler}
        />

        <div className="menu">
          <div className="menu-links">
            <a href="#">View Bookings</a>
          </div>
          <Link to='/userLogout' className="log-out">Logout</Link>
        </div>
        <div className="menu-btn">
          <i className="fa-solid fa-bars"></i>
        </div>
      </nav>

      <div className='box'>
        <div className='container'>
          {filteredMovies.length===0 ?
          (movieData && movieData.map((item, index) => (
            <div key={index} className='items'>
              <DisplayComponent item={item} />
            </div>
          ))):
          (filteredMovies && filteredMovies.map((item, index) => (
            <div key={index} className='items'>
              <DisplayComponent item={item} />
            </div>
          ))) }
        </div>
      </div>
    </div>

  )
}

export default HomePageComponent