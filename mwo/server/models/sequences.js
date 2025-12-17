const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
  maxWatchlistId: { type: Number, default: 0 },
  maxContactId: { type: Number, default: 0 }
});

module.exports = mongoose.model('Sequence', sequenceSchema);