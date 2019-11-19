const mongoose     = require('mongoose');
const path         = require('path');
const random       = require('random-name');
const LoremIpsum   = require("lorem-ipsum").LoremIpsum;

const { Book } = require('../src/schemas');
const { Author } = require('../src/schemas');

Book.createMapping((err, mapping) => {
  if(err) console.log(err);
  console.log('book mapping created');
});

Author.createMapping((err, mapping) => {
  if(err) console.log(err);
  console.log('author mapping created');
});

mongoose.connect('mongodb://localhost:27017/bookdb');

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
})

let authors = [];
for (let i = 0; i < 10; i++) {
  let name = `${random.first()} ${random.middle()} ${random.last()}`;
  authors.push({
    name,
    biography: lorem.generateParagraphs(3),
    dateCreated: new Date(),
    dateUpdated: new Date()
  });
}

Author.insertMany(authors, err => {
  if (err) throw err;
})

Author.find(function(err, authors, count) {
  const authorIds = authors.map(a => a._id);

  let books = [];
  for (let i = 0; i < 5000; i++) {
    const randomIndex = Math.ceil(Math.random()*10);
    const randomAuthorId = authorIds[randomIndex];
    let name = `${random.first()} ${random.middle()} ${random.last()}`
    books.push(
    {
      author: randomAuthorId,
      name: `${lorem.generateSentences(1)} of ${name}`,
      description: lorem.generateParagraphs(2),
      dateCreated: new Date(),
      dateUpdated: new Date()
    });
  }

  Book.insertMany(books, err => {
    if (err) throw err;
  })
});



// let stream = Book.synchronize();
// let count = 0;;

// stream.on('data', function(err, doc){
//   count++;
// });
// stream.on('close', function(){
//   console.log('indexed ' + count + ' documents!');
// });
// stream.on('error', function(err){
//   console.log(err);
// });
