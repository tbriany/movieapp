import '../App.css';
import React, { useState, useEffect } from "react";
import { Switch, Route, Link, withRouter, Redirect } from "react-router-dom";
import axios from "axios";

function SearchBar() {

    const [input, setInput] = useState('')
    const [results, setResults] = useState([])

    const handleSearch = () => {
        console.log('searching for movie', input)
        const options = {
            method: 'GET',
            url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
            params: { s: 'Avengers Endgame', page: '1', r: 'json' },
            // params: {s: input, page: '1', r: 'json'},
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_MOVIE_API_KEY,
                'x-rapidapi-host': process.env.REACT_APP_MOVIE_API_HOST
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            setResults(response.data.Search)
        }).catch(function (error) {
            console.error(error);
        });
    }

    const handleInput = (event) => {
        let search = event.target.value
        setInput(search)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        handleSearch()
    }

    const mappedResults = results.map(el => {
        return (
            <Link to={`/movie/${el.imdbID}`} key={el.imdbID}>
                <div key={el.imdbID}>
                    <h4>{el.Title}</h4>
                    <img src={el.Poster} alt={el.Title}></img>
                </div>
            </Link>
        )
    })

    return (
        <div className="searchBar">
            <form onSubmit={handleSubmit}>
                <label>
                    Movie title:
                    <input type="text" name="title" onChange={handleInput}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
            <ul>
                {mappedResults}
            </ul>
        </div>
    );
}

export default SearchBar;