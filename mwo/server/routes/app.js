// module.exports = router;
const express = require('express');
const router = express.Router();
const path = require('path');

// Angular build output folder
const distPath = path.join(__dirname, '../../dist/my-first-app/browser');

// Root route
router.get('/', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Catch-all: any other route should return Angular index.html
router.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

module.exports = router;
