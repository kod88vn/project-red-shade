
var express = require('express');
var app = express.Router();
var path = require('path');

// import other routes
const userRoutes = require(__dirname + '/users/users.js');
const { echo, books, authors } = require(__dirname + '/controllers');

app.use(express.static(path.resolve('client/build/dist')))

// // other routes
userRoutes(app);
echo(app);
books(app);
authors(app);

// default route
app.get('*', (req, res) => {
  res.sendFile(path.resolve('client/build/dist/index.html'));
});

module.exports = app;
