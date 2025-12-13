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
const documentsRoutes = require('./server/routes/documents');
const messagesRoutes  = require('./server/routes/messages');
const contactsRoutes  = require('./server/routes/contacts');
const Document = require('./server/models/documents');
const Message = require('./server/models/messages');
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
app.use('/documents', documentsRoutes);
app.use('/messages', messagesRoutes);
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

// establish a connection to the mongo database
// mongoose.connect('mongodb://localhost:27017/cms',
//    { useNewUrlParser: true }, (err, res) => {
//       if (err) {
//          console.log('Connection failed: ' + err);
//       }
//       else {
//          console.log('Connected to database!');
//       }
//    }
// );
mongoose.connect('mongodb://localhost:27017/cms', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to database!'))
.catch(err => console.log('Connection failed: ' + err));


// Create HTTP server
const server = http.createServer(app);

// Start server
server.listen(port, () => {
  console.log('API running on localhost: ' + port);
});

// // Get dependencies
// var express = require('express');
// var path = require('path');
// var http = require('http');
// var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// // import the routing file to handle the default (index) route
// var index = require('./server/routes/app.js');

// // ... ADD CODE TO IMPORT YOUR ROUTING FILES HERE ... 

// var app = express(); // create an instance of express

// // Tell express to use the following parsers for POST data
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
// app.use(cookieParser());

// app.use(logger('dev')); // Tell express to use the Morgan logger

// // Add support for CORS
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PATCH, PUT, DELETE, OPTIONS'
//   );
//   next();
// });

// // Tell express to use the specified director as the
// // root directory for your web site
// app.use(express.static(path.join(__dirname, 'dist/cms')));

// // Tell express to map the default route ('/') to the index route
// app.use('/', index);

// // ... ADD YOUR CODE TO MAP YOUR URL'S TO ROUTING FILES HERE ...

// // Tell express to map all other non-defined routes back to the index page
// app.get(/.*/, (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'my-first-app', 'index.html'));
// });

// // Define the port address and tell express to use this port
// const port = process.env.PORT || '3000';
// app.set('port', port);

// // Create HTTP server.
// const server = http.createServer(app);

// // Tell the server to start listening on the provided port
// server.listen(port, function() {
//   console.log('API running on localhost: ' + port)
// });
