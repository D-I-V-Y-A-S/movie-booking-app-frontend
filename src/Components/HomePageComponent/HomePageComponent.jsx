import React, { useEffect, useState } from 'react'
import './HomePageComponent.css'
import DisplayComponent from './DisplayComponent'
import axios from 'axios'
import { Link } from 'react-router-dom'

const HomePageComponent = () => {
  const [movieData, setMovieData] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [filteredMovies, setFilteredMovies] = useState([])

  const token = window.localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      document.body.style.backgroundColor = "silver";
      axios.get('https://mern-movie-booking-backend-task.vercel.app/api/v1/movie', {
        headers: {
          Authorization: `${token}`
        }
      })
        .then(response => {
          if (response.status === 200) {
            setMovieData(response.data)
            console.log(response.data)
          }
        })
        .catch((error) => { alert(`Status : ${error.response.status} - ${error.response.data.message}`) })
    }
    else {
      alert("Login to view movies!!");
      window.location.href = '/'
    }
  }, [])

  const searchHandler = (event) => {
    setSearchInput(event.target.value)
    axios.get(`https://mern-movie-booking-backend-task.vercel.app/api/v1/movie/${searchInput}` ,{
      headers: {
        Authorization: `Bearer ${token}`
      }
      })
      .then(response => setFilteredMovies(response.data))
      .catch((error) => { alert(`Status : ${error.response.status} - ${error.response.data.message}`) })
  }

  return (
    <React.Fragment>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
      <nav className="navbar">
        <div className="logo">
          <i className="bi bi-film"></i>
          <a href="#">FILM FIESTA</a>
        </div>

        <input
          type="text"
          name="searchInput"
          placeholder="Search by movie name"
          value={searchInput}
          onChange={searchHandler}
        />

        <div className="menu">
          <div className="menu-links">
            <Link to='/tickets'>View Bookings</Link>
          </div>
          <Link to='/userLogout' className="log-out">Logout</Link>
        </div>
        <div className="menu-btn">
          <i className="fa-solid fa-bars"></i>
        </div>
      </nav>

      <div className='box'>
        <div className='container'>
          {filteredMovies.length === 0 ? (
            movieData && movieData.map((item, index) => (
              <div key={index} className='items'>
                <DisplayComponent item={item} />
              </div>
            ))
          ) : (
            filteredMovies && filteredMovies.map((item, index) => (
              <div key={index} className='items'>
                <DisplayComponent item={item} />
              </div>
            ))
          )
          }
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePageComponent