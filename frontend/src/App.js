import './App.css';
import React, { useState, useEffect } from "react";
import { Switch, Route, Link, withRouter, Redirect } from "react-router-dom";
import MoviePage from "./Components/moviePage";
import SearchBar from "./Components/searchBar";

function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path="/" component={SearchBar} />
        <Route exact path="/movie/:id" component={MoviePage} />
      </Switch>
    </div>
  );
}

export default App;
