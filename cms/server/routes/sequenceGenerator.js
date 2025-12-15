const Sequence = require('../models/sequences');

let maxDocumentId = 0;
let maxMessageId = 0;
let maxContactId = 0;
let sequenceId = null;

class SequenceGenerator {
  constructor() {
    Sequence.findOne().exec()
      .then(sequence => {
        if (!sequence) {
          console.log('No sequence document found. Creating default.');
          return Sequence.create({
            maxDocumentId: 0,
            maxMessageId: 0,
            maxContactId: 0
          });
        }
        return sequence;
      })
      .then(sequence => {
        sequenceId = sequence._id;
        maxDocumentId = sequence.maxDocumentId;
        maxMessageId = sequence.maxMessageId;
        maxContactId = sequence.maxContactId;
        console.log('SequenceGenerator initialized:', { sequenceId, maxDocumentId, maxMessageId, maxContactId });
      })
      .catch(err => {
        console.error('Error initializing SequenceGenerator:', err);
      });
  }

  async nextId(collectionType) {
    let nextId;
    let updateObject = {};

    switch (collectionType) {
      case 'documents':
        maxDocumentId++;
        nextId = maxDocumentId;
        updateObject.maxDocumentId = maxDocumentId;
        break;
      case 'messages':
        maxMessageId++;
        nextId = maxMessageId;
        updateObject.maxMessageId = maxMessageId;
        break;
      case 'contacts':
        maxContactId++;
        nextId = maxContactId;
        updateObject.maxContactId = maxContactId;
        break;
      default:
        return -1;
    }

    try {
      await Sequence.updateOne({ _id: sequenceId }, { $set: updateObject });
    } catch (err) {
      console.error('Error updating sequence:', err);
      return null;
    }

    return nextId;
  }
}

module.exports = new SequenceGenerator();
