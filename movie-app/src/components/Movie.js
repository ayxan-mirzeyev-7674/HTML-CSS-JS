import React, { useEffect, useState } from "react";
import "./Movie.css";
import {Routes, Route, useNavigate} from 'react-router-dom';

function Movie() {

  const navigate = useNavigate();

  const [movieList, setMovieList] = useState([]);

  const API_URL =
    "https://api.themoviedb.org/3/discover/movie?api_key=a61f82bcd972f2fee764dac5ba9cde10";
  const SEARCH_API =
    'https://api.themoviedb.org/3/search/movie?api_key=a61f82bcd972f2fee764dac5ba9cde10&query="';

  const getMovie = (URL) => {
    setMovieList([]);
    fetch(URL)
      .then((response) => response.json())
      .then((json) => setMovieList(json.results));
  };

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      if (e.target.value && e.target.value != " ") {
        e.preventDefault();
        console.log(e.target.value);
        getMovie(SEARCH_API + e.target.value);
      } else{
        getMovie(API_URL);
      }
      e.target.value = "";
    }
  };

  const openInNewTab = (id) => {
    window.open("https://www.themoviedb.org/movie/"+id, "_blank", "noreferrer");
  };

  useEffect(() => {
    getMovie(API_URL);
  }, []);

  return (
    <>
      <div className="top">
        <input className="search-bar" onKeyDown={handleSubmit} placeholder="Search..." />
      </div>
      <div className="container">
        {movieList.map((movie) => {
          return (
            <div className="list-item">
              <div className="upper">
                <img
                  className="movie-img"
                  src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                  onError={(image) => (image.target.style.display = "none")}
                />
              </div>
              <div className="lower">
                <h3>{movie.original_title}</h3>
                <span
                  className="movie-rate"
                  style={
                    movie.vote_average >= 8
                      ? { color: "lightgreen" }
                      : { color: "orange" }
                  }
                >
                  {movie.vote_average}
                </span>
              </div>
              <div className="overview">
                <h2>Overview <button onClick={() => {openInNewTab(movie.id)}}>More</button></h2>
                <p>{movie.overview}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Movie;
