const path         = require('path');
const mongoose = require('mongoose');

const { Book, Author } = require(path.resolve('server/src/schemas'));

mongoose.connect('mongodb://localhost:27017/bookdb');

Book.createMapping((err, mapping) => {
  console.log('mapping created');
});

const authorSearch = (field, value, page=0, size=20) => {
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
                  "query": value,
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

const getAll = ({page=0, size=20, searchText}) => {
  return new Promise((resolve, reject) => {
    try {
      Book.esSearch({
        from: page*size,
        size,
        query: !searchText ? undefined : {
          "bool": {
            "must": [
              {
                "query_string": {
                  "query": `*${searchText}*`,
                  "default_field" : "*",
                  default_operator: 'and'
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
        resolve({
          list: results.hits.hits.map(h =>  ({ ...h._source, id: h._id })),
          matchCount: results.hits.total.value
        });
      });
    } catch (err) {
      reject(err);
    }
  });
}

const saveBook = (book) => {
  return new Promise((resolve, reject) => {
    book.save((err, book, count) => {
      if (err) reject(err);
      book.on('es-indexed', (err, book) =>{
        if (err) reject(err);
        resolve(book);
      });
    });
  });
}

const insert = async book => {
  book.dateCreated = new Date();
  book.dateUpdated = new Date();

  let founds = await authorSearch('name', book.author);
  if (founds && founds.length){
    book.author = founds[0].id;
    return saveBook(new Book(book));
  } else {
    const newAuthor = new Author({
      name: book.author
    });
    newAuthor.save((err, author) => {
      const authorId = author.id;
      book.author = authorId;
      return saveBook(new Book(book));
    });
  }
}

const update = async book => {
  Book.findById(book.id, async (err, oldBook) => {
    if (err) reject(err);

    oldBook.dateUpdated = new Date();
    // const keys = Object.keys(book);
    // for (let i = 0; i < keys.length; i++) {
    //   let att = keys[i];
    //   let val = book[att];
    //   oldBook[att] = val;
    // }
    oldBook.name = book.name;
    oldBook.description = book.description;

    let founds = await authorSearch('name', book.author);
    if (founds && founds.length){
      oldBook.author = founds[0].id;
      return saveBook(oldBook);
    } else {
      const newAuthor = new Author({
        name: book.author
      });
      newAuthor.save((err, author) => {
        const authorId = author.id;
        oldBook.author = authorId;
        return saveBook(oldBook);
      });
    }
  });
}

const remove = id => {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject('no id');
    }
    Book.findById(id, (err, book) => {
      if (err) return reject(err);
      if (!book) return reject(err);
      book.remove(err => {
        if (err) reject(err);
        resolve();
      });
    });
  });
}

const verifySync = (id, existing=true) => {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject('no id');
    }
    let count = 0;
    let interval = setInterval(() => {
      Book.esSearch({
        "query": {
          "terms": {
            "_id": [id]
          }
        }
      }, {
        hydrate: true,
      }, function(err, result) {
        let found = result.hits.max_score;
        if (err) return reject(err);

        if (existing && found) {
          setTimeout(() => resolve(true), 700);
          clearInterval(interval);
        }

        if (!existing && !found) {
          setTimeout(() => resolve(true), 700);
          clearInterval(interval);
        }

        if(++count >= 100) {
          clearInterval(interval);
          resolve(false);
        }
      });
    }, 50);
  });
}

module.exports = {
  getAll,
  insert,
  update,
  remove,
  verifySync
}
