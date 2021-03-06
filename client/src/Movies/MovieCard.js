import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieCard = props => {
  // console.log(props.getMovieList)
  const [ poster, setposter] =  useState()
  const [description, setDescription] = useState()
  const { title, director, metascore, stars } = props.movie;
 
  
  useEffect(()=> {
    axios
      .get(`https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${title}`)
      .then(res => setposter(res.data.results[0].poster_path))
      .catch((err) => console.log(err.response));
  },[title])

  useEffect(()=> {
    axios
      .get(`https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${title}`)
      .then(res => setDescription(res.data.results[0].overview))
      .catch((err) => console.log(err.response));
  },[title])
  
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>
      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      <p>{description}</p>
      <img alt="movie poster"src={`http://image.tmdb.org/t/p/w500/${poster}`}/>
      
    </div>
  );
};

export default MovieCard;
