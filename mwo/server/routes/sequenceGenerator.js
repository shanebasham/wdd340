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
        maxWatchlistId = sequence.maxWatchlistId
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

    switch (collectionType) {
      case 'contacts':
        maxContactId++;
        nextId = maxContactId;
        updateObject.maxContactId = maxContactId;
        break;

      case 'watchlist':
        maxWatchlistId++;
        nextId = maxWatchlistId;
        updateObject.maxWatchlistId = maxWatchlistId;
        break;

      default:
        return -1;
    }
    try {
      await Sequence.updateOne(
        { _id: sequenceId },
        { $set: updateObject }
      );
    } catch (err) {
      console.error('Error updating sequence:', err);
      return null;
    }
    return nextId;
  }
}

module.exports = new SequenceGenerator();
