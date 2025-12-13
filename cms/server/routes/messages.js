var express = require('express');
var router = express.Router();
const Message = require('../models/messages');

// GET all messages
router.get('/', (req, res) => {
  Message.find()
    .then(docs => res.status(200).json(docs))
    .catch(err => res.status(500).json({ error: err.message }));
});

// GET a single message by id
router.get('/:id', (req, res) => {
  Message.findOne({ id: req.params.id })
    .then(doc => {
      if (!doc) return res.status(404).json({ message: 'Message not found' });
      res.status(200).json(doc);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// POST a new message
router.post('/', (req, res) => {
  const doc = new Message(req.body);
  doc.save()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

// PUT / update a message by id
router.put('/:id', (req, res) => {
  Message.updateOne({ id: req.params.id }, { $set: req.body })
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

// DELETE a message by id
router.delete('/:id', (req, res) => {
  Message.deleteOne({ id: req.params.id })
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;