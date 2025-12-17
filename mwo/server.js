// Dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// Import router
const index = require('./server/routes/app.js');

// Create Express app
const app = express();

// Import files
const watchlistRoutes = require('./server/routes/watchlist');
const contactsRoutes  = require('./server/routes/contacts');
const Watchlist = require('./server/models/watchlist');
const Contact = require('./server/models/contacts');
const Sequence = require('./server/models/sequences');

// Parsers and logger
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));

// CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});
// Routes
app.use('/watchlist', watchlistRoutes);
app.use('/contacts', contactsRoutes);
app.use('/', index);

// Serve Angular static files
app.use(express.static(path.join(__dirname, 'dist', 'my-first-app', 'browser')));

// Catch-all for Angular routes
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'my-first-app', 'browser', 'index.html'));
});

// Port
const port = process.env.PORT || '3000';
app.set('port', port);

// Connect to database
mongoose.connect('mongodb://localhost:27017/movie_watchlist', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('Connected to database!');
  try {
    const watchlist = await Watchlist.find();
    console.log(watchlist);
  } catch (err) {
    console.error(err);
  }
})
.catch(err => console.log('Connection failed: ' + err)
);


// Create HTTP server
const server = http.createServer(app);

// Start server
server.listen(port, () => {
  console.log('API running on localhost: ' + port);
});
