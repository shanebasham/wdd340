const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  year: { type: Number },
  type: { type: String, default: 'movie' },
  genres: [String],
  status: { type: String, default: 'planned' },
  watched: { type: Boolean, default: false },
  favorite: { type: Boolean, default: false },
  rating: { type: Number, default: null },
  notes: { type: String, default: '' }
}, { collection: 'movie_watchlist' });

module.exports = mongoose.model('Watchlist', watchlistSchema);