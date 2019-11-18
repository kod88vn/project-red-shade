const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const Schema = mongoose.Schema;
const path         = require('path');

// const Author = require('./authorSchema');
// console.log(Author);
const model = 'book';

if(mongoose.connection.models[model]) delete mongoose.connection.models[model];
if(mongoose.connection.models['author']) delete mongoose.connection.models['author'];

const Author = new Schema({
  name: String,
  biography: String,
  dateUpdated: {type:Date, es_type:'date'},
  dateCreated: {type:Date, es_type:'date'},
});

mongoose.model('author', Author);

const Book = new Schema({
  name: String,
  description: String,
  dateUpdated: {type:Date, es_type:'date'},
  dateCreated: {type:Date, es_type:'date'},
  author: {
    type: Schema.Types.ObjectId,
    ref: 'author',
    es_schema: Author,
    es_indexed: true
  }
});

Book.plugin(mongoosastic, {
  host: "localhost",
  port: 9200,
  bulk: {
    size: 100, // preferred number of docs to bulk index
    delay: 10 //milliseconds to wait for enough docs to meet size constraint
  },
  populate: [
    {
      path: 'author', select: 'name'
    }
  ]
});
module.exports = mongoose.model(model, Book);
