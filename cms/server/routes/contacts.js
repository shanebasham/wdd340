var express = require('express');
var router = express.Router();
const Contact = require('../models/contacts');

// GET all contacts
router.get('/', (req, res) => {
  Contact.find()
    .then(docs => res.status(200).json(docs))
    .catch(err => res.status(500).json({ error: err.message }));
});

// // GET all contacts in groups
// router.get('/', (req, res, next) => {
//   Contact.find()
//     .populate('group')
//     .then(contacts => {
//       res.status(200).json({
//           message: 'Contacts fetched successfully!',
//           contacts: contacts
//         });
//     })
//     .catch(error => {
//       res.status(500).json({
//         message: 'An error occurred',
//         error: error
//       });
//     });
// });

// GET a single contact by id
router.get('/:id', (req, res) => {
  Contact.findOne({ id: req.params.id })
    .then(doc => {
      if (!doc) return res.status(404).json({ message: 'Contact not found' });
      res.status(200).json(doc);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// POST a new contact
router.post('/', (req, res) => {
  console.log('Incoming POST body:', req.body);
  const doc = new Contact(req.body);
  doc.save()
    .then(result => res.status(201).json(result))
    .catch(err => {
      console.error('Error saving contact:', err);
      res.status(500).json({ error: err.message });
    });
});

// PUT / update a contact by id
router.put('/:id', (req, res) => {
  Contact.updateOne({ id: req.params.id }, { $set: req.body })
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

// DELETE a contact by id
router.delete('/:id', (req, res) => {
  Contact.deleteOne({ id: req.params.id })
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;