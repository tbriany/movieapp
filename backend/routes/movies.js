const express = require('express');
const router = express.Router();
const movieQueries = require('../queries/movieQueries');


router.get('/', function(req, res, next) {
  res.send('movies endpoint');
});

// get all movies 


// add new movie 
router.post("/add", async (req, res, next) => {
  // const {title, thumbs_up, thumbs_down} = req.body 
  try {
      const newMovie = await movieQueries.addNewMovie(req.body);
      res.status(200).json({
          message: `New movie added`,
          payload: newMovie
      });
  } catch (err) {
      console.log(err)
  }
});

// update likes 


// update dislikes 




module.exports = router;
