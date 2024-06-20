import React from 'react'
import './HomePageComponent.css'

const DisplayComponent = ({ item }) => {
  return (
    <React.Fragment>
      <img src={item.movieImage} width="200px" height="300px" style={{ verticalAlign: "top" }}/>

      <div className="sub-container">
      <i class="bi bi-star-fill"></i>
      <span style={{marginLeft:"10px"}}>{item.imdbRating}/10</span>
      <span style={{marginLeft:"10px"}}>{item.votes} Votes</span>
      </div>

      <p style={{textAlign:"center",marginBottom:"0"}}>{item.movieName}</p>
      <p style={{textAlign:"center",marginTop:"8px",paddingTop:"0"}}>{item.movieGenre1}/{item.movieGenre2}</p>
    </React.Fragment>
  )
}

export default DisplayComponent