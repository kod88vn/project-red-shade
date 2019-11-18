const mongoose     = require('mongoose');
const path         = require('path');
const random       = require('random-name')


const { Book } = require('../src/schemas');

mongoose.connect('mongodb://localhost:27017/bookdb');

Book.createMapping((err, mapping) => {
  console.log('mapping created');
});
// console.log(JSON.stringify(books.length, null, 2));

Book.esSearch({
  "query": {
    "terms": {
      "_id": [
        "5dcad33a3175f244e3af32cc"
      ]
    }
  }
}, {
  hydrate: true,
  // hydrateOptions: {select: 'name email'}
}, function(err, results) {
  console.log(JSON.stringify(results, null, 2));
});


mongoose.connection.on('disconnected', function(){
  console.log("Mongoose default connection is disconnected");
});

process.on('SIGINT', function(){
  mongoose.connection.close(function(){
      console.log("Mongoose default connection is disconnected due to application termination");
      process.exit(0)
  });
});
