const Sequence = require('../models/sequences');

let maxWatchlistId = 0;
let maxContactId = 0;
let sequenceId = null;

class SequenceGenerator {
  constructor() {
    Sequence.findOne().exec()
      .then(sequence => {
        if (!sequence) {
          console.log('No sequence document found. Creating default.');
          return Sequence.create({
            maxWatchlistId: 0,
            maxContactId: 0
          });
        }
        return sequence;
      })
      .then(sequence => {
        sequenceId = sequence._id;
        maxWatchlistId = sequence.maxWatchlistId;
        maxContactId = sequence.maxContactId;
        console.log('SequenceGenerator initialized:', { sequenceId, maxWatchlistId, maxContactId });
      })
      .catch(err => {
        console.error('Error initializing SequenceGenerator:', err);
      });
  }

async nextId(collectionType) {
  let nextId;
  let updateObject = {};

  try {
    if (collectionType === 'watchlist') {
      // Always sync with actual highest id in movie_watchlist
      const maxMovie = await require('../models/watchlist')
        .findOne()
        .sort({ id: -1 })
        .select('id')
        .exec();

      const dbMaxId = maxMovie ? parseInt(maxMovie.id, 10) : 0;

      // Ensure in memory value is never behind DB
      maxWatchlistId = Math.max(maxWatchlistId, dbMaxId);

      maxWatchlistId++;
      nextId = maxWatchlistId;
      updateObject.maxWatchlistId = maxWatchlistId;
    }
    else if (collectionType === 'contacts') {
      maxContactId++;
      nextId = maxContactId;
      updateObject.maxContactId = maxContactId;
    }
    else {
      console.log('Invalid collectionType:', collectionType);
      return -1;
    }

    await Sequence.updateOne(
      { _id: sequenceId },
      { $set: updateObject }
    );

    console.log('nextId generated for', collectionType, '=', nextId);
    return nextId;
  }
  catch (err) {
    console.error('Error generating nextId:', err);
    return null;
  }
}
}

module.exports = new SequenceGenerator();
