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
  Watchlist.findOne({ _id: Number(req.params.id) })
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
router.post('/', (req, res, next) => {
  sequenceGenerator.nextId("watchlist")
    .then(maxMovieId => {
      const movie = new Watchlist({
        _id: maxMovieId,
        title: req.body.title,
        year: req.body.year || null,
        type: req.body.type || 'movie',
        genres: req.body.genres || [],
        watched: req.body.watched || false,
        favorite: req.body.favorite || false,
        rating: req.body.rating || null,
        notes: req.body.notes || ''
      });

      return movie.save();
    })
    .then(createdMovie => {
      res.status(201).json({
        message: 'Movie added successfully',
        movie: createdMovie
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred while adding the movie.',
        error: error
      });
    });
});


// PUT update a movie by id
router.put('/:id', (req, res, next) => {
  Watchlist.findOne({ _id: Number(req.params.id) })
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
      return Watchlist.updateOne({ _id: Number(req.params.id) }, movie);
    })
    .then(result => {
      res.status(204).json({
        message: 'Movie updated successfully'
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred while updating the movie.',
        error: error
      });
    });
});


// DELETE a movie by id
router.delete('/:id', (req, res, next) => {
  Watchlist.findOne({ _id: Number(req.params.id) })
    .then(movie => {
      if (!movie) {
        return res.status(404).json({
          message: 'Movie not found'
        });
      }
      return Watchlist.deleteOne({ _id: Number(req.params.id) });
    })
    .then(result => {
      res.status(204).json({
        message: 'Movie deleted successfully'
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred while deleting the movie.',
        error: error
      });
    });
});


module.exports = router;
