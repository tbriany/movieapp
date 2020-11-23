const express = require('express');
const router = express.Router();
const movieQueries = require('../queries/movieQueries');


router.get('/', function (req, res, next) {
  res.send('movies endpoint');
});


// get all movies 
router.get("/all", async (req, res, next) => {
  try {
    const allMovies = await movieQueries.getAllMovies();
    res.status(200).json({
      message: `Retrieved all movies`,
      payload: allMovies
    });
  } catch (err) {
    console.log(err)
  }
});


// add new movie 
router.post("/add", async (req, res, next) => {
  console.log(req.body)
  const { title, thumbs_up, thumbs_down } = req.body
  try {
    let movieExists = await movieQueries.checkIfExists(title);
    movieExists = movieExists[0].exists
    if (movieExists == false) {
      const newMovie = await movieQueries.addNewMovie(title, thumbs_up, thumbs_down);
      res.status(200).json({
        message: `New movie added`,
        payload: newMovie
      });
    }
  } catch (err) {
    console.log(err)
  }
});

const checkIfMovieExists = async (req, res, next) => {
  const { title } = req.params
  try {
    let movieExists = await movieQueries.checkIfExists(title);
    movieExists = movieExists[0].exists
    if (movieExists) {
      next()
    } else {
      res.status(400).json({
        message: `Movie title ${title} does not exist in database. Please add it.`
      });
    }
  } catch (err) {
    console.log(err)
  }
}

router.get("/info/:title", checkIfMovieExists, async (req, res, next) => {
  const { title} = req.params
  try {
    const movieInfo = await movieQueries.getMovieInfo(title);
    res.status(200).json({
      message: `Retrieved movie info for title ${title}`,
      payload: movieInfo
    });
  } catch (err) {
    console.log(err)
  }
});


// update likes 
router.post("/updateLikes/:title", checkIfMovieExists, async (req, res, next) => {
  const { title} = req.params
  try {
      const updateLikes = await movieQueries.updateLikes(title);
      res.status(200).json({
        message: `New thumbs_up for movie titled ${title}`,
        payload: updateLikes
      });
  } catch (err) {
    console.log(err)
  }
});


// update dislikes 
router.post("/updateDislikes/:title", checkIfMovieExists, async (req, res, next) => {
  const { title} = req.params 
  try {
      const updateDislikes = await movieQueries.updateDislikes(title);
      res.status(200).json({
        message: `New thumbs_down for movie titled ${title}`,
        payload: updateDislikes
      });
  } catch (err) {
    console.log(err)
  }
});



module.exports = router;
