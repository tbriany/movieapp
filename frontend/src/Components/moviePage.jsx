import '../App.css';
import React, { useState, useEffect } from "react";
import { Switch, Route, Link, withRouter, Redirect } from "react-router-dom";
import axios from "axios";


function MoviePage(props) {
    console.log(props.match.params.id)
    const [movie, setMovie] = useState({})

    useEffect(() => {
        async function fetchMovieData() {
          try {
            const options = {
                method: 'GET',
                url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
                params: {i: props.match.params.id, r: 'json'},
                headers: {
                    'x-rapidapi-key': process.env.REACT_APP_MOVIE_API_KEY,
                    'x-rapidapi-host': process.env.REACT_APP_MOVIE_API_HOST
                }
              };
              
              axios.request(options).then(function (response) {
                  console.log(response.data);
                  setMovie(response.data);
              }).catch(function (error) {
                  console.error(error);
              });
          } catch (error) {
            setMovie({})
            console.log(error);
          }
        }
        fetchMovieData()
      }, [])

    return (
        <div className="moviePage">
            <div>
                <h2>{movie.Title}</h2>
                <img src={movie.Poster} alt={movie.Title}></img>
                <h4>Director: {movie.Director} </h4>
                <h4>Release Year: {movie.Year}</h4>
                <p>Plot: {movie.Plot}</p>
            </div>
        </div>
    );
}

export default MoviePage;