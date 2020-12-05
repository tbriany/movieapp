const db = require('../db/db')


// get all movies 
const getAllMovies = async () => {
    const getAllMovies = `
    SELECT movie_title 
    FROM movieLikes
    `;
  return await db.any(getAllMovies);
}

// check if movie exists in database 
const checkIfExists = async (title) => {
    const checkIfExists = `
    SELECT exists 
    (SELECT 1 
     FROM movieLikes 
     WHERE movie_title = $/title/
     LIMIT 1
    )
    `
    return await db.any(checkIfExists, {title});
}

const getMovieInfo = async (title) => {
    const movieInfo = `
    SELECT *
     FROM movieLikes 
     WHERE movie_title = $/title/
    `
    return await db.any(movieInfo, {title});
}

// add new movie 
const addNewMovie = async (title, thumbs_up, thumbs_down) => {
    const addNewMovie = `
    INSERT INTO movieLikes 
    (movie_title, thumbs_up, thumbs_down)
    VALUES 
    ($/title/, $/thumbs_up/, $/thumbs_down/)
    RETURNING *
    `;
  return await db.any(addNewMovie, {title, thumbs_up, thumbs_down});
}

// update likes 
const updateLikes = async (title) => {
    console.log('updates likes')
    const updateLikes = `
    UPDATE movieLikes 
    SET 
    thumbs_up = thumbs_up + 1
    WHERE 
    movie_title = $/title/
    RETURNING *
    `;
    return await db.any(updateLikes, {title})
}


// update dislikes 
const updateDislikes = async (title) => {
    console.log('updates dislikes')
    const updateDislikes = `
    UPDATE movieLikes 
    SET 
    thumbs_down = thumbs_down + 1
    WHERE 
    movie_title = $/title/
    RETURNING *
    `;
    return await db.any(updateDislikes, {title})
}


module.exports = {
    getAllMovies,
    checkIfExists,
    getMovieInfo,
    addNewMovie,
    updateLikes,
    updateDislikes
}