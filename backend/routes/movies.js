var express = require('express');
var router = express.Router();
const movieQueries = require('../queries/movieQueries');


router.get('/', function(req, res, next) {
  res.send('movies endpoint');
});

router.post("/add", async (req, res, next) => {
  // const {title, likes, dislikes} = req.body 
  try {
      const newMovie = await movieQueries.addNewMovie(req.body);
      res.status(200).json({
          message: `New movie added`,
          payload: newMovie
      });
  } catch (err) {
      handleErrors(res, err);
  }
});

module.exports = router;
