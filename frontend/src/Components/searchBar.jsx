import '../App.css';
import React, { useState, useEffect } from "react";
import { Switch, Route, Link, withRouter, Redirect } from "react-router-dom";


function SearchBar() {

    return (
        <div className="searchBar">
            <form>
                <label>
                    Movie title: 
                    <input type="text" name="title" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default SearchBar;