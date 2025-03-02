import React, { useEffect, useState } from 'react'
import './HomePageComponent.css'
import DisplayComponent from './DisplayComponent'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BE_URL } from '../../info'
import { useNavigate } from "react-router-dom";

const HomePageComponent = () => {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [filteredMovies, setFilteredMovies] = useState([])

  const token = localStorage.getItem('token');

  // useEffect(() => {
  //   if (token) {
  //     document.body.style.backgroundColor = "silver";
  //     axios.get(`${BE_URL}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  //       .then(response => {
  //         if (response.status === 200) {
  //           setMovieData(response.data)
  //           // console.log(response.data)
  //         }
  //       })
  //       .catch((error) => { alert(`Status : ${error.response.status} - ${error.response.data.message}`) })
  //   }
  //   else {
  //     alert("Login to view movies!!");
  //     navigate('/');
  //   }
  // }, [])

  useEffect(() => {
    if (token) {
      document.body.style.backgroundColor = "silver";  // Reset background
      document.body.style.backgroundImage = "none";    // Clear previous image
  
      axios.get(`${BE_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.status === 200) {
          setMovieData(response.data);
        }
      })
      .catch((error) => { 
        alert(`Status : ${error.response.status} - ${error.response.data.message}`); 
      });
  
    } else {
      alert("Login to view movies!!");
      navigate('/');
    }
  
    return () => {
      document.body.style.backgroundImage = "none"; // Cleanup when component unmounts
    };
  }, []);
  

  const searchHandler = (event) => {
    setSearchInput(event.target.value)
    axios.get(`${BE_URL}/${searchInput}` ,{
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