import React, { useEffect, useState } from 'react'
import './HomePageComponent.css'
import DisplayComponent from './DisplayComponent'
import axios from 'axios'

const HomePageComponent = () => {

  const [movieData, setMovieData] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3500/api/v1/movie')
      .then(response => {setMovieData(response.data)
        console.log(response.data)
      })
      .catch((error) => { alert(`Status : ${error.response.status} - ${error.response.data.message}`) })
  },[])

  return (
    <React.Fragment>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
      <nav className="navbar">
        <div className="logo">
          <i className="bi bi-film"></i>
          <a href="#">FILM FIESTA</a>
        </div>
       
       
        <input
          type="text"
          name="search"
          placeholder="search by movieName"
        // value={searchInput}
        >
        </input>

        <div className="menu">
          <div className="menu-links">
            <a href="#">View Bookings</a>
          </div>
          <button className="log-in">Login/signup</button>
        </div>
        <div className="menu-btn">
          <i className="fa-solid fa-bars"></i>
        </div>
      </nav>
      <div className='box'>
<div className='container'>
      {movieData && movieData.map((item,index) => (
        <div key={index} className='items'>
          <DisplayComponent item={item} />
        </div>  
      ))}
        </div>
        </div>
    </React.Fragment>
  )
}

export default HomePageComponent