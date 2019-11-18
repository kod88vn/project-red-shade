const path         = require('path');
const mongoose = require('mongoose');

const { Author } = require(path.resolve('server/src/schemas'));

mongoose.connect('mongodb://localhost:27017/bookdb');

Author.createMapping((err, mapping) => {
  console.log('mapping created');
});

const authorSearch = ({page=0, size=20, searchText, field='name'}) => {
  return new Promise((resolve, reject) => {
    try {
      Author.esSearch({
        from: page*size,
        size,
        query: {
          "bool": {
            "must": [
              {
                "query_string": {
                  "query": searchText,
                  "default_field" : field,
                  "default_operator": 'and'
                }
              }
            ]
          }
        }
      }, {
        sort: ["dateUpdated:desc", "dateCreated:desc"]
      }, (err, results) => {
        if (err) reject(err);
        if(!results) {
          resolve({});
          return;
        }
        resolve(results.hits.hits.map(h =>  ({ ...h._source, id: h._id })));
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  authorSearch
}
