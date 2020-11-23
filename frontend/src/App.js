import './App.css';
import React, { useState, useEffect } from "react";
import { Switch, Route, Link, withRouter, Redirect } from "react-router-dom";
import MoviePage from "./Components/moviePage";
import SearchBar from "./Components/searchBar";

function App() {
  return (
    <div className="App">
      <h1>movie app</h1>
      <SearchBar/>
    </div>
  );
}

export default App;
