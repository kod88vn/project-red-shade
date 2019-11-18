const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const Schema = mongoose.Schema;

const model = 'author';

if(mongoose.connection.models[model]) delete mongoose.connection.models[model];

const Author = new Schema({
  name: String,
  biography: String,
  dateUpdated: {type:Date, es_type:'date'},
  dateCreated: {type:Date, es_type:'date'},
});

Author.plugin(mongoosastic, {
  host: "localhost",
  port: 9200,
  bulk: {
    size: 100, // preferred number of docs to bulk index
    delay: 10 //milliseconds to wait for enough docs to meet size constraint
  }
});

module.exports = mongoose.model(model, Author);
