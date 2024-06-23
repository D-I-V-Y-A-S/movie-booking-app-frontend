import React, { useEffect, useState } from 'react'
import './AddMoviesComponent.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddMoviesComponent = () => {
  const token = window.localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      document.body.style.backgroundColor = "#40E0D0";
      axios.get('http://localhost:3500/api/v1/movie/checkToken', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          if (response.status === 200) {
            console.log(response.data)
          }
        })
        .catch(error => console.log(error.response.data));
    }
    else {
      alert("Login to add movies!!");
      window.location.href = '/adminLogin'
    }
  }, []);
  const [movieInfo, setMovieInfo] = useState({
    movieId: '',
    movieName: '',
    releaseDate: '',
    movieGenre1: '',
    movieGenre2: '',
    imdbRating: '',
    movieImage: '',
  });

  const inputHandler = (event) => {
    const { name, value } = event.target
    if (name === 'movieGenre1' && value === movieInfo.movieGenre2) {
      alert('Genre 1 and Genre 2 cannot be the same');
      return;
    }

    if (name === 'movieGenre2' && value === movieInfo.movieGenre1) {
      alert('Genre 1 and Genre 2 cannot be the same');
      return;
    }
    setMovieInfo({ ...movieInfo, [name]: value })
    console.log(movieInfo)
  }
  const imageHandler = (event) => {
    const file = event.target.files[0]
    setMovieInfo({ ...movieInfo, movieImage: event.target.files[0] })
    console.log(event.target.files[0])
    console.log(file.name)
  }

  const { movieId, movieName, releaseDate, movieGenre1, movieGenre2, imdbRating, movieImage, theatreName } = movieInfo;

  const formSubmitHandler = async (event) => {
    event.preventDefault()
    console.log(movieGenre1)
    const formData = new FormData()
    formData.append('movieId', movieId)
    formData.append('movieName', movieName)
    formData.append('releaseDate', releaseDate)
    formData.append('movieGenre1', movieGenre1)
    formData.append('movieGenre2', movieGenre2)
    formData.append('imdbRating', imdbRating)
    formData.append('theatreName', theatreName)
    formData.append('movieImage', movieImage)
    console.log(formData)

    await axios.post('http://localhost:3500/api/v1/movie/addMovie', formData)
      .then(response => {
        alert(JSON.stringify(response.data.message))
        window.location.href = '/adminPage'
      }
      )
      .catch(error => alert(JSON.stringify(error.response.data)))
  }

  return (
    <React.Fragment>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
      <nav className="navbar">
        <div className="logo">
          <i className="bi bi-film"></i>
          <a href="#">FILM FIESTA</a>
        </div>

        <div className="menu">
          <Link to='/userLogout' className="log-out">Logout</Link>
        </div>
        <div className="menu-btn">
          <i className="fa-solid fa-bars"></i>
        </div>
      </nav>

      <form className='form-container' onSubmit={formSubmitHandler}>
        <h2 style={{ color: "black" }}>Adding a new movie</h2>

        <div className='form-group'>
          <label>Movie ID</label>
          <input
            type='Number'
            name="movieId"
            placeholder='Enter the movie ID'
            value={movieId}
            onChange={inputHandler}
            required
          />
        </div>
        <div className='form-group'>
          <label>Movie Name</label>
          <input
            type='text'
            name="movieName"
            placeholder='Enter the movie name'
            value={movieName}
            onChange={inputHandler}
            required
          />
        </div>
        <div className='form-group'>
          <label>Release Year</label>
          <input
            type='date'
            name="releaseDate"
            placeholder='Enter the release Year of the movie'
            value={releaseDate}
            onChange={inputHandler}
            required
          />
        </div>

        <div className='form-group'>
          <label>movieGenre1</label>
          <select
            type='text'
            name="movieGenre1"
            placeholder='Enter the genre1'
            value={movieGenre1}
            onChange={inputHandler}
            required>
            <option value="">--select--</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="SciFi">SciFi</option>
            <option value="Horror">Horror</option>
            <option value="Thriller">Thriller</option>
            <option value="Romance">Romance</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Animation">Animation</option>
            <option value="Adventure">Adventure</option>
            <option value="Crime">Crime</option>
            <option value="Biography">Biography</option>
          </select>
        </div>
        <div className='form-group'>
          <label>movieGenre2</label>
          <select
            type='text'
            name="movieGenre2"
            placeholder='Enter the genre2'
            value={movieGenre2}
            onChange={inputHandler}
            required>
            <option value="">--select--</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="SciFi">SciFi</option>
            <option value="Horror">Horror</option>
            <option value="Thriller">Thriller</option>
            <option value="Romance">Romance</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Animation">Animation</option>
            <option value="Adventure">Adventure</option>
            <option value="Crime">Crime</option>
            <option value="Biography">Biography</option>
            <option value="War">War</option>
          </select>
        </div>
        <div className='form-group'>
          <label>IMDB Rating</label>
          <input
            type='Number'
            name="imdbRating"
            value={imdbRating}
            placeholder='Enter the imdb Rating of the movie'
            onChange={inputHandler}
            required
          />
        </div>

        <div className='form-group'>
          <label>MOVIE IMAGE</label>
          <input
            type='file'
            onChange={imageHandler}
            required
          />
        </div>

        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
    </React.Fragment>
  )
}

export default AddMoviesComponent