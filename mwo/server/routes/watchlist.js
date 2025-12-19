var express = require('express');
var router = express.Router();
const Watchlist = require('../models/watchlist');
const sequenceGenerator = require('./sequenceGenerator');

// GET all movies
router.get('/', (req, res, next) => {
  Watchlist.find()
    .then(movies => {
      res.status(200).json({
        message: 'Watchlist fetched successfully!',
        watchlist: movies
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred while fetching the watchlist.',
        error: error
      });
    });
});

// GET a single movie by id
router.get('/:id', (req, res, next) => {
  Watchlist.findOne({ id: req.params.id })
    .then(movie => {
      if (!movie) {
        return res.status(404).json({
          message: 'Movie not found'
        });
      }
      res.status(200).json({
        message: 'Movie fetched successfully',
        movie: movie
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred while fetching the movie.',
        error: error
      });
    });
});

// POST add a new movie
router.post('/', async (req, res, next) => {
  try {
    const { title, year, type, genres, watched, favorite, rating, notes } = req.body;
    if (!title || !year || !genres) {
      return res.status(400).json({ message: 'Missing required field: title, year, genres' });
    }
    const maxWatchlistId = await sequenceGenerator.nextId("watchlist");
    if (maxWatchlistId === null || maxWatchlistId < 0) {
      return res.status(500).json({ message: 'Failed to generate movie ID' });
    }
    const movie = new Watchlist({
      id: maxWatchlistId.toString(),
      title,
      year: year || null,
      type: type || 'movie',
      genres: genres || [],
      watched: watched || false,
      favorite: favorite || false,
      rating: rating || null,
      notes: notes || ''
    });
    const createdMovie = await movie.save();
    res.status(201).json(createdMovie);
  } catch (err) {
    console.error('Error in POST /watchlist:', err);
    res.status(500).json({
      message: 'An error occurred while adding the movie',
      error: err.message
    });
  }
});

// router.post('/', async (req, res) => {
//   try {
//     const item = new Watchlist(req.body);
//     const savedItem = await item.save();
//     res.status(201).json(savedItem);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// PUT update a movie by id
router.put('/:id', (req, res, next) => {
  Watchlist.findOne({ id: req.params.id })
    .then(movie => {
      if (!movie) {
        return res.status(404).json({
          message: 'Movie not found'
        });
      }
      movie.title = req.body.title;
      movie.year = req.body.year;
      movie.type = req.body.type;
      movie.genres = req.body.genres;
      movie.watched = req.body.watched;
      movie.favorite = req.body.favorite;
      movie.rating = req.body.rating;
      movie.notes = req.body.notes;
      return Watchlist.updateOne({ id: req.params.id }, movie)
        .then(result => {
          res.status(204).json({
            message: 'Movie updated successfully'
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred while updating the movie',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Movie not found.',
        error: { movie: 'Movie not found' }
      });
    });
});

// DELETE a movie by id
router.delete('/:id', (req, res) => {
  Watchlist.deleteOne({ id: req.params.id })
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;