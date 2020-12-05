import '../App.css';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

function MoviePage(props) {
    const [movie, setMovie] = useState({})
    const [likes, setLikes] = useState(0)
    const [dislikes, setDislikes] = useState(0)


    const getMovieInfo = async () => {
        try {
            const res = await axios.get(`/movies/info/${movie.Title}`)
            setLikes(res.data.payload[0].thumbs_up)
            setDislikes(res.data.payload[0].thumbs_down)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        async function fetchMovieData() {
            try {
                const options = {
                    method: 'GET',
                    url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
                    params: { i: props.match.params.id, r: 'json' },
                    headers: {
                        'x-rapidapi-key': process.env.REACT_APP_MOVIE_API_KEY,
                        'x-rapidapi-host': process.env.REACT_APP_MOVIE_API_HOST
                    }
                };

                axios.request(options).then(function (response) {
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
        getMovieInfo()
    }, [props.match.params.id])

    const addLike = async (e) => {
        try {
            await axios.post(`/movies/updateLikes/${movie.Title}`)
        } catch (err) {
            console.log(err)
        }
        setLikes(prev => prev + 1)
        getMovieInfo()
    }

    const addDislike = async (e) => {
        try {
            await axios.post(`/movies/updateDislikes/${movie.Title}`)
        } catch (err) {
            console.log(err)
        }
        setDislikes(prev => prev + 1)
        getMovieInfo()
    }

    return (
        <div className="moviePage">
            <Link to={`/`} className="stretched-link" style={{ float: "right" }}> Back to search </Link>
            <div style={{ alignContent: "center", marginTop: "5%" }} >
                <div className='jumbotron text-center' style={{ backgroundColor: "transparent", display: "inline" }}>

                    <h2>{movie.Title}</h2>
                    <img src={movie.Poster} alt={movie.Title}></img>
                    <div>
                        <span>
                            {likes} likes
                <button className='btn btn-light' style={{ borderColor: "#5bc0de" }} onClick={addLike}>
                                <FontAwesomeIcon icon={faThumbsUp} style={{ height: "15px" }} />
                            </button>
                        </span>
                        <span>
                            {dislikes} dislikes
                        <button className='btn btn-light' style={{ borderColor: "#5bc0de" }} onClick={addDislike}>
                                <FontAwesomeIcon icon={faThumbsDown} onClick={addDislike} style={{ height: "15px" }} />
                            </button>
                        </span>
                    </div>
                    <h4>Director: {movie.Director} </h4>
                    <h4>Release Year: {movie.Year}</h4>
                    <p>Plot: {movie.Plot}</p>
                </div>
            </div>
        </div>
    );
}

export default MoviePage;