import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MoviesPageComponent from './MoviesPageComponent'
import { BE_URL } from '../../info'
import { useNavigate } from "react-router-dom";

const AdminPageComponent = () => {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [filteredMovies, setFilteredMovies] = useState([])

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      document.body.style.backgroundColor = "silver";
      axios.get(`${BE_URL}/admin`, {
        headers: {
          Authorization: `Bearer ${token}`
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
      alert("Login to view moviesPage!!");
      navigate('/adminLogin');
    }
  }, [])

  const searchHandler = (event) => {
    setSearchInput(event.target.value)
    axios.get(`${BE_URL}/admin/${searchInput}`,{ headers: {
      Authorization: `Bearer ${token}`
    }})
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
            <Link to='/addMovie'>Add movie</Link>
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
                <MoviesPageComponent item={item} />
              </div>
            ))
          ) : (
            filteredMovies && filteredMovies.map((item, index) => (
              <div key={index} className='items'>
                <MoviesPageComponent item={item} />
              </div>
            ))
          )
          }
        </div>
      </div>
    </React.Fragment>
  );
}

export default AdminPageComponent