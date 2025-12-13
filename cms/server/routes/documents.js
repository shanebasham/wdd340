var express = require('express');
var router = express.Router();
const Document = require('../models/documents');
const sequenceGenerator = require('./sequenceGenerator');

// GET all documents
router.get('/', (req, res, next) => {
  Document.find()
    .then(documents => {
      res.status(200).json({
        message: 'Documents fetched successfully!',
        documents: documents
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred while fetching documents.',
        error: error
      });
    });
});

// GET a single document by id
router.get('/:id', (req, res) => {
  Document.findOne({ id: req.params.id })
    .then(doc => {
      if (!doc) {
        return res.status(404).json({
          message: 'Document not found'
        });
      }
      res.status(200).json({
        message: 'Document fetched successfully',
        document: doc
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'An error occurred while fetching the document',
        error: err
      });
    });
});


// POST a new document
router.post('/', async (req, res, next) => {
  try {
    const { name, description, url, children } = req.body;
    if (!name || !url) {
      return res.status(400).json({ message: 'Missing required fields: name or url' });
    }
    const maxDocumentId = await sequenceGenerator.nextId("documents");
    if (maxDocumentId === null || maxDocumentId < 0) {
      return res.status(500).json({ message: 'Failed to generate document ID' });
    }
    const document = new Document({
      id: maxDocumentId.toString(),
      name,
      description: description || null,
      url,
      children: children || []
    });
    const createdDocument = await document.save();
    res.status(201).json(createdDocument);
  } catch (err) {
    console.error('Error in POST /documents:', err);
    res.status(500).json({
      message: 'An error occurred while adding the document',
      error: err.message
    });
  }
});
// router.post('/', (req, res, next) => {
//   const maxDocumentId = sequenceGenerator.nextId("documents");
//   const document = new Document({
//     id: maxDocumentId,
//     name: req.body.name,
//     description: req.body.description,
//     url: req.body.url
//   });
//   document.save()
//     .then(createdDocument => {
//       res.status(201).json({
//         message: 'Document added successfully',
//         document: createdDocument
//       });
//     })
//     .catch(error => {
//       res.status(500).json({
//         message: 'An error occurred while adding the document',
//         error: error
//       });
//     });
// });


// PUT / update a document by id
router.put('/:id', (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then(document => {
      if (!document) {
        return res.status(404).json({
          message: 'Document not found'
        });
      }
      document.name = req.body.name;
      document.description = req.body.description;
      document.url = req.body.url;
      Document.updateOne({ id: req.params.id }, document)
        .then(result => {
          res.status(204).json({
            message: 'Document updated successfully'
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred while updating the document',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Document not found.',
        error: { document: 'Document not found' }
      });
    });
});


// DELETE a document by id
router.delete("/:id", (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then(document => {
      if (!document) {
        return res.status(404).json({
          message: "Document not found"
        });
      }
      Document.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Document deleted successfully"
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred while deleting the document',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Document not found.',
        error: { document: 'Document not found' }
      });
    });
});


module.exports = router;